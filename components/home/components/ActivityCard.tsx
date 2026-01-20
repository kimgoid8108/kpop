import React, { useMemo } from "react";
import Link from "next/link";
import { AutoT } from "../../AutoT";
import { ExpandedCard } from "../types";
import { dummyActivities } from "../../../lib/activities";

interface ActivityCardProps {
  expandedCard: ExpandedCard;
  isSectionVisible: boolean;
  onToggle: () => void;
}

export function ActivityCard({ expandedCard, isSectionVisible, onToggle }: ActivityCardProps) {
  const isExpanded = expandedCard === "activity";

  // dummyActivities를 메인 페이지 형식으로 변환
  const recentActivities = useMemo(() => {
    return dummyActivities
      .sort((a, b) => {
        // 아이디 순서대로 정렬 (내림차순)
        const idA = parseInt(a.id, 10);
        const idB = parseInt(b.id, 10);
        return idB - idA;
      })
      .map((activity) => {
        // 날짜 포맷팅
        const year = activity.createdAt.getFullYear();
        const month = activity.createdAt.getMonth() + 1;
        const date = `${year}년 ${month}월`;

        // 제목에서 미리보기 추출 (제목이 너무 길면 일부만 표시)
        const preview = activity.content || activity.title;

        return {
          id: activity.id,
          title: activity.title,
          date: date,
          preview: preview,
          views: activity.views,
        };
      });
  }, []);

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-700 ease-out ${
        isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: isSectionVisible ? "100ms" : "0ms" }}
    >
      <div className="p-4 sm:p-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            <AutoT text="활동현황" />
          </h2>
          <Link
            href="/intro/activities"
            className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <AutoT text="전체보기" /> →
          </Link>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          <AutoT text="글로벌케이팝진흥원의 최근 진행된 수업과 프로그램을 소개합니다." />
        </p>

        <div className="space-y-2 sm:space-y-3 mb-4">
          {recentActivities.slice(0, 3).map((activity) => (
            <Link
              key={activity.id}
              href={`/intro/activities/${activity.id}`}
              className="block border-b border-gray-200 pb-2 sm:pb-3 last:border-0 hover:bg-gray-50 transition-colors rounded px-2 -mx-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1 line-clamp-1">
                    {activity.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                    {activity.preview}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {activity.date}
                    </span>
                    <span className="text-xs text-indigo-600">
                      조회 {activity.views}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
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
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 max-h-[450px] overflow-y-auto">
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity) => (
              <Link
                key={activity.id}
                href={`/intro/activities/${activity.id}`}
                className="block border-b border-gray-200 pb-3 sm:pb-4 last:border-0 hover:bg-gray-50 transition-colors rounded px-2 -mx-2"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 flex-1">
                    {activity.title}
                  </h3>
                  <span className="text-xs sm:text-sm text-indigo-600 bg-indigo-50 px-2 py-1 rounded whitespace-nowrap">
                    조회 {activity.views}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {activity.preview}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {activity.date}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1 mt-2">
                  <AutoT text="자세히 보기" />
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
