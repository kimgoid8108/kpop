"use client";

import React, { useState, useEffect } from "react";
import { categories } from "../../lib/certificates";
import { useAutoTranslate } from "../useAutoTranslate";

interface CertificateFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  selectedLevel: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
}

/**
 * 자격증 필터 컴포넌트
 */
export function CertificateFilters({
  searchQuery,
  selectedCategory,
  selectedLevel,
  onSearchChange,
  onCategoryChange,
  onLevelChange,
}: CertificateFiltersProps) {
  const searchPlaceholder = useAutoTranslate("자격증명 또는 발급기관으로 검색...");
  const allCategory = useAutoTranslate("전체 카테고리");
  const allLevel = useAutoTranslate("전체 등급");
  const level1 = useAutoTranslate("1급");
  const level2 = useAutoTranslate("2급");

  return (
    <div className="mb-6 space-y-4">
      {/* 검색바 */}
      <div className="w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          placeholder={searchPlaceholder}
        />
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap gap-3">
        {/* 카테고리 필터 */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base bg-white"
        >
          <option value="all">{allCategory}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* 등급 필터 */}
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base bg-white"
        >
          <option value="all">{allLevel}</option>
          <option value="1급">{level1}</option>
          <option value="2급">{level2}</option>
        </select>
      </div>
    </div>
  );
}
