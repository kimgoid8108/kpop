"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

type Row = {
  label: React.ReactNode;
  value: React.ReactNode;
  label2?: React.ReactNode;
  value2?: React.ReactNode;
};

const CERTIFICATE_INFO: {
  title: string;
  rows: Row[];
  desc: React.ReactNode;
}[] = [
  {
    title: "댄스트레이너",
    desc: (
      <>
        <p className="mb-2">
          <AutoT text="댄스트레이너 과정은 국내외 모든 연령층의 사람들을 대상으로 안무와 음악을 활용해 건강한 육체의 균형적 발달 및 훈련법에 관한 전문지식과 기술 교육을 체계적으로 이수할 수 있도록 설계되었습니다." />
        </p>
        <ul className="list-disc ml-6 text-gray-800 mb-2">
          <li>
            <AutoT text="2급: 방송댄스, 커버댄스, 스포츠교육학 및 윤리, 트레이닝론 등을 이수하여, 댄스 초보자, 취미자 등을 대상으로 교육 및 지도업무를 수행할 수 있습니다." />
          </li>
          <li>
            <AutoT text="1급: 코레오그래피(걸리쉬, 힐코레오, 케이팝코레오 등), 스포츠경영학 등을 이수하여, 댄스 전문가를 희망하는 지망생 등을 대상으로 상급 트레이너로 활동할 수 있습니다." />
          </li>
        </ul>
      </>
    ),
    rows: [
      {
        label: <AutoT text="자격명" />,
        value: (
          <div className="space-y-1">
            <div><AutoT text="[종목] 댄스트레이너"/></div>
            <div><AutoT text="[등급] 1급/2급"/></div>
          </div>
        ),
        label2: <AutoT text="자격의 종류" />,
        value2: <AutoT text="등록민간자격" />,
      },
      {
        label: <AutoT text="등록번호" />,
        value: <AutoT text="제 2024-000336_호" />,
        label2: <AutoT text="자격발급기관" />,
        value2: <AutoT text="글로벌사이버대학교" />,
      },
      {
        label: <AutoT text="기관명" />,
        value: <AutoT text="글로벌사이버대학교" />,
        label2: <AutoT text="대표자" />,
        value2: <AutoT text="유병영" />,
      },
      {
        label: <AutoT text="연락처" />,
        value: <AutoT text="02-2160-1171" />,
        label2: <AutoT text="이메일" />,
        value2: (
          <a
            href="mailto:broaden@global.ac.kr"
            className="text-blue-600 hover:underline"
          >
            <AutoT text="broaden@global.ac.kr" />
          </a>
        ),
      },
      {
        label: <AutoT text="소재지" />,
        value: (
          <div className="space-y-1">
            <div><AutoT text="충남 천안시 동남구"/></div>
            <div><AutoT text="목천읍 지산리 189-4"/></div>
          </div>
        ),
        label2: <AutoT text="홈페이지" />,
        value2: (
          <a
            href="https://www.global.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            <AutoT text="https://www.global.ac.kr/"/>
          </a>
        ),
      },
    ],
  },
  {
    title: "보컬트레이너",
    desc: (
      <>
        <p className="mb-2">
          <AutoT text="보컬트레이너 과정은 국내외 모든 연령층의 사람들을 대상으로 보컬을 활용해 대중문화와의 균형적 발달 및 훈련법에 관한 전문지식과 기술 교육을 체계적으로 이수할 수 있도록 설계되었습니다." />
        </p>
        <ul className="list-disc ml-6 text-gray-800 mb-2">
          <li>
            <AutoT text="2급: 실용음악개론, 가창과 기악, 발성과 리듬, 보컬 멘토링, 가창테크닉, 보컬마스터, 실전음악 1,2 등을 이수하여, 보컬 초보자, 취미자 등을 대상으로 교육 및 지도업무를 수행할 수 있습니다." />
          </li>
          <li>
            <AutoT text="1급: 실용음악개론, 가창과 기악, 발성과 리듬, 보컬 멘토링, 가창테크닉, 보컬마스터, 실전음악 1,2 등을 이수하여, 보컬 전문가를 희망하는 지망생 등을 대상으로 상급 트레이너로 활동할 수 있습니다." />
          </li>
        </ul>
      </>
    ),
    rows: [
      {
        label: <AutoT text="자격명" />,
        value: (
          <div className="space-y-1">
            <div><AutoT text="[종목] 보컬트레이너"/></div>
            <div><AutoT text="[등급] 1급/2급"/></div>
          </div>
        ),
        label2: <AutoT text="자격의 종류" />,
        value2: <AutoT text="등록민간자격" />,
      },
      {
        label: <AutoT text="등록번호" />,
        value: <AutoT text="제 2024-000337_호" />,
        label2: <AutoT text="자격발급기관" />,
        value2: <AutoT text="글로벌사이버대학교" />,
      },
      {
        label: <AutoT text="기관명" />,
        value: <AutoT text="글로벌사이버대학교" />,
        label2: <AutoT text="대표자" />,
        value2: <AutoT text="유병영" />,
      },
      {
        label: <AutoT text="연락처" />,
        value: <AutoT text="02-2160-1171" />,
        label2: <AutoT text="이메일" />,
        value2: (
          <a
            href="mailto:broaden@global.ac.kr"
            className="text-blue-600 hover:underline"
          >
            <AutoT text="broaden@global.ac.kr" />
          </a>
        ),
      },
      {
        label: <AutoT text="소재지" />,
        value: (
          <div className="space-y-1">
            <div><AutoT text="충남 천안시 동남구"/></div>
            <div><AutoT text="목천읍 지산리 189-4"/></div>
          </div>
        ),
        label2: <AutoT text="홈페이지" />,
        value2: (
          <a
            href="https://www.global.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            <AutoT text="https://www.global.ac.kr/"/>
          </a>
        ),
      },
    ],
  },
  {
    title: "케이팝댄스핏트레이너",
    desc: (
      <>
        <p className="mb-2">
          <AutoT text="케이팝댄스핏트레이너 과정은 국내외 모든 연령층의 사람들을 대상으로 케이팝 안무와 음악을 활용한 피트니스(운동법)에 관한 전문지식과 기술을 체계적으로 이수할 수 있도록 설계되었습니다." />
        </p>
        <ul className="list-disc ml-6 text-gray-800 mb-2">
          <li>
            <AutoT text="2급: 방송댄스, 커버댄스, 다이어트와 체형관리, 스포츠교육학 및 윤리, 트레이닝론 등을 이수하여, 댄스 피트니스 초보자, 취미자 등을 대상으로 교육 및 지도업무를 수행할 수 있습니다." />
          </li>
          <li>
            <AutoT text="1급: 코레오그래피(걸리쉬, 힐코레오, 케이팝코레오 등), 바디트리트먼트, 바디컨디셔닝, 음악치료, 운동처방, 스포츠경영학 등을 이수하여, 댄스 피트니스 전문가를 희망하는 지망생 등을 대상으로 상급 트레이너로 활동할 수 있습니다." />
          </li>
        </ul>
      </>
    ),
    rows: [
      {
        label: <AutoT text="자격명" />,
        value: (
          <div className="space-y-1">
            <div><AutoT text="[종목] 케이팝댄스핏트레이너"/></div>
            <div><AutoT text="[등급] 1급/2급"/></div>
          </div>
        ),
        label2: <AutoT text="자격의 종류" />,
        value2: <AutoT text="등록민간자격" />,
      },
      {
        label: <AutoT text="등록번호" />,
        value: <AutoT text="제 2024-000338_호" />,
        label2: <AutoT text="자격발급기관" />,
        value2: <AutoT text="글로벌사이버대학교" />,
      },
      {
        label: <AutoT text="기관명" />,
        value: <AutoT text="글로벌사이버대학교" />,
        label2: <AutoT text="대표자" />,
        value2: <AutoT text="유병영" />,
      },
      {
        label: <AutoT text="연락처" />,
        value: <AutoT text="02-2160-1171" />,
        label2: <AutoT text="이메일" />,
        value2: (
          <a
            href="mailto:broaden@global.ac.kr"
            className="text-blue-600 hover:underline"
          >
            <AutoT text="broaden@global.ac.kr" />
          </a>
        ),
      },
      {
        label: <AutoT text="소재지" />,
        value: (
          <div className="space-y-1">
            <div><AutoT text="충남 천안시 동남구"/></div>
            <div><AutoT text="목천읍 지산리 189-4"/></div>
          </div>
        ),
        label2: <AutoT text="홈페이지" />,
        value2: (
          <a
            href="https://www.global.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            <AutoT text="https://www.global.ac.kr/"/>
          </a>
        ),
      },
    ],
  },
];

