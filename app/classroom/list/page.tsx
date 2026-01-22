"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { courses } from "../../../lib/courses";

type SortOption = "latest" | "popular" | "name";
type LevelFilter = "all" | "강사" | "중등" | "초등";

export default function ClassroomListPage() {
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");

  // 수준별 정렬 순서 함수
  const getLevelOrder = (level?: string): number => {
    if (!level) return 999; // level이 없으면 맨 뒤로
    if (level.includes("강사")) return 1;
    if (level.includes("중등")) return 2;
    if (level.includes("초등")) return 3;
    return 999;
  };

  // 필터링 및 정렬된 강의 목록을 생성
  let filteredCourses = courses;
  let danceCourses: typeof courses = [];
  let musicCourses: typeof courses = [];

  // 카테고리 필터링
  if (sortOption === "popular") {
    filteredCourses = courses.filter((course) => course.category === "댄스");
  } else if (sortOption === "name") {
    filteredCourses = courses.filter((course) => course.category === "음악");
  } else if (sortOption === "latest") {
    // 전체 버튼일 때 댄스와 음악을 분리
    danceCourses = courses.filter((course) => course.category === "댄스");
    musicCourses = courses.filter((course) => course.category === "음악");
  }

  // 수준별 필터링
  if (levelFilter !== "all") {
    if (sortOption === "latest") {
      danceCourses = danceCourses.filter((course) => {
        if (!course.level) return false;
        return course.level.includes(levelFilter);
      });
      musicCourses = musicCourses.filter((course) => {
        if (!course.level) return false;
        return course.level.includes(levelFilter);
      });
    } else {
      filteredCourses = filteredCourses.filter((course) => {
        if (!course.level) return false;
        return course.level.includes(levelFilter);
      });
    }
  }

  // 수준별로 정렬 (강사 > 중등 > 초등)
  if (sortOption === "latest") {
    danceCourses = [...danceCourses].sort((a, b) => {
      const orderA = getLevelOrder(a.level);
      const orderB = getLevelOrder(b.level);
      return orderA - orderB;
    });
    musicCourses = [...musicCourses].sort((a, b) => {
      const orderA = getLevelOrder(a.level);
      const orderB = getLevelOrder(b.level);
      return orderA - orderB;
    });
  } else {
    filteredCourses = [...filteredCourses].sort((a, b) => {
      const orderA = getLevelOrder(a.level);
      const orderB = getLevelOrder(b.level);
      return orderA - orderB;
    });
  }

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    // 전체 버튼을 누르면 수준 필터 리셋
    if (option === "latest") {
      setLevelFilter("all");
    }
  };

  const handleLevelFilter = (level: LevelFilter) => {
    setLevelFilter(level);
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

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-sm font-medium text-gray-700">과목별</span>
              <button
                onClick={() => handleSort("latest")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  sortOption === "latest"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
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
                <AutoT text="음악" />
              </button>
            </div>

            {/* 수준별 필터 - 댄스나 음악 선택 시에만 표시 */}
            {sortOption !== "latest" && (
              <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-8">
                <span className="text-sm font-medium text-gray-700">수준별</span>
                <button
                  onClick={() => handleLevelFilter("강사")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    levelFilter === "강사"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  강사
                </button>
                <button
                  onClick={() => handleLevelFilter("중등")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    levelFilter === "중등"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  중등
                </button>
                <button
                  onClick={() => handleLevelFilter("초등")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    levelFilter === "초등"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  초등
                </button>
              </div>
            )}

            {sortOption === "latest" ? (
              <>
                {/* 댄스 섹션 */}
                {danceCourses.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      댄스
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {danceCourses.map((course) => (
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
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-black transition" />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block text-center px-3 py-1 text-xs font-medium rounded bg-pink-100 text-pink-800 transition group-hover:scale-105">
                                {course.categoryEn}
                              </span>
                              {course.level && (
                                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                                  {course.level}
                                </span>
                              )}
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition mb-1">
                              <AutoT text={course.title} />
                            </h2>
                            {course.instructor && (
                              <p className="text-sm text-gray-600">
                                강사: {course.instructor}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* 음악 섹션 */}
                {musicCourses.length > 0 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      음악
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {musicCourses.map((course) => (
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
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-black transition" />
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block text-center px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 transition group-hover:scale-105">
                                {course.categoryEn}
                              </span>
                              {course.level && (
                                <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                                  {course.level}
                                </span>
                              )}
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition mb-1">
                              <AutoT text={course.title} />
                            </h2>
                            {course.instructor && (
                              <p className="text-sm text-gray-600">
                                강사: {course.instructor}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
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
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-black transition" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`
                              inline-block
                              text-center
                              px-3 py-1 text-xs font-medium rounded
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
                          {course.level && (
                            <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
                              {course.level}
                            </span>
                          )}
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition mb-1">
                          <AutoT text={course.title} />
                        </h2>
                        {course.instructor && (
                          <p className="text-sm text-gray-600">
                            강사: {course.instructor}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
