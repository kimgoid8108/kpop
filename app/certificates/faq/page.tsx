"use client";

import React, { useState } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

const FAQ_ITEMS = [
  {
    question: "자격증 신청 방법은?",
    answer: "자격증 신청은 온라인으로 진행됩니다. 교육과정을 수료한 후 신청하실 수 있습니다.",
  },
  {
    question: "자격증 발급 기간은?",
    answer: "자격증 발급은 신청 후 약 2-3주 소요됩니다.",
  },
  {
    question: "자격증 유효기간은?",
    answer: "발급된 자격증은 영구 유효합니다.",
  },
];

export default function CertificatesFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="FAQ" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-6 text-lg text-gray-800 leading-relaxed">
              <AutoT text="자주 묻는 질문과 답변을 확인하실 수 있습니다." />
            </p>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span className="font-semibold text-gray-800">
                      <AutoT text={item.question} />
                    </span>
                    <span
                      className={`transform transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-4 py-3 bg-white border-t border-gray-200">
                      <p className="text-gray-700">
                        <AutoT text={item.answer} />
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
