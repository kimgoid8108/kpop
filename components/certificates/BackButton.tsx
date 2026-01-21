"use client";

import React from "react";
import Link from "next/link";
import { AutoT } from "../AutoT";

interface BackButtonProps {
  href?: string;
}

/**
 * 뒤로가기 버튼 컴포넌트
 */
export function BackButton({ href = "/certificates" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-6"
    >
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <AutoT text="목록으로 돌아가기" />
    </Link>
  );
}
