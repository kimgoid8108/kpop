"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

interface AutoTProps {
  text: string;
  isHtml?: boolean;
}

/**
 * 텍스트 자동번역 컴포넌트
 * language가 ko면 원문 그대로 표시, 그 외에는 DeepL로 자동 번역
 */
export function AutoT({ text, isHtml = false }: AutoTProps) {
  const { language, translate } = useLanguage();
  const [out, setOut] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    let alive = true;

    const performTranslation = async () => {
      if (language === "ko") {
        if (alive) setOut(text);
        return;
      }

      if (!text || text.trim() === "") {
        if (alive) setOut(text);
        return;
      }

      setIsTranslating(true);
      try {
        console.log(`[AutoT] 번역 시작: "${text}" (언어: ${language})`);
        const translated = await translate(text, { isHtml });
        console.log(`[AutoT] 번역 완료: "${text}" → "${translated}"`);
        if (alive) setOut(translated);
      } catch (error) {
        console.error("[AutoT] 번역 에러:", error);
        if (alive) setOut(text); // 에러 시 원문 표시
      } finally {
        if (alive) setIsTranslating(false);
      }
    };

    performTranslation();

    return () => {
      alive = false;
    };
  }, [text, isHtml, language, translate]);

  if (isHtml) return <span dangerouslySetInnerHTML={{ __html: out }} />;
  if (isTranslating && language !== "ko") {
    return <>{text}</>; // 번역 중에는 원문 표시
  }
  return <>{out}</>;
}
