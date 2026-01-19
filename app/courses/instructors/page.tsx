"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

// 예시 강사진 데이터 (각 강사의 'level' 추가: '강사', '중등', '초등'), 'field' 추가 ('dance' 또는 'vocal')
const instructors = [
  {
    id: "vocal1",
    name: "김온유",
    role: "Instructor / Dancer",
    type: "강사 과정 담당",
    image: "/김온유 강사님.jpg",
    level: "강사",
    field: "dance",
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
    id: "vocal2",
    name: "유민경",
    role: "Instructor / Dancer",
    type: "강사 과정 담당",
    image: "/유민경 강사님.jpg",
    level: "강사",
    field: "dance",
    spec: [
      "세종대학교 융합예술대학원 무용학 석사",
      "전) 세종대학교 미래교육원 실용무용 교수",
      "현) 백석예술대학교 실용무용학부 교수",
      "현) 서울종합예술실용학교 무용학과 교수",
      "판타지오뮤직 연습생 Dance Trainer",
      "울림 엔터테인먼트 Dance Trainer",
      "튀르키예 Kpop world Festival 2018,2017 심사위원",
      "문화 체육 관광부 한류 Kpop 아카데미 파견 강사",
      "에이핑크 오하영 안무",
      "아이유 Chat-shire 전국투어 콘서트 및 해외투어",
    ],
  },
  {
    id: "vocal3",
    name: "이현종",
    role: "Instructor / Dancer",
    type: "강사 과정 담당",
    image: "/이현종 강사님.jpg",
    level: "강사",
    field: "dance",
    spec: [
      "세종대학교 융합예술대학원 무용학과 석사과정",
      "플레디스 엔터테인먼트 연습생 안무 트레이너",
      "레인보우 컴퍼니 퓨쳐아이돌 댄스 트레이너",
      "세종예술고등학교 공연예술과 안무전공 실기강사",
      "대한무용협회 찾아가는 무용교육 열려라 무용세상 안무가 및 디렉터",
      "멜론뮤직어워즈, sbs가요대전, kbs가요대축제, mbc가요대제전 (2016) 방탄소년단 댄서",
      "골든디스크어워즈, 서울가요대상 (2017) 방탄소년단 댄서",
      "ITZY 'WANNABE' MV 댄서",
      "나훈아 콘서트 (2020) ‘테스형’ 안무참여",
      "MBN 조선판스타 (2021) 가수 안예은 X 김하은 ‘내가 제일 잘나가’ 안무 참여",
    ],
  },
  {
    id: "vocal4",
    name: "최성룡",
    role: "Instructor / Dancer",
    type: "강사 과정 담당",
    image: "/최성룡 강사님.jpg",
    level: "강사",
    field: "dance",
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
      "서울가요대전 in 방콕 (2024) '키스 오브 라이프 BAD NEWS' 댄서",
    ],
  },
  {
    id: "vocal5",
    name: "김수연",
    role: "Instructor / Dancer",
    type: "초등 과정 담당",
    image: "/김수연 강사님.jpg",
    level: "초등",
    field: "dance",
    spec: [
      "서울종합예술학교 무용학과 전공 (휴학중)",
      "세종대학교 융합예술대학원 무용학과 석사과정 (재학중)",
      "FEELmaDope busking vol.19 Kpop클래스 디렉터 및 SOLO 강사쇼",
      "FEELmaDOPE SHOWDCASE VOL.8~VOL.10 Basic/K-pop 클래스 디렉터",
      "가수 박한얼 ‘이어폰(Earphone)’ 안무 및 퍼포먼스 디렉터",
      "MAMA NCT dream 백업댄서",
      "버츄얼아이돌 Priz-V ‘We!(with you)’ 안무 제작",
      "NYdance ‘Performance of the year’(2021) Girlish 디렉 및 4위 수상,Girlish클래스 디렉터",
      "NYdance ‘Performance of the year’ (2023) Girlish 디렉 및 3위 수상",
      "아티스트 ‘슈츠-Best Day Ever’ (2024) 퍼포먼스 디렉터 및 백업 댄서",
      "실용무용 신인안무가전 (2025) 무용수 참여"
    ],
  },
  {
    id: "vocal6",
    name: "김현아",
    role: "Instructor / Dancer",
    type: "강사 과정 담당",
    image: "/김현아 강사님.jpg",
    level: "강사",
    field: "dance",
    spec: [
      "세종대학교 미래교육원 무용학 실용무용전공 (학사과정)",
      "세종대학교 융합예술대학원 무용학과 석사과정 (재학중)",
      "(여자)아이들((G)I-DLE) – ‘Super Lady’ MV 백업 댄서",
      "카스 0.0 광고 댄서",
      "전국체전 개막식 댄서",
      "광진구 케이팝길라잡이 수업 강사",
      "아임뉴댄스 키즈퍼포먼스반 수업 기간 강사",
      "김영우댄스 목동점 걸스코레오 수업 기간 강사",
      "플레이댄스 마포점 키즈 K-POP 수업 기간 강사",
      "플레이댄스 마포점 주니어 K-POP 수업 기간 강사",
    ],
  },
  {
    id: "vocal7",
    name: "박래준",
    role: "Instructor / Vocal Coach",
    type: "강사 과정 담당",
    image: "/박래준 강사님.jpg",
    level: "강사",
    field: "vocal",
    spec: [
      "현) 마블러스뮤직 대표",
      "현) 한국 보컬트레이너협회 협회장",
      "현) 재능대학교 실용음악과 겸임교수",
      "현) 글로벌 사이버 대학교 방송연예학과 겸임교수",
      "전) 관동대학교 실용음악과 겸임교수",
      "국회 교육문화체육관광위원장 표창 수상 / 서울시장 표창 수상",
      "제작 및 프로듀싱) 일레븐, 리브하이, nom, 엔소닉, 엠노트, 강자민, l-class, 이대원, 양양, 디오니케 등",
      "cf) 간때문이야, 빅맥송, 삼성증권, 포스코, 올해의 군가, 영남대학교, 원광 사이버대학교 등",
      "ost) kbs”스캔들”, “너는 내운명”, “미우나 고우나”, “ 며느리전성시대” / sbs”굿바이솔로”, “돌아와요순애씨” 등",
      "그 외) 원불교 100주년 기념음반”favor”, 시흥시 100주년 기념음반 “오이도의 꿈” 등",
    ],
  },
  {
    id: "vocal8",
    name: "박지은",
    role: "Instructor / Vocal Coach",
    type: "중등 과정 담당",
    image: "/박지은 강사님.jpg",
    level: "중등",
    field: "vocal",
    spec: [
      "서경대학교 실용음악대학원 실용음악학과 졸업 (컨템포러리 뮤직프로덕션 전공)",
      "동덕여자대학교 공연예술대학 실용음악과 졸업 (기타 전공)",
      "서울재즈아카데미 정규주간 기타과, 작편곡과 졸업",
      "성신여자대학교 전산학과 중퇴 음반 제작, 공연 기획",
      "(주)클라무닷컴 음원개발팀장 역임",
      "숨뮤직·노크온 레코드 대표",
      "기타리스트, 프로듀서, 작편곡가 방송, 공연, 레코딩 세션 활동",
      "KIRD 국가과학기술인력개발원, 대법원 사법역사문화교육관 등 워크숍 강사",
    ],
  },
  {
    id: "vocal9",
    name: "김온유",
    role: "Instructor / Vocal Coach",
    type: "초등 과정 담당",
    image: "/김온유 강사님.jpg",
    level: "초등",
    field: "vocal",
    spec: [
      "동서울대학교 공연예술학부 무용&스트릿 전공",
      "아이돌 ‘롤링스’ 활동",
      "극단 나비애·디얼아이 소속배우",
      "웹드라마 ‘그래서 나는 안티팬과 결혼했다＇ OST <봄날>, <들리나요> 음반 발매",
      "창작어린이뮤지컬 <내 친구 트리트리>, <어.띠.노.두>, <위기탈출 상상나라> 배우",
      "창작가족뮤지컬 <라떼 한잔 하실래요?> 배우",
      "창작사극어린이뮤지컬 <글 먹은 범계골 호랑이> 배우",
    ],
  },
];

