"use client";

import React, { useState, memo, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguageContext";
import { AutoT } from "./AutoT";
import { useAutoTranslate } from "./useAutoTranslate";

// ----- submenuData: 네비게이션 메뉴와 하위 서브메뉴 정보 -----
export const submenuData = [
  {
    label: "소개",
    path: "/intro/greeting",
    submenu: [
      { label: "인사말", path: "/intro/greeting" },
      { label: "진흥원 소개", path: "/intro/about" },
      { label: "활동현황", path: "/intro/activities" },
      { label: "유관협력기관", path: "/intro/partners" },
    ],
  },
  {
    label: "자격증 안내",
    path: "/certificates/about",
    submenu: [
      { label: "자격증 소개", path: "/certificates/about" },
      { label: "관련자격증 및 활동", path: "/certificates/related" },
    ],
  },
  {
    label: "교육과정 소개",
    path: "/courses/structure",
    submenu: [
      { label: "과정구성", path: "/courses/structure" },
      { label: "강사진 소개", path: "/courses/instructors" },
      { label: "교육 특성", path: "/courses/features" },
      { label: "학습가이드", path: "/courses/guide" },
    ],
  },
  {
    label: "온라인 교육",
    path: "/classroom/list",
    submenu: [
      { label: "강의리스트", path: "/classroom/list" },
      { label: "진도관리", path: "/classroom/progress" },
      { label: "시험/과제", path: "/classroom/exam" },
      { label: "수강생 관리", path: "/classroom/students" },
    ],
  },
  {
    label: "기타",
    path: "/community/notice",
    submenu: [
      { label: "공지사항", path: "/community/notice" },
      { label: "강의후기", path: "/community/reviews" },
      { label: "문의", path: "/community/inquiry" },
      { label: "약관 정책", path: "/community/policy" },
    ],
  },
];

// ----- Sidebar 컴포넌트 -----
export const Sidebar = memo(function Sidebar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouter();
  const { language, setLanguage, translate } = useLanguage();

  // placeholder 및 aria-label용 번역
  const searchPlaceholder = useAutoTranslate("검색");
  const searchAriaLabel = useAutoTranslate("검색");
  const studentIdPlaceholder = useAutoTranslate("학번");
  const passwordPlaceholder = useAutoTranslate("비밀번호");

  // 메뉴 데이터는 원문 그대로 사용 (AutoT로 감싸서 표시)
  const filteredMenuData = useMemo(() => {
    return submenuData.filter(
      (menu) => menu.path !== "/classroom/list" || isAuthenticated
    );
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      const success = await login(studentId, password);
      if (success) {
        setStudentId("");
        setPassword("");
        router.push("/");
      } else {
        const errorMsg = await translate("이메일 또는 비밀번호가 올바르지 않습니다.");
        setLoginError(errorMsg);
      }
    } catch (err) {
      const errorMsg = await translate("로그인 중 오류가 발생했습니다.");
      setLoginError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntegratedLogin = async () => {
    setLoginError("");
    setIsLoading(true);

    try {
      // 통합로그인 로직 (예시)
      const success = await login("integrated", "integrated");
      if (success) {
        router.push("/");
      } else {
        const errorMsg = await translate("이메일 또는 비밀번호가 올바르지 않습니다.");
        setLoginError(errorMsg);
      }
    } catch (err) {
      const errorMsg = await translate("로그인 중 오류가 발생했습니다.");
      setLoginError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색 로직 구현
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-300 h-screen sticky top-0 overflow-y-auto flex flex-col shadow-sm">
      <div className="p-4 space-y-5">
        {/* 언어 선택 */}
        <div className="bg-white border border-gray-300 rounded p-3">
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            <AutoT text="언어 선택" />
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLanguage("ko")}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                language === "ko"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              한국어
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                language === "en"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ENGLISH
            </button>
            <button
              type="button"
              onClick={() => setLanguage("vi")}
              className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                language === "vi"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              TIẾNG VIỆT
            </button>
          </div>
        </div>

        {/* 메뉴 항목들 */}
        <nav className="space-y-0.5">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 mb-2">
            <AutoT text="전체 메뉴" />
          </div>
          {filteredMenuData.map((menu, idx) => {
            const hasSubmenu =
              Array.isArray(menu.submenu) && menu.submenu.length > 0;
            const isOpen = openIndex === idx;

            return (
              <div key={menu.path + idx} className="bg-white border border-gray-200 rounded">
                {hasSubmenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(idx)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                    >
                      <span><AutoT text={menu.label} /></span>
                      <span
                        className={`transform transition-transform text-gray-400 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                        aria-hidden="true"
                      >
                        ▶
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-gray-200 bg-gray-50">
                        {menu.submenu.map((item, idx2) => (
                          <Link
                            key={item.path + idx2}
                            href={item.path}
                            className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <AutoT text={item.label} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={menu.path}
                    className="block px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <AutoT text={menu.label} />
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* 검색 바 */}
        <div className="bg-white border border-gray-300 rounded p-3">
          <form onSubmit={handleSearch} className="relative" autoComplete="off">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
              aria-label={searchAriaLabel}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* 로그인 폼 */}
        {!isAuthenticated ? (
          <div className="bg-white border border-gray-300 rounded p-4 space-y-3">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              <AutoT text="로그인" />
            </div>
            <form onSubmit={handleLogin} className="space-y-3" autoComplete="off">
              <div>
                <label
                  htmlFor="studentId"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  <AutoT text="학번" />
                </label>
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={studentIdPlaceholder}
                  autoComplete="username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  <AutoT text="비밀번호" />
                </label>
                <div className="flex gap-2">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={passwordPlaceholder}
                    autoComplete="current-password"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isLoading ? (
                      <AutoT text="로그인 중..." />
                    ) : (
                      <AutoT text="로그인" />
                    )}
                  </button>
                </div>
              </div>
              {loginError && (
                <div className="text-red-600 text-xs bg-red-50 p-2 rounded" aria-live="assertive">
                  {loginError}
                </div>
              )}
              <button
                type="button"
                onClick={handleIntegratedLogin}
                disabled={isLoading}
                className="w-full px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <AutoT text="통합로그인" />
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 rounded p-4 space-y-2">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              <AutoT text="회원 메뉴" />
            </div>
            <Link
              href="/mypage"
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors text-center border border-gray-200"
            >
              <AutoT text="마이페이지" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded transition-colors border border-gray-200"
            >
              <AutoT text="로그아웃" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
