"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function ClassroomStudentsPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900"><AutoT text="수강생 관리" /></h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="수강생 정보와 학습 현황을 관리하세요." />
            </p>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  <AutoT text="수강생 목록" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="현재 수강 중인 모든 수강생의 정보를 확인할 수 있습니다." />
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  <AutoT text="학습 통계" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="수강생들의 평균 진도율과 성적 통계를 확인할 수 있습니다." />
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
