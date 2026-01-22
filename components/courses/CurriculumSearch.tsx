"use client";

import React from "react";
import { useAutoTranslate } from "../../components/useAutoTranslate";

interface CurriculumSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CurriculumSearch({
  searchQuery,
  onSearchChange,
}: CurriculumSearchProps) {
  const placeholder = useAutoTranslate("커리큘럼 검색...");

  return (
    <div className="mb-4 sm:mb-6">
      <div className="relative max-w-md mx-auto sm:mx-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
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
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>
    </div>
  );
}
