"use client";

import React from "react";
import { useLanguage, type Language } from "../LanguageContext";
import { AutoT } from "../AutoT";
import { useAutoTranslate } from "../useAutoTranslate";

export function SidebarLanguageSelect() {
  const { language, setLanguage } = useLanguage();
  const labelKo = useAutoTranslate("한국어");

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-2.5 sm:p-3">
      <label
        htmlFor="language-select"
        className="block text-xs font-semibold text-gray-600 mb-1.5 sm:mb-2 uppercase tracking-wide"
      >
        <AutoT text="언어 선택" />
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 transition-all cursor-pointer"
      >
        <option value="ko">{labelKo}</option>
        <option value="en">ENGLISH</option>
        <option value="vi">TIẾNG VIỆT</option>
      </select>
    </div>
  );
}
