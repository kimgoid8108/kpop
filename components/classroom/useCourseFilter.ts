import { useMemo } from "react";
import { courses } from "../../lib/courses";
import type { Course } from "../../lib/courses";

type SortOption = "latest" | "popular" | "name";
type LevelFilter = "all" | "강사" | "중등" | "초등";

const getLevelOrder = (level?: string): number => {
  if (!level) return 999;
  if (level.includes("강사")) return 1;
  if (level.includes("중등")) return 2;
  if (level.includes("초등")) return 3;
  return 999;
};

const filterByLevel = (courses: Course[], levelFilter: LevelFilter): Course[] => {
  if (levelFilter === "all") return courses;
  return courses.filter((course) => {
    if (!course.level) return false;
    return course.level.includes(levelFilter);
  });
};

const sortByLevel = (courses: Course[]): Course[] => {
  return [...courses].sort((a, b) => {
    const orderA = getLevelOrder(a.level);
    const orderB = getLevelOrder(b.level);
    return orderA - orderB;
  });
};

export function useCourseFilter(
  sortOption: SortOption,
  levelFilter: LevelFilter
) {
  return useMemo(() => {
    let filteredCourses: Course[] = [];
    let danceCourses: Course[] = [];
    let musicCourses: Course[] = [];

    // 카테고리 필터링
    if (sortOption === "popular") {
      filteredCourses = courses.filter((course) => course.category === "댄스");
    } else if (sortOption === "name") {
      filteredCourses = courses.filter((course) => course.category === "음악");
    } else {
      // latest (전체)
      danceCourses = courses.filter((course) => course.category === "댄스");
      musicCourses = courses.filter((course) => course.category === "음악");
    }

    // 수준별 필터링 및 정렬
    if (sortOption === "latest") {
      danceCourses = sortByLevel(filterByLevel(danceCourses, levelFilter));
      musicCourses = sortByLevel(filterByLevel(musicCourses, levelFilter));
    } else {
      filteredCourses = sortByLevel(filterByLevel(filteredCourses, levelFilter));
    }

    return {
      filteredCourses,
      danceCourses,
      musicCourses,
    };
  }, [sortOption, levelFilter]);
}
