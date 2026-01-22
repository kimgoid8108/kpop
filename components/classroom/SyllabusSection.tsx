"use client";

import React, { useMemo } from "react";
import { AutoT } from "../../components/AutoT";
import type { SyllabusPart } from "../../lib/courses";

interface SyllabusSectionProps {
  syllabus: SyllabusPart[];
}

export function SyllabusSection({ syllabus }: SyllabusSectionProps) {
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
      <div className="space-y-8">
        {Object.entries(groupedBySubject.grouped).map(([subject, parts]) => (
          <div key={subject} className="space-y-6">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 pb-2 border-b-2 border-blue-500">
              <AutoT text={subject} />
            </h4>
            <div className="space-y-4 sm:space-y-6">
              {parts.map((part, partIndex) => (
                <div
                  key={partIndex}
                  className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 sm:py-3 bg-gray-50 rounded-r-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="font-bold text-blue-600 text-sm sm:text-base">
                      <AutoT text="파트" /> {part.partNumber}
                    </span>
                    <h5 className="font-semibold text-gray-900 text-base sm:text-lg">
                      <AutoT text={part.title} />
                    </h5>
                  </div>
                  <div className="ml-2 sm:ml-4 space-y-2">
                    {part.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="pl-3 sm:pl-4 py-1.5 sm:py-2 border-l-2 border-gray-300 bg-white rounded"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="font-medium text-gray-600 text-xs sm:text-sm">
                            <AutoT text="레슨" /> {lesson.lessonNumber}
                          </span>
                          <h6 className="font-medium text-gray-900 text-sm sm:text-base">
                            <AutoT text={lesson.title} />
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* subject가 없는 항목들 */}
        {groupedBySubject.noSubject.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 pb-2 border-b-2 border-blue-500">
              <AutoT text="기타" />
            </h4>
            <div className="space-y-4 sm:space-y-6">
              {groupedBySubject.noSubject.map((part, partIndex) => (
                <div
                  key={partIndex}
                  className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 sm:py-3 bg-gray-50 rounded-r-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="font-bold text-blue-600 text-sm sm:text-base">
                      <AutoT text="파트" /> {part.partNumber}
                    </span>
                    <h5 className="font-semibold text-gray-900 text-base sm:text-lg">
                      <AutoT text={part.title} />
                    </h5>
                  </div>
                  <div className="ml-2 sm:ml-4 space-y-2">
                    {part.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="pl-3 sm:pl-4 py-1.5 sm:py-2 border-l-2 border-gray-300 bg-white rounded"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className="font-medium text-gray-600 text-xs sm:text-sm">
                            <AutoT text="레슨" /> {lesson.lessonNumber}
                          </span>
                          <h6 className="font-medium text-gray-900 text-sm sm:text-base">
                            <AutoT text={lesson.title} />
                          </h6>
                        </div>
                      </div>
                    ))}
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
    <div className="space-y-4 sm:space-y-6">
      {syllabus.map((part, partIndex) => (
        <div
          key={partIndex}
          className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 sm:py-3 bg-gray-50 rounded-r-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="font-bold text-blue-600 text-sm sm:text-base">
              <AutoT text="파트" /> {part.partNumber}
            </span>
            <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
              <AutoT text={part.title} />
            </h4>
          </div>
          <div className="ml-2 sm:ml-4 space-y-2">
            {part.lessons.map((lesson, lessonIndex) => (
              <div
                key={lessonIndex}
                className="pl-3 sm:pl-4 py-1.5 sm:py-2 border-l-2 border-gray-300 bg-white rounded"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium text-gray-600 text-xs sm:text-sm">
                    <AutoT text="레슨" /> {lesson.lessonNumber}
                  </span>
                  <h5 className="font-medium text-gray-900 text-sm sm:text-base">
                    <AutoT text={lesson.title} />
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
