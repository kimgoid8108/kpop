"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

/**
 * placeholder, aria-label 등 속성에 사용할 번역 훅
 * 
 * @example
 * const placeholder = useAutoTranslate("검색어를 입력하세요");
 * <input placeholder={placeholder} />
 * 
 * @example
 * const label = useAutoTranslate("제목");
 * <input aria-label={label} />
 */
export function useAutoTranslate(text: string, isHtml?: boolean): string {
  const { language, translate } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let alive = true;

    const performTranslation = async () => {
      if (language === "ko") {
        if (alive) setTranslated(text);
        return;
      }

      if (!text || text.trim() === "") {
        if (alive) setTranslated(text);
        return;
      }

      try {
        const result = await translate(text, { isHtml });
        if (alive) setTranslated(result);
      } catch (error) {
        console.error("[useAutoTranslate] 번역 에러:", error);
        if (alive) setTranslated(text); // 에러 시 원문 반환
      }
    };

    performTranslation();

    return () => {
      alive = false;
    };
  }, [text, isHtml, language, translate]);

  return translated;
}
