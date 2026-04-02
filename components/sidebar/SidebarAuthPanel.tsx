"use client";

import React, { useState, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import { useLanguage } from "../LanguageContext";
import { AutoT } from "../AutoT";
import { useAutoTranslate } from "../useAutoTranslate";
import { SignupModal } from "../SignupModal";

export const SidebarAuthPanel = memo(function SidebarAuthPanel() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouter();
  const { translate } = useLanguage();
  const studentIdPlaceholder = useAutoTranslate("아이디");
  const passwordPlaceholder = useAutoTranslate("비밀번호");

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
        const errorMsg = await translate(
          "이메일 또는 비밀번호가 올바르지 않습니다.",
        );
        alert(errorMsg);
      }
    } catch {
      const errorMsg = await translate("로그인 중 오류가 발생했습니다.");
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIntegratedLogin = async () => {
    setIsLoading(true);

    try {
      const success = await login("integrated", "integrated");
      if (success) {
        router.push("/");
      } else {
        const errorMsg = await translate(
          "이메일 또는 비밀번호가 올바르지 않습니다.",
        );
        alert(errorMsg);
      }
    } catch {
      const errorMsg = await translate("로그인 중 오류가 발생했습니다.");
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 sm:p-4">
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 sm:mb-3">
          <AutoT text="로그인" />
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-y-2 sm:gap-y-3"
          autoComplete="off"
        >
          <div className="w-full">
            <label
              htmlFor="sidebar-studentId"
              className="block text-[10px] sm:text-[11px] font-semibold text-gray-600 mb-1 sm:mb-1.5"
            >
              <AutoT text="아이디" />
            </label>
            <input
              id="sidebar-studentId"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full block px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border transition-all"
              placeholder={studentIdPlaceholder}
              autoComplete="username"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="sidebar-password"
              className="block text-[10px] sm:text-[11px] font-semibold text-gray-600 mb-1 sm:mb-1.5"
            >
              <AutoT text="비밀번호" />
            </label>
            <input
              id="sidebar-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full block px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 box-border transition-all"
              placeholder={passwordPlaceholder}
              autoComplete="current-password"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2 mt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full block py-1.5 sm:py-2 bg-red-600 text-white text-xs font-bold rounded-md hover:bg-red-700 transition-all duration-200 disabled:bg-red-300 disabled:cursor-not-allowed shadow-sm hover:shadow"
            >
              {isLoading ? (
                <AutoT text="로그인 중..." />
              ) : (
                <AutoT text="로그인" />
              )}
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
        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
        />
      </div>
    );
  }

  return (
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
  );
});
