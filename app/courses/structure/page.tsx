"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function StructurePage() {
  const coursesMenu = submenuData.find((menu) => menu.label === "교육과정");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {coursesMenu && (
          <Sidebar title={coursesMenu.label} items={coursesMenu.submenu} />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">과정구성</h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              글로벌케이팝진흥원의 체계적인 교육 과정을 소개합니다.
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  기초 과정
                </h2>
                <p className="text-gray-700">
                  K-POP의 기본기를 다지는 단계로, 음악 이론과 기본 실기를
                  학습합니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  심화 과정
                </h2>
                <p className="text-gray-700">
                  전문적인 실기 능력과 창의적 표현력을 향상시키는 단계입니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  실전 과정
                </h2>
                <p className="text-gray-700">
                  실제 무대 경험과 프로덕션 과정을 경험하는 실전 단계입니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
