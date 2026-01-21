"use client";

import React from "react";
import Link from "next/link";
import { Certificate } from "../../lib/certificates";
import { InfoTable } from "./InfoTable";
import { AutoT } from "../AutoT";

interface CertificateDetailProps {
  certificate: Certificate;
}

/**
 * 자격증 상세 페이지 컴포넌트
 */
export function CertificateDetail({ certificate }: CertificateDetailProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8">
      {/* 뒤로가기 */}
      <Link
        href="/certificates"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <AutoT text="목록으로 돌아가기" />
      </Link>

      {/* 상단: 자격증명 + 소개 */}
      <header className="mb-8 md:mb-10">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">
            {certificate.category}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 break-words">
          {certificate.name}
        </h1>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed break-words">
          <AutoT text={certificate.summary} />
        </p>
      </header>

      {/* 과정 설명 섹션 */}
      <section className="mb-8 md:mb-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
          <AutoT text={`▶${certificate.name} 과정`} />
        </h2>
        <div className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed">
          <p className="break-words">
            <AutoT text={certificate.description.intro} />
          </p>
          <p className="break-words">
            <AutoT text={certificate.description.career} />
          </p>
          <div className="mt-6">
            <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">
              <AutoT text="1. 자격증 분류" />
            </h3>
            <div className="space-y-4">
              {certificate.description.levels.map((levelInfo, index) => (
                <div key={index} className="pl-4 border-l-4 border-blue-500">
                  <p className="font-semibold text-gray-900 mb-1">
                    <AutoT text={`·${certificate.name} ${levelInfo.level}`} />
                  </p>
                  <p className="text-gray-700 break-words">
                    <AutoT text={`: ${levelInfo.courses}을 이수하여, ${levelInfo.target}`} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 A: 자격정보 */}
      <InfoTable title="자격정보" data={certificate.qualificationInfo} />

      {/* 섹션 B: 자격 관리·운영(발급)기관 정보 */}
      <InfoTable title="자격 관리·운영(발급)기관 정보" data={certificate.orgInfo} />

      {/* 섹션 C: 안내/주의사항 */}
      <section className="mt-8 md:mt-10 pt-6 border-t border-gray-300">
        <div className="text-xs md:text-sm text-gray-600 leading-relaxed whitespace-pre-line break-words">
          <AutoT text={certificate.notice} />
        </div>
      </section>
    </div>
  );
}
