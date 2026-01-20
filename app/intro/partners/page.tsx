"use client";

import React, { useEffect, useRef, useState } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

const images = [
  "/kpop_global1.jpeg",
  "/kpop_global2.jpeg",
  "/kpop_global3.jpeg",
  "/kpop_global4.jpeg",
  "/kpop_global5.jpeg",
  "/kpop_global6.jpeg",
  "/kpop_global7.jpeg",
  "/kpop_global8.jpeg",
];

function AutoSwipeImages() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div className="w-full max-w-2xl mx-auto py-6">
      <div
        className="w-full flex items-center justify-center relative bg-white rounded-lg shadow overflow-hidden"
        style={{ minHeight: "270px" }}
      >
        <div className="absolute inset-0 w-full h-full" style={{ overflow: "hidden" }}>
          {images.map((img, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={`파트너 이미지 ${idx + 1}`}
              key={img}
              className="mx-auto absolute top-0 left-0 w-full h-full"
              style={{
                objectFit: "contain",
                borderRadius: "0.5rem",
                background: "#f9f9f9",
                transition: "opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                opacity: current === idx ? 1 : 0,
                zIndex: current === idx ? 2 : 1,
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`inline-block w-2 h-2 rounded-full ${
                idx === current ? "bg-indigo-400" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="협약기관 & 파트너" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <AutoT text="글로벌케이팝진흥원과 함께 협력하고 있는 기관들을 소개합니다." />
            </p>
            <div className="border-l-4 border-indigo-500 pl-4 my-20">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                <AutoT text="글로벌사이버대학교 방송연예학과" />
              </h2>
              <a
                href="https://broaden.global.ac.kr/home/homeIndex.do"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-indigo-600 hover:underline mb-2 font-medium"
              >
                <AutoT text="글로벌 사이버대학교 방송연예학과 바로가기" />
              </a>

              <AutoSwipeImages />

              <p className="text-gray-700">
                <AutoT text="21세기 글로벌 스타양성기관인 글로벌사이버대학교 방송연예학과는 대한민국 문화산업의 기반이 될 문화인재를 발굴, 양성하고 그 저변을 확대하여 대한민국이 세계문화 교류의 구심점이 되는 목표를 수립하여, 문화 강국의 실현을 구현하고자 하며, 이의 기치아래 수백 명의 동문이 전세계를 무대로 케이팝, 드라마, 영화, 뮤지컬, 댄스, 코미디, 마술 등 전 분야에 걸쳐 한국의 대중문화를 이끌어 가고 있습니다." />
              </p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="border-l-4 border-indigo-500 pl-3 md:pl-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="일지 아트홀" />
                </h2>
                <a
                  href="http://ilchiarthall.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-indigo-600 hover:underline mb-2 font-medium"
                >
                  <AutoT text="일지 아트홀 홈페이지 바로가기" />
                </a>
                <p className="text-gray-700">
                  <AutoT text="일지아트홀은 우리나라의 건국이념이자 나눔의 근본 철학인 홍익인간의 정신을 되살려 한국과 세계의 대중문화가 서로 소통하고 교류하는 개방된 문화공간이 되고자 하는 취지에서 2012년 3월 설립된 다목적 문화예술공간으로서 입체적이고 자유로운 공간 설계를 바탕으로 스튜디오, 팝페라, 쇼케이스, 뮤지컬, 세미나 등 다양한 장르의 콘텐츠를 수용하고 있으며, 특히 세계적인 케이팝 아티스트들이 모두 거쳐갔을 만큼 케이팝의 요람으로 널리 알려진 공간입니다." />
                </p>
                <div className="w-full aspect-video mt-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.3237593484296!2d127.0396187!3d37.5238647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca38825c1e6b3%3A0xbff2bfe7d5ac9441!2z7J287KeA7JWE7Yq47ZmA!5e0!3m2!1sko!2skr!4v1768221735308"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="일지 아트홀 위치"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
