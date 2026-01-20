"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { dummyActivities, Activity } from "../../../lib/activities";

// NEW 배지 표시 기간 (일)
const NEW_DAYS = 3;

// 검색 타입
type SearchType = "title" | "content" | "all";

// 페이지 사이즈 옵션
const PAGE_SIZE_OPTIONS = [10, 15, 20, 30];

export default function ActivitiesPage() {
  const router = useRouter();

  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchType, setSearchType] = useState<SearchType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState("");
  const [tempPageSize, setTempPageSize] = useState(10);

  // NEW 배지 표시 여부 체크
  const isNew = (createdAt: Date): boolean => {
    const now = new Date();
    const diffTime = now.getTime() - createdAt.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= NEW_DAYS;
  };

  // 날짜 포맷팅
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 검색 필터링
  const filteredActivities = useMemo(() => {
    let filtered = [...dummyActivities];

    // 검색어가 있을 경우 필터링
    if (appliedSearchQuery.trim()) {
      filtered = filtered.filter((activity) => {
        const query = appliedSearchQuery.toLowerCase();
        const title = activity.title.toLowerCase();
        const content = activity.content?.toLowerCase() || "";

        switch (searchType) {
          case "title":
            return title.includes(query);
          case "content":
            return content.includes(query);
          case "all":
            return title.includes(query) || content.includes(query);
          default:
            return true;
        }
      });
    }

    // 아이디 순서대로 정렬 (id를 숫자로 변환하여 오름차순 정렬)
    filtered.sort((a, b) => {
      const idA = parseInt(a.id, 10);
      const idB = parseInt(b.id, 10);
      return idA - idB; // 오름차순 (작은 번호가 먼저, id 1이 먼저, id 2가 나중)
    });

    return filtered;
  }, [appliedSearchQuery, searchType]);

  // 페이지네이션 계산
  const totalCount = filteredActivities.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex);

  // 검색 실행
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearchQuery(searchQuery);
    setCurrentPage(1); // 검색 시 첫 페이지로
  };

  // 페이지 사이즈 변경 적용
  const handlePageSizeChange = () => {
    setPageSize(tempPageSize);
    setCurrentPage(1); // 페이지 사이즈 변경 시 첫 페이지로
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 페이지네이션 버튼 생성
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 10; // 최대 표시할 페이지 버튼 수
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // 이전 버튼
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        이전
      </button>
    );

    // 첫 페이지 버튼
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 text-sm"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // 페이지 번호 버튼들
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 border rounded text-sm ${
            i === currentPage
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // 마지막 페이지 버튼
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 text-sm"
        >
          {totalPages}
        </button>
      );
    }

    // 다음 버튼
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        다음
      </button>
    );

    return buttons;
  };

  // 번호 계산 (아이디 값 그대로 사용)
  const getRowNumber = (activity: Activity) => {
    return parseInt(activity.id, 10);
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto my-8 md:my-16 px-4">
        {/* 페이지 상단 */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-0">
              <AutoT text="활동현황" />
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              <AutoT text="글로벌케이팝진흥원의 최근 진행된 수업과 프로그램을 소개합니다." />
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
          {/* 테이블 상단 컨트롤 바 */}
          <div className="mb-4 pb-4 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* 좌측: 총건수/페이지 정보 */}
              <div className="text-sm text-gray-700 flex-shrink-0">
                Total : {totalCount} / Page : {currentPage} / {totalPages || 1}
              </div>

              {/* 가운데: 페이지 사이즈 select + 이동 버튼 */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                <select
                  value={tempPageSize}
                  onChange={(e) => setTempPageSize(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handlePageSizeChange}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  이동
                </button>
              </div>

              {/* 우측: 검색 */}
              <form onSubmit={handleSearch} className="flex items-center gap-2 flex-shrink-0">
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as SearchType)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="title">제목</option>
                  <option value="content">내용</option>
                  <option value="all">제목+내용</option>
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="검색어 입력"
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[150px]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium whitespace-nowrap"
                >
                  검색
                </button>
              </form>
            </div>
          </div>

          {/* 테이블 영역 */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-300">
                  <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    번호
                  </th>
                  <th className="px-3 md:px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    제목
                  </th>
                  <th className="px-3 md:px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-200 hidden md:table-cell">
                    작성일
                  </th>
                  <th className="px-3 md:px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-200 hidden lg:table-cell">
                    첨부파일
                  </th>
                  <th className="px-3 md:px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-200 hidden lg:table-cell">
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedActivities.length > 0 ? (
                  paginatedActivities.map((activity, index) => (
                    <tr
                      key={activity.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      {/* 번호 */}
                      <td className="px-3 md:px-4 py-3 text-sm text-gray-700">
                        {getRowNumber(activity)}
                      </td>
                      {/* 제목 */}
                      <td className="px-3 md:px-4 py-3 text-sm">
                        <Link
                          href={`/intro/activities/${activity.id}`}
                          className="flex items-center gap-2 text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            {activity.title}
                            {isNew(activity.createdAt) && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-500 text-white">
                                NEW
                              </span>
                            )}
                          </span>
                        </Link>
                        {/* 모바일에서 작성일 표시 */}
                        <div className="md:hidden text-xs text-gray-500 mt-1">
                          {formatDate(activity.createdAt)}
                        </div>
                        {/* 모바일에서 첨부파일, 조회수 표시 */}
                        <div className="lg:hidden flex items-center gap-3 mt-1 text-xs text-gray-500">
                          {activity.hasAttachment && (
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                              </svg>
                              첨부
                            </span>
                          )}
                          <span>조회 {activity.views}</span>
                        </div>
                      </td>
                      {/* 작성일 (데스크탑) */}
                      <td className="px-3 md:px-4 py-3 text-sm text-gray-700 text-center hidden md:table-cell">
                        {formatDate(activity.createdAt)}
                      </td>
                      {/* 첨부파일 (데스크탑) */}
                      <td className="px-3 md:px-4 py-3 text-center hidden lg:table-cell">
                        {activity.hasAttachment && (
                          <svg
                            className="w-5 h-5 text-gray-500 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                        )}
                      </td>
                      {/* 조회수 (데스크탑) */}
                      <td className="px-3 md:px-4 py-3 text-sm text-gray-700 text-center hidden lg:table-cell">
                        {activity.views}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500 text-sm"
                    >
                      <AutoT text="검색 결과가 없습니다." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 0 && (
            <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
              {renderPaginationButtons()}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
