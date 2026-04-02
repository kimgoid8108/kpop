"use client";

import React, { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { useAutoTranslate } from "../useAutoTranslate";

export const SidebarSearch = memo(function SidebarSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchPlaceholder = useAutoTranslate("검색");
  const searchAriaLabel = useAutoTranslate("검색");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-2.5 sm:p-3">
      <form onSubmit={handleSearch} className="relative" autoComplete="off">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 pr-8 sm:pr-10 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
          aria-label={searchAriaLabel}
        >
          <svg
            className="w-5 h-5"
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
        </button>
      </form>
    </div>
  );
});
