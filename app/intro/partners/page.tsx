"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function PartnersPage() {
  const introMenu = submenuData.find((menu) => menu.label === "진흥원");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {introMenu && (
          <Sidebar title={introMenu.label} items={introMenu.submenu} />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            유관협력기관
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              글로벌케이팝진흥원과 함께 협력하고 있는 기관들을 소개합니다.
            </p>
            <div className="space-y-4 md:space-y-6">
              <div className="border-l-4 border-indigo-500 pl-3 md:pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  국내 협력기관
                </h2>
                <p className="text-gray-700">
                  한국의 주요 문화예술 기관 및 교육기관과 협력하고 있습니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  해외 협력기관
                </h2>
                <p className="text-gray-700">
                  전 세계 다양한 국가의 문화기관과 파트너십을 맺고 있습니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
