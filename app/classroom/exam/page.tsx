"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function ClassroomExamPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900"><AutoT text="시험/과제" /></h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="강의 관련 시험과 과제를 확인하고 제출하세요." />
            </p>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    <AutoT text="중간 평가" />
                  </h2>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">
                    <AutoT text="진행 중" />
                  </span>
                </div>
                <p className="text-gray-700"><AutoT text="마감일: 2026년 1월 31일" /></p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    <AutoT text="실기 과제" />
                  </h2>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                    <AutoT text="제출 완료" />
                  </span>
                </div>
                <p className="text-gray-700"><AutoT text="마감일: 2026년 1월 13일" /></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
