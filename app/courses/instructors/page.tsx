"use client";

import React, { useState } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

// 예시 강사진 데이터 (각 강사의 'level' 추가: '강사', '중등', '초등')
const instructors = [
  {
    id: "vocal1",
    name: "김온유",
    role: "Instructor / Dancer",
    type: "강사 과정 담당",
    image: "/instructors/vocal1.jpg",
    level: "강사",
    spec: [
      "서울종합예술학교 무용학과 전공 (휴학중)",
      "한국 동방배틀 vol.12 HipHop Side 4강",
      "LA boogie zone utoopia freestyle bettle best 8",
      "LA freestyle battle 세션 best 4",
      "DS 엔터테인먼트 댄스트레이너",
      "블링원 댄스 트레이너 및 디렉터",
      "BTS 작은 것들을 위한 시 MV 댄서",
      "TXT The Star Seekers MV 댄서",
      "TWS (투어스) Head Shoulders Knees Toes MV 댄서",
      "서울가요대전 in 방콕 (2024) 키스 오브 라이프 BAD NEWS 댄서",
    ],
  },
  {
    id: "dance1",
    name: "박댄서",
    role: "Dance Instructor",
    type: "댄스 강사",
    image: "/instructors/dance1.jpg",
    level: "초등",
    course: "나도 K-POP 댄스스타 (초등과정)",
    spec: [
      "전 K-POP 댄스팀 메인 안무가",
      "아이돌 전담 트레이닝 7년 경력",
      "WORLD DANCE FESTIVAL 수상",
    ],
  },
  {
    id: "prod1",
    name: "이프로듀서",
    role: "Production Instructor",
    type: "프로덕션 강사",
    image: "/instructors/prod1.jpg",
    level: "중등",
    course: "AI 음악 만들기 (중등과정)",
    spec: [
      "SM, YG, JYP 등 메이저 음반 프로듀싱",
      "해외 콜라보 프로젝트 경험 다수",
      "음원 차트1위 수록곡 작곡",
    ],
  },
];

type InstructorType = {
  id: string;
  name: string;
  role: string;
  type: string;
  image: string;
  level: "강사" | "중등" | "초등";
  course?: string;
  spec: string[];
};

// 이미지 에러 처리
function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  name: string
) {
  const target = e.currentTarget as HTMLImageElement;
  if (!target.src.startsWith("https://via.placeholder.com/320x400")) {
    target.onerror = null;
    target.src =
      "https://via.placeholder.com/320x400?text=" + encodeURIComponent(name);
  }
}

function InstructorCard({ instructor }: { instructor: InstructorType }) {
  // 뱃지는 level에 따라 다르게
  let badgeText = "";
  let badgeColor = "";
  switch (instructor.level) {
    case "강사":
      badgeText = "강사과정";
      badgeColor = "bg-green-500";
      break;
    case "중등":
      badgeText = "중등";
      badgeColor = "bg-blue-500";
      break;
    case "초등":
      badgeText = "초등";
      badgeColor = "bg-indigo-500";
      break;
    default:
      badgeText = "";
      badgeColor = "bg-gray-300";
      break;
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-100">
      {/* 프로필 이미지 */}
      <div className="flex-shrink-0 w-full md:w-64 flex justify-center md:justify-start">
        <img
          src={instructor.image}
          alt={instructor.name}
          onError={(e) => handleImageError(e, instructor.name)}
          className="rounded-xl object-cover shadow-md w-full max-w-[260px] h-[340px] md:h-[380px] bg-gray-100 border border-indigo-100"
          style={{
            aspectRatio: "3/4",
            minWidth: "180px",
            maxHeight: "400px",
          }}
        />
      </div>
      {/* 강사 정보 */}
      <div className="flex-1 w-full flex flex-col justify-between">
        <div>
          {/* 레벨 뱃지 */}
          <span
            className={`inline-block mb-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${badgeColor}`}
          >
            {badgeText}
          </span>
          {/* 이름 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {instructor.name}
          </h2>
          {/* 직책 */}
          <div className="text-base md:text-lg text-gray-500 font-medium mb-6">
            {instructor.role}
          </div>
          {/* 담당 과정(있으면) */}
          {instructor.course && (
            <div className="text-sm text-indigo-700 font-semibold mb-4">
              {instructor.course}
            </div>
          )}
          {/* 스펙 목록 */}
          <ul className="space-y-3 mt-2 text-gray-700 text-[15px] leading-relaxed list-disc pl-5">
            {instructor.spec.map((s, i) => (
              <li key={i} className="">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const FILTERS = [
  { label: "전체", value: "전체" },
  { label: "강사", value: "강사" },
  { label: "중등", value: "중등" },
  { label: "초등", value: "초등" },
];

export default function InstructorsPage() {
  const coursesMenu = submenuData.find((menu) => menu.label === "교육과정");
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");

  // 필터링
  const filteredInstructors =
    selectedFilter === "전체"
      ? instructors
      : instructors.filter((ins) => ins.level === selectedFilter);

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {coursesMenu && (
          <Sidebar title={coursesMenu.label} items={coursesMenu.submenu} />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            강사진 소개
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-8 text-lg text-gray-800 leading-relaxed">
              전문적이고 경험이 풍부한 강사진을 소개합니다.
            </p>

            {/* 수준별 필터 버튼 */}
            <div className="flex gap-3 mb-8">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`px-4 py-2 rounded-full font-semibold border transition
                    ${
                      selectedFilter === f.value
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                    }
                  `}
                  onClick={() => setSelectedFilter(f.value)}
                  type="button"
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div>
              {filteredInstructors.length > 0 ? (
                filteredInstructors.map((ins) => (
                  <InstructorCard
                    key={ins.id}
                    instructor={ins as InstructorType}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 py-12">
                  해당 수준의 강사가 없습니다.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
