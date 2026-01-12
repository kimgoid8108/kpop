"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function CertificatesAboutPage() {
  const certificatesMenu = submenuData.find(
    (menu) => menu.label === "취득 자격증"
  );

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {certificatesMenu && (
          <Sidebar
            title={certificatesMenu.label}
            items={certificatesMenu.submenu}
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            자격증 소개 및 진로
          </h1>
          {/* 분야 및 수준별 자격증 선택 UI */}
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-8 text-lg text-gray-800 leading-relaxed">
              분야별, 수준별로 선택할 수 있는 자격증을 소개합니다.
            </p>
            {/* CertificatesSelector 컴포넌트가 정의되지 않았으므로, 아래와 같이 파일 내에 직접 구현하여 사용합니다. */}
            {(() => {
              // UI 상태를 위한 useState import
              const React = require("react");
              const { useState } = React;

              // 동일 데이터와 유형/레벨
              const TYPES = [
                { label: "댄스", value: "dance" },
                { label: "케이팝", value: "kpop" },
                { label: "보컬", value: "vocal" },
              ];
              const LEVELS = [
                { label: "1급", value: 1 },
                { label: "2급", value: 2 },
              ];
              const CERTIFICATE_INFO = {
                dance: {
                  1: {
                    name: "댄스 1급",
                    description:
                      "전문가 수준의 댄스 실력과 지도 능력을 검정하는 자격증입니다.",
                  },
                  2: {
                    name: "댄스 2급",
                    description:
                      "기본기와 창작능력을 갖추었음을 인정하는 입문/실무자용 자격증입니다.",
                  },
                },
                kpop: {
                  1: {
                    name: "케이팝 1급",
                    description:
                      "케이팝 분야 최고 수준의 역량을 입증할 수 있는 자격증입니다.",
                  },
                  2: {
                    name: "케이팝 2급",
                    description:
                      "케이팝 기초와 실기능력을 평가하는 자격증입니다.",
                  },
                },
                vocal: {
                  1: {
                    name: "보컬 1급",
                    description:
                      "보컬 분야의 전문성과 지도능력을 검정하는 자격증입니다.",
                  },
                  2: {
                    name: "보컬 2급",
                    description:
                      "노래 및 보컬기초 관련 실무능력을 인증하는 자격증입니다.",
                  },
                },
              };

              function CertificatesSelector() {
                const [selectedType, setSelectedType] = useState("dance");
                const [selectedLevel, setSelectedLevel] = useState(1);

                const selectedTypeKey =
                  selectedType as keyof typeof CERTIFICATE_INFO;
                const selectedLevelKey =
                  selectedLevel as keyof (typeof CERTIFICATE_INFO)[typeof selectedTypeKey];
                const info =
                  CERTIFICATE_INFO[selectedTypeKey]?.[selectedLevelKey];

                return (
                  <div>
                    <div className="flex gap-4 mb-4">
                      {TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          className={`px-4 py-2 rounded-full border font-semibold transition ${
                            selectedType === type.value
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                          }`}
                          onClick={() => setSelectedType(type.value)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-4 mb-6">
                      {LEVELS.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          className={`px-4 py-1.5 rounded-full border font-semibold transition ${
                            selectedLevel === level.value
                              ? "bg-indigo-500 text-white border-indigo-500"
                              : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                          }`}
                          onClick={() => setSelectedLevel(level.value)}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border text-gray-800 mb-2">
                      <h2 className="text-lg font-bold mb-2">{info?.name}</h2>
                      <div className="text-base">{info?.description}</div>
                    </div>
                  </div>
                );
              }

              // 실제 렌더링 - SSR 환경에서도 안전하게 작동
              return <CertificatesSelector />;
            })()}
          </section>
          {/* 분야/수준별 자격증 컴포넌트 정의 (동일 파일 내) */}
          {(() => {
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
              { [key: number]: { name: string; description: string } }
            > = {
              dance: {
                1: {
                  name: "댄스 1급",
                  description:
                    "전문가 수준의 댄스 실력과 지도 능력을 검정하는 자격증입니다.",
                },
                2: {
                  name: "댄스 2급",
                  description:
                    "기본기와 창작능력을 갖추었음을 인정하는 입문/실무자용 자격증입니다.",
                },
              },
              kpop: {
                1: {
                  name: "케이팝 1급",
                  description:
                    "케이팝 분야 최고 수준의 역량을 입증할 수 있는 자격증입니다.",
                },
                2: {
                  name: "케이팝 2급",
                  description:
                    "케이팝 기초와 실기능력을 평가하는 자격증입니다.",
                },
              },
              vocal: {
                1: {
                  name: "보컬 1급",
                  description:
                    "보컬 분야의 전문성과 지도능력을 검정하는 자격증입니다.",
                },
                2: {
                  name: "보컬 2급",
                  description:
                    "노래 및 보컬기초 관련 실무능력을 인증하는 자격증입니다.",
                },
              },
            };

            function CertificatesSelector() {
              const [selectedType, setSelectedType] = React.useState("dance");
              const [selectedLevel, setSelectedLevel] = React.useState(1);

              const cert = CERTIFICATE_INFO[selectedType][selectedLevel];

              return (
                <div>
                  {/* 분야 선택 */}
                  <div className="flex gap-3 mb-4">
                    {TYPES.map((t) => (
                      <button
                        key={t.value}
                        className={`px-4 py-2 rounded-full font-semibold border transition
                          ${
                            selectedType === t.value
                              ? "bg-indigo-600 text-white border-indigo-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
                          }
                        `}
                        onClick={() => setSelectedType(t.value)}
                        type="button"
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* 수준 선택 */}
                  <div className="flex gap-3 mb-6">
                    {LEVELS.map((l) => (
                      <button
                        key={l.value}
                        className={`px-4 py-1 rounded-full font-semibold border transition
                          ${
                            selectedLevel === l.value
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white text-gray-700 border-gray-300 hover:border-emerald-400"
                          }
                        `}
                        onClick={() => setSelectedLevel(l.value)}
                        type="button"
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>

                  {/* 자격증 상세 안내 영역 */}
                  <div className="bg-gray-50 rounded-lg p-5 shadow-inner">
                    <h2 className="text-xl font-bold mb-2 text-indigo-700">
                      {cert.name}
                    </h2>
                    <p className="mb-2 text-gray-800">{cert.description}</p>
                    <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                      <li>
                        분야:{" "}
                        {TYPES.find((t) => t.value === selectedType)?.label}
                      </li>
                      <li>
                        수준:{" "}
                        {LEVELS.find((l) => l.value === selectedLevel)?.label}
                      </li>
                      <li>
                        <b>진로 예시:</b>{" "}
                        {selectedType === "dance"
                          ? selectedLevel === 1
                            ? "댄스 전문강사, 댄스학원 원장, 공연단/엔터테인먼트 등"
                            : "초·중등 댄스강사, 댄스팀원 등"
                          : selectedType === "kpop"
                          ? selectedLevel === 1
                            ? "K-POP 지도자, 키즈/청소년 K-POP 전문학원 강사"
                            : "엔터테인먼트 실무, 청소년 K-POP 프로그램 강사 등"
                          : selectedType === "vocal"
                          ? selectedLevel === 1
                            ? "보컬 트레이너, 예술교육기관 강사, 뮤지션 등"
                            : "입시전문 강사, 음악 동아리 지도자 등"
                          : ""}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            }

            // JSX 호출부 반환 (컴포넌트 밖에선 사용 불가하므로 렌더링시 바로 사용)
            return null;
          })()}
        </div>
      </div>
    </PageLayout>
  );
}
