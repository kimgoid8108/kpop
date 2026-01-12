"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations } from "../i18n/translations";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko");

  // 페이지 로드 시 로컬 스토리지에서 언어 설정 확인
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage === "ko" || savedLanguage === "en") {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  }, []);

  // 타입 안전한 번역 함수 - 항상 문자열 반환
  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // 한국어로 폴백
        value = translations["ko"];
        for (const k2 of keys) {
          value = value?.[k2];
        }
        break;
      }
    }
    
    // 문자열이면 반환, 아니면 빈 문자열 또는 키 반환
    if (typeof value === "string") {
      return value;
    }
    if (value === undefined || value === null) {
      return key;
    }
    return String(value);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
