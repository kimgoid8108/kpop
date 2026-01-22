"use client";

import React, { useState } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { CategoryFilter } from "../../../components/classroom/CategoryFilter";
import { LevelFilter } from "../../../components/classroom/LevelFilter";
import { CourseSection } from "../../../components/classroom/CourseSection";
import { CourseCard } from "../../../components/classroom/CourseCard";
import { useCourseFilter } from "../../../components/classroom/useCourseFilter";

type SortOption = "latest" | "popular" | "name";
type LevelFilterType = "all" | "강사" | "중등" | "초등";

export default function ClassroomListPage() {
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [levelFilter, setLevelFilter] = useState<LevelFilterType>("all");

  const { filteredCourses, danceCourses, musicCourses } = useCourseFilter(
    sortOption,
    levelFilter
  );

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    if (option === "latest") {
      setLevelFilter("all");
    }
  };

  const handleLevelFilter = (level: LevelFilterType) => {
    setLevelFilter(level);
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto my-4 sm:my-6 md:my-8 lg:my-12 xl:my-16 px-3 sm:px-4 md:px-6">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900">
            <AutoT text="강의리스트" />
          </h1>
          <section className="bg-white rounded-lg sm:rounded-xl shadow p-3 sm:p-4 md:p-6 lg:p-8">
            <p className="mb-4 sm:mb-6 md:mb-8 text-base sm:text-lg text-gray-800 leading-relaxed">
              <AutoT text="수강 가능한 강의 목록을 확인하세요." />
            </p>

            <CategoryFilter
              sortOption={sortOption}
              onSortChange={handleSort}
            />

            <LevelFilter
              levelFilter={levelFilter}
              onLevelFilterChange={handleLevelFilter}
              isVisible={sortOption !== "latest"}
            />

            {sortOption === "latest" ? (
              <>
                <CourseSection title="댄스" courses={danceCourses} />
                <CourseSection title="음악" courses={musicCourses} />
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
