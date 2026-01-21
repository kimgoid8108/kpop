"use client";

import React, { useState, memo, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguageContext";
import { AutoT } from "./AutoT";
import { useAutoTranslate } from "./useAutoTranslate";
import { SignupModal } from "./SignupModal";

// ----- 메뉴 아이콘 컴포넌트 -----
const MenuIcon = ({ name, className = "w-4 h-4" }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactElement> = {
    소개: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    "자격증 안내": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    "교육과정 소개": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    "온라인 교육(LMS)": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    기타: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ----- submenuData: 네비게이션 메뉴와 하위 서브메뉴 정보 -----
export const submenuData = [
  {
    label: "소개",
    path: "/intro/greeting",
    submenu: [
      { label: "인사말", path: "/intro/greeting" },
      { label: "진흥원 소개", path: "/intro/about" },
      { label: "협약기관&파트너", path: "/intro/partners" },
      { label: "오프라인센터", path: "/intro/offline-center" },
      { label: "활동현황", path: "/intro/activities" },
    ],
  },
  {
    label: "자격증 안내",
    path: "/certificates",
    submenu: [
      { label: "종류 안내", path: "/certificates" },
      { label: "발급 조건", path: "/certificates/related" },
      { label: "샘플 이미지", path: "/certificates/samples" },
      { label: "FAQ", path: "/certificates/faq" },
    ],
  },
  {
    label: "교육과정 소개",
    path: "/courses/structure",
    submenu: [
      { label: "커리큘럼", path: "/courses/structure" },
      { label: "강사진", path: "/courses/instructors" },
      { label: "신청 및 후기", path: "/courses/features" },
    ],
  },
  {
    label: "온라인 교육(LMS)",
    path: "/classroom/list",
    submenu: [
      { label: "강의리스트", path: "/classroom/list" },
      { label: "나의 학습실", path: "/classroom/progress" },
      { label: "시험/과제", path: "/classroom/exam" },
    ],
  },
  {
    label: "기타",
    path: "/community/notice",
    submenu: [
      { label: "문의", path: "/community/inquiry" },
      { label: "뉴스레터", path: "/community/newsletter" },
    ],
  },
];

// ----- Sidebar 컴포넌트 -----
export const Sidebar = memo(function Sidebar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouter();
  const { language, setLanguage, translate } = useLanguage();

  // placeholder 및 aria-label용 번역
  const searchPlaceholder = useAutoTranslate("검색");
  const searchAriaLabel = useAutoTranslate("검색");
  const studentIdPlaceholder = useAutoTranslate("아이디");
  const passwordPlaceholder = useAutoTranslate("비밀번호");

  // 메뉴 데이터는 원문 그대로 사용 (AutoT로 감싸서 표시)
  const filteredMenuData = useMemo(() => {
    return submenuData;
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(studentId, password);
      if (success) {
        setStudentId("");
        setPassword("");
        router.push("/");
      } else {
        const errorMsg = await translate("이메일 또는 비밀번호가 올바르지 않습니다.");
        alert(errorMsg);
      }
    } catch (err) {
      const errorMsg = await translate("로그인 중 오류가 발생했습니다.");
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntegratedLogin = async () => {
    setIsLoading(true);

    try {
      // 통합로그인 로직 (예시)
      const success = await login("integrated", "integrated");
      if (success) {
        router.push("/");
      } else {
        const errorMsg = await translate("이메일 또는 비밀번호가 올바르지 않습니다.");
        alert(errorMsg);
      }
    } catch (err) {
      const errorMsg = await translate("로그인 중 오류가 발생했습니다.");
      alert(errorMsg);
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
    <div className="w-64 bg-gray-50 border-r border-gray-300 h-screen fixed top-0 left-0 overflow-y-auto flex flex-col shadow-sm scrollbar-hide max-w-full z-30">
      <div className="p-3 sm:p-4 space-y-4 sm:space-y-5">
        {/* 로고 - 박스 없이 사진만, 클릭 시 메인 페이지(루트)로 이동 */}
        <Link href="/" className="flex items-center justify-center hover:opacity-80 transition-opacity w-full">
          <Image
            src="/global_Logo.png"
            alt="글로벌케이팝 진흥원 로고"
            width={200}
            height={80}
            className="object-contain w-full max-w-[180px] sm:max-w-[200px] h-auto"
            priority
          />
        </Link>

        {/* 언어 선택 */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-2.5 sm:p-3">
          <label htmlFor="language-select" className="block text-xs font-semibold text-gray-600 mb-1.5 sm:mb-2 uppercase tracking-wide">
            <AutoT text="언어 선택" />
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as "ko" | "en" | "vi")}
            className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all cursor-pointer"
          >
            <option value="ko">한국어</option>
            <option value="en">ENGLISH</option>
            <option value="vi">TIẾNG VIỆT</option>
          </select>
        </div>

        {/* 메뉴 항목들 */}
        <nav className="space-y-1.5 sm:space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 sm:px-3 py-1.5 sm:py-2 mb-1">
            <AutoT text="전체 메뉴" />
          </div>
          {filteredMenuData.map((menu, idx) => {
            const hasSubmenu =
              Array.isArray(menu.submenu) && menu.submenu.length > 0;
            const isOpen = openIndex === idx;

            return (
              <div
                key={menu.path + idx}
                className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow transition-shadow overflow-hidden"
              >
                {hasSubmenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(idx)}
                      className="w-full flex items-center justify-between px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                        <span className="text-blue-600 flex-shrink-0">
                          <MenuIcon name={menu.label} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </span>
                        <span className="truncate text-xs sm:text-sm"><AutoT text={menu.label} /></span>
                      </div>
                      <span
                        className={`transform transition-transform duration-200 text-gray-400 flex-shrink-0 ml-2 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                        aria-hidden="true"
                      >
                        ▶
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-gray-200 bg-gray-50">
                        {menu.submenu
                          .filter((item) => {
                            // "온라인 교육(LMS)" 메뉴의 경우, 로그인하지 않았을 때는 "강의리스트"만 표시
                            if (menu.label === "온라인 교육(LMS)" && !isAuthenticated) {
                              return item.path === "/classroom/list";
                            }
                            return true;
                          })
                          .map((item, idx2) => (
                            <Link
                              key={item.path + idx2}
                              href={item.path}
                              className="block pl-5 sm:pl-6 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors border-b border-gray-100 last:border-b-0 leading-relaxed break-words"
                            >
                              <AutoT text={item.label} />
                            </Link>
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={menu.path}
                    className="block px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-blue-600 flex-shrink-0">
                        <MenuIcon name={menu.label} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                      <span className="truncate text-xs sm:text-sm"><AutoT text={menu.label} /></span>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* 검색 바 */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-2.5 sm:p-3">
          <form onSubmit={handleSearch} className="relative" autoComplete="off">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-8 sm:pr-10 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 sm:p-4">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 sm:mb-3">
              <AutoT text="로그인" />
            </div>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-y-2 sm:gap-y-3"
              autoComplete="off"
            >
              {/* 아이디 입력 */}
              <div className="w-full">
                <label
                  htmlFor="studentId"
                  className="block text-[10px] sm:text-[11px] font-semibold text-gray-600 mb-1 sm:mb-1.5"
                >
                  <AutoT text="아이디" />
                </label>
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full block px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border transition-all"
                  placeholder={studentIdPlaceholder}
                  autoComplete="username"
                />
              </div>
              {/* 비밀번호 입력 */}
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block text-[10px] sm:text-[11px] font-semibold text-gray-600 mb-1 sm:mb-1.5"
                >
                  <AutoT text="비밀번호" />
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full block px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border transition-all"
                  placeholder={passwordPlaceholder}
                  autoComplete="current-password"
                />
              </div>
              {/* 버튼들: 모두 w-full로 세로 배치 */}
              <div className="flex flex-col gap-1.5 sm:gap-2 mt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full block py-1.5 sm:py-2 bg-red-600 text-white text-xs font-bold rounded-md hover:bg-red-700 transition-all duration-200 disabled:bg-red-300 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                  {isLoading ? <AutoT text="로그인 중..." /> : <AutoT text="로그인" />}
                </button>
                <button
                  type="button"
                  onClick={handleIntegratedLogin}
                  disabled={isLoading}
                  className="w-full block py-1.5 sm:py-2 bg-blue-600 text-white text-xs font-bold rounded-md hover:bg-blue-700 transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-sm hover:shadow"
                >
                  <AutoT text="통합로그인" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignupModalOpen(true)}
                  className="w-full block py-1.5 sm:py-2 bg-gray-600 text-white text-xs font-bold rounded-md hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <AutoT text="회원가입" />
                </button>
              </div>
            </form>
            <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 space-y-2">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              <AutoT text="회원 메뉴" />
            </div>
            <Link
              href="/mypage"
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors text-center border border-gray-200 hover:border-blue-300"
            >
              <AutoT text="마이페이지" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors border border-gray-200 hover:border-red-300"
            >
              <AutoT text="로그아웃" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
