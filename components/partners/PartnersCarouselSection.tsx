"use client";

import React from "react";
import { AutoT } from "../AutoT";
import { PartnerCarousel } from "./PartnerCarousel";
import { enterprisePartners, publicPartners, mapInfo } from "../../lib/partners";

// 슬라이드 이미지 크기 조정 (커지도록 props 전달)
export function PartnersCarouselSection() {


  return (
    <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">

      {/* 섹션 A: 엔터/기업 로고 캐러셀 */}
      <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 xl:p-16 max-w-5xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
          <AutoT text="엔터/기업 파트너" />
        </h3>
        <PartnerCarousel
          partners={enterprisePartners}
          autoPlay={true}
          loop={true}
          pauseOnHover={true}
          showName={false}


        />
      </section>

      {/* 섹션 B: 공공/청소년기관 로고 캐러셀 */}
      <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 xl:p-16 max-w-5xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
          <AutoT text="공공/청소년기관" />
        </h3>
        <PartnerCarousel
          partners={publicPartners}
          autoPlay={false}
          loop={false}
          pauseOnHover={false}
          showName={true}

        />
      </section>

    </div>
  );
}
