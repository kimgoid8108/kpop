"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function CertificatesRelatedPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="관련자격증 및 활동" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="자격증 취득 후 관련 활동 및 진로 기회를 소개합니다." />
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="취업 기회" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="자격증 취득 후 관련 업계로의 취업 기회가 확대됩니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="추가 교육" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="자격증 취득자를 위한 심화 교육 과정을 제공합니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="네트워킹" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="자격증 취득자 커뮤니티를 통한 네트워킹과 정보 공유 기회를 제공합니다." />
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
