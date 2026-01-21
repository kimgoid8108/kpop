"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { courses } from "../../../lib/courses";

type SortOption = "latest" | "popular" | "name";

export default function ClassroomListPage() {
  const [sortOption, setSortOption] = useState<SortOption>("latest");

  // 필터링된 강의 목록을 생성
  let filteredCourses = courses;
  if (sortOption === "popular") {
    filteredCourses = courses.filter((course) => course.category === "댄스");
  } else if (sortOption === "name") {
    filteredCourses = courses.filter((course) => course.category === "음악");
  }

  const handleSort = (option: SortOption) => {
    setSortOption(option);
  };

  // 모든 카드에 min-h-[200px] 스타일과 flex column 스타일을 적용
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="강의리스트" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-6 md:mb-8 text-lg text-gray-800 leading-relaxed">
              <AutoT text="수강 가능한 강의 목록을 확인하세요." />
            </p>

            {/* 정렬 옵션 */}
            <div className="flex gap-4 mb-6 md:mb-8">
              <button
                onClick={() => handleSort("latest")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  sortOption === "latest"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {sortOption === "latest" && "✓ "}
                <AutoT text="전체" />
              </button>
              <button
                onClick={() => handleSort("popular")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  sortOption === "popular"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {sortOption === "popular" && "✓ "}
                <AutoT text="댄스" />
              </button>
              <button
                onClick={() => handleSort("name")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  sortOption === "name"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {sortOption === "name" && "✓ "}
                <AutoT text="음악" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                return (
                  <Link
                    key={course.id}
                    href={`/classroom/list/${course.id}`}
                    className="group rounded-lg overflow-hidden transition-all cursor-pointer bg-white flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 hover:border-blue-400 border border-gray-200"
                    style={{
                      minHeight: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* 
                      모든 코스 카드의 비율을 동일하게 맞추기 위해 aspect-video와 min-h-[200px]를 고정 적용.
                    */}
                    <div
                      className="relative w-full aspect-video min-h-[200px]"
                      style={{ minHeight: 200 }}
                    >
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:brightness-95 transition"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Hover 시 살짝 어두운 오버레이 효과 */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-black transition" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <span
                        className={`
                          inline-block
                          w-[60px]
                          text-center
                          px-3 py-1 text-xs font-medium rounded mb-2
                          ${
                            course.categoryEn === "Dance"
                              ? "bg-pink-100 text-pink-800"
                              : course.categoryEn === "Music"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }
                          transition
                          group-hover:scale-105
                        `}
                      >
                        {course.categoryEn}
                      </span>
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition">
                        <AutoT text={course.title} />
                      </h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
