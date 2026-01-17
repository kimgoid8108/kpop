"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

interface TranslatedContentProps {
  content: string;
  isHtml?: boolean;
  sourceLang?: "ko" | "en" | "vi";
  className?: string;
}

/**
 * DeepL API를 사용하여 컨텐츠를 자동 번역하는 컴포넌트
 * 
 * @example
 * // 일반 텍스트 번역
 * <TranslatedContent content="안녕하세요" />
 * 
 * @example
 * // HTML 컨텐츠 번역
 * <TranslatedContent 
 *   content="<p>안녕하세요</p><p>반갑습니다</p>" 
 *   isHtml={true} 
 * />
 */
export function TranslatedContent({
  content,
  isHtml = false,
  sourceLang = "ko",
  className = "",
}: TranslatedContentProps) {
  const { language, translate } = useLanguage();
  const [translatedText, setTranslatedText] = useState<string>(content);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const performTranslation = async () => {
      // 현재 언어가 ko면 번역하지 않음
      if (language === "ko") {
        setTranslatedText(content);
        return;
      }

      setIsTranslating(true);
      try {
        const result = await translate(content, {
          isHtml,
        });
        setTranslatedText(result);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText(content); // 에러 시 원문 반환
      } finally {
        setIsTranslating(false);
      }
    };

    performTranslation();
  }, [content, language, isHtml, translate]);

  if (isHtml) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: translatedText }}
      />
    );
  }

  return (
    <div className={className}>
      {isTranslating ? (
        <span className="text-gray-400 italic">번역 중...</span>
      ) : (
        translatedText
      )}
    </div>
  );
}
