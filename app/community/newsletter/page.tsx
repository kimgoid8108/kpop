"use client";

import React, { useState } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { useAutoTranslate } from "../../../components/useAutoTranslate";

export default function CommunityNewsletterPage() {
  const [email, setEmail] = useState("");
  const emailPlaceholder = useAutoTranslate("이메일 주소를 입력하세요");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 뉴스레터 구독 로직
    alert("뉴스레터 구독이 완료되었습니다.");
    setEmail("");
  };

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="뉴스레터" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-6 text-lg text-gray-800 leading-relaxed">
              <AutoT text="글로벌케이팝 진흥원의 최신 소식과 정보를 이메일로 받아보실 수 있습니다." />
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <AutoT text="이메일 주소" />
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={emailPlaceholder}
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <AutoT text="구독하기" />
              </button>
            </form>
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                <AutoT text="최신 뉴스레터" />
              </h2>
              <div className="space-y-3">
                <div className="border-b pb-3">
                  <h3 className="font-medium text-gray-800 mb-1">
                    <AutoT text="뉴스레터 제목 1" />
                  </h3>
                  <p className="text-sm text-gray-600">
                    <AutoT text="뉴스레터 내용 미리보기..." />
                  </p>
                </div>
                <div className="border-b pb-3">
                  <h3 className="font-medium text-gray-800 mb-1">
                    <AutoT text="뉴스레터 제목 2" />
                  </h3>
                  <p className="text-sm text-gray-600">
                    <AutoT text="뉴스레터 내용 미리보기..." />
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
