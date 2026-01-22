"use client";

import React from "react";
import { AutoT } from "../../components/AutoT";

type LevelFilter = "all" | "강사" | "중등" | "초등";

interface LevelFilterProps {
  levelFilter: LevelFilter;
  onLevelFilterChange: (level: LevelFilter) => void;
  isVisible: boolean;
}

export function LevelFilter({
  levelFilter,
  onLevelFilterChange,
  isVisible,
}: LevelFilterProps) {
  if (!isVisible) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
      <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
        <AutoT text="수준별" />
      </span>
      <button
        onClick={() => onLevelFilterChange("강사")}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
          levelFilter === "강사"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <AutoT text="강사" />
      </button>
      <button
        onClick={() => onLevelFilterChange("중등")}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
          levelFilter === "중등"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <AutoT text="중등" />
      </button>
      <button
        onClick={() => onLevelFilterChange("초등")}
        className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
          levelFilter === "초등"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <AutoT text="초등" />
      </button>
    </div>
  );
}
