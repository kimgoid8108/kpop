import { NextResponse } from 'next/server';

// 언어 코드 매핑: ko/en/vi → KO/EN/VI
const LANGUAGE_MAP: Record<string, string> = {
  ko: 'KO',
  en: 'EN',
  vi: 'VI',
};

/**
 * DeepL API URL 결정
 * Free 키는 'fx'로 시작하거나 'free'가 포함됨
 * Pro 키는 그 외의 형식
 */
function getDeepLUrl(apiKey: string): string {
  const key = apiKey.trim().toLowerCase();
  if (key.endsWith(':fx') || key.includes('free')) {
    return 'https://api-free.deepl.com/v2/translate';
  }
  return 'https://api.deepl.com/v2/translate';
}

export async function POST(req: Request) {
  try {
    const { text, sourceLang, targetLang, isHtml } = await req.json();

    // text는 string 또는 string[] 모두 허용
    const isBatch = Array.isArray(text);
    const texts = isBatch ? text : [text];

    if (!text || (isBatch && texts.length === 0) || !targetLang) {
      return NextResponse.json(
        { error: 'Invalid request', detail: 'text (string or string[]) and targetLang are required' },
        { status: 400 }
      );
    }

    // API Key 확인
    const apiKeyRaw = process.env.DEEPL_API_KEY;
    const apiKey = apiKeyRaw?.trim();
    if (!apiKey) {
      console.error('[API/translate] DEEPL_API_KEY가 환경변수에 설정되지 않았습니다.');
      return NextResponse.json(
        { 
          error: 'Translation service unavailable',
          detail: 'DEEPL_API_KEY is not set in environment variables'
        },
        { status: 500 }
      );
    }

    // 언어 코드 변환
    const sourceLangCode = sourceLang
      ? LANGUAGE_MAP[sourceLang.toLowerCase()] || 'KO'
      : 'KO';
    const targetLangCode = LANGUAGE_MAP[targetLang.toLowerCase()];

    if (!targetLangCode) {
      console.error(`[API/translate] 지원하지 않는 targetLang: ${targetLang}`);
      return NextResponse.json(
        { 
          error: 'Unsupported target language',
          detail: `Target language '${targetLang}' is not supported. Supported: ko, en, vi`
        },
        { status: 400 }
      );
    }

    // 같은 언어면 번역하지 않음
    if (sourceLangCode === targetLangCode) {
      if (isBatch) {
        return NextResponse.json({ translatedTexts: texts });
      }
      return NextResponse.json({ translatedText: text });
    }

    // DeepL API URL 결정 (Free/Pro 자동 감지)
    const deeplUrl = getDeepLUrl(apiKey);
    console.log(`[API/translate] DeepL API URL: ${deeplUrl}, Target: ${targetLangCode}, Batch: ${isBatch} (${texts.length} items)`);

    const params = new URLSearchParams();
    // 여러 텍스트를 같은 key로 append (배치 번역)
    for (const t of texts) {
      params.append('text', t);
    }
    params.append('source_lang', sourceLangCode);
    params.append('target_lang', targetLangCode);
    
    // HTML 컨텐츠인 경우
    if (isHtml) {
      params.append('text_type', 'html');
    }
    
    params.append('preserve_formatting', '1');

    const res = await fetch(deeplUrl, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!res.ok) {
      let errorDetail: any = {};
      try {
        const errorText = await res.text();
        try {
          errorDetail = JSON.parse(errorText);
        } catch {
          errorDetail = { raw: errorText };
        }
      } catch {
        errorDetail = { message: 'Failed to parse error response' };
      }

      console.error(
        `[API/translate] DeepL API 에러 발생\n` +
        `  Status: ${res.status} ${res.statusText}\n` +
        `  Detail: ${JSON.stringify(errorDetail, null, 2)}\n` +
        `  Source: ${sourceLangCode} → Target: ${targetLangCode}\n` +
        `  URL: ${deeplUrl}`
      );

      return NextResponse.json(
        { 
          error: 'DeepL API error',
          status: res.status,
          detail: errorDetail
        },
        { status: res.status >= 400 && res.status < 500 ? res.status : 500 }
      );
    }

    const data = await res.json();
    
    if (!data.translations || !Array.isArray(data.translations) || data.translations.length === 0) {
      console.error('[API/translate] DeepL 응답 형식 오류:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { 
          error: 'Invalid response from DeepL',
          detail: 'Response does not contain translations array'
        },
        { status: 500 }
      );
    }

    // 배치 응답 처리
    if (isBatch) {
      const translatedTexts = data.translations.map((t: any) => t?.text || '').filter((t: string) => t);
      if (translatedTexts.length !== texts.length) {
        console.error(`[API/translate] 배치 번역 길이 불일치: 요청 ${texts.length}개, 응답 ${translatedTexts.length}개`);
        return NextResponse.json(
          { 
            error: 'Invalid response from DeepL',
            detail: `Translation count mismatch: expected ${texts.length}, got ${translatedTexts.length}`
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ translatedTexts });
    }

    // 단일 응답 처리
    const translatedText = data.translations[0]?.text;
    if (!translatedText || typeof translatedText !== 'string') {
      console.error('[API/translate] 번역 텍스트가 없음:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { 
          error: 'Invalid response from DeepL',
          detail: 'Translation text is missing or invalid'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      translatedText,
    });
  } catch (error) {
    console.error('Translation route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
