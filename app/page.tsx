"use client";

import logo from "../src/GKI.png";
import kpop1 from "../src/kpop1.png";
import kpop2 from "../src/kpop2.png";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

/**
 * 전체화면에 딱 맞는 슬라이더 (네비 아래~푸터 위)
 * 슬라이드 이미지는 화면 크기에 맞게 꽉 차게 나오도록 object-fit: cover 적용
 */
function SwiperSlider() {
  // 이미지 2개 슬라이드로
  const images = [
    {
      src: kpop1?.src || (typeof kpop1 === "string" ? kpop1 : ""),
      alt: "슬라이드 1",
    },
    {
      src: kpop2?.src || (typeof kpop2 === "string" ? kpop2 : ""),
      alt: "슬라이드 2",
    },
  ];

  const headerWidth = "1500px";
  const sliderHeight = "500px";

  const [current, setCurrent] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // 자동 슬라이드 (3초 간격)
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  // 수동 컨트롤
  const goToPrev = () =>
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  const goToNext = () => setCurrent((current + 1) % images.length);

  return (
    <div
      className="relative w-full flex-1 overflow-hidden select-none"
      style={{
        minHeight: sliderHeight,
        width: "100%",
        maxWidth: headerWidth,
        margin: "0 auto",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        borderRadius: "12px",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
        background: "#f9fbff",
        position: "relative",
      }}
    >
      {/* 슬라이드 */}
      <div
        className="w-full h-full"
        style={{
          width: "100%",
          height: sliderHeight,
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            style={{
              width: "100%",
              height: sliderHeight,
              objectFit: "cover",
              borderRadius: "12px",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: current === idx ? 1 : 0,
              zIndex: current === idx ? 1 : 0,
              transition: "opacity 0.7s",
              background: "#eee",
              pointerEvents: current === idx ? "auto" : "none",
            }}
            draggable={false}
          />
        ))}
        {/* 좌우 버튼 */}
        <button
          aria-label="이전 슬라이드"
          onClick={goToPrev}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: 36,
            height: 36,
            zIndex: 2,
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &#8592;
        </button>
        <button
          aria-label="다음 슬라이드"
          onClick={goToNext}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: 36,
            height: 36,
            zIndex: 2,
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &#8594;
        </button>
        {/* 인디케이터 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 14,
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            zIndex: 3,
          }}
        >
          {images.map((_, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: idx === current ? "#0073e8" : "#bbb",
                opacity: 0.9,
                cursor: "pointer",
                border:
                  idx === current ? "2px solid #0073e8" : "2px solid #f9fbff",
                transition: "all 0.2s",
              }}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// 네비게이션, 푸터 등 전체적인 화면 크기를 고려하여 중앙 배치와 정렬 유지
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

function LogoArea() {
  return (
    <div className="flex justify-start">
      <a href="#">
        <img
          src={logo.src ? logo.src : "/fallback.png"}
          alt="로고"
          style={{ width: 200, height: 100, objectFit: "contain" }}
        />
      </a>
    </div>
  );
}

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
        boxShadow: "0 2px 6px 0 rgba(0,0,0,0.04)",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-5 py-1"
        style={{ position: "relative" }}
      >
        <LogoArea />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-1">
            {submenuData.map((menu, idx) => (
              <div
                key={menu.label}
                className="relative group"
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
        <div style={{ width: 48 }}></div>
      </div>
    </div>
  );
}

/** 푸터 영역: 전체 가로 중앙 정렬 및 최소화된 패딩/간격 유지 */
function Footer() {
  return (
    <footer
      className="bg-gray-300 border-t border-gray-200 text-gray-700 leading-tight text-sm"
      style={{
        width: "100vw",
        position: "static",
        left: "unset",
        right: "unset",
        marginLeft: "unset",
        marginRight: "unset",
        maxWidth: "100vw",
      }}
    >
      <div className="container mx-auto px-10 py-7 flex flex-wrap gap-10 justify-between items-center footer-bar-wrap">
        <div className="flex items-center w-full gap-0">
          <div className="flex flex-1 items-center gap-2 leading-tight pr-8">
            <img
              src={logo.src ? logo.src : "/fallback.png"}
              alt="로고"
              style={{ width: 110, height: 60, objectFit: "contain" }}
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

/** 전체 레이아웃: 화면을 세로/가로 모두 꽉 채운 상태로, 슬라이드는 main 전체 확장 */
export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col bg-white"
      style={{
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <NavBar />
      <main
        className="flex-1 flex flex-col justify-stretch p-0 m-0"
        style={{
          width: "100vw",
          maxWidth: "100vw",
          height: "100%",
          minHeight: 0,
          minWidth: 0,
        }}
      >
        <SwiperSlider />
      </main>
      <Footer />
    </div>
  );
}
