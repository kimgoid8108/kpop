"use client";

import React from "react";
import { AutoT } from "../AutoT";
import { PartnerCarousel } from "./PartnerCarousel";
import { enterprisePartners, publicPartners, mapInfo } from "../../lib/partners";

export function PartnersCarouselSection() {
  return (
    <div className="mt-8 sm:mt-12 md:mt-16 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 overflow-x-hidden">
      {/* H2: 추가 협약기관&파트너 */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 break-words">
        <AutoT text="추가 협약기관&파트너" />
      </h2>

      {/* 섹션 A: 엔터/기업 로고 캐러셀 */}
      <section className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-full mx-auto overflow-x-hidden">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 md:mb-8 break-words">
          <AutoT text="엔터/기업 파트너" />
        </h3>
        <div className="w-full overflow-x-hidden">
          <PartnerCarousel
            partners={enterprisePartners}
            autoPlay={true}
            loop={true}
            pauseOnHover={true}
            showName={false}
          />
        </div>
      </section>

      {/* 섹션 B: 공공/청소년기관 로고 캐러셀 */}
      <section className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-full mx-auto overflow-x-hidden">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 md:mb-8 break-words">
          <AutoT text="공공/청소년기관" />
        </h3>
        <div className="w-full overflow-x-hidden">
          <PartnerCarousel
            partners={publicPartners}
            autoPlay={false}
            loop={false}
            pauseOnHover={false}
            showName={true}
          />
        </div>
      </section>

      {/* 섹션 C: 오시는 길(지도) */}
      <section className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-full mx-auto overflow-x-hidden">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 md:mb-8 break-words">
          <AutoT text="오시는 길" />
        </h3>
        <div className="mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg text-gray-700 break-words">
          <p className="font-medium">
            <AutoT text="주소" />: <span className="break-words">{mapInfo.address}</span>
          </p>
        </div>
        <div className="w-full aspect-video h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
          <iframe
            src={mapInfo.embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="글로벌케이팝진흥원 위치"
            style={{ maxWidth: "100%", height: "100%" }}
          />
        </div>
      </section>
    </div>
  );
}
