"use client";

import React from "react";
import Link from "next/link";
import { Certificate } from "../../lib/certificates";
import { AutoT } from "../AutoT";

interface CertificateCardProps {
  certificate: Certificate;
}

/**
 * 자격증 카드 컴포넌트
 */
export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Link
      href={`/certificates/${certificate.id}`}
      className="block p-4 md:p-6 bg-white border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="mb-3">
        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mb-2">
          <AutoT text={certificate.category} />
        </span>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 break-words">
          <AutoT text={certificate.name} />
        </h3>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-semibold">
            <AutoT text="등급" />:{" "}
          </span>
          <span className="break-words">
            <AutoT text={certificate.levels} />
          </span>
        </div>
        <div>
          <span className="font-semibold">
            <AutoT text="등록번호" />:{" "}
          </span>
          <span className="break-words">
            <AutoT text={certificate.registrationNumber} />
          </span>
        </div>
        <div>
          <span className="font-semibold">
            <AutoT text="발급기관" />:{" "}
          </span>
          <span className="break-words">
            <AutoT text={certificate.issuingOrg} />
          </span>
        </div>
      </div>
      <div className="mt-4 text-sm text-blue-600">
        <AutoT text="자세히 보기 →" />
      </div>
    </Link>
  );
}
