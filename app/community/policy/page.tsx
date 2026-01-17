"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function CommunityPolicyPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900"><AutoT text="약관 정책" /></h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="서비스 이용약관 및 개인정보 처리방침을 확인하세요." />
            </p>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="이용약관" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="글로벌케이팝진흥원 서비스 이용에 관한 약관입니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="개인정보 처리방침" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="개인정보의 수집, 이용, 보관에 관한 정책입니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="환불 정책" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="강의 수강료 환불에 관한 정책입니다." />
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
