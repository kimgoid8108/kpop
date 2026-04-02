"use client";

import React, { useState, memo } from "react";
import Link from "next/link";
import { useAuth } from "../AuthContext";
import { AutoT } from "../AutoT";
import { SidebarMenuIcon } from "./SidebarMenuIcon";
import {
  sidebarSubmenuData,
  SIDEBAR_CLASSROOM_SECTION_PATH,
  type SidebarNavMenuItem,
} from "../../lib/nav/sidebarNav";

function filterSubmenuForAuth(
  menu: SidebarNavMenuItem,
  isAuthenticated: boolean,
) {
  if (menu.path === SIDEBAR_CLASSROOM_SECTION_PATH && !isAuthenticated) {
    return menu.submenu.filter((item) => item.path === "/classroom/list");
  }
  return menu.submenu;
}

export const SidebarNav = memo(function SidebarNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();

  const toggleSubmenu = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <nav className="space-y-1.5 sm:space-y-2">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 sm:px-3 py-1.5 sm:py-2 mb-1">
        <AutoT text="전체 메뉴" />
      </div>
      {sidebarSubmenuData.map((menu, idx) => {
        const hasSubmenu =
          Array.isArray(menu.submenu) && menu.submenu.length > 0;
        const isOpen = openIndex === idx;
        const visibleSubmenu = filterSubmenuForAuth(menu, isAuthenticated);

        return (
          <div
            key={menu.path + idx}
            className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow transition-shadow overflow-hidden"
          >
            {hasSubmenu ? (
              <>
                <button
                  type="button"
                  onClick={() => toggleSubmenu(idx)}
                  className="w-full flex items-center justify-between px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                    <span className="text-blue-600 flex-shrink-0">
                      <SidebarMenuIcon
                        name={menu.label}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      />
                    </span>
                    <span className="truncate text-xs sm:text-sm">
                      <AutoT text={menu.label} />
                    </span>
                  </div>
                  <span
                    className={`transform transition-transform duration-200 text-gray-400 flex-shrink-0 ml-2 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ▶
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-gray-200 bg-gray-50">
                    {visibleSubmenu.map((item, idx2) => (
                      <Link
                        key={item.path + idx2}
                        href={item.path}
                        className="block pl-5 sm:pl-6 pr-2 sm:pr-3 py-1.5 sm:py-2 text-xs text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors border-b border-gray-100 last:border-b-0 leading-relaxed break-words"
                      >
                        <AutoT text={item.label} />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={menu.path}
                className="block px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-blue-600 flex-shrink-0">
                    <SidebarMenuIcon
                      name={menu.label}
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    />
                  </span>
                  <span className="truncate text-xs sm:text-sm">
                    <AutoT text={menu.label} />
                  </span>
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
});
