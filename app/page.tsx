"use client";

import logo from "../src/GKI.png";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

function SwiperSlider() {
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current]);

  return (
    <div className="flex w-full h-[200px] relative">
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`슬라이드 ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
            idx === current
              ? "translate-x-0 z-10 opacity-100"
              : idx < current
              ? "-translate-x-full opacity-0"
              : "translate-x-full opacity-0"
          }`}
          style={{ borderRadius: 12 }}
        />
      ))}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full bg-white border ${
              current === idx
                ? "bg-blue-500 border-blue-600"
                : "bg-white/70 border-white/60"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

/**
 * submenuData: 메뉴 이름과 하위 메뉴 라벨 및 경로 정의
 */
const submenuData = [
  {
    label: "진흥원 소개",
    submenu: [
      { label: "인사말", path: "/intro/greeting" },
      { label: "진흥원 소개", path: "/intro/about" },
      { label: "활동현황", path: "/intro/activities" },
      { label: "유관협력기관", path: "/intro/partners" },
    ],
  },
  {
    label: "교육과정",
    submenu: [
      { label: "과정구성", path: "/courses/structure" },
      { label: "강사진 소개", path: "/courses/instructors" },
      { label: "교육 특성", path: "/courses/features" },
      { label: "학습가이드", path: "/courses/guide" },
    ],
  },
  {
    label: "취득 자격증",
    submenu: [
      { label: "자격증 소개", path: "/certificates/about" },
      { label: "관련자격증 및 활동", path: "/certificates/related" },
    ],
  },
  {
    label: "강의실",
    submenu: [
      { label: "강의리스트", path: "/classroom/list" },
      { label: "진도관리", path: "/classroom/progress" },
      { label: "자막기능", path: "/classroom/captions" },
      { label: "시험/과제", path: "/classroom/exam" },
      { label: "수강생 관리", path: "/classroom/students" },
    ],
  },
  {
    label: "커뮤니티",
    submenu: [
      { label: "공지사항", path: "/community/notice" },
      { label: "강의후기", path: "/community/reviews" },
      { label: "문의", path: "/community/inquiry" },
      { label: "약관 정책", path: "/community/policy" },
    ],
  },
];

// 로고 컴포넌트
function LogoArea() {
  return (
    <div className="flex justify-start">
      <a href="#">
        {/* logo는 next/image 사용 권장, 여기선 img로 대체 */}
        <img
          src={logo.src ? logo.src : "/fallback.png"}
          alt="로고"
          style={{ width: 200, height: 100 }}
        />
      </a>
    </div>
  );
}

// 데스크탑 네비 상단 메뉴 - 메뉴 헤더 중앙 정렬
function NavBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // 메뉴 밖 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // accessibility: esc키로도 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      ref={navRef}
      className="w-full border-b border-gray-200 bg-white z-30"
      style={{
        // box-shadow: 네비 그림자
        boxShadow: "0 2px 6px 0 rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-5 py-1"
        style={{ position: "relative" }}
      >
        {/* 좌측: 로고 영역 */}
        <LogoArea />
        {/* 중앙: 메뉴 (중앙 정렬) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-1">
            {submenuData.map((menu, idx) => (
              <div
                key={menu.label}
                className="relative group"
                // 마우스/키보드 접근 모두 지원
                onMouseEnter={() => setOpenIndex(idx)}
                onMouseLeave={() => setOpenIndex(null)}
                tabIndex={0}
                onFocus={() => setOpenIndex(idx)}
              >
                <button
                  className={`text-base font-semibold px-5 py-2 rounded transition-colors
                    ${
                      openIndex === idx
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  style={{
                    outline: "none",
                    border: "none",
                    background: "none",
                  }}
                  type="button"
                >
                  {menu.label}
                </button>
                {/* 드롭다운, 상단에서 바로 아래에 펼침 */}
                {openIndex === idx && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded shadow-xl min-w-[176px] z-40"
                    style={{ minWidth: 180 }}
                  >
                    <div className="py-2 px-1 flex flex-col items-stretch">
                      {menu.submenu.map((item) => (
                        <Link
                          key={item.label}
                          href={item.path}
                          className="px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-800 rounded transition-colors text-base whitespace-nowrap"
                          style={{ fontWeight: 500 }}
                          tabIndex={0}
                          onClick={() => setOpenIndex(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* 우측: 추후 로그인/설정 등 아이콘 추가 가능 */}
        {/* 아직 우측 컨텐츠가 없으므로 빈 div로 공간 확보, 필요 시 여기에 추가 */}
        <div style={{ width: 48 }}></div>
      </div>
    </div>
  );
}

// FooterBarItem은 사용되지 않으므로 제거하거나, 사용하려면 export 및 반환 필요
// 삭제 혹은 사용 안함 표시
// const FooterBarItem = () => (
//   <span
//     aria-hidden
//     className="inline-block mx-3 h-4"
//     style={{
//       borderLeft: "1px solid #bdbdbd",
//       height: 16,
//       marginLeft: 12,
//       marginRight: 12,
//     }}
//   ></span>
// );

/** 대충의 레이아웃 및 푸터 스타일 - 참고용 */
function Footer() {
  return (
    <footer className="bg-gray-300 border-t border-gray-200 text-gray-700 leading-tight mt-24 text-sm">
      <div className="container mx-auto px-10 py-7 flex flex-wrap gap-10 justify-between items-center footer-bar-wrap">
        {/* 각 아이템 옆에 수직 작대기(구분선)를 명시적으로 추가 */}
        <div className="flex items-center w-full gap-0">
          <div className="flex flex-1 items-center gap-2 leading-tight pr-8">
            <img
              src={logo.src ? logo.src : "/fallback.png"}
              alt="로고"
              style={{ width: 110, height: 60 }}
            />
            <div className="flex flex-col gap-1">
              <b style={{ fontSize: 20, display: "block", marginBottom: 8 }}>
                글로벌케이팝진흥원
              </b>
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-1"
                style={{ marginBottom: 4 }}
              >
                <span className="flex items-center">
                  <b
                    className="text-gray-800"
                    style={{
                      marginRight: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    주소
                  </b>
                  <span
                    aria-hidden
                    className="inline-block"
                    style={{
                      borderLeft: "1px solid #bdbdbd",
                      height: 20,
                      marginLeft: 14,
                      marginRight: 14,
                      alignSelf: "center",
                    }}
                  ></span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    서울특별시 강남구 압구정로 32길 11 (신사동) 6층
                  </span>
                </span>
                <span>
                  <b className="text-gray-800" style={{ marginRight: 2 }}>
                    대표
                  </b>{" "}
                  천범주
                </span>
                <span>
                  <b className="text-gray-800" style={{ marginRight: 2 }}>
                    이메일
                  </b>{" "}
                  global@gw.global.ac.kr
                </span>
              </div>
            </div>
          </div>
          {/* 세로 작대기(구분선) */}
          <div
            aria-hidden
            className="hidden lg:block"
            style={{
              width: 1,
              background: "#bdbdbd",
              alignSelf: "stretch",
              margin: "0 28px",
              minHeight: 44,
            }}
          ></div>
          <div className="flex flex-col flex-1 min-w-[180px] pl-8">
            <b
              style={{ fontSize: 20, display: "inline-block", margin: "8px 0" }}
            >
              02) 2160-1171
            </b>
            <span style={{ display: "inline-block", margin: "5px 0" }}>
              평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)
            </span>
            <span style={{ display: "inline-block", margin: "5px 0" }}>
              이메일 : mpp_op@squarenet.co.kr
            </span>
            <div
              className="text-xs text-gray-500 mt-2"
              style={{ marginTop: 12 }}
            >
              &copy; {new Date().getFullYear()} 글로벌케이팝진흥원. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer-bar-wrap {
          position: relative;
        }
        @media (max-width: 1024px) {
          .footer-bar-wrap > div > div[aria-hidden] {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 네비게이션 */}
      <NavBar />
      {/* 메인 컨텐츠 - 실제 페이지 본문 영역 */}
      <main className="flex-1 container mx-auto px-10 py-12">
        {/* 실제 컨텐츠 영역은 여기에 추가 */}
        <div className="text-center text-xl text-gray-600 py-16">
          {/* 이미지 자동 왼쪽 스와이프 슬라이더 */}
          <div className="mb-6 font-bold text-gray-800 text-2xl">
            한국진흥원 홈페이지
          </div>
          <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-lg shadow-md">
            <SwiperSlider />
          </div>
          <div>서비스 준비중입니다.</div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
