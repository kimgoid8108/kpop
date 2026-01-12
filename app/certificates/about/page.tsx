"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function CertificatesAboutPage() {
  const certificatesMenu = submenuData.find(
    (menu) => menu.label === "취득 자격증"
  );

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {certificatesMenu && (
          <Sidebar
            title={certificatesMenu.label}
            items={certificatesMenu.submenu}
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">자격증 소개</h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              글로벌케이팝진흥원에서 취득할 수 있는 자격증을 소개합니다.
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  K-POP 전문가 자격증
                </h2>
                <p className="text-gray-700">
                  K-POP 산업 전반에 대한 전문 지식과 실무 능력을 인정받는
                  자격증입니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  보컬 트레이너 자격증
                </h2>
                <p className="text-gray-700">
                  전문 보컬 교육 능력을 갖춘 트레이너를 인정하는 자격증입니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  댄스 지도사 자격증
                </h2>
                <p className="text-gray-700">
                  K-POP 댄스 지도 능력을 인정받는 전문 자격증입니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
