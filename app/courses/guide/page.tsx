"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function GuidePage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900"><AutoT text="학습가이드" /></h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="효과적인 학습을 위한 가이드를 제공합니다." />
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="학습 방법" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="온라인 강의와 오프라인 실습을 병행하는 하이브리드 학습 방식을 제공합니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="수강 안내" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="수강 신청부터 과정 이수까지의 전 과정을 안내합니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="학습 자료" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="강의 영상, 교재, 연습 자료 등 다양한 학습 자료를 제공합니다." />
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
