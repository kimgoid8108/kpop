"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function CommunityInquiryPage() {
  const communityMenu = submenuData.find((menu) => menu.label === "커뮤니티");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {communityMenu && (
          <Sidebar
            title={communityMenu.label}
            items={communityMenu.submenu}
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">문의</h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              궁금한 사항이 있으시면 문의해주세요.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  제목
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="문의 제목을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  내용
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={6}
                  placeholder="문의 내용을 입력하세요"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                문의하기
              </button>
            </form>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
