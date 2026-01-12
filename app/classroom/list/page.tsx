"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function ClassroomListPage() {
  const classroomMenu = submenuData.find((menu) => menu.label === "강의실");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {classroomMenu && (
          <Sidebar title={classroomMenu.label} items={classroomMenu.submenu} />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">강의리스트</h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              수강 가능한 강의 목록을 확인하세요.
            </p>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  K-POP 기초 보컬
                </h2>
                <p className="text-gray-700">기초 보컬 테크닉과 호흡법</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  K-POP 댄스 기초
                </h2>
                <p className="text-gray-700">기본 동작과 리듬감 향상</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  K-POP 프로덕션
                </h2>
                <p className="text-gray-700">음악 제작과 편곡 기법</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
