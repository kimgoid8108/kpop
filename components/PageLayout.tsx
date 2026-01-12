"use client";

import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * 공통 페이지 레이아웃 컴포넌트
 * NavBar와 Footer를 포함하는 모든 페이지에서 사용
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col bg-white w-full overflow-x-hidden"
      style={{
        maxWidth: "100%",
      }}
    >
      <NavBar />
      <main
        className="flex-1 flex flex-col justify-stretch w-full overflow-x-hidden"
        style={{
          maxWidth: "100%",
          minHeight: 0,
          minWidth: 0,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

