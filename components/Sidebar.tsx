"use client";

import React, { memo } from "react";
import { SidebarLogo } from "./sidebar/SidebarLogo";
import { SidebarLanguageSelect } from "./sidebar/SidebarLanguageSelect";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarSearch } from "./sidebar/SidebarSearch";
import { SidebarAuthPanel } from "./sidebar/SidebarAuthPanel";
import { sidebarSubmenuData } from "../lib/nav/sidebarNav";

/** 기존 import 경로 호환용 — 신규 코드는 `lib/nav/sidebarNav`의 `sidebarSubmenuData` 권장 */
export const submenuData = sidebarSubmenuData;

export const Sidebar = memo(function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-300 h-screen fixed top-0 left-0 overflow-y-auto flex flex-col shadow-sm scrollbar-hide max-w-full z-30">
      <div className="p-3 sm:p-4 space-y-4 sm:space-y-5">
        <SidebarLogo />
        <SidebarLanguageSelect />
        <SidebarNav />
        <SidebarSearch />
        <SidebarAuthPanel />
      </div>
    </div>
  );
});
