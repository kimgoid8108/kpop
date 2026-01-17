"use client";

import React, { useState } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

// ---------- 타입 정의 ----------
type CourseItem = {
  title: string;
  description: string;
};

type CourseLevel = {
  title?: string;
  goal?: string;
  curriculum?: { title: string; description: string }[];
};

type CourseSection = {
  label: string;
  intro?: string;
  levels: {
    [level: string]: CourseLevel;
  };
};

// ---------- 댄스/뮤직 과정 데이터 ----------
const courseSections: CourseSection[] = [
  {
    label: "댄스",
    intro: "댄스는 기본 신체 리듬감, 창의성, 협동심을 기르는 파트입니다.",
    levels: {
      강사: {
        title: "<댄스마스터> 강사양성 과정",
        goal: "댄스 분야 전문가를 위한 <댄스마스터> 강사양성 과정은 실제 교육 현장에서 즉시 활용 가능한 실기 지도 능력과 무대 퍼포먼스 기획 역량을 모두 갖춘 강사를 양성하는 데 목표가 있습니다. 참가자는 체계적인 이론과 실습을 통해 댄스 실기 지도법, 평가방법, 무대 기획 및 리더십을 고루 습득하게 됩니다.",
        curriculum: [
          {
            title: "1-4주차",
            description: "이론 및 기초: 교육자 역할, K-pop 이해",
          },
          {
            title: "5-7주차",
            description: "실습 및 중간: 구성원리, 안무 분석",
          },
          {
            title: "8-12주차",
            description: "안무 및 연출: Choreography 실습",
          },
          {
            title: "13-15주차",
            description: "실습 및 평가: 강의 시연 및 피드백",
          },
        ],
      },
      중등: {
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
      초등: {
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
          },
          {
            title: "5-8주차",
            description: "발성 심화: 장르별 발성 학습",
          },
          {
            title: "9-12주차",
            description: "현장 테크닉: 녹음 및 무대 실전",
          },
          {
            title: "13-14주차",
            description: "실전 가창: 가창기법 및 종합정리",
          },
        ],
      },
      중등: {
        title: "<AI 음악 만들기> 중등과정",
        goal: "기본 발성 훈련과 하모니를 통해 음악적 표현력과 팀워크, 무대 경험을 쌓습니다.",
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
  const currentSection =
    courseSections.find((section) => section.label === selectedCategory) ??
    courseSections[0];
  const levelKeys = Object.keys(currentSection.levels);
  const [selectedLevel, setSelectedLevel] = useState<string>(levelKeys[0]);
  const safeSelectedLevel = levelKeys.includes(selectedLevel)
    ? selectedLevel
    : levelKeys[0];
  const currentLevel = currentSection.levels[safeSelectedLevel];

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="과정구성" />
          </h1>
          <section className="mb-8">
            {/* ---------- 분야 탭 ---------- */}
            <div className="flex gap-4 mb-3">
              {courseSections.map((section) => (
                <button
                  key={section.label}
                  className={`px-4 py-2 rounded-full font-semibold border transition ${
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
            {/* ---------- 레벨 탭 ---------- */}
            <div className="flex gap-2 mb-2">
              {levelKeys.map((level) => (
                <button
                  key={level}
                  className={`px-3 py-1.5 rounded-lg font-medium border transition text-sm ${
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

            {/* ---------- 과정 상세영역(디자인 수정) ---------- */}
            <div>
              {("title" in currentLevel ||
                "goal" in currentLevel ||
                "curriculum" in currentLevel) && (
                <div>
                  {/* 제목은 따로, 배경색 강조 */}
                  {currentLevel.title && (
                    <div className="bg-blue-400 rounded-t-lg p-4 border-b border-indigo-200 mb-0 my-10">
                      <h2 className="text-xl md:text-2xl font-bold mb-0 text-white">
                        {currentLevel.title && <AutoT text={currentLevel.title} />}
                      </h2>
                    </div>
                  )}

                  {/* 내용은 좌/우 2단 레이아웃 */}
                  <div className="bg-gray-50 rounded-b-lg p-4 border border-t-0 border-gray-200 flex flex-col md:flex-row gap-6 mt-0">
                    {/* 왼쪽 : 수업 목표 및 내용 */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center items-center">
                      {currentLevel.goal && (
                        <div className="mb-4">
                          <div className="font-semibold text-gray-800 mb-1">
                            <AutoT text="수업 목표 및 내용" />
                          </div>
                          <p className="text-sm text-gray-700 whitespace-pre-line">
                            {currentLevel.goal && <AutoT text={currentLevel.goal} />}
                          </p>
                        </div>
                      )}
                      {currentSection.intro && (
                        <div className="mb-4">
                          <div className="font-semibold text-gray-800 mb-1">
                            <AutoT text="파트 소개" />
                          </div>
                          <p className="text-sm text-gray-700 whitespace-pre-line">
                            {currentSection.intro && <AutoT text={currentSection.intro} />}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* 오른쪽 : 커리큘럼 */}
                    {currentLevel.curriculum && (
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 mb-2 my-3">
                          <AutoT text="커리큘럼" />
                        </div>
                        <ul className="space-y-2 my-5">
                          {currentLevel.curriculum.map((item, i) => (
                            <li
                              key={i}
                              className="pl-2 border-l-2 border-indigo-300 my-10"
                            >
                              <span className="font-semibold">
                                <AutoT text={item.title} />
                              </span>
                              <p className="text-sm text-gray-700 ml-2">
                                <AutoT text={item.description} />
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8"></section>
        </div>
      </div>
    </PageLayout>
  );
}
