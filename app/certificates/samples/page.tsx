"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { useAutoTranslate } from "../../../components/useAutoTranslate";

function SampleCertificateImage({
  src,
  altKo,
}: {
  src: string;
  altKo: string;
}) {
  const alt = useAutoTranslate(altKo);
  return (
    <img
      src={src}
      alt={alt}
      className="object-contain max-h-full max-w-full rounded"
    />
  );
}

export default function CertificatesSamplesPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="분야별 자격증 샘플 이미지" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-rows-1 gap-4 mt-6">
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="aspect-video rounded flex items-center justify-center flex-col">
                  <SampleCertificateImage
                    src="/dancefit.png"
                    altKo="자격증 샘플 이미지 (댄스핏)"
                  />
                  <span><AutoT text="댄스핏 자격증 샘플 이미지"/></span>
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="aspect-video rounded flex items-center justify-center flex-col">
                <SampleCertificateImage
                    src="/dance.png"
                    altKo="자격증 샘플 이미지 (댄스)"
                  />
                  <span><AutoT text="댄스 자격증 샘플 이미지"/></span>
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="aspect-video rounded flex items-center justify-center flex-col">
                <SampleCertificateImage
                    src="/vocal.png"
                    altKo="자격증 샘플 이미지 (보컬)"
                  />
                  <span><AutoT text="보컬 자격증 샘플 이미지"/></span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
