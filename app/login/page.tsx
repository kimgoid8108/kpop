"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthContext";
import { useLanguage } from "../../components/LanguageContext";
import { AutoT } from "../../components/AutoT";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { translate } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
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

  return (
    // 최상위 컨테이너: 너비가 삐져나가지 않게 px-4(여백)와 w-full을 적절히 사용
    <div className="flex flex-col w-full bg-white p-4 shadow-sm border border-gray-100 rounded-lg">
      <div className="w-full">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          <AutoT text="로그인" />
        </h2>

        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          {/* 입력 영역 */}
          <div className="flex flex-col gap-y-2">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                <AutoT text="아이디" />
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="아이디"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                <AutoT text="비밀번호" />
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* 버튼 영역: flex-col로 수직 정렬 고정, 삐져나감 방지 */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded transition-all active:scale-[0.98] disabled:bg-red-300"
            >
              {isLoading ? <AutoT text="로그인 중..." /> : <AutoT text="로그인" />}
            </button>

            <button
              type="button"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded transition-all active:scale-[0.98]"
            >
              <AutoT text="통합로그인" />
            </button>

            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="w-full py-2.5 bg-gray-600 hover:bg-gray-700 text-white text-sm font-bold rounded transition-all active:scale-[0.98]"
            >
              <AutoT text="회원가입" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
