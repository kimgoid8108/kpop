"use client";

import React, { useState, useMemo } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { useAutoTranslate } from "../../../components/useAutoTranslate";
import { courses } from "../../../lib/courses";
import type { Course } from "../../../lib/courses";

// ---------- 타입 정의 ----------
type CourseItem = {
  title: string;
  description: string;
  subject?: string; // 과목명 (예: "댄스", "음악", "이론" 등)
};

type CourseLevel = {
  title?: string;
  goal?: string;
  curriculum?: CourseItem[];
};

type CourseLevelWithMultiple = CourseLevel | CourseLevel[];

type CourseSection = {
  label: string;
  intro?: string;
  levels: {
    [level: string]: CourseLevelWithMultiple;
  };
};

// ---------- 댄스/뮤직 과정 데이터 ----------
const courseSections: CourseSection[] = [
  {
    label: "댄스",
    intro: "댄스는 기본 신체 리듬감, 창의성, 협동심을 기르는 파트입니다.",
    levels: {
      강사: [
        {
          title: "<댄스마스터> 강사양성 과정",
          goal: "댄스 분야 전문가를 위한 <댄스마스터> 강사양성 과정은 실제 교육 현장에서 즉시 활용 가능한 실기 지도 능력과 무대 퍼포먼스 기획 역량을 모두 갖춘 강사를 양성하는 데 목표가 있습니다. 참가자는 체계적인 이론과 실습을 통해 댄스 실기 지도법, 평가방법, 무대 기획 및 리더십을 고루 습득하게 됩니다.",
          curriculum: [
            {
              title: "1-4주차",
              description: "이론 및 기초: 교육자 역할, K-pop 이해",
              subject: "이론",
            },
            {
              title: "5-7주차",
              description: "실습 및 중간: 구성원리, 안무 분석",
              subject: "댄스",
            },
            {
              title: "8-12주차",
              description: "안무 및 연출: Choreography 실습",
              subject: "댄스",
            },
            {
              title: "13-15주차",
              description: "실습 및 평가: 강의 시연 및 피드백",
              subject: "실습",
            },
          ],
        },
        {
          title: "<댄스 피트니스> 강사과정",
          goal: "K-POP댄스를 피트니스로 안무화한 강사과정으로, K-POP댄스 피트니스를 이해하며 안무화 하여 강사로써의 자질을 갖춥니다.",
          curriculum: [
            {
              title: "1-4주차",
              description: "K-POP 댄스 피트니스의 개념과 피트니스 & 댄스 융합 모델 이해",
              subject: "이론",
            },
            {
              title: "5-8주차",
              description: "신체 시스템 이해와 운동원리, 근육 루틴의 구조와 적용",
              subject: "댄스",
            },
            {
              title: "9-12주차",
              description: "장르별 댄스 이해, 안무 구성 원리",
              subject: "댄스",
            },
            {
              title: "13-15주차",
              description: "리듬감 향상과 템포 조절 루틴, 피트니스 루틴 안무화 전략",
              subject: "실습",
            },
          ],
        },
        {
          title: "<K-POP 퍼포먼스 실전 마스터> 강사과정",
          goal: "K-POP 안무를 분석해 필요한 기본 능력을 향상하고 퍼포먼스의 표현력과 구성을 이해하여 작품의 완성도를 높입니다.",
          curriculum: [
            {
              title: "1-3주차",
              description: "Warm-up, Isolation & Stretching, 기본 스텝과 정확한 움직임",
              subject: "이론",
            },
            {
              title: "4-6주차",
              description: "K-POP 기초 동작, 댄스 기본리듬의 이해",
              subject: "댄스",
            },
            {
              title: "7-10주차",
              description: "안무 구성 및 퍼포먼스 완성",
              subject: "실습",
            },
          ],
        },
      ],
      중등: [
        {
          title: "<슈퍼스타 K-POP 댄서> 중등과정",
          goal: "기초 댄스 동작과 팀워크, 리듬 트레이닝을 통해 신체 표현력과 협업 능력을 함양합니다.",
          curriculum: [
            {
              title: "1-2주차",
              description: "기초 리듬/스텝: 몸 풀기, 기본 스텝",
            },
            {
              title: "3-4주차",
              description: "댄스 기본기: 바디 컨트롤, 리듬 표현",
            },
            {
              title: "5-8주차",
              description: "안무 및 커버댄스: K-POP 스타일 실전 연습",
            },
          ],
        },
        {
          title: "<표현력 업! K-POP 댄스 교실> 중등과정",
          goal: "중학생의 신체 성장 발달과 감성 발현을 고려하여 기초적인 K-POP 댄스 동작에서부터 감정을 담은 표현까지 확장된 실습형 수업입니다.",
          curriculum: [
            {
              title: "1주차",
              description: "K-pop 댄스의 기초 개념과 이해",
            },
            {
              title: "2주차",
              description: "K-pop 기초 동작 & 커버 댄스 1",
            },
            {
              title: "3주차",
              description: "K-pop 기초 동작 & 커버 댄스 2",
            },
            {
              title: "4주차",
              description: "K-pop 커버 댄스 3 & K-pop 퍼포먼스 이해",
            },
          ],
        },
      ],
      초등: [
        {
          title: "<나도 K-POP 댄스스타> 초등과정",
          goal: "기초 리듬과 창의적 신체 표현 활동을 통해 자신감과 즐거움을 기릅니다.",
          curriculum: [
            {
              title: "1-2주차",
              description: "댄스 기본기: 웜업, 업다운 바운스",
            },
            {
              title: "3-4주차",
              description: "리듬감과 동작: 팔뻗기, 웨이브",
            },
            {
              title: "5-6주차",
              description: "힙합이론/스텝: 스트릿댄스 종류 등",
            },
            {
              title: "7-8주차",
              description: "무대 완성: K-POP 안무 배우기",
            },
          ],
        },
        {
          title: "<나도 K-POP 스타! 첫 걸음 댄스 수업> 초등과정",
          goal: "춤에 대한 흥미와 재미를 자연스럽게 키우는 입문형 수업으로 성장기 어린이들에게 맞는 기본 동작을 익히고 바른 성장을 위해 K-POP 안무를 수정 보완하여 흥미롭고 재미있는 창의적 체험 학습입니다.",
          curriculum: [
            {
              title: "1-2주차",
              description: "k-pop 기초 스텝 & 바디 웨이브 기본기",
            },
            {
              title: "3-4주차",
              description: "표정과 개성을 찾는 K-POP 동작 만들기",
            },
            {
              title: "5-8주차",
              description: "K-POP 커버 댄스 완성",
            },
          ],
        },
      ],
    },
  },
  {
    label: "뮤직",
    intro: "뮤직 파트는 노래, 리듬, 화음, 음악적 소통을 기릅니다.",
    levels: {
      강사: {
        title: "<보컬트레이닝 기법> 강사과정",
        goal: "최신 음악교육 트렌드와 실전 노하우로 차세대 보컬/음악 강사를 양성합니다. 발성/호흡/코칭 기법과 학생 주도 학습 설계를 익힙니다.",
        curriculum: [
          {
            title: "1-4주차",
            description: "보컬 기초: 해부학적 원리, 호흡",
            subject: "이론",
          },
          {
            title: "5-8주차",
            description: "발성 심화: 장르별 발성 학습",
            subject: "음악",
          },
          {
            title: "9-12주차",
            description: "현장 테크닉: 녹음 및 무대 실전",
            subject: "실습",
          },
          {
            title: "13-14주차",
            description: "실전 가창: 가창기법 및 종합정리",
            subject: "음악",
          },
        ],
      },
      중등: {
        title: "<AI 음악 만들기> 중등과정",
        goal: "AI를 처음 접하는 중학생도 쉽게 따라올 수 있도록 구성된 창작 체험형 음악 수업입니다. Suno, ChatGPT 등 AI 도구를 활용해 음악을 만드는 전 과정을 직접 경험하며 창의력과 디지털 표현력을 키웁니다.",
        curriculum: [
          {
            title: "1주차",
            description: "AI 작곡 시작: 전통적 vs AI 작곡",
          },
          {
            title: "2-4주차",
            description: "기초/작사: Suno 실습, 곡 구조",
          },
          {
            title: "5-6주차",
            description: "콘텐츠 음악: 영화, 게임 BGM",
          },
          {
            title: "7-8주차",
            description: "편곡/저작권: 스타일 변환, 생성 예술",
          },
        ],
      },
      초등: {
        title: "<내가 바로 K-POP 스타> 초등과정",
        goal: "음감·리듬을 놀이와 연계하여 음악을 자연스럽게 접하고 음악적 자신감을 키웁니다.",
        curriculum: [
          {
            title: "1주차",
            description: "호흡/자세: 기본 호흡법 및 놀이",
          },
          {
            title: "2-3주차",
            description: "발성/믹스보이스: 발성 마음가짐",
          },
          {
            title: "4-5주차",
            description: "리듬/공명: 바이브레이션, 공명점",
          },
          {
            title: "6-8주차",
            description: "무대 완성: 감정 표현 및 노래 완성",
          },
        ],
      },
    },
  },
];

