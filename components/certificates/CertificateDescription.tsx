"use client";

import React from "react";
import { Certificate } from "../../lib/certificates";
import { AutoT } from "../AutoT";

interface CertificateDescriptionProps {
  certificate: Certificate;
}

/**
 * 자격증 과정 설명 컴포넌트
 */
export function CertificateDescription({ certificate }: CertificateDescriptionProps) {
  return (
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
  );
}
