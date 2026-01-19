"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "../../components/PageLayout";
import { AutoT } from "../../components/AutoT";
import { useLanguage } from "../../components/LanguageContext";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    schoolName: "",
    department: "",
    studentId: "",
    phone: "",
    userType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { translate } = useLanguage();

  const userTypes = [
    { value: "student", label: "학생" },
    { value: "teacher", label: "교사" },
    { value: "staff", label: "직원" },
    { value: "other", label: "기타" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 회원가입 로직 구현
      const successMsg = await translate("회원가입이 완료되었습니다.");
      alert(successMsg);
      router.push("/");
    } catch (err) {
      const errorMsg = await translate("회원가입 중 오류가 발생했습니다.");
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="w-full max-w-2xl flex flex-row items-start justify-center mx-auto my-12 md:my-20 px-2 sm:px-8 gap-8">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="회원가입" />
          </h1>
          <div className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8 border border-gray-100">
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
              {/* 이름 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="이름" /> <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* 이메일 주소(아이디) */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="이메일 주소(아이디)" /> <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="이메일 주소를 입력하세요"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* 학교명(기관명) */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="학교명(기관명)" /> <span className="text-red-500">*</span>
                </label>
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="학교명 또는 기관명을 입력하세요"
                  value={formData.schoolName}
                  onChange={handleChange}
                />
              </div>

              {/* 학과 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="학과" />
                </label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="학과를 입력하세요"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              {/* 학번 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="학번" />
                </label>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="학번을 입력하세요"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="전화번호" /> <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* 사용자 유형 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="사용자 유형" /> <span className="text-red-500">*</span>
                </label>
                <select
                  id="userType"
                  name="userType"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="">사용자 유형을 선택하세요</option>
                  {userTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 버튼 영역 */}
              <div className="flex flex-col gap-2 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded transition-all active:scale-[0.98] disabled:bg-blue-300"
                >
                  {isLoading ? <AutoT text="가입 중..." /> : <AutoT text="회원가입" />}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="w-full py-2.5 bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold rounded transition-all active:scale-[0.98]"
                >
                  <AutoT text="취소" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
