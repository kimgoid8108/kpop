"use client";

import React, { useState, useRef, useEffect, memo, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../src/GKI.png";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguageContext";

// ----- submenuData: 네비게이션 메뉴와 하위 서브메뉴 정보 -----
export const submenuData = [
  {
    label: "진흥원",
    path: "/intro/greeting",
    submenu: [
      { label: "인사말", path: "/intro/greeting" },
      { label: "진흥원 소개", path: "/intro/about" },
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
      <Link href="/" tabIndex={-1}>
        <img
          src={logo?.src || "/fallback.png"}
          alt="로고"
          className="w-32 h-16 md:w-48 md:h-24 lg:w-50 lg:h-25"
          style={{ objectFit: "contain" }}
          loading="lazy"
          draggable={false}
        />
      </Link>
    </div>
  );
});

// ----- NavBar 컴포넌트 -----
export const NavBar = memo(function NavBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<number | null>(
    null
  );
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();

  // 메뉴 라벨과 번역 키 매핑
  const menuTranslationMap: Record<string, string> = {
    진흥원: "intro",
    교육과정: "courses",
    "취득 자격증": "certificates",
    강의실: "classroom",
    커뮤니티: "community",
  };

  const submenuTranslationMap: Record<string, string> = {
    // 진흥원 서브메뉴
    인사말: "greeting",
    "진흥원 소개": "intro.about",
    활동현황: "activities",
    유관협력기관: "partners",
    // 교육과정 서브메뉴
    과정구성: "structure",
    "강사진 소개": "instructors",
    "교육 특성": "features",
    학습가이드: "guide",
    // 취득 자격증 서브메뉴
    "자격증 소개": "cert.about",
    "관련자격증 및 활동": "related",
    // 강의실 서브메뉴
    강의리스트: "class.list",
    진도관리: "progress",
    "시험/과제": "exam",
    "수강생 관리": "students",
    // 커뮤니티 서브메뉴
    공지사항: "notice",
    강의후기: "reviews",
    문의: "inquiry",
    "약관 정책": "policy",
  };

  // 언어에 따라 번역된 메뉴 데이터 생성
  const translatedMenuData = useMemo(() => {
    return submenuData.map((menu) => ({
      ...menu,
      label: t(menuTranslationMap[menu.label] || menu.label),
      submenu: menu.submenu.map((item) => ({
        ...item,
        label: t(submenuTranslationMap[item.label] || item.label),
      })),
    }));
  }, [language, t]);

  // 로그인 상태에 따라 메뉴 필터링 (강의실 메뉴는 로그인 시에만 표시)
  const filteredMenuData = useMemo(() => {
    return translatedMenuData.filter(
      (menu) => menu.path !== "/classroom/list" || isAuthenticated
    );
  }, [translatedMenuData, isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleLanguage = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileSubmenuOpen(null);
  };

  const toggleMobileSubmenu = (index: number) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index);
  };

  // 외부 클릭시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("[data-mobile-menu-button]")
      ) {
        setMobileMenuOpen(false);
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
      className="w-full border-b border-gray-200 bg-white sticky top-0"
      style={{
        boxShadow: "0 2px 6px 0 rgba(0,0,0,0.04)",
        maxWidth: "100%",
        zIndex: 10000,
        overflow: "visible",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-2 md:px-5 py-1"
        style={{ position: "relative", overflow: "visible" }}
      >
        <LogoArea />
        {/* 모바일 햄버거 버튼 */}
        <button
          data-mobile-menu-button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 text-gray-700 hover:text-blue-700 focus:outline-none"
          aria-label="메뉴"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-all ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
        {/* 데스크톱 메뉴 */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{ overflow: "visible" }}
        >
          <nav
            className="flex items-center gap-0.5 md:gap-1"
            aria-label="주메뉴"
            style={{ overflow: "visible" }}
          >
            {filteredMenuData.map((menu, idx) => {
              // 원본 배열에서의 인덱스 찾기 (서브메뉴 열림 상태 관리용)
              const originalIdx = translatedMenuData.findIndex(
                (m) => m.path === menu.path
              );
              return (
                <div
                  key={menu.label + menu.path}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(originalIdx)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* 메인 메뉴 */}
                  <Link
                    href={menu.path}
                    className={`text-xs md:text-sm lg:text-base font-semibold px-2 md:px-3 lg:px-5 py-2 rounded transition-colors
                  ${
                    openIndex === originalIdx
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
                    aria-expanded={openIndex === originalIdx}
                  >
                    {menu.label}
                  </Link>

                  {/* 서브메뉴 */}
                  {openIndex === originalIdx && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded shadow-xl min-w-[176px]"
                      style={{
                        minWidth: 180,
                        zIndex: 10001,
                        position: "absolute",
                        top: "100%",
                      }}
                      role="menu"
                    >
                      <div className="py-2 px-1 flex flex-col items-stretch">
                        {Array.isArray(menu.submenu) &&
                          menu.submenu.map((item, idx2) => (
                            <Link
                              key={item.path + idx2}
                              href={item.path}
                              className="px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-800 rounded transition-colors text-sm md:text-base whitespace-nowrap"
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
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          {/* 언어 전환 버튼 */}
          <button
            onClick={toggleLanguage}
            className="text-xs md:text-sm lg:text-base font-semibold px-2 md:px-3 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors border border-gray-300 hover:border-blue-300"
            title={language === "ko" ? "Switch to English" : "한국어로 전환"}
          >
            {language === "ko" ? "EN" : "KO"}
          </button>
          {isAuthenticated ? (
            <>
              <Link
                href="/mypage"
                className="text-xs md:text-sm lg:text-base font-semibold px-3 md:px-4 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
              >
                {t("mypage")}
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs md:text-sm lg:text-base font-semibold px-3 md:px-4 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-xs md:text-sm lg:text-base font-semibold px-3 md:px-4 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            >
              {t("login")}
            </Link>
          )}
        </div>
      </div>
      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
          style={{ zIndex: 10001 }}
        >
          <nav className="flex flex-col py-2">
            {filteredMenuData.map((menu, idx) => {
              const hasSubmenu =
                Array.isArray(menu.submenu) && menu.submenu.length > 0;
              return (
                <div key={menu.path + idx} className="border-b border-gray-100">
                  {hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu(idx)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left text-base font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        <span>{menu.label}</span>
                        <span
                          className={`transform transition-transform ${
                            mobileSubmenuOpen === idx ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      {mobileSubmenuOpen === idx && (
                        <div className="bg-gray-50">
                          {menu.submenu.map((item, idx2) => (
                            <Link
                              key={item.path + idx2}
                              href={item.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-8 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={menu.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      {menu.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
});
