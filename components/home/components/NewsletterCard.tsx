import React from "react";
import Link from "next/link";
import { AutoT } from "../../AutoT";
import { ExpandedCard } from "../types";
import { newsletterData } from "../data";

interface NewsletterCardProps {
  expandedCard: ExpandedCard;
  isSectionVisible: boolean;
  onToggle: () => void;
}

export function NewsletterCard({ expandedCard, isSectionVisible, onToggle }: NewsletterCardProps) {
  const isExpanded = expandedCard === "newsletter";

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-700 ease-out ${
        isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: isSectionVisible ? "200ms" : "0ms" }}
    >
      <div className="p-4 sm:p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            <AutoT text="뉴스레터" />
          </h2>
          <Link
            href="/community/newsletter"
            className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <AutoT text="전체보기" /> →
          </Link>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          <AutoT text={newsletterData.description} />
        </p>

        <div className="space-y-2 sm:space-y-3 mb-4">
          {newsletterData.recentNewsletters.slice(0, 3).map((newsletter) => (
            <div key={newsletter.id} className="border-b border-gray-200 pb-2 sm:pb-3 last:border-0">
              <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1 line-clamp-1">
                <AutoT text={newsletter.title} />
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                <AutoT text={newsletter.preview} />
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onToggle}
          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>
            <AutoT text={isExpanded ? "접기" : "더보기"} />
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 max-h-[350px] overflow-y-auto">
          <div className="space-y-3 sm:space-y-4">
            {newsletterData.recentNewsletters.map((newsletter) => (
              <div key={newsletter.id} className="border-b border-gray-200 pb-3 sm:pb-4 last:border-0">
                <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                  <AutoT text={newsletter.title} />
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <AutoT text={newsletter.preview} />
                </p>
                <Link
                  href="/community/newsletter"
                  className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1"
                >
                  <AutoT text="자세히 보기" />
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <Link
              href="/community/newsletter"
              className="block w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium text-center transition-colors"
            >
              <AutoT text="뉴스레터 구독하기" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
