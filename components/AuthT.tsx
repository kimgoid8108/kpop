"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../components/LanguageContext";

interface AutoTProps {
  text: string;
  isHtml?: boolean;
}

/**
 * 텍스트 자동번역 컴포넌트
 */
export function AutoT({ text, isHtml = false }: AutoTProps) {
  const { language, translate } = useLanguage();
  const [out, setOut] = useState(text);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (language === "ko") {
        if (alive) setOut(text);
        return;
      }
      const translated = await translate(text, { isHtml });
      if (alive) setOut(translated);
    })();

    return () => {
      alive = false;
    };
  }, [text, isHtml, language, translate]);

  if (isHtml) return <span dangerouslySetInnerHTML={{ __html: out }} />;
  return <>{out}</>;
}

// hook도 export (Sidebar.tsx 가이드 참조)
export function useAuth() {
  // 실제 인증 로직이 없으므로 임시 목업 제공 (구현 필요시 수정)
  // 이 부분은 Sidebar에서 import 에러 막기 위함
  return { user: null, loading: false };
}