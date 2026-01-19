"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function OfflineCenterPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="오프라인센터" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="글로벌케이팝 진흥원의 오프라인 센터를 소개합니다." />
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="센터 위치 및 연락처" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="오프라인 센터 정보가 여기에 표시됩니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="운영 시간" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="센터 운영 시간 정보가 여기에 표시됩니다." />
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
