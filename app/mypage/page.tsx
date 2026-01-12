"use client";

import React from "react";
import { PageLayout } from "../../components/PageLayout";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageContext";

export default function MyPage() {
  const { t, language } = useLanguage();

  // 예시 데이터 (실제로는 API나 Context에서 가져올 수 있음)
  const myCourses = [
    {
      id: 1,
      title: { ko: "K-POP 기초 보컬", en: "K-POP Basic Vocal" },
      description: {
        ko: "기초 보컬 테크닉과 호흡법",
        en: "Basic vocal techniques and breathing methods",
      },
      progress: 75,
    },
    {
      id: 2,
      title: { ko: "K-POP 댄스 기초", en: "K-POP Basic Dance" },
      description: {
        ko: "기본 동작과 리듬감 향상",
        en: "Basic movements and rhythm improvement",
      },
      progress: 50,
    },
    {
      id: 3,
      title: { ko: "K-POP 프로덕션", en: "K-POP Production" },
      description: {
        ko: "음악 제작과 편곡 기법",
        en: "Music production and arrangement techniques",
      },
      progress: 30,
    },
  ];

  const exams = [
    {
      id: 1,
      title: { ko: "중간 평가", en: "Mid-term Evaluation" },
      course: { ko: "K-POP 기초 보컬", en: "K-POP Basic Vocal" },
      status: "inProgress",
      statusColor: "bg-yellow-100 text-yellow-800",
      deadline: "2026년 1월 13일",
    },
    {
      id: 2,
      title: { ko: "실기 과제", en: "Practical Assignment" },
      course: { ko: "K-POP 댄스 기초", en: "K-POP Basic Dance" },
      status: "completed",
      statusColor: "bg-green-100 text-green-800",
      deadline: "2026년 1월 7일",
    },
    {
      id: 3,
      title: { ko: "기말 평가", en: "Final Evaluation" },
      course: { ko: "K-POP 프로덕션", en: "K-POP Production" },
      status: "scheduled",
      statusColor: "bg-gray-100 text-gray-800",
      deadline: "2026년 1월 31일",
    },
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto my-8 md:my-16 px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-gray-900">
          {t("myPage.title")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {/* 내 강의 리스트 섹션 */}
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {t("myPage.courseList")}
              </h2>
              <Link
                href="/classroom/list"
                className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {t("myPage.viewAll")} →
              </Link>
            </div>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg p-3 md:p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 truncate">
                        {course.title[language]}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                        {course.description[language]}
                      </p>
                    </div>
                    <span className="text-indigo-600 font-medium text-sm md:text-base ml-2 flex-shrink-0">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 진도관리 섹션 */}
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {t("myPage.progress")}
              </h2>
              <Link
                href="/classroom/progress"
                className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {t("myPage.viewAll")} →
              </Link>
            </div>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-3 md:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate flex-1 min-w-0">
                      {course.title[language]}
                    </h3>
                    <span className="text-indigo-600 font-medium text-sm md:text-base ml-2 flex-shrink-0">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 시험/과제 섹션 */}
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {t("myPage.exams")}
              </h2>
              <Link
                href="/classroom/exam"
                className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {t("myPage.viewAll")} →
              </Link>
            </div>
            <div className="space-y-4">
              {exams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-3 md:p-4">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 truncate">
                        {exam.title[language]}
                      </h3>
                      <p className="text-gray-600 text-xs truncate">
                        {exam.course[language]}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${exam.statusColor}`}
                    >
                      {t(`myPage.status.${exam.status}`)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs mt-2">
                    {t("myPage.deadline")}: {exam.deadline}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
