"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { AutoT } from "./AutoT";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * 공통 페이지 레이아웃 컴포넌트
 * Sidebar와 Footer를 포함하는 모든 페이지에서 사용
 */
export function PageLayout({ children }: PageLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ESC 키로 모바일 메뉴 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // 모바일 메뉴 열림 시 body 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div
      className="min-h-screen bg-white w-full max-w-full overflow-x-hidden"
      style={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* 데스크탑 사이드바 (md 이상에서만 표시) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col min-w-0 w-full overflow-x-hidden md:ml-64 md:w-[calc(100%-16rem)]">
        {/* 모바일 헤더 (md 미만에서만 표시) */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="메뉴 열기"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate px-2 flex-1 text-center">
              <AutoT text="글로벌케이팝 진흥원" />
            </div>
            <div className="w-9 sm:w-10 flex-shrink-0" /> {/* 중앙 정렬을 위한 공간 */}
          </div>
        </header>

        {/* 모바일 사이드바 Drawer */}
        {isMobileMenuOpen && (
          <>
            {/* 배경 딤 처리 */}
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            {/* 사이드바 Drawer */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 border-r border-gray-300 shadow-xl md:hidden overflow-y-auto scrollbar-hide">
              <div className="p-4">
                {/* 닫기 버튼 */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label="메뉴 닫기"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* 사이드바 내용 */}
                <Sidebar />
              </div>
            </div>
          </>
        )}

        {/* 메인 콘텐츠 */}
        <main
          className="flex-1 flex flex-col justify-stretch p-0 m-0 md:pt-0 pt-12 sm:pt-14 w-full max-w-full overflow-x-hidden overflow-y-auto scrollbar-hide"
          style={{
            width: "100%",
            maxWidth: "100%",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
