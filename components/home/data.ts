import { Slide, Activity, Newsletter } from "./types";

export const TRANSITION_DURATION = 600;

export const slides: Slide[] = [
  {
    id: 1,
    title: "글로벌케이팝 진흥원",
    subtitle: "K-POP의 미래를 만들어갑니다",
    detail: "세계적인 K-POP 아티스트를 양성하고 한류 문화를 전 세계에 전파합니다",
    ctaPrimary: "교육과정 보기",
    ctaPrimaryLink: "/courses/structure",
    ctaSecondary: "자격증 안내",
    ctaSecondaryLink: "/certificates/about",
    year: "2026",
    gradient: "from-purple-600 via-pink-500 to-red-500",
  },
  {
    id: 2,
    title: "전문가 양성 프로그램",
    subtitle: "댄스, 보컬, K-POP 퍼포먼스",
    detail: "체계적인 커리큘럼과 실전 경험을 통해 전문가를 양성합니다",
    ctaPrimary: "강의 리스트",
    ctaPrimaryLink: "/classroom/list",
    ctaSecondary: "강사진 소개",
    ctaSecondaryLink: "/courses/instructors",
    year: "2026",
    gradient: "from-blue-600 via-cyan-500 to-teal-500",
  },
  {
    id: 3,
    title: "온라인 교육 플랫폼",
    subtitle: "언제 어디서나 학습하세요",
    detail: "LMS를 통해 체계적인 온라인 교육을 제공합니다",
    ctaPrimary: "나의 학습실",
    ctaPrimaryLink: "/classroom/progress",
    ctaSecondary: "시험/과제",
    ctaSecondaryLink: "/classroom/exam",
    year: "2026",
    gradient: "from-indigo-600 via-purple-500 to-pink-500",
  },
];

export const activityData = {
  description: "글로벌케이팝 진흥원의 최근 진행된 수업과 프로그램을 소개합니다.",
  recentActivities: [
    {
      id: 1,
      title: "K-POP 기초 보컬 워크숍",
      date: "2026년 1월",
      preview: "기초 보컬 테크닉과 호흡법을 배우는 실전 워크숍",
      participants: 45,
    },
    {
      id: 2,
      title: "K-POP 댄스 마스터클래스",
      date: "2025년 12월",
      preview: "기본 동작과 리듬감 향상을 위한 전문가 마스터클래스",
      participants: 62,
    },
    {
      id: 3,
      title: "K-POP 프로덕션 세미나",
      date: "2025년 11월",
      preview: "음악 제작과 편곡 기법을 다루는 전문 세미나",
      participants: 38,
    },
    {
      id: 4,
      title: "아이돌 퍼포먼스 트레이닝",
      date: "2025년 10월",
      preview: "무대 퍼포먼스와 스테이지 프레젠테이션 기법",
      participants: 55,
    },
    {
      id: 5,
      title: "K-POP 작사작곡 특강",
      date: "2025년 9월",
      preview: "K-POP 곡 작사작곡의 노하우와 실전 팁",
      participants: 42,
    },
  ] as Activity[],
};

export const newsletterData = {
  recentNewsletters: [
    { id: 1, title: "2026년 1월 뉴스레터", preview: "새로운 교육과정과 프로그램 소식" },
    { id: 2, title: "2025년 12월 뉴스레터", preview: "연말 특별 이벤트 및 수강생 성과 발표" },
    { id: 3, title: "2025년 11월 뉴스레터", preview: "K-POP 아티스트 인터뷰 및 강의 소개" },
  ] as Newsletter[],
  description: "글로벌케이팝 진흥원의 최신 소식과 정보를 이메일로 받아보실 수 있습니다.",
};

export const fadeStyles = `
.heromain-fade-anim {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${TRANSITION_DURATION}ms cubic-bezier(0.45, 0.1, 0.27, 1.04);
  position: absolute;
  inset: 0;
  z-index: 1;
}
.heromain-fade-anim.heromain-showing {
  opacity: 1;
  pointer-events: all;
  z-index: 2;
  transition: opacity ${TRANSITION_DURATION}ms cubic-bezier(0.45, 0.1, 0.27, 1.04);
}
@keyframes scrollDown {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(10px);
    opacity: 0.7;
  }
}
.scroll-indicator {
  animation: scrollDown 2s ease-in-out infinite;
}
`;
