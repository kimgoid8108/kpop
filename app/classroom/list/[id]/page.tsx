"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageLayout } from "../../../../components/PageLayout";
import { AutoT } from "../../../../components/AutoT";
import { SyllabusSection } from "../../../../components/classroom/SyllabusSection";
import { getCourseById } from "../../../../lib/courses";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const course = getCourseById(id);

  if (!course) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto my-4 sm:my-6 md:my-8 lg:my-12 px-3 sm:px-4 md:px-6">
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 md:p-8 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 break-words">
              <AutoT text="강의를 찾을 수 없습니다" />
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
              <AutoT text="요청하신 강의 정보가 존재하지 않습니다." />
            </p>
            <Link
              href="/classroom/list"
              className="inline-block px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <AutoT text="목록으로 돌아가기" />
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto my-4 sm:my-6 md:my-8 lg:my-12 px-3 sm:px-4 md:px-6">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/classroom/list"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-blue-600 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <AutoT text="목록으로" />
        </Link>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* 상단 박스: 왼쪽 이미지, 오른쪽 강의 소개/내용 */}
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
              {/* 왼쪽: 이미지 */}
              <div className="w-full md:w-1/2">
                {/* 제목 - 이미지 위에 배치 */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-4 mb-2 flex-wrap">
                    <span
                      className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm font-medium rounded whitespace-nowrap ${
                        course.categoryEn === "Dance"
                          ? "bg-pink-100 text-pink-800"
                          : course.categoryEn === "Music"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {course.categoryEn}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight break-words">
                    <AutoT text={course.title} />
                  </h2>
                </div>
                {/* 이미지 */}
                <div className="relative w-full aspect-video">
                  <Image
                    src={course.image}
                    alt={course.title || "강의 이미지"}
                    fill
                    className="object-cover w-full rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* 오른쪽: 강의 소개 및 내용 */}
              <div className="w-full md:w-1/2 space-y-4 sm:space-y-5 md:space-y-6">
                {/* 강의 소개 */}
                <section>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 pb-1.5 sm:pb-2 border-b-2 border-gray-300 break-words">
                    <AutoT text="강의 소개" />
                  </h3>
                  <div className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">
                    <p>
                      <AutoT text={course.intro || ""} />
                    </p>
                  </div>
                </section>

                {/* 강의 내용 */}
                <section>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 pb-1.5 sm:pb-2 border-b-2 border-gray-300 break-words">
                    <AutoT text="강의 내용" />
                  </h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base break-words">
                    {course.content ? (
                      <AutoT text={course.content} />
                    ) : (
                      <p>
                        <AutoT text="체계적인 커리큘럼을 통해 단계별로 학습할 수 있습니다." />
                      </p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* 하단: 강의 후기 및 계획서 (센터 정렬) */}
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-8">
            {/* 수강 신청 버튼 */}
            <div className="max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8 text-left">
              <button className="px-4 sm:px-6 md:px-8 lg:px-15 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-blue-600 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto">
                <AutoT text="수강 신청" />
              </button>
            </div>

            {/* 강의 후기 */}
            <section className="mb-4 sm:mb-6 md:mb-8 max-w-4xl mx-auto">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 pb-1.5 sm:pb-2 border-b-2 border-gray-300 text-center break-words">
                <AutoT text="강의 후기" />
              </h3>
              {course.reviews && course.reviews.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {course.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                            {review.author}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                          <AutoT text={review.date} />
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
                        <AutoT text={review.comment} />
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-6 sm:py-8 bg-gray-50 rounded-lg text-xs sm:text-sm">
                  <AutoT text="아직 후기가 없습니다. 첫 후기를 남겨주세요!" />
                </div>
              )}
            </section>

            {/* 강의 계획서 */}
            <section className="mb-4 sm:mb-6 md:mb-8 max-w-4xl mx-auto">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 pb-1.5 sm:pb-2 border-b-2 border-gray-300 text-center break-words">
                <AutoT text="강의 계획서" />
              </h3>
              {course.syllabus && course.syllabus.length > 0 ? (
                <SyllabusSection syllabus={course.syllabus} />
              ) : (
                <div className="text-gray-500 text-center py-6 sm:py-8 bg-gray-50 rounded-lg text-xs sm:text-sm">
                  <AutoT text="강의 계획서 정보가 없습니다." />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
