"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function InstructorsPage() {
  const coursesMenu = submenuData.find((menu) => menu.label === "교육과정");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {coursesMenu && (
          <Sidebar title={coursesMenu.label} items={coursesMenu.submenu} />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">강사진 소개</h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              전문적이고 경험이 풍부한 강사진을 소개합니다.
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  보컬 강사
                </h2>
                <p className="text-gray-700">
                  현업에서 활동 중인 전문 보컬 트레이너들이 직접 지도합니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  댄스 강사
                </h2>
                <p className="text-gray-700">
                  K-POP 댄스 전문가들이 체계적인 안무 교육을 제공합니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  프로덕션 강사
                </h2>
                <p className="text-gray-700">
                  음악 제작 및 프로덕션 전문가들이 실무 경험을 공유합니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