// Helper to pick certificate rows by index
function getCertificateRows(idx: number) {
  return CERTIFICATE_INFO[idx]?.rows || [];
}
function getCertificateDesc(idx: number) {
  return CERTIFICATE_INFO[idx]?.desc || null;
}

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

// 표 컴포넌트
function CertificateTable({ rows }: { rows: Row[] }) {
  if (!rows.length) return null;
  return (
    <table className="w-full mt-4 mb-6 border border-gray-200 rounded overflow-hidden">
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} className="even:bg-gray-50 text-gray-900">
            <th className="py-2 px-3 text-left align-top font-medium bg-gray-100 w-28 md:w-40 border-b border-gray-200">{row.label}</th>
            <td className="py-2 px-3 align-top border-b border-gray-200">{row.value}</td>
            {row.label2 && (
              <>
                <th className="py-2 px-3 text-left align-top font-medium bg-gray-100 w-28 md:w-40 border-b border-gray-200">{row.label2}</th>
                <td className="py-2 px-3 align-top border-b border-gray-200">{row.value2}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// 각 과정 블록
function ProcessCertificateBlock({
  cert,
  idx,
}: {
  cert: CertificateInfo;
  idx: number;
}) {
  return (
    <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8 mb-10">
      <h2 className="text-xl font-bold mb-4 text-indigo-700 font-bold">
        <AutoT text={cert.name} />
      </h2>
      <div className="mb-4 whitespace-pre-line text-gray-900 text-base">
        <AutoT text={cert.description} />
      </div>
      {/* 자격증 상세 설명 */}
      <div className="mb-6">
        {getCertificateDesc(idx)}
      </div>
      {/* 표 */}
      <CertificateTable rows={getCertificateRows(idx)} />
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
            <ProcessCertificateBlock key={cert.name + idx} cert={cert} idx={idx} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
