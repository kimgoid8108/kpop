"use client";

import React from "react";
import { AutoT } from "../AutoT";
import { PartnerCarousel } from "./PartnerCarousel";
import { enterprisePartners, publicPartners, mapInfo } from "../../lib/partners";

export function PartnersCarouselSection() {
  return (
    <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">

      {/* 섹션 A: 엔터/기업 로고 캐러셀 */}
      <section className="bg-white rounded-xl shadow p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
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
      <section className="bg-white rounded-xl shadow p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
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
