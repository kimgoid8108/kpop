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

function InfoTable({
  title,
  rows,
}: {
  title: string;
  rows: Row[];
}) {
  return (
    <section className="space-y-3 mb-8">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
        <AutoT text={title} />
      </h3>
      {/* 모바일에서 표가 찌그러지면 가로 스크롤 */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[720px] w-full border border-gray-300 text-sm">
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-b border-gray-300 last:border-b-0">
                <th className="w-40 bg-gray-50 border-r border-gray-300 px-3 py-2 text-left font-medium text-gray-900">
                  {typeof r.label === "string" ? <AutoT text={r.label} /> : r.label}
                </th>
                <td className="border-r border-gray-300 px-3 py-2 text-gray-800">
                  {r.value}
                </td>
                <th className="w-40 bg-gray-50 border-r border-gray-300 px-3 py-2 text-left font-medium text-gray-900">
                  {r.label2 ? (typeof r.label2 === "string" ? <AutoT text={r.label2} /> : r.label2) : ""}
                </th>
                <td className="px-3 py-2 text-gray-800">
                  {r.value2 ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

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

export default function CertificatesRelatedPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="자격증 분류 및 정보" />
          </h1>
          {CERTIFICATE_INFO.map((info) => (
            <section
              key={info.title}
              className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8 mb-10"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-indigo-700">
                <AutoT text={info.title} />
              </h2>
              <div className="mb-4 text-gray-900 text-base">{info.desc}</div>
              <InfoTable title={`${info.title} 자격 정보`} rows={info.rows} />
            </section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