// 타입에 field: dance 또는 vocal 추가
type InstructorType = {
  id: string;
  name: string;
  role: string;
  type: string;
  image: string;
  level: "초등" | "중등" | "강사";
  course?: string;
  spec: string[];
  field: "dance" | "vocal";
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

// 강사 상세 모달 컴포넌트
function InstructorDetailModal({
  isOpen,
  onClose,
  instructor,
}: {
  isOpen: boolean;
  onClose: () => void;
  instructor: InstructorType | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ESC 키로 모달 닫기 및 body 스크롤 방지
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";

      window.addEventListener("keydown", handleEscape);

      return () => {
        window.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = "";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !mounted || !instructor) return null;

  // 뱃지는 level에 따라 다르게
  let badgeText = "";
  let badgeColor = "";
  switch (instructor.level) {
    case "초등":
      badgeText = "초등과정";
      badgeColor = "bg-indigo-500";
      break;
    case "중등":
      badgeText = "중등과정";
      badgeColor = "bg-blue-500";
      break;
    case "강사":
      badgeText = "강사과정";
      badgeColor = "bg-green-500";
      break;
  }

  // dance/vocal badge
  let fieldBadgeText = instructor.field === "dance" ? "Dance" : "Vocal";
  let fieldBadgeColor =
    instructor.field === "dance"
      ? "bg-indigo-200 text-indigo-800"
      : "bg-orange-200 text-orange-800";

  const modalContent = (
    <>
      {/* 배경 딤 처리 */}
      <div
        className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* 모달 컨텐츠 */}
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-hide relative z-[10000]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-gray-900">
              <AutoT text="강사 상세 정보" />
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="닫기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* 왼쪽: 프로필 이미지 */}
              <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center md:justify-start">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  onError={(e) => handleImageError(e, instructor.name)}
                  className="rounded-xl object-cover shadow-md w-full max-w-[280px] h-[400px] bg-gray-100 border border-indigo-100"
                  style={{
                    aspectRatio: "3/4",
                    minWidth: "200px",
                    maxHeight: "400px",
                  }}
                />
              </div>

              {/* 오른쪽: 강사 정보 */}
              <div className="flex-1 flex flex-col">
                {/* 이름 + Field Badge (dance, vocal) */}
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {instructor.name}
                  </h2>
                  <span
                    className={`px-3 py-[0.3rem] rounded-full font-semibold text-xs ml-2 ${fieldBadgeColor}`}
                  >
                    {fieldBadgeText}
                  </span>
                </div>
                {/* Role */}
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-500">
                    <AutoT text="Role" />:{" "}
                  </span>
                  <span className="text-lg text-gray-700 font-medium">
                    {instructor.role}
                  </span>
                </div>

                {/* Type */}
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-500">
                    <AutoT text="Type" />:{" "}
                  </span>
                  <span className="text-lg text-gray-700 font-medium">
                    {instructor.type}
                  </span>
                </div>

                {/* Level */}
                <div className="mb-6">
                  <span className="text-sm font-semibold text-gray-500">
                    <AutoT text="Level" />:{" "}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${badgeColor}`}
                  >
                    <AutoT text={badgeText} />
                  </span>
                </div>

                {/* Spec */}
                <div className="mt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <AutoT text="주요 경력 및 활동" />
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-base leading-relaxed list-disc pl-5">
                    {instructor.spec.map((s, i) => (
                      <li key={i}>
                        <AutoT text={s} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}

// InstructorCard 컴포넌트
function InstructorCard({
  instructor,
  onDetailClick,
}: {
  instructor: InstructorType;
  onDetailClick: () => void;
}) {
  // 뱃지는 level에 따라 다르게
  let badgeText = "";
  let badgeColor = "";
  switch (instructor.level) {
    case "초등":
      badgeText = "초등과정";
      badgeColor = "bg-indigo-500";
      break;
    case "중등":
      badgeText = "중등과정";
      badgeColor = "bg-blue-500";
      break;
    case "강사":
      badgeText = "강사과정";
      badgeColor = "bg-green-500";
      break;
  }
  // field badge
  let fieldBadgeText = instructor.field === "dance" ? "Dance" : "Vocal";
  let fieldBadgeColor =
    instructor.field === "dance"
      ? "bg-indigo-200 text-indigo-800"
      : "bg-orange-200 text-orange-800";

  return (
    <div className="bg-white rounded-2xl shadow-lg px-6 py-8 flex flex-col md:flex-col items-center gap-6 border border-gray-100 h-full">
      {/* 프로필 이미지 */}
      <div className="flex-shrink-0 w-full flex justify-center">
        <img
          src={instructor.image}
          alt={instructor.name}
          onError={(e) => handleImageError(e, instructor.name)}
          className="rounded-xl object-cover shadow-md w-full max-w-[220px] h-[320px] bg-gray-100 border border-indigo-100"
          style={{
            aspectRatio: "3/4",
            minWidth: "140px",
            maxHeight: "340px",
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
            <AutoT text={badgeText} />
          </span>
          {/* 이름 + (dance/vocal) Badge */}
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {instructor.name}
            </h2>
            <span
              className={`px-3 py-[0.25rem] rounded-full text-xs font-semibold ${fieldBadgeColor} ml-2`}
            >
              {fieldBadgeText}
            </span>
          </div>
          {/* 직책 */}
          <div className="text-base text-gray-500 font-medium mb-1">
            {instructor.role}
          </div>
          {/* 타입 */}
          <div className="text-sm text-gray-400 mb-4 font-medium">{instructor.type}</div>
          {/* 담당 과정(있으면) */}
          {instructor.course && (
            <div className="text-sm text-indigo-700 font-semibold mb-3">
              <AutoT text={instructor.course} />
            </div>
          )}
          {/* 상세 보기 버튼 */}
          <button
            className="mt-2 px-4 py-2 rounded-full font-semibold border bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50 transition"
            onClick={onDetailClick}
            type="button"
          >
            <AutoT text="상세 보기" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 수준별 + field별 필터
const LEVEL_FILTERS = [
  { label: "전체", value: "전체" },
  { label: "초등", value: "초등" },
  { label: "중등", value: "중등" },
  { label: "강사", value: "강사" },
];

const FIELD_FILTERS = [
  { label: "전체", value: "전체" },
  { label: "댄스", value: "dance" },
  { label: "보컬", value: "vocal" },
];

export default function InstructorsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("전체");
  const [selectedField, setSelectedField] = useState<string>("전체");
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 필터링
  const filteredInstructors = instructors.filter((ins) => {
    const levelPass =
      selectedLevel === "전체" ? true : ins.level === selectedLevel;
    const fieldPass =
      selectedField === "전체" ? true : ins.field === selectedField;
    return levelPass && fieldPass;
  });

  const handleDetailClick = (instructor: InstructorType) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstructor(null);
  };

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="강사진 소개" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-8 text-lg text-gray-800 leading-relaxed">
              <AutoT text="전문적이고 경험이 풍부한 강사진을 소개합니다." />
            </p>

            {/* 필터 섹션 */}
            <div className="space-y-4 mb-8">
              {/* 구분 필터 (댄스/보컬) */}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  <AutoT text="구분" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {FIELD_FILTERS.map((f) => (
                    <button
                      key={f.value}
                      className={`px-4 py-2 rounded-full font-semibold border transition
                        ${
                          selectedField === f.value
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                        }
                      `}
                      onClick={() => setSelectedField(f.value)}
                      type="button"
                    >
                      <AutoT text={f.label} />
                    </button>
                  ))}
                </div>
              </div>

              {/* 수준별 필터 (초등/중등/강사) */}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  <AutoT text="수준별" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {LEVEL_FILTERS.map((f) => (
                    <button
                      key={f.value}
                      className={`px-4 py-2 rounded-full font-semibold border transition
                        ${
                          selectedLevel === f.value
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                        }
                      `}
                      onClick={() => setSelectedLevel(f.value)}
                      type="button"
                    >
                      <AutoT text={f.label} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {filteredInstructors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredInstructors.map((ins) => (
                    <InstructorCard
                      key={ins.id + "-" + ins.name}
                      instructor={ins as InstructorType}
                      onDetailClick={() => handleDetailClick(ins as InstructorType)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <AutoT text="해당 조건의 강사가 없습니다." />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      <InstructorDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        instructor={selectedInstructor}
      />
    </PageLayout>
  );
}
