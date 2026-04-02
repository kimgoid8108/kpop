"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAutoTranslate } from "../useAutoTranslate";

export function SidebarLogo() {
  const logoAlt = useAutoTranslate("글로벌케이팝 진흥원 로고");
  return (
    <Link
      href="/"
      className="flex items-center justify-center hover:opacity-80 transition-opacity w-full"
    >
      <Image
        src="/global_Logo.png"
        alt={logoAlt}
        width={200}
        height={80}
        className="object-contain w-full max-w-[180px] sm:max-w-[200px] h-auto"
        priority
      />
    </Link>
  );
}
