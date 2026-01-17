"use client";

import React from "react";
import { useLanguage } from "../components/LanguageContext";
import { TranslatedContent } from "../components/TranslatedContent";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

/**
 * DeepL 번역 기능 사용 예시 컴포넌트
 * 
 * 이 컴포넌트는 다음과 같은 사용법을 보여줍니다:
 * 1. 일반 텍스트 번역
 * 2. HTML 컨텐츠 번역
 * 3. translate 함수 직접 사용
 */
export function TranslationExample() {
  const { language, translate, t } = useLanguage();
  const [translatedText, setTranslatedText] = React.useState<string>("");
  const [isTranslating, setIsTranslating] = React.useState(false);

  // translate 함수 직접 사용 예시
  const handleTranslate = async () => {
    setIsTranslating(true);
    const result = await translate(
      "안녕하세요. 글로벌케이팝진흥원에 오신 것을 환영합니다.",
      { sourceLang: "ko" }
    );
    setTranslatedText(result);
    setIsTranslating(false);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          {t("intro")} - 번역 기능 예시
        </h1>
        
        {/* 언어 전환 버튼 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            언어 선택:
          </label>
          <LanguageSwitcher />
          <p className="mt-2 text-sm text-gray-500">
            현재 언어: {language}
          </p>
        </div>

        {/* 예시 1: 일반 텍스트 번역 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">예시 1: 일반 텍스트 번역</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600 mb-2">원문 (한국어):</p>
            <p className="mb-4">안녕하세요. 글로벌케이팝진흥원입니다.</p>
            
            <p className="text-sm text-gray-600 mb-2">번역 결과:</p>
            <TranslatedContent 
              content="안녕하세요. 글로벌케이팝진흥원입니다."
              className="font-medium"
            />
          </div>
        </section>

        {/* 예시 2: HTML 컨텐츠 번역 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">예시 2: HTML 컨텐츠 번역</h2>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600 mb-2">원문 (한국어):</p>
            <div className="mb-4" dangerouslySetInnerHTML={{ 
              __html: "<p><strong>글로벌케이팝진흥원</strong>은 K-POP 교육을 제공합니다.</p><ul><li>댄스 교육</li><li>보컬 교육</li><li>프로덕션 교육</li></ul>" 
            }} />
            
            <p className="text-sm text-gray-600 mb-2">번역 결과:</p>
            <TranslatedContent 
              content="<p><strong>글로벌케이팝진흥원</strong>은 K-POP 교육을 제공합니다.</p><ul><li>댄스 교육</li><li>보컬 교육</li><li>프로덕션 교육</li></ul>"
              isHtml={true}
              className="prose"
            />
          </div>
        </section>

        {/* 예시 3: translate 함수 직접 사용 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">예시 3: translate 함수 직접 사용</h2>
          <div className="bg-gray-50 p-4 rounded">
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isTranslating ? "번역 중..." : "번역 실행"}
            </button>
            
            {translatedText && (
              <div>
                <p className="text-sm text-gray-600 mb-2">번역 결과:</p>
                <p className="font-medium">{translatedText}</p>
              </div>
            )}
          </div>
        </section>

        {/* 예시 4: 공지사항/게시글 스타일 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">예시 4: 공지사항 스타일</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-2">
              <TranslatedContent 
                content="글로벌케이팝진흥원 신규 강의 오픈 안내"
              />
            </h3>
            <div className="text-sm text-gray-500 mb-4">
              {new Date().toLocaleDateString()}
            </div>
            <div className="prose">
              <TranslatedContent 
                content="<p>안녕하세요. 글로벌케이팝진흥원입니다.</p><p>새로운 K-POP 댄스 강의가 오픈되었습니다. 많은 관심 부탁드립니다.</p><p><strong>강의 내용:</strong></p><ul><li>기본 동작 연습</li><li>리듬감 향상</li><li>실전 루틴 연습</li></ul>"
                isHtml={true}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
