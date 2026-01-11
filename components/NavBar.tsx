"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import logo from "../src/GKI.png";

// ----- submenuData: 네비게이션 메뉴와 하위 서브메뉴 정보 -----
export const submenuData = [
  {
    label: "진흥원",
    path: "/intro/greeting",
    submenu: [
      { label: "인사말", path: "/intro/greeting" },
      { label: "진흥원 소개", path: "/intro/greeting" },
      { label: "활동현황", path: "/intro/activities" },
      { label: "유관협력기관", path: "/intro/partners" },
    ],
  },
  {
    label: "교육과정",
    path: "/courses/structure",
    submenu: [
      { label: "과정구성", path: "/courses/structure" },
      { label: "강사진 소개", path: "/courses/instructors" },
      { label: "교육 특성", path: "/courses/features" },
      { label: "학습가이드", path: "/courses/guide" },
    ],
  },
  {
    label: "취득 자격증",
    path: "/certificates/about",
    submenu: [
      { label: "자격증 소개", path: "/certificates/about" },
      { label: "관련자격증 및 활동", path: "/certificates/related" },
    ],
  },
  {
    label: "강의실",
    path: "/classroom/list",
    submenu: [
      { label: "강의리스트", path: "/classroom/list" },
      { label: "진도관리", path: "/classroom/progress" },
      { label: "자막기능", path: "/classroom/captions" },
      { label: "시험/과제", path: "/classroom/exam" },
      { label: "수강생 관리", path: "/classroom/students" },
    ],
  },
  {
    label: "커뮤니티",
    path: "/community/notice",
    submenu: [
      { label: "공지사항", path: "/community/notice" },
      { label: "강의후기", path: "/community/reviews" },
      { label: "문의", path: "/community/inquiry" },
      { label: "약관 정책", path: "/community/policy" },
    ],
  },
];

// ----- LogoArea 컴포넌트 -----
const LogoArea = memo(function LogoArea() {
  return (
    <div className="flex justify-start">
      <a href="#" tabIndex={-1}>
        <img
          src={logo?.src || "/fallback.png"}
          alt="로고"
          style={{ width: 200, height: 100, objectFit: "contain" }}
          loading="lazy"
          draggable={false}
        />
      </a>
    </div>
  );
});

// ----- NavBar 컴포넌트 -----
export const NavBar = memo(function NavBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 외부 클릭시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // 지연된 닫기 함수
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenIndex(null);
    }, 200);
  };

  // 마우스 진입시 타이머 취소
  const handleMouseEnter = (idx: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenIndex(idx);
  };

  return (
    <div
      ref={navRef}
      className="w-full border-b border-gray-200 bg-white z-30"
      style={{
        boxShadow: "0 2px 6px 0 rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-5 py-1"
        style={{ position: "relative" }}
      >
        <LogoArea />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <nav className="flex items-center gap-1" aria-label="주메뉴">
            {submenuData.map((menu, idx) => (
              <div
                key={menu.label}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                {/* 메인 메뉴 */}
                <Link
                  href={menu.path}
                  className={`text-base font-semibold px-5 py-2 rounded transition-colors
                  ${
                    openIndex === idx
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                  style={{
                    outline: "none",
                    border: "none",
                    background: "none",
                    display: "inline-block",
                  }}
                  aria-haspopup="true"
                  aria-expanded={openIndex === idx}
                >
                  {menu.label}
                </Link>

                {/* 서브메뉴 */}
                {openIndex === idx && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded shadow-xl min-w-[176px] z-40"
                    style={{ minWidth: 180 }}
                    role="menu"
                  >
                    <div className="py-2 px-1 flex flex-col items-stretch">
                      {menu.submenu.map((item) => (
                        <Link
                          key={item.label}
                          href={item.path}
                          className="px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-800 rounded transition-colors text-base whitespace-nowrap"
                          style={{ fontWeight: 500 }}
                          role="menuitem"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div style={{ width: 48 }}></div>
      </div>
    </div>
  );
});
