"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AutoT } from "../../components/AutoT";
import type { Course } from "../../lib/courses";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const categoryColors = {
    Dance: "bg-pink-100 text-pink-800",
    Music: "bg-blue-100 text-blue-800",
    default: "bg-amber-100 text-amber-800",
  };

  const categoryColor =
    categoryColors[course.categoryEn as keyof typeof categoryColors] ||
    categoryColors.default;

  return (
    <Link
      href={`/classroom/list/${course.id}`}
      className="group rounded-lg overflow-hidden transition-all cursor-pointer bg-white flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 hover:border-blue-400 border border-gray-200"
    >
      <div className="relative w-full aspect-video min-h-[180px] sm:min-h-[200px]">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:brightness-95 transition"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-black transition" />
      </div>
      <div className="p-3 sm:p-4 flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
          <span
            className={`inline-block text-center px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded whitespace-nowrap ${categoryColor} transition group-hover:scale-105`}
          >
            {course.categoryEn}
          </span>
          {course.level && (
            <span className="px-2 py-0.5 sm:py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 whitespace-nowrap">
              <AutoT text={course.level} />
            </span>
          )}
        </div>
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition mb-1 line-clamp-2 break-words leading-tight">
          <AutoT text={course.title} />
        </h2>
        {course.instructor && (
          <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
            <AutoT text="강사" />: <span className="break-all">{course.instructor}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
