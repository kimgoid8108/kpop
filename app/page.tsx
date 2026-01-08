"use client";

import logo from "../src/GKI.png"; // 예시 이미지 경로, 실제 파일명/경로에 맞게 수정하세요.
import { useState, useRef } from "react";

const submenuData = [
  {
    label: "진흥원 소개",
    submenu: ["인사말", "진흥원 소개", "활동현황", "유관협력기간"],
  },
  {
    label: "교육과정",
    submenu: ["과정구성", "강사진 소개", "교육 특성", "학습가이드"],
  },
  {
    label: "취득 자격증",
    submenu: ["자격증 소개", "관련자격증 및 활동"],
  },
  {
    label: "강의실",
    submenu: ["강의리스트", "진도관리", "자막기능", "시험/과제", "수강생 관리"],
  },
  {
    label: "커뮤니티",
    submenu: ["공지사항", "강의후기", "문의", "약관 정책"],
  },
];

export default function Home() {
  const [submenuOpen, setSubmenuOpen] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div>
      <nav className="flex justify-center gap-8 py-4 border-b border-gray-200 relative" onMouseLeave={() => setSubmenuOpen(null)}>
        <div className="flex gap-20 items-center">
          {/* 헤더 메뉴 왼쪽 끝 이미지 */}
          <div className="flex items-center justify-start">
            <a href="#">
              <img src={logo.src} alt="로고" width={100} height={100} />
            </a>
          </div>
          {submenuData.map((menu, i) => (
            <div key={menu.label} className="relative" onMouseEnter={() => setSubmenuOpen(i)} onFocus={() => setSubmenuOpen(i)} tabIndex={0} ref={(el) => (menuRefs.current[i] = el)}>
              <a href="#" className="no-underline text-gray-800 font-bold px-3 py-2 inline-block" onFocus={() => setSubmenuOpen(i)}>
                {menu.label}
              </a>
              {/* 서브메뉴 박스: 메뉴 hover 시 해당 서브 메뉴만 하단에 표시 - 메뉴 아래에 정렬 */}
              {submenuOpen === i && (
                <div
                  className="absolute left-1/2 z-20 mt-0"
                  style={{
                    top: "100%",
                    transform: "translateX(-50%)",
                  }}
                  onMouseEnter={() => setSubmenuOpen(i)}
                  onMouseLeave={() => setSubmenuOpen(null)}>
                  <div className="text-center bg-white border border-gray-200 rounded shadow-md flex flex-col gap-2 py-4 px-8 transition-opacity duration-200">
                    {menu.submenu.map((item) => (
                      <a key={item} href="#" className="block px-3 py-2 hover:bg-gray-100 transition-colors whitespace-nowrap">
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
