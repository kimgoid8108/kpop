"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function CommunityReviewsPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900"><AutoT text="강의후기" /></h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="수강생들의 생생한 강의 후기를 확인하세요." />
            </p>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 text-xl">★★★★★</span>
                  <span className="ml-2 text-gray-600">김수강</span>
                </div>
                <p className="text-gray-700">
                  <AutoT text="정말 유익한 강의였습니다. 실전 경험이 많은 강사님의 설명이 이해하기 쉬웠어요." />
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 text-xl">★★★★☆</span>
                  <span className="ml-2 text-gray-600">이학생</span>
                </div>
                <p className="text-gray-700">
                  <AutoT text="기초부터 차근차근 배울 수 있어서 좋았습니다. 다음 강의도 기대됩니다." />
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
