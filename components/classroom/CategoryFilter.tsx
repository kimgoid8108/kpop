"use client";

import React from "react";
import { AutoT } from "../../components/AutoT";

type SortOption = "latest" | "popular" | "name";

interface CategoryFilterProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export function CategoryFilter({
  sortOption,
  onSortChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
      <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
        <AutoT text="과목별" />
      </span>
      <button
        onClick={() => onSortChange("latest")}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
          sortOption === "latest"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <AutoT text="전체" />
      </button>
      <button
        onClick={() => onSortChange("popular")}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
          sortOption === "popular"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <AutoT text="댄스" />
      </button>
      <button
        onClick={() => onSortChange("name")}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
          sortOption === "name"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <AutoT text="음악" />
      </button>
    </div>
  );
}
