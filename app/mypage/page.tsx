"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PageLayout } from "../../components/PageLayout";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageContext";

type Course = {
  id: number;
  titleKo: string;
  descriptionKo: string;
  progress: number;
};

type Exam = {
  id: number;
  titleKo: string;
  courseKo: string;
  status: "inProgress" | "completed" | "scheduled";
  statusColor: string;
  deadlineKo: string;
};

export default function MyPage() {
  const { language, translate } = useLanguage();

  // ✅ 원문은 한국어만 보관
  const myCourses: Course[] = useMemo(
    () => [
      {
        id: 1,
        titleKo: "K-POP 기초 보컬",
        descriptionKo: "기초 보컬 테크닉과 호흡법",
        progress: 75,
      },
      {
        id: 2,
        titleKo: "K-POP 댄스 기초",
        descriptionKo: "기본 동작과 리듬감 향상",
        progress: 50,
      },
      {
        id: 3,
        titleKo: "K-POP 프로덕션",
        descriptionKo: "음악 제작과 편곡 기법",
        progress: 30,
      },
    ],
    []
  );

  const exams: Exam[] = useMemo(
    () => [
      {
        id: 1,
        titleKo: "중간 평가",
        courseKo: "K-POP 기초 보컬",
        status: "inProgress",
        statusColor: "bg-yellow-100 text-yellow-800",
        deadlineKo: "2026년 1월 13일",
      },
      {
        id: 2,
        titleKo: "실기 과제",
        courseKo: "K-POP 댄스 기초",
        status: "completed",
        statusColor: "bg-green-100 text-green-800",
        deadlineKo: "2026년 1월 7일",
      },
      {
        id: 3,
        titleKo: "기말 평가",
        courseKo: "K-POP 프로덕션",
        status: "scheduled",
        statusColor: "bg-gray-100 text-gray-800",
        deadlineKo: "2026년 1월 31일",
      },
    ],
    []
  );

  // ✅ 번역된 결과를 상태로 들고 있음
  const [coursesT, setCoursesT] = useState<Record<number, { title: string; desc: string }>>({});
  const [examsT, setExamsT] = useState<Record<number, { title: string; course: string; deadline: string; status: string }>>({});
  const [uiT, setUiT] = useState({
    pageTitle: "마이페이지",
    courseList: "내 강의 리스트",
    progress: "진도관리",
    exams: "시험/과제",
    viewAll: "전체보기",
    deadline: "마감일",
    status_inProgress: "진행중",
    status_completed: "완료",
    status_scheduled: "예정",
  });

  // ✅ 언어 바뀔 때마다 전체 텍스트를 한 번에 번역해서 상태에 저장
  useEffect(() => {
    let alive = true;
    (async () => {
      // 한국어면 원문 그대로
      if (language === "ko") {
        if (!alive) return;
        setUiT({
          pageTitle: "마이페이지",
          courseList: "내 강의 리스트",
          progress: "진도관리",
          exams: "시험/과제",
          viewAll: "전체보기",
          deadline: "마감일",
          status_inProgress: "진행중",
          status_completed: "완료",
          status_scheduled: "예정",
        });
        setCoursesT(
          Object.fromEntries(
            myCourses.map((c) => [c.id, { title: c.titleKo, desc: c.descriptionKo }])
          )
        );
        setExamsT(
          Object.fromEntries(
            exams.map((e) => [
              e.id,
              { title: e.titleKo, course: e.courseKo, deadline: e.deadlineKo, status: uiT[`status_${e.status}` as keyof typeof uiT] ?? e.status },
            ])
          )
        );
        return;
      }

      // ✅ 다른 언어면 DeepL로 자동번역
      const uiKeys = {
        pageTitle: "마이페이지",
        courseList: "내 강의 리스트",
        progress: "진도관리",
        exams: "시험/과제",
        viewAll: "전체보기",
        deadline: "마감일",
        status_inProgress: "진행중",
        status_completed: "완료",
        status_scheduled: "예정",
      };

      // UI 번역
      const uiTranslatedEntries = await Promise.all(
        Object.entries(uiKeys).map(async ([k, v]) => [k, await translate(v)] as const)
      );
      const newUiT = Object.fromEntries(uiTranslatedEntries) as typeof uiT;

      // Courses 번역
      const coursesEntries = await Promise.all(
        myCourses.map(async (c) => {
          const [title, desc] = await Promise.all([
            translate(c.titleKo),
            translate(c.descriptionKo),
          ]);
          return [c.id, { title, desc }] as const;
        })
      );

      // Exams 번역
      const examsEntries = await Promise.all(
        exams.map(async (e) => {
          const [title, course, deadline, status] = await Promise.all([
            translate(e.titleKo),
            translate(e.courseKo),
            translate(e.deadlineKo),
            translate(uiKeys[`status_${e.status}` as keyof typeof uiKeys]),
          ]);
          return [e.id, { title, course, deadline, status }] as const;
        })
      );

      if (!alive) return;
      setUiT(newUiT);
      setCoursesT(Object.fromEntries(coursesEntries));
      setExamsT(Object.fromEntries(examsEntries));
    })();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, translate, myCourses, exams]);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto my-8 md:my-16 px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-gray-900">
          {uiT.pageTitle}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {/* 내 강의 리스트 섹션 */}
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {uiT.courseList}
              </h2>
              <Link
                href="/classroom/list"
                className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {uiT.viewAll} →
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
                        {coursesT[course.id]?.title ?? course.titleKo}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                        {coursesT[course.id]?.desc ?? course.descriptionKo}
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
                {uiT.progress}
              </h2>
              <Link
                href="/classroom/progress"
                className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {uiT.viewAll} →
              </Link>
            </div>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-3 md:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate flex-1 min-w-0">
                      {coursesT[course.id]?.title ?? course.titleKo}
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
                {uiT.exams}
              </h2>
              <Link
                href="/classroom/exam"
                className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {uiT.viewAll} →
              </Link>
            </div>
            <div className="space-y-4">
              {exams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-3 md:p-4">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 truncate">
                        {examsT[exam.id]?.title ?? exam.titleKo}
                      </h3>
                      <p className="text-gray-600 text-xs truncate">
                        {examsT[exam.id]?.course ?? exam.courseKo}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${exam.statusColor}`}
                    >
                      {examsT[exam.id]?.status ?? exam.status}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs mt-2">
                    {uiT.deadline}: {examsT[exam.id]?.deadline ?? exam.deadlineKo}
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
