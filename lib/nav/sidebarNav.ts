export type SidebarNavSubItem = {
  label: string;
  path: string;
};

export type SidebarNavMenuItem = {
  label: string;
  path: string;
  submenu: SidebarNavSubItem[];
};

/** 온라인 스튜디오(강의실) 루트 — 비로그인 시 이 섹션에서는 강의리스트만 노출 */
export const SIDEBAR_CLASSROOM_SECTION_PATH = "/classroom/list";

export const sidebarSubmenuData: SidebarNavMenuItem[] = [
  {
    label: "소개",
    path: "/intro/greeting",
    submenu: [
      { label: "인사말", path: "/intro/greeting" },
      { label: "진흥원 소개", path: "/intro/about" },
      { label: "협약기관&파트너", path: "/intro/partners" },
      { label: "오프라인센터", path: "/intro/offline-center" },
      { label: "활동현황", path: "/intro/activities" },
    ],
  },
  {
    label: "자격증 안내",
    path: "/certificates",
    submenu: [
      { label: "종류 안내", path: "/certificates" },
      { label: "발급 조건", path: "/certificates/related" },
      { label: "샘플 이미지", path: "/certificates/samples" },
      { label: "FAQ", path: "/certificates/faq" },
    ],
  },
  {
    label: "교육과정 소개",
    path: "/courses/structure",
    submenu: [
      { label: "교육특성", path: "/courses/features" },
      { label: "커리큘럼", path: "/courses/structure" },
      { label: "강사진", path: "/courses/instructors" },
    ],
  },
  {
    label: "온라인 스튜디오",
    path: SIDEBAR_CLASSROOM_SECTION_PATH,
    submenu: [
      { label: "강의리스트", path: "/classroom/list" },
      { label: "나의 학습실", path: "/classroom/progress" },
      { label: "시험/과제", path: "/classroom/exam" },
    ],
  },
  {
    label: "기타",
    path: "/community/notice",
    submenu: [
      { label: "문의", path: "/community/inquiry" },
      { label: "뉴스레터", path: "/community/newsletter" },
    ],
  },
];
