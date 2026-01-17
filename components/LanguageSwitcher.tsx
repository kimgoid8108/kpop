"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage("ko")}
        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
          language === "ko"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
          language === "en"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        ENGLISH
      </button>
      <button
        onClick={() => setLanguage("vi")}
        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
          language === "vi"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        TIẾNG VIỆT
      </button>
    </div>
  );
}
