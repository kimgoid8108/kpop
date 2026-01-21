"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageLayout } from "../../../../components/PageLayout";
import { CertificateRelatedDetail } from "../../../../components/certificates/CertificateRelatedDetail";
import { getCertificateById } from "../../../../lib/certificates";
import { AutoT } from "../../../../components/AutoT";

export default function CertificateRelatedDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const certificate = getCertificateById(id);

  if (!certificate) {
    return (
      <PageLayout>
        <div className="w-full overflow-x-hidden">
          <div className="w-full max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              <AutoT text="자격증을 찾을 수 없습니다" />
            </h1>
            <p className="text-gray-600 mb-6">
              <AutoT text="요청하신 자격증 정보가 존재하지 않습니다." />
            </p>
            <Link
              href="/certificates/related"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <AutoT text="목록으로 돌아가기" />
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="w-full overflow-x-hidden">
        <CertificateRelatedDetail certificate={certificate} />
      </div>
    </PageLayout>
  );
}
