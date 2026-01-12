"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { translations } from "../i18n/translations";

type Language = "ko" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

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
  const t = useCallback(
    (key: string): string => {
      // 안전한 객체 접근을 위한 도우미 함수
      function getByPath(obj: any, path: string): unknown {
        if (obj == null) return undefined;
        // 우선 1차 키 접근 시도 (예: "intro.about") → translations[language]?.["intro.about"]
        if (Object.prototype.hasOwnProperty.call(obj, path)) {
          return obj[path];
        }
        // 점 표기법 분리 후 중첩 접근
        const parts = path.split(".");
        let current = obj;
        for (let p of parts) {
          if (current && typeof current === "object" && p in current) {
            current = current[p];
          } else {
            return undefined;
          }
        }
        return current;
      }

      // 현재 언어에서 우선 찾기
      let value = getByPath(translations[language], key);

      // 존재하면 반환 (문자열일 때만)
      if (typeof value === "string") {
        return value;
      }

      // 존재하지 않으면 ko로 fallback
      value = getByPath(translations["ko"], key);
      if (typeof value === "string") {
        return value;
      }

      // 그래도 없으면 키 반환
      if (value === undefined || value === null) {
        return key;
      }
      return String(value);
    },
    [language]
  );

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
