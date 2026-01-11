"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  path: string;
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
}

/**
 * 재사용 가능한 사이드바 네비게이션 컴포넌트
 * 현재 경로와 일치하는 항목을 활성화 상태로 표시
 *
 * 중복 path에 대해 index를 추가해 key를 유일하게 보장함
 */
export function Sidebar({ title, items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="min-w-[180px] w-48">
      <nav
        aria-label={`${title} 관련 서브메뉴`}
        className="bg-gray-50 rounded-xl p-4 shadow flex flex-col gap-2"
      >
        <h2 className="text-lg font-bold text-gray-700 mb-3 ml-1">{title}</h2>
        {items.map((item, idx) => {
          const isActive = pathname === item.path;
          // Use unique key combining path and index for duplicates
          const key = `${item.path}__${idx}`;
          return (
            <Link
              key={key}
              href={item.path}
              className={`block px-3 py-2 rounded font-medium transition text-gray-700 ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-indigo-50 hover:text-indigo-700"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
