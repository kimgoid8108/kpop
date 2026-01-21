"use client";

import React from "react";
import { Certificate } from "../../lib/certificates";
import { InfoTable } from "./InfoTable";
import { AutoT } from "../AutoT";
import { BackButton } from "./BackButton";
import { CertificateDescription } from "./CertificateDescription";

interface CertificateDetailProps {
  certificate: Certificate;
}

/**
 * 자격증 상세 페이지 컴포넌트
 */
export function CertificateDetail({ certificate }: CertificateDetailProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8">
      <BackButton />

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

      {/* 과정 설명 섹션 */}
      <CertificateDescription certificate={certificate} />

      {/* 자격정보 */}
      <InfoTable title="자격정보" data={certificate.qualificationInfo} />

      {/* 기관정보 */}
      <InfoTable title="자격 관리·운영(발급)기관 정보" data={certificate.orgInfo} />

      {/* 안내/주의사항 */}
      <section className="mt-8 md:mt-10 pt-6 border-t border-gray-300">
        <div className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">
          <AutoT text={certificate.notice} />
        </div>
      </section>
    </div>
  );
}
