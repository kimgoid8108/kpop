"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AutoT } from "./AutoT";
import { useLanguage } from "./LanguageContext";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NATIONALITIES = [
  "대한민국",
  "일본",
  "중국",
  "대만",
  "홍콩",
  "베트남",
  "태국",
  "인도네시아",
  "말레이시아",
  "필리핀",
  "몽골",
  "미얀마",
  "라오스",
  "캄보디아",
  "카자흐스탄",
  "우즈베키스탄",
  "키르기스스탄",
  "타지키스탄",
  "투르크메니스탄",
  "인도",
  "파키스탄",
  "방글라데시",
  "네팔",
  "사우디아라비아",
  "이스라엘",
  "이란",
  "아프가니스탄",
  "이라크",
  "터키",
  "미국",
  "프랑스",
  "독일",
  "스페인",
  "이탈리아",
  "브라질",
  "포르투갈",
  "러시아",
  "우크라이나",
  "폴란드",
  "네덜란드",
  "스웨덴",
  "노르웨이",
  "덴마크",
  "핀란드",
  "그리스",
  "체코",
  "헝가리",
  "루마니아",
  "불가리아",
  "세르비아",
  "크로아티아",
  "슬로바키아",
  "슬로베니아",
  "리투아니아",
  "라트비아",
  "에스토니아",
  "케냐",
  "남아프리카공화국",
  "나이지리아",
  "소말리아",
  "에티오피아",
  "바티칸",
];

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
    schoolName: "",
    phone: "",
    birth: "",
    nationality: "",
    referral: "",
    referralOther: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { translate } = useLanguage();

  // 사용자 유형(학생, 일반)
  const userTypes = [
    { value: "student", label: "학생" },
    { value: "general", label: "일반" },
    { value: "general", label: "강사" },
  ];

  // 유입경로(SNS, 지인소개, 기타)
  const referralOptions = [
    { value: "SNS", label: "SNS" },
    { value: "acquaintance", label: "지인소개" },
    { value: "other", label: "기타" },
  ];

  // ESC 키로 모달 닫기 및 body 스크롤 방지
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
      window.addEventListener("keydown", handleEscape);

      return () => {
        window.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = "";
      };
    }
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // If referral changes to something other than "other", reset referralOther
      if (name === "referral") {
        return {
          ...prev,
          referral: value,
          referralOther: value === "other" ? prev.referralOther : "",
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 회원가입 로직 구현
      const successMsg = await translate("회원가입이 완료되었습니다.");
      alert(successMsg);
      onClose();
      setFormData({
        email: "",
        password: "",
        userType: "",
        schoolName: "",
        phone: "",
        birth: "",
        nationality: "",
        referral: "",
        referralOther: "",
      });
      router.push("/");
    } catch (err) {
      const errorMsg = await translate("회원가입 중 오류가 발생했습니다.");
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      email: "",
      password: "",
      userType: "",
      schoolName: "",
      phone: "",
      birth: "",
      nationality: "",
      referral: "",
      referralOther: "",
    });
    onClose();
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <>
      {/* 배경 딤 처리 */}
      <div
        className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* 모달 컨텐츠 */}
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide relative z-[10000]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-gray-900">
              <AutoT text="회원가입" />
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="닫기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>

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

              {/* 비밀번호 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="비밀번호" /> <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
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

              {/* 학교명(기관명) */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="학교명/기관명" />
                </label>
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="학교명 또는 기관명을 입력하세요"
                  value={formData.schoolName}
                  onChange={handleChange}
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="전화번호" />
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* 생년월일 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="생년월일" />
                </label>
                <input
                  id="birth"
                  name="birth"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="생년월일을 입력하세요"
                  value={formData.birth}
                  onChange={handleChange}
                />
              </div>

              {/* 국적 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="국적" /> <span className="text-xs text-gray-500">(예: 대한민국)</span>
                </label>
                <select
                  id="nationality"
                  name="nationality"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                  value={formData.nationality}
                  onChange={handleChange}
                >
                  <option value="">국적을 선택하세요</option>
                  {NATIONALITIES.map((nation) => (
                    <option key={nation} value={nation}>
                      {nation}
                    </option>
                  ))}
                </select>
              </div>

              {/* 유입경로 */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  <AutoT text="유입경로" />
                </label>
                <select
                  id="referral"
                  name="referral"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                  value={formData.referral}
                  onChange={handleChange}
                >
                  <option value="">유입경로를 선택하세요</option>
                  {referralOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formData.referral === "other" && (
                  <input
                    id="referralOther"
                    name="referralOther"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mt-2 focus:ring-1 focus:ring-blue-500 outline-none"
                    placeholder="기타 유입경로를 입력하세요"
                    value={formData.referralOther}
                    onChange={handleChange}
                  />
                )}
              </div>

              {/* 버튼 영역 */}
              <div className="flex flex-col gap-2 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-md transition-all active:scale-[0.98] disabled:bg-blue-300"
                >
                  {isLoading ? <AutoT text="가입 중..." /> : <AutoT text="회원가입" />}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 bg-gray-500 hover:bg-gray-600 text-white text-sm font-bold rounded-md transition-all active:scale-[0.98]"
                >
                  <AutoT text="취소" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