export default function StructurePage() {
  // 탭 상태
  const [selectedCategory, setSelectedCategory] = useState<string>(
    courseSections[0].label
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchPlaceholder = useAutoTranslate("커리큘럼 검색...");

  const currentSection =
    courseSections.find((section) => section.label === selectedCategory) ??
    courseSections[0];
  const levelKeys = Object.keys(currentSection.levels);
  const [selectedLevel, setSelectedLevel] = useState<string>(levelKeys[0]);
  const safeSelectedLevel = levelKeys.includes(selectedLevel)
    ? selectedLevel
    : levelKeys[0];

  // courseSections에서 현재 레벨의 과정들 가져오기
  const currentLevelData = currentSection.levels[safeSelectedLevel];
  const currentLevelCourses = Array.isArray(currentLevelData)
    ? currentLevelData
    : [currentLevelData];

  // 검색 필터링된 과정들
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return currentLevelCourses;

    const query = searchQuery.toLowerCase().trim();
    return currentLevelCourses.filter((course) => {
      const titleMatch = course.title?.toLowerCase().includes(query) ?? false;
      const goalMatch = course.goal?.toLowerCase().includes(query) ?? false;

      // curriculum 검색
      const curriculumMatch = course.curriculum?.some((item) => {
        const itemTitleMatch = item.title.toLowerCase().includes(query);
        const itemDescMatch = item.description.toLowerCase().includes(query);
        const itemSubjectMatch = item.subject?.toLowerCase().includes(query);
        return itemTitleMatch || itemDescMatch || itemSubjectMatch;
      }) ?? false;

      return titleMatch || goalMatch || curriculumMatch;
    });
  }, [currentLevelCourses, searchQuery]);

  // 박스가 좀 더 넓게 보이도록 min/max/width 조정
  // 기존 min-w-[340px] md:min-w-[600px] -> min-w-[340px] md:min-w-[840px]
  // 기존 width: 600 -> width: 840
  // 컨테이너 max-w-5xl -> max-w-7xl

  return (
    <PageLayout>
      <div className="w-full mx-auto my-4 sm:my-6 md:my-8 lg:my-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-[1400px] mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 leading-tight">
            <AutoT text="커리큘럼" />
          </h1>
          <section className="mb-6 sm:mb-8">
            {/* ---------- 분야 탭 및 검색창 ---------- */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-3">
              <div className="flex gap-2 flex-wrap">
                {courseSections.map((section) => (
                  <button
                    key={section.label}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold border transition text-xs sm:text-sm whitespace-nowrap ${
                      selectedCategory === section.label
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                    }`}
                    onClick={() => {
                      setSelectedCategory(section.label);
                      // 해당 섹션의 첫 레벨로 초기화
                      setSelectedLevel(Object.keys(section.levels)[0]);
                    }}
                    type="button"
                  >
                    <AutoT text={section.label} />
                  </button>
                ))}
              </div>
              {/* 검색창 */}
              <div className="flex-1 min-w-0 sm:min-w-[200px] md:min-w-[250px]">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="block w-full pl-8 sm:pl-9 md:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 md:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>
            </div>
            {/* ---------- 레벨 탭 ---------- */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {levelKeys.map((level) => (
                <button
                  key={level}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium border transition text-xs sm:text-sm whitespace-nowrap ${
                    safeSelectedLevel === level
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "bg-gray-50 text-gray-600 border-gray-300 hover:border-indigo-400"
                  }`}
                  onClick={() => setSelectedLevel(level)}
                  type="button"
                >
                  <AutoT text={level} />
                </button>
              ))}
            </div>

            {/* ---------- 과정 상세영역(각 과정별 박스) ---------- */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
              {filteredCourses.length === 0 ? (
                <div className="text-gray-500 text-center py-6 sm:py-8 bg-gray-50 rounded-lg text-xs sm:text-sm">
                  <AutoT text="검색 결과가 없습니다." />
                </div>
              ) : (
                <>
                  {/* 파트 소개 */}
                  {currentSection.intro && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 sm:p-4 md:p-6 mb-3 sm:mb-4">
                      <div className="font-semibold text-indigo-800 mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">
                        <AutoT text="파트 소개" />
                      </div>
                      <p className="text-xs sm:text-sm text-indigo-700 leading-relaxed break-words">
                        <AutoT text={currentSection.intro} />
                      </p>
                    </div>
                  )}

                  {/* 각 과정 박스 */}
                  {filteredCourses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 w-full"
                    >
                      {/* 제목 영역 */}
                      {course.title && (
                        <div className="bg-blue-400 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
                          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight break-words">
                            <AutoT text={course.title} />
                          </h2>
                        </div>
                      )}

                      {/* 내용 영역 */}
                      <div className="p-3 sm:p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6">
                          {/* 왼쪽 : 수업 목표 */}
                          {course.goal && (
                            <div className="flex-1 min-w-0">
                              <div className="mb-3 sm:mb-4">
                                <div className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">
                                  <AutoT text="수업 목표" />
                                </div>
                                <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed break-words">
                                  <AutoT text={course.goal} />
                                </p>
                              </div>
                            </div>
                          )}

                          {/* 오른쪽 : 커리큘럼 */}
                          {course.curriculum && course.curriculum.length > 0 && (
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-800 mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">
                                <AutoT text="커리큘럼" />
                              </div>
                              <div className="space-y-2 sm:space-y-3">
                                {course.curriculum.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="border-l-4 border-indigo-500 pl-2 sm:pl-3 md:pl-4 py-1.5 sm:py-2 bg-gray-50 rounded-r-lg"
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 flex-wrap">
                                      <span className="font-bold text-indigo-600 text-xs sm:text-sm break-words">
                                        <AutoT text={item.title} />
                                      </span>
                                      {item.subject && (
                                        <span className="px-1.5 sm:px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded whitespace-nowrap">
                                          <AutoT text={item.subject} />
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-700 ml-0 sm:ml-2 leading-relaxed break-words">
                                      <AutoT text={item.description} />
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8"></section>
        </div>
      </div>
    </PageLayout>
  );
}
