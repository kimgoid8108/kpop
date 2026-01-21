"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageLayout } from "../../../../components/PageLayout";
import { AutoT } from "../../../../components/AutoT";
import { getCourseById } from "../../../../lib/courses";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const course = getCourseById(id);

  if (!course) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto my-8 md:my-16 px-4">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              <AutoT text="강의를 찾을 수 없습니다" />
            </h1>
            <p className="text-gray-600 mb-6">
              <AutoT text="요청하신 강의 정보가 존재하지 않습니다." />
            </p>
            <Link
              href="/classroom/list"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
      <div className="max-w-7xl mx-auto my-8 md:my-16 px-4">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/classroom/list"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
          {/* 강의 이미지 및 기본 정보 */}
          <div className="relative w-full aspect-video">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <div className="text-center px-4">
                <p className="text-white text-sm mb-2">GLOBAL K-POP INSTITUTE</p>
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  {course.categoryEn}
                </h1>
                <p className="text-white text-lg md:text-xl">
                  <AutoT text={course.title} />
                </p>
              </div>
            </div>
          </div>

          {/* 강의 정보 카드 */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <span
                className={`px-4 py-2 text-sm font-medium rounded ${
                  course.categoryEn === "Dance"
                    ? "bg-pink-100 text-pink-800"
                    : course.categoryEn === "Music"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {course.categoryEn}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                <AutoT text={course.title} />
              </h2>
            </div>

            {/* 강의 소개 */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
                <AutoT text="강의 소개" />
              </h3>
              <div className="text-gray-700 leading-relaxed">
                {course.description ? (
                  <AutoT text={course.description} />
                ) : (
                  <p>
                    <AutoT text="이 강의는 K-POP의 모든 것을 배울 수 있는 종합 프로그램입니다." />
                  </p>
                )}
              </div>
            </section>

            {/* 강의 내용 */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
                <AutoT text="강의 내용" />
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {course.content ? (
                  <AutoT text={course.content} />
                ) : (
                  <p>
                    <AutoT text="체계적인 커리큘럼을 통해 단계별로 학습할 수 있습니다." />
                  </p>
                )}
              </div>
            </section>

            {/* 강의 후기 */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
                <AutoT text="강의 후기" />
              </h3>
              {course.reviews && course.reviews.length > 0 ? (
                <div className="space-y-4">
                  {course.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">
                            {review.author}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
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
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                  <AutoT text="아직 후기가 없습니다. 첫 후기를 남겨주세요!" />
                </div>
              )}
            </section>

            {/* 강의 계획서 */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-300">
                <AutoT text="강의 계획서" />
              </h3>
              {course.syllabus && course.syllabus.length > 0 ? (
                <div className="space-y-6">
                  {course.syllabus.map((part, partIndex) => (
                    <div
                      key={partIndex}
                      className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-bold text-blue-600">
                          Part {part.partNumber}
                        </span>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          <AutoT text={part.title} />
                        </h4>
                      </div>
                      <div className="ml-4 space-y-2">
                        {part.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="pl-4 py-2 border-l-2 border-gray-300 bg-white rounded"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-600 text-sm">
                                Lesson {lesson.lessonNumber}
                              </span>
                              <h5 className="font-medium text-gray-900">
                                <AutoT text={lesson.title} />
                              </h5>
                            </div>
                            <p className="text-gray-700 text-sm ml-16">
                              <AutoT text={lesson.description} />
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
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
