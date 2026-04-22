"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

const COMMITTEES = [
  "자격검정위원회",
  "음악교육연구위원회",
  "댄스교육연구위원회",
  "콘텐츠개발위원회",
  "산학협력위원회",
  "공연예술위원회",
] as const;

export default function AboutPage() {
  const [activeTab, setActiveTab] = React.useState<"about" | "org">("about");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="진흥원 소개" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <div className="mb-8 md:mb-10">
              <div
                role="tablist"
                aria-label="about page sections"
                className="grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "about"}
                  onClick={() => setActiveTab("about")}
                  className={`rounded-md px-3 py-2 text-sm md:text-base font-semibold transition ${
                    activeTab === "about"
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <AutoT text="케이팝 진흥원이란?" />
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "org"}
                  onClick={() => setActiveTab("org")}
                  className={`rounded-md px-3 py-2 text-sm md:text-base font-semibold transition ${
                    activeTab === "org"
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <AutoT text="조직도" />
                </button>
              </div>
            </div>

            <div className="w-full">
              {activeTab === "about" && (
                <div className="w-full max-w-4xl mx-auto">
                  <p className="mb-4 text-lg text-gray-800 leading-relaxed">
                    <b className="text-indigo-700">
                      <AutoT text="글로벌케이팝 진흥원이란?" />
                    </b>
                    <br />
                    <AutoT text="글로벌케이팝진흥원은 지난 15여년간 500여명의 아티스트를 배출해낸 글로벌사이버대학교 방송연예학과의 교육시스템을 발판으로 지속적으로 세계적인 인재를 양성하는 곳입니다." />{" "}
                    <br />
                    <AutoT text="K-POP의 요람이라 불리며 수많은 아티스트들의 출발점이 되어준 일지아트홀을 통한 산업과의 교류를 통해 공연, 영상, 음악 등의 콘텐츠뿐만이 아닌" />{" "}
                    <br />
                    <AutoT text="출판, 전시, 굿즈 등 2차 IP의 개발을 통해 글로벌 팬들과 함께하는 케이팝의 놀이터이자 터전이 될 것을 약속 드립니다." />
                  </p>
                  <div className="space-y-4 md:space-y-6 my-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-lg border shadow bg-gray-50 p-5 flex flex-col items-center">
                        <span className="text-2xl mb-2">🎤</span>
                        <h3 className="font-bold text-indigo-700 mb-1">
                          <AutoT text="인재 양성 사업 교육" />
                        </h3>
                        <p className="text-gray-700 text-sm text-center my-2">
                          - <AutoT text="케이팝전문가양성과정" /> -
                        </p>
                        <p className="text-gray-700 text-sm text-center my-2">
                          - <AutoT text="한류교육과정 해외보급" /> -
                        </p>
                      </div>
                      <div className="rounded-lg border shadow bg-gray-50 p-5 flex flex-col items-center">
                        <span className="text-2xl mb-2">🌐</span>
                        <h3 className="font-bold text-indigo-700 mb-1">
                          <AutoT text="콘텐츠 프로덕션" />
                        </h3>
                        <p className="text-gray-700 text-sm text-center my-2">
                          - <AutoT text="케이팝 공연" /> -
                        </p>
                        <p className="text-gray-700 text-sm text-center my-2">
                          - <AutoT text="케이팝 영상 스튜디오" /> -
                        </p>
                        <p className="text-gray-700 text-sm text-center my-2">
                          - <AutoT text="한류 행사 등" /> -
                        </p>
                      </div>
                      <div className="rounded-lg border shadow bg-gray-50 p-5 flex flex-col items-center">
                        <span className="text-2xl mb-2">🤝</span>
                        <h3 className="font-bold text-indigo-700 mb-1">
                          <AutoT text="K-POP 플랫폼" />
                        </h3>
                        <p className="text-gray-700 text-sm text-center my-2">
                          - <AutoT text="케이팝 홍보관 운영" /> -
                        </p>
                        <p className="text-gray-700 text-sm text-center my-2">
                          - <AutoT text="글로벌 IP 유통" /> - <br />(
                          <AutoT text="교육 전시 등" />)
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-indigo-500 pl-4 my-20">
                      <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                        <AutoT text="발전 방향" />
                      </h2>
                      <p className="text-gray-700">
                        <AutoT text="글로벌케이팝진흥원은 스타들과 팬들이 함께 즐기며 콘텐츠를 만들면서 서로간의 문화를 공유하고 소통하는 하나의 문화 시그니처로 역할을 하게 될 것입니다." />{" "}
                        <br />{" "}
                        <AutoT text="K-POP을 통해 스타와 팬을 둘러싼 다양한 현상을 계속 연구하고 탐구해서 체계화하고," />{" "}
                        <br />
                        <AutoT text="이를 다른 형태의 문화로 적용해나가는 선순환 생태계를 만들어 가고자 합니다." />{" "}
                        <br />
                        <AutoT text="아시아로부터 시작해 전세계로 K-POP의 전문가와 홍보관을 확장해 나갈 계획입니다." />
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "org" && (
                <section
                  className="w-[896px] max-w-4xl mx-auto mb-10 md:mb-12"
                  aria-labelledby="org-chart-heading"
                >
                  <h2
                    id="org-chart-heading"
                    className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-900"
                  >
                    <AutoT text="조직도" />
                  </h2>

                  <div className="flex flex-col w-full">
                    <div className="w-full rounded-xl border-2 border-indigo-200 bg-indigo-50 px-5 py-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 shrink-0 rounded-full border border-indigo-200 bg-white flex items-center justify-center">
                          <div
                            aria-hidden
                            className="flex flex-col items-center gap-1"
                          >
                            <div className="h-3 w-3 rounded-full bg-indigo-300" />
                            <div className="h-4 w-6 rounded-full bg-indigo-200" />
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-base md:text-lg font-bold text-indigo-900">
                            <AutoT text="천범주" />
                          </p>
                          <p className="text-sm font-semibold text-indigo-700">
                            <AutoT text="원장" />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="h-5 w-px shrink-0 bg-indigo-300 self-center"
                      aria-hidden
                    />

                    <div className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 shrink-0 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center">
                          <div
                            aria-hidden
                            className="flex flex-col items-center gap-1"
                          >
                            <div className="h-3 w-3 rounded-full bg-gray-400" />
                            <div className="h-4 w-6 rounded-full bg-gray-300" />
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <p className="text-base md:text-lg font-bold text-gray-900">
                              <AutoT text="최용선" />
                            </p>
                            <p className="text-sm font-semibold text-gray-600">
                              <AutoT text="부원장" />
                            </p>
                          </div>
                          <p className="mt-1 text-xs md:text-sm font-medium text-black-800">
                            <AutoT text="국제대학교 엔터테인먼트학부 K-POP 전공 주임교수" />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="h-6 w-px shrink-0 bg-indigo-300 self-center md:h-8"
                      aria-hidden
                    />

                    <p className="text-sm font-semibold text-indigo-700 mb-4 text-center">
                      <AutoT text="분과위원회" />
                    </p>

                    <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 list-none p-0 m-0">
                      {COMMITTEES.map((name) => (
                        <li
                          key={name}
                          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-800 shadow-sm"
                        >
                          <AutoT text={name} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
