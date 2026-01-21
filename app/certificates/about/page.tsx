"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

type CertificateInfo = {
  name: string;
  description: string;
  types: {
    label: string;
    levels: {
      name: string;
      desc: string;
    }[];
  }[];
};

const CERTIFICATES: CertificateInfo[] = [
  {
    name: "1. 댄스트레이너 과정",
    description: `댄스트레이너 과정은 국내외 모든 연령층의 사람들을 대상으로 안무와 음악을 활용해
    건강한 육체의 균형적 발달 및 훈련법에 관한 전문지식과 기술 교육을 체계적으로 이수할 수 있도록 설계되었습니다.

자격증 취득 이후, 방송, 연예기획사, 평생교육원, 학원, 교습소, 문화센터, 방과 후 학교 등 댄스 활용분야에서 교육 프로그램 기획과 개발,
교육 및 지도업무를 수행할 수 있도록 청년 댄스 트레이너로서의 안정적 비전수립과 일자리 창출을 위한 기반을 제공합니다.

`,
    types: [
      {
        label: "댄스트레이너",
        levels: [
          {
            name: "2급",
            desc: `방송댄스, 커버댄스, 스포츠교육학 및 윤리, 트레이닝론 등을 이수하여, 댄스 초보자, 취미자 등을 대상으로 교육 및 지도업무를 수행할 수 있는 트레이너로 활동할 수 있습니다.`,
          },
          {
            name: "1급",
            desc: `코레오그래피 (걸리쉬, 힐코레오, 케이팝코레오 등), 스포츠경영학 등을 이수하여, 댄스 전문가를 희망하는 지망생 등을 대상으로 교육 프로그램 기획과 개발, 교육 및 지도업무를 수행할 수 있는 상급 트레이너로 활동할 수 있습니다.`,
          },
        ],
      },
    ],
  },
  {
    name: "2. 보컬트레이너 과정",
    description: `보컬트레이너 과정은 국내외 모든 연령층의 사람들을 대상으로 보컬을 활용해
    대중문화와의 균형적 발달 및 훈련법에 관한 전문지식과 기술 교육을 체계적으로 이수할 수 있도록 설계되었습니다.

방송, 연예기획사, 학교, 평생교육원, 학원, 교습소, 문화센터, 방과 후 학교 등 음악 활용 분야에서 교육 프로그램 기획과 개발,
교육 및 지도업무를 수행할 수 있도록 청년 보컬 트레이너로서의 안정적 비전수립과 일자리 창출을 위한 기반을 제공합니다.

`,
    types: [
      {
        label: "보컬트레이너",
        levels: [
          {
            name: "2급",
            desc: `실용음악개론, 가창과 기악, 발성과 리듬, 보컬 멘토링, 가창테크닉, 보컬마스터, 실전음악 1,2 등을 이수하여, 보컬 초보자, 취미자 등을 대상으로 교육 및 지도업무를 수행할 수 있는 트레이너로 활동할 수 있습니다.`,
          },
          {
            name: "1급",
            desc: `실용음악개론, 가창과 기악, 발성과 리듬, 보컬 멘토링, 가창테크닉, 보컬마스터, 실전음악 1,2 등을 이수하여, 보컬 전문가를 희망하는 지망생 등을 대상으로 교육 프로그램 기획과 개발, 교육 및 지도업무를 수행할 수 있는 상급 트레이너로 활동할 수 있습니다.`,
          },
        ],
      },
    ],
  },
  {
    name: "3. 케이팝댄스핏트레이너 과정",
    description: `케이팝댄스핏트레이너 과정은 국내외 모든 연령층의 사람들을 대상으로
    케이팝 안무와 음악을 활용한 피트니스(운동법)에 관한 전문지식과 기술을 체계적으로 이수할 수 있도록 설계되었습니다.

스포츠센터, 문화센터, 복지시설, 방송, 연예기획사, 평생교육원, 학원, 교습소, 방과 후 학교 등
댄스 피트니스 활용분야에서 교육 프로그램 기획과 개발,교육 및 지도업무를 수행할 수 있도록 청년 댄스핏 트레이너로서의
안정적 비전수립과 일자리 창출을 위한 기반을 제공합니다.

`,
    types: [
      {
        label: "케이팝댄스핏트레이너",
        levels: [
          {
            name: "2급",
            desc: `방송댄스, 커버댄스, 다이어트와 체형관리, 스포츠교육학 및 윤리, 트레이닝론 등을 이수하여, 댄스 피트니스 초보자, 취미자 등을 대상으로 교육 및 지도업무를 수행할 수 있는 트레이너로 활동할 수 있습니다.`,
          },
          {
            name: "1급",
            desc: `코레오그래피 (걸리쉬, 힐코레오, 케이팝코레오 등), 바디트리트먼트, 바디컨디셔닝, 음악치료, 운동처방, 스포츠경영학 등을 이수하여, 댄스 피트니스 전문가를 희망하는 지망생 등을 대상으로 교육 프로그램 기획과 개발, 교육 및 지도업무를 수행할 수 있는 상급 트레이너로 활동할 수 있습니다.`,
          },
        ],
      },
    ],
  },
];

function ProcessCertificateBlock({
  cert,
}: {
  cert: CertificateInfo;
}) {
  return (
    <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8 mb-10">
      <h2 className="text-xl font-bold mb-4 text-indigo-700 font-bold">
        <AutoT text={cert.name} />
      </h2>
      <div className="mb-4 whitespace-pre-line text-gray-900 text-base">
        <AutoT text={cert.description} />
      </div>

    </section>
  );
}

export default function CertificatesAboutPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="자격증 소개" />
          </h1>
          {CERTIFICATES.map((cert, idx) => (
            <ProcessCertificateBlock key={cert.name + idx} cert={cert} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
