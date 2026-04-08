"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function CertificatesProcessPage() {
  return (
    <PageLayout>
      <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
            <AutoT text="자격증 발급 절차" />
          </h1>
        </div>

        {/* 빠른 이동 버튼 */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/certificates"
            className="inline-flex items-center rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <AutoT text="자격증 발급 안내" />
          </Link>
          <Link
            href="/certificates/process"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <AutoT text="자격증 발급 절차" />
          </Link>
        </div>

        <section className="space-y-8 text-gray-900">
          <div>
            <h2 className="mb-3 text-xl font-bold">
              <AutoT text="○ 자격증 발급 절차" />
            </h2>
            <div className="rounded-md border border-gray-300 bg-gray-50 p-6 md:p-10">
              <div className="mx-auto flex h-[300px] max-w-4xl items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 text-center">
                <span className="text-sm text-gray-500">
                  <AutoT text="자격증 발급 절차 이미지 영역 (직접 이미지 추가 예정)" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold">
              <AutoT text="○ 자격증 수령" />
            </h2>
            <div className="space-y-4 pl-2 text-[15px] leading-7">
              <div>
                <p className="font-semibold">
                  <AutoT text="· 소요기간" />
                </p>
                <ul className="list-disc pl-6">
                  <li>
                    <AutoT text="자격증 발급 신청 후 발급완료까지 약 14일 정도 소요됩니다." />
                  </li>
                  <li>
                    <AutoT text="자격증 신청접수자가 많을 경우 교부기간은 조정될 수 있습니다." />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
