"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { AutoT } from "../../components/AutoT";
import type { SyllabusPart } from "../../lib/courses";

interface SyllabusSectionProps {
  syllabus: SyllabusPart[];
  courseId?: string;
}

const lessonBoxClass =
  "max-w-full pl-2 sm:pl-3 md:pl-4 py-1 sm:py-1.5 md:py-2 border-l-2 border-gray-300 bg-white rounded";

function LessonContent({
  lessonNumber,
  title,
  as: Tag = "h6",
}: {
  lessonNumber: number;
  title: string;
  as?: "h5" | "h6";
}) {
  return (
    <>
      <span className="font-medium text-gray-600 text-xs sm:text-sm whitespace-nowrap shrink-0">
        <AutoT text="lesson" /> {lessonNumber}
      </span>
      <Tag className="font-medium text-gray-900 text-xs sm:text-sm md:text-base break-words min-w-0">
        <AutoT text={title} />
      </Tag>
    </>
  );
}

export function SyllabusSection({ syllabus, courseId }: SyllabusSectionProps) {
  // 과목별로 그룹화
  const groupedBySubject = useMemo(() => {
    const grouped: Record<string, SyllabusPart[]> = {};
    const noSubject: SyllabusPart[] = [];

    syllabus.forEach((part) => {
      if (part.subject) {
        if (!grouped[part.subject]) {
          grouped[part.subject] = [];
        }
        grouped[part.subject].push(part);
      } else {
        noSubject.push(part);
      }
    });

    return { grouped, noSubject };
  }, [syllabus]);

  const hasMultipleSubjects = Object.keys(groupedBySubject.grouped).length > 1;

  // 과목이 여러 개일 때만 과목별로 표시
  if (hasMultipleSubjects) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {Object.entries(groupedBySubject.grouped).map(([subject, parts]) => (
          <div key={subject} className="space-y-3 sm:space-y-4 md:space-y-6">
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 pb-1.5 sm:pb-2 border-b-2 border-blue-500 break-words">
              <AutoT text={subject} />
            </h4>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {parts.map((part, partIndex) => (
                <div
                  key={partIndex}
                  className="min-w-0 border-l-4 border-blue-500 pl-2 sm:pl-3 md:pl-4 py-1.5 sm:py-2 md:py-3 bg-gray-50 rounded-r-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2 md:mb-3 min-w-0">
                    <span className="font-bold text-blue-600 text-xs sm:text-sm md:text-base whitespace-nowrap">
                      <AutoT text="파트" /> {part.partNumber}
                    </span>
                    <h5 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg break-words">
                      <AutoT text={part.title} />
                    </h5>
                  </div>
                  <div className="min-w-0 ml-1 sm:ml-2 md:ml-4 space-y-1.5 sm:space-y-2">
                    {part.lessons.map((lesson, lessonIndex) =>
                      courseId ? (
                        <Link
                          key={lessonIndex}
                          href={`/classroom/player/${courseId}/${part.partNumber}/${lesson.lessonNumber}`}
                          className={`${lessonBoxClass} block hover:bg-gray-50 cursor-pointer`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <LessonContent
                              lessonNumber={lesson.lessonNumber}
                              title={lesson.title}
                              as="h6"
                            />
                          </div>
                        </Link>
                      ) : (
                        <div key={lessonIndex} className={lessonBoxClass}>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <LessonContent
                              lessonNumber={lesson.lessonNumber}
                              title={lesson.title}
                              as="h6"
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* subject가 없는 항목들 */}
        {groupedBySubject.noSubject.length > 0 && (
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 pb-1.5 sm:pb-2 border-b-2 border-blue-500 break-words">
              <AutoT text="기타" />
            </h4>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {groupedBySubject.noSubject.map((part, partIndex) => (
                <div
                  key={partIndex}
                  className="min-w-0 border-l-4 border-blue-500 pl-2 sm:pl-3 md:pl-4 py-1.5 sm:py-2 md:py-3 bg-gray-50 rounded-r-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2 md:mb-3 min-w-0">
                    <span className="font-bold text-blue-600 text-xs sm:text-sm md:text-base whitespace-nowrap">
                      <AutoT text="파트" /> {part.partNumber}
                    </span>
                    <h5 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg break-words">
                      <AutoT text={part.title} />
                    </h5>
                  </div>
                  <div className="min-w-0 ml-1 sm:ml-2 md:ml-4 space-y-1.5 sm:space-y-2">
                    {part.lessons.map((lesson, lessonIndex) =>
                      courseId ? (
                        <Link
                          key={lessonIndex}
                          href={`/classroom/player/${courseId}/${part.partNumber}/${lesson.lessonNumber}`}
                          className={`${lessonBoxClass} block hover:bg-gray-50 cursor-pointer`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <LessonContent
                              lessonNumber={lesson.lessonNumber}
                              title={lesson.title}
                              as="h6"
                            />
                          </div>
                        </Link>
                      ) : (
                        <div key={lessonIndex} className={lessonBoxClass}>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <LessonContent
                              lessonNumber={lesson.lessonNumber}
                              title={lesson.title}
                              as="h6"
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 과목이 하나이거나 없을 때는 기존 방식으로 표시
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {syllabus.map((part, partIndex) => (
        <div
          key={partIndex}
          className="min-w-0 border-l-4 border-blue-500 pl-2 sm:pl-3 md:pl-4 py-1.5 sm:py-2 md:py-3 bg-gray-50 rounded-r-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2 md:mb-3 min-w-0">
            <span className="font-bold text-blue-600 text-xs sm:text-sm md:text-base whitespace-nowrap">
              <AutoT text="파트" /> {part.partNumber}
            </span>
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg break-words">
              <AutoT text={part.title} />
            </h4>
          </div>
          <div className="min-w-0 ml-1 sm:ml-2 md:ml-4 space-y-1.5 sm:space-y-2">
            {part.lessons.map((lesson, lessonIndex) =>
              courseId ? (
                <Link
                  key={lessonIndex}
                  href={`/classroom/player/${courseId}/${part.partNumber}/${lesson.lessonNumber}`}
                  className={`${lessonBoxClass} block hover:bg-gray-50 cursor-pointer`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                    <LessonContent
                      lessonNumber={lesson.lessonNumber}
                      title={lesson.title}
                      as="h5"
                    />
                  </div>
                </Link>
              ) : (
                <div key={lessonIndex} className={lessonBoxClass}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                    <LessonContent
                      lessonNumber={lesson.lessonNumber}
                      title={lesson.title}
                      as="h5"
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
