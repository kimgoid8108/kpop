"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function CommunityNoticePage() {
  const communityMenu = submenuData.find((menu) => menu.label === "커뮤니티");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {communityMenu && (
          <Sidebar
            title={communityMenu.label}
            items={communityMenu.submenu}
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">공지사항</h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              중요한 공지사항을 확인하세요.
            </p>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    신규 강의 오픈 안내
                  </h2>
                  <span className="text-gray-500 text-sm">2024.12.20</span>
                </div>
                <p className="text-gray-700">
                  새로운 K-POP 전문 강의가 오픈되었습니다.
                </p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    시스템 점검 안내
                  </h2>
                  <span className="text-gray-500 text-sm">2024.12.18</span>
                </div>
                <p className="text-gray-700">
                  시스템 점검으로 인한 일시적 서비스 중단 안내입니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
