"use client";

import React from "react";
import { Certificate } from "../../lib/certificates";
import { StepSection } from "./StepSection";
import { AutoT } from "../AutoT";
import { BackButton } from "./BackButton";

interface CertificateRelatedDetailProps {
  certificate: Certificate;
}

/**
 * 발급 조건 상세 페이지 컴포넌트
 * STEP별 정보를 표시
 */
export function CertificateRelatedDetail({ certificate }: CertificateRelatedDetailProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8">
      <BackButton href="/certificates/related" />

      {/* 상단: 자격증명 + 소개 */}
      <header className="mb-8 md:mb-10">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">
            <AutoT text={certificate.category} />
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 break-words">
          <AutoT text={certificate.name} />
        </h1>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed break-words">
          <AutoT text={certificate.summary} />
        </p>
      </header>

      {/* 자격증별 세부사항 (STEP별 정보) */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold mb-4 pb-2 border-b-2 border-gray-300 text-gray-900">
          <AutoT text="자격증별 세부사항" />
        </h2>
        <div className="space-y-6 md:space-y-8">
          {certificate.details.steps.map((step, index) => (
            <StepSection key={index} step={step} />
          ))}
        </div>
      </section>

      {/* 안내/주의사항 */}
      <section className="mt-8 md:mt-10 pt-6 border-t border-gray-300">
        <div className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">
          <AutoT text={certificate.notice} />
        </div>
      </section>
    </div>
  );
}
