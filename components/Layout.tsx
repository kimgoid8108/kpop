"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { SwiperSlider } from "./SwiperSlider";

// ----- Layout(Main) 컴포넌트 -----
// 전체 페이지의 구조 담당 (사이드바, 본문, 푸터)
export function Layout() {
  // Sidebar, Footer, SwiperSlider 모두 memoized로 렌더 최적화됨
  return (
    <div
      className="min-h-screen flex bg-white"
      style={{
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <Sidebar /> {/* 왼쪽 사이드바 */}
      <div className="flex-1 flex flex-col min-w-0">
        <main
          className="flex-1 flex flex-col justify-stretch p-0 m-0"
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <SwiperSlider /> {/* 메인 상단 슬라이드 */}
        </main>
        <Footer /> {/* 하단 푸터 */}
      </div>
    </div>
  );
}
