import type { Language } from "@/components/LanguageContext";

/**
 * 다국어 컬럼을 선택하는 유틸 함수
 * 
 * @example
 * const row = { title_ko: "제목", title_en: "Title", title_vi: "Tiêu đề" };
 * const title = pickLang(row, "title", "en"); // "Title"
 * const titleFallback = pickLang(row, "title", "vi"); // "Tiêu đề" (없으면 ko로 fallback)
 * 
 * @param row - 다국어 컬럼을 포함한 객체 (예: { title_ko, title_en, title_vi })
 * @param baseKey - 기본 키 이름 (예: "title")
 * @param lang - 선택할 언어 ("ko" | "en" | "vi")
 * @param fallbackLang - fallback 언어 (기본값: "ko")
 * @returns 선택된 언어의 문자열 값, 없으면 fallback 언어 값, 둘 다 없으면 빈 문자열
 */
export function pickLang<T extends Record<string, any>>(
  row: T,
  baseKey: string,
  lang: Language,
  fallbackLang: Language = "ko"
): string {
  const key = `${baseKey}_${lang}` as keyof T;
  const fallbackKey = `${baseKey}_${fallbackLang}` as keyof T;

  // 현재 언어의 값이 있고 유효한 문자열인 경우
  if (typeof row[key] === "string" && row[key]) return row[key] as string;
  
  // fallback 언어의 값이 있고 유효한 문자열인 경우
  if (typeof row[fallbackKey] === "string" && row[fallbackKey]) return row[fallbackKey] as string;
  
  // 둘 다 없으면 빈 문자열 반환
  return "";
}
