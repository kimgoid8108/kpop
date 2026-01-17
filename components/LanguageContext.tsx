"use client";

import React, { createContext, useContext, useEffect, useCallback, useState } from "react";
import { translationBatchQueue } from "./translationBatch";

export type Language = "ko" | "en" | "vi";

type TranslateOptions = { isHtml?: boolean };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string, opts?: TranslateOptions) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage = "ko",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // 클라이언트에서 localStorage 동기화 (hydration 후)
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved === "ko" || saved === "en" || saved === "vi") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    // localStorage 저장
    localStorage.setItem("language", lang);
    // Cookie 저장 (서버에서 읽을 수 있도록)
    document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const translate = useCallback(
    async (text: string, opts?: TranslateOptions): Promise<string> => {
      if (!text || text.trim() === "") return text;
      if (language === "ko") return text; // ✅ 한국어는 원문

      try {
        // 배치 큐를 통해 번역 (캐시, dedupe, 동시성 제한, 429 재시도 모두 내부 처리)
        const translated = await translationBatchQueue.translate(text, opts || {}, language);
        return translated;
      } catch (error) {
        console.error("[translate] 번역 에러:", error);
        return text; // 에러 시 원문 반환
      }
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
