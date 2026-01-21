"use client";

import React, { useEffect, useRef, useState } from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";
import { PartnersCarouselSection } from "../../../components/partners/PartnersCarouselSection";

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


          {/* 추가 협약기관&파트너 섹션 */}
          <PartnersCarouselSection />
        </div>
      </div>
    </PageLayout>
  );
}
