"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function ClassroomCaptionsPage() {
  const classroomMenu = submenuData.find((menu) => menu.label === "강의실");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {classroomMenu && (
          <Sidebar title={classroomMenu.label} items={classroomMenu.submenu} />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">자막기능</h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              강의 영상의 자막 기능을 활용하여 더 효과적으로 학습하세요.
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  다국어 자막
                </h2>
                <p className="text-gray-700">
                  한국어, 영어, 중국어, 일본어 등 다양한 언어의 자막을
                  제공합니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  자막 설정
                </h2>
                <p className="text-gray-700">
                  자막 크기, 색상, 위치 등을 개인 취향에 맞게 설정할 수
                  있습니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  자동 번역
                </h2>
                <p className="text-gray-700">
                  실시간 자동 번역 기능으로 더욱 편리한 학습이 가능합니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
