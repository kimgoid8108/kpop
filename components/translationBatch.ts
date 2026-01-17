// translationBatch.ts
"use client";

type TranslateOptions = { isHtml?: boolean };

// --- 내부 유틸 ---
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function makeKey(text: string, opts: TranslateOptions, targetLang: string) {
  // 너무 길면 sessionStorage key 부담이 커지니 잘라서 사용
  const t = text.length > 500 ? text.slice(0, 500) : text;
  return `deepl:${targetLang}:${opts?.isHtml ? "html" : "plain"}:${t}`;
}

function getCache(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function setCache(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // ignore quota errors
  }
}

// --- 배치 큐 구현 ---
type PendingItem = {
  key: string;
  text: string;
  opts: TranslateOptions;
  targetLang: string;
  resolve: (v: string) => void;
  reject: (e: unknown) => void;
};

class TranslationBatchQueue {
  private pending: PendingItem[] = [];
  private timer: number | null = null;

  // 같은 key에 대한 “진행 중 요청” 공유
  private inflight = new Map<string, Promise<string>>();

  // 동시성 제한
  private activeRequests = 0;
  private readonly maxConcurrent = 2;

  // flush 간격(짧게 모아서 배치)
  private readonly flushDelayMs = 20;

  // 배치 크기 제한(너무 크면 나눔)
  private readonly maxBatchSize = 25;

  translate(text: string, opts: TranslateOptions, targetLang: string): Promise<string> {
    const trimmed = text?.trim?.() ? text.trim() : text;
    if (!trimmed) return Promise.resolve(text);

    const key = makeKey(trimmed, opts, targetLang);

    // 1) 캐시 hit
    const cached = getCache(key);
    if (cached) return Promise.resolve(cached);

    // 2) inflight 공유
    const existing = this.inflight.get(key);
    if (existing) return existing;

    // 3) 큐에 넣고 배치 처리
    const p = new Promise<string>((resolve, reject) => {
      this.pending.push({ key, text: trimmed, opts, targetLang, resolve, reject });
      this.scheduleFlush();
    });

    this.inflight.set(key, p);
    p.finally(() => {
      // 완료되면 inflight 제거 (캐시는 성공 시 set)
      this.inflight.delete(key);
    });

    return p;
  }

  private scheduleFlush() {
    if (this.timer != null) return;
    this.timer = window.setTimeout(() => {
      this.timer = null;
      this.flush().catch((e) => console.error("[translationBatch] flush error", e));
    }, this.flushDelayMs);
  }

  private async flush() {
    // 동시성 제한: 이미 max면 다음 tick에 다시 시도
    if (this.activeRequests >= this.maxConcurrent) {
      this.scheduleFlush();
      return;
    }

    if (this.pending.length === 0) return;

    // 같은 targetLang + isHtml끼리 묶는 게 안정적
    // (한 번의 DeepL 호출로 옵션/타겟 동일해야 관리가 쉬움)
    const first = this.pending[0];
    const groupTarget = first.targetLang;
    const groupIsHtml = !!first.opts?.isHtml;

    const group: PendingItem[] = [];
    const rest: PendingItem[] = [];

    for (const item of this.pending) {
      if (
        item.targetLang === groupTarget &&
        !!item.opts?.isHtml === groupIsHtml &&
        group.length < this.maxBatchSize
      ) {
        group.push(item);
      } else {
        rest.push(item);
      }
    }

    this.pending = rest;

    // 다음 그룹이 남아있으면 다음 flush 예약
    if (this.pending.length > 0) this.scheduleFlush();

    this.activeRequests++;
    try {
      const texts = group.map((g) => g.text);

      // 서버 배치 지원을 사용: text: string[]
      const translated = await this.fetchWithRetry({
        text: texts,
        sourceLang: "ko",
        targetLang: groupTarget,
        isHtml: groupIsHtml,
      });

      // 응답 매핑
      for (let i = 0; i < group.length; i++) {
        const item = group[i];
        const out = translated[i] ?? item.text;
        setCache(item.key, out);
        item.resolve(out);
      }
    } catch (err) {
      // 실패하면 원문 fallback
      for (const item of group) {
        item.resolve(item.text);
      }
      console.error("[translationBatch] batch failed:", err);
    } finally {
      this.activeRequests--;
      // 남아있는 pending이 있으면 계속 flush
      if (this.pending.length > 0) this.scheduleFlush();
    }
  }

  private async fetchWithRetry(body: {
    text: string[]; // 배치
    sourceLang: string;
    targetLang: string;
    isHtml: boolean;
  }): Promise<string[]> {
    const delays = [300, 800, 1500];

    for (let attempt = 0; attempt <= delays.length; attempt++) {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));

        // 서버가 배열 응답 지원하는 경우
        if (Array.isArray(data?.translatedTexts)) return data.translatedTexts;

        // 서버가 단일만 주는 경우(혹시)
        if (typeof data?.translatedText === "string") return [data.translatedText];

        // 형식이 이상하면 원문 fallback
        return body.text;
      }

      // 에러 파싱
      let detail: any = null;
      try {
        detail = await res.json();
      } catch {
        try {
          detail = await res.text();
        } catch {
          detail = null;
        }
      }

      // 429면 backoff 재시도
      if (res.status === 429 && attempt < delays.length) {
        await sleep(delays[attempt]);
        continue;
      }

      // 그 외는 실패 처리
      console.error("[translationBatch] /api/translate failed", {
        status: res.status,
        detail,
      });
      return body.text;
    }

    return body.text;
  }
}

export const translationBatchQueue = new TranslationBatchQueue();
