"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function FeaturesPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900"><AutoT text="교육 특성" /></h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="글로벌케이팝진흥원만의 특별한 교육 방식을 소개합니다." />
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="실전 중심 교육" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="이론보다 실전 경험을 중시하는 교육 방식으로, 실제 무대와 같은 환경에서 학습합니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="개인 맞춤형 지도" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="각 수강생의 특성과 수준에 맞춘 개별 지도를 통해 최적의 성장을 도모합니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="글로벌 네트워크" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="전 세계 K-POP 산업과의 네트워크를 활용한 기회 제공과 진로 지원을 제공합니다." />
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
