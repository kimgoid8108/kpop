"use client";

import React from "react";
import { AutoT } from "../../components/AutoT";
import { CourseCard } from "./CourseCard";
import type { Course } from "../../lib/courses";

interface CourseSectionProps {
  title: string;
  courses: Course[];
}

export function CourseSection({ title, courses }: CourseSectionProps) {
  if (courses.length === 0) return null;

  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
        <AutoT text={title} />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
