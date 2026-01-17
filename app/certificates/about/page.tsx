"use client";

import React, { useState } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

const TYPES = [
  { label: "댄스", value: "dance" },
  { label: "케이팝", value: "kpop" },
  { label: "보컬", value: "vocal" },
];

const LEVELS = [
  { label: "1급", value: 1 },
  { label: "2급", value: 2 },
];

const CERTIFICATE_INFO: Record<
  string,
  { [key: number]: { name: string; description: string; career: string } }
> = {
  dance: {
    1: {
      name: "댄스 1급",
      description: "전문가 수준의 댄스 실력과 지도 능력을 검정하는 자격증입니다.",
      career: "댄스 전문강사, 댄스학원 원장, 공연단/엔터테인먼트 등",
    },
    2: {
      name: "댄스 2급",
      description: "기본기와 창작능력을 갖추었음을 인정하는 입문/실무자용 자격증입니다.",
      career: "초·중등 댄스강사, 댄스팀원 등",
    },
  },
  kpop: {
    1: {
      name: "케이팝 1급",
      description: "케이팝 분야 최고 수준의 역량을 입증할 수 있는 자격증입니다.",
      career: "K-POP 지도자, 키즈/청소년 K-POP 전문학원 강사",
    },
    2: {
      name: "케이팝 2급",
      description: "케이팝 기초와 실기능력을 평가하는 자격증입니다.",
      career: "엔터테인먼트 실무, 청소년 K-POP 프로그램 강사 등",
    },
  },
  vocal: {
    1: {
      name: "보컬 1급",
      description: "보컬 분야의 전문성과 지도능력을 검정하는 자격증입니다.",
      career: "보컬 트레이너, 예술교육기관 강사, 뮤지션 등",
    },
    2: {
      name: "보컬 2급",
      description: "노래 및 보컬기초 관련 실무능력을 인증하는 자격증입니다.",
      career: "입시전문 강사, 음악 동아리 지도자 등",
    },
  },
};

function CertificatesSelector() {
  const [selectedType, setSelectedType] = useState("dance");
  const [selectedLevel, setSelectedLevel] = useState(1);

  const cert = CERTIFICATE_INFO[selectedType]?.[selectedLevel];

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {TYPES.map((t) => (
          <button
            key={t.value}
            className={`px-4 py-2 rounded-full font-semibold border transition ${
              selectedType === t.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
            }`}
            onClick={() => setSelectedType(t.value)}
            type="button"
          >
            <AutoT text={t.label} />
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        {LEVELS.map((l) => (
          <button
            key={l.value}
            className={`px-4 py-1 rounded-full font-semibold border transition ${
              selectedLevel === l.value
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400"
            }`}
            onClick={() => setSelectedLevel(l.value)}
            type="button"
          >
            <AutoT text={l.label} />
          </button>
        ))}
      </div>

      {cert && (
        <div className="bg-gray-50 rounded-lg p-5 shadow-inner">
          <h2 className="text-xl font-bold mb-2 text-indigo-700">
            <AutoT text={cert.name} />
          </h2>
          <p className="mb-2 text-gray-800">
            <AutoT text={cert.description} />
          </p>
          <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
            <li>
              <AutoT text="분야: " />
              <AutoT text={TYPES.find((t) => t.value === selectedType)?.label || ""} />
            </li>
            <li>
              <AutoT text="수준: " />
              <AutoT text={LEVELS.find((l) => l.value === selectedLevel)?.label || ""} />
            </li>
            <li>
              <b><AutoT text="진로 예시: " /></b>
              <AutoT text={cert.career} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function CertificatesAboutPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="자격증 소개 및 진로" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-8 text-lg text-gray-800 leading-relaxed">
              <AutoT text="분야별, 수준별로 선택할 수 있는 자격증을 소개합니다." />
            </p>
            <CertificatesSelector />
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
