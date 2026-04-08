"use client";

import React from "react";
import Link from "next/link";
import { Certificate } from "../../lib/certificates";
import { AutoT } from "../AutoT";

interface CertificateListProps {
  certificates: Certificate[];
}

/**
 * 자격증 리스트 컴포넌트
 * 검색 및 필터 기능 포함
 */
export function CertificateList({ certificates }: CertificateListProps) {
  void certificates;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8">
      {/* 헤더 */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
          <AutoT text="발급 안내" />
        </h1>
      </div>

      {/* 빠른 이동 버튼 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/certificates"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <AutoT text="자격증 발급 안내" />
        </Link>
        <Link
          href="/certificates/process"
          className="inline-flex items-center rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
        >
          <AutoT text="자격증 발급 절차" />
        </Link>
      </div>

      <section className="space-y-8 text-gray-900">
        <div>
          <h2 className="mb-3 text-xl font-bold">
            <AutoT text="○ 자격증 형태 및 샘플이미지보기" />
          </h2>
          <div className="rounded-md border border-gray-300 bg-gray-50 p-6 md:p-10">
            <p className="mb-5 text-center text-sm text-gray-600">
              <AutoT text="* 본 이미지는 예시이미지입니다. 자격기관별로 하단의 자격증 예시 이미지와 다를 수 있습니다." />
            </p>
            <div className="mx-auto flex h-[280px] max-w-2xl items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 text-center">
              <span className="text-sm text-gray-500">
                <AutoT text="자격증 이미지 영역 (직접 이미지 추가 예정)" />
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
                <AutoT text="· 수령방법" />
              </p>
              <p>
                <AutoT text="자격증은 자격증 교부신청서에 신청인이 기재한 주소로 택배 발송됩니다." />
              </p>
            </div>
            <div>
              <p className="font-semibold">
                <AutoT text="· 주의" />
              </p>
              <p>
                <AutoT text="반송될 경우 재발송을 위해 배송비 5,000원을 납부해 주셔야 합니다. (최초 1회 발송만 무료)" />
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">
            <AutoT text="○ 자격증 환불규정" />
          </h2>
          <ul className="list-disc space-y-1 pl-6 text-[15px] leading-7">
            <li>
              <AutoT text="자격증 제작 전 취소 시 100% 환불, 제작 이후 취소 시 환불 불가합니다." />
            </li>
            <li>
              <AutoT text="자격증 제작 관련 문의는 교육원으로 연락주시기 바랍니다." />
            </li>
            <li>
              <AutoT text="받으실 주소 및 연락처를 정확히 입력하지 않아 자격증이 분실될 경우 책임은 본인에게 있으며 환불 또한 불가합니다." />
            </li>
            <li>
              <AutoT text="우편물 수취지가 잘못되어 반송될 경우 재발송은 착불로 배송됩니다." />
            </li>
            <li>
              <AutoT text="자격증 분실로 재발급 할 경우 재발급 비용이 발생하며 받으실 주소 및 연락처를 정확하게 입력해 주셔야 합니다." />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
