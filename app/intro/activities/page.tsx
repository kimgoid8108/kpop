"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { Sidebar } from "../../../components/Sidebar";
import { submenuData } from "../../../components/NavBar";

export default function ActivitiesPage() {
  const introMenu = submenuData.find((menu) => menu.label === "진흥원");

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8">
        {introMenu && (
          <Sidebar title={introMenu.label} items={introMenu.submenu} />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            활동현황
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              글로벌케이팝진흥원의 주요 활동현황을 소개합니다.
            </p>
            <div className="space-y-4 md:space-y-6">
              <div className="border-l-4 border-indigo-500 pl-3 md:pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  일지 아트홀
                </h2>
                <p className="text-gray-700">
                  일지아트홀은 우리나라의 건국이념이자 나눔의 근본 철학인
                  홍익인간의 정신을 되살려 한국과 세계의 대중문화가 서로
                  소통하고 교류하는 개방된 문화공간이 되고자 하는 취지에서
                  2012년 3월 설립된 다목적 문화예술공간으로서 입체적이고
                  자유로운 공간 설계를 바탕으로 스튜디오, 팝페라, 쇼케이스,
                  뮤지컬, 세미나 등 다양한 장르의 콘텐츠를 수용하고 있으며, 특히
                  세계적인 케이팝 아티스트들이 모두 거쳐갔을 만큼 케이팝의
                  요람으로 널리 알려진 공간입니다.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 my-20">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  글로벌사이버대학교 방송연예학과
                </h2>
                <p className="text-gray-700">
                  21세기 글로벌 스타양성기관인 글로벌사이버대학교 방송연예학과는
                  대한민국 문화산업의 기반이 될 문화인재를 발굴, 양성하고 그
                  저변을 확대하여 대한민국이 세계문화 교류의 구심점이 되는
                  목표를 수립하여, 문화 강국의 실현을 구현하고자 하며, 이의
                  기치아래 수백 명의 동문이 전세계를 무대로 케이팝, 드라마,
                  영화, 뮤지컬, 댄스, 코미디, 마술 등 전 분야에 걸쳐 한국의
                  대중문화를 이끌어 가고 있습니다.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
