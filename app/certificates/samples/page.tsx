"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function CertificatesSamplesPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="샘플 이미지" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="자격증 샘플 이미지를 확인하실 수 있습니다." />
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-400">
                    <AutoT text="샘플 이미지 1" />
                  </span>
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-400">
                    <AutoT text="샘플 이미지 2" />
                  </span>
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-400">
                    <AutoT text="샘플 이미지 3" />
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
