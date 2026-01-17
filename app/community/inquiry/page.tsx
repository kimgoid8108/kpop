"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { useAutoTranslate } from "../../../components/useAutoTranslate";

export default function CommunityInquiryPage() {
  const titlePlaceholder = useAutoTranslate("문의 제목을 입력하세요");
  const contentPlaceholder = useAutoTranslate("문의 내용을 입력하세요");
  
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900"><AutoT text="문의" /></h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="궁금한 사항이 있으시면 문의해주세요." />
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <AutoT text="제목" />
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={titlePlaceholder}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <AutoT text="내용" />
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={6}
                  placeholder={contentPlaceholder}
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <AutoT text="문의하기" />
              </button>
            </form>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
