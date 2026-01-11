"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import kpop1 from "../src/kpop1.png";
import kpop2 from "../src/kpop2.png";

/**
 * sliderImages: 슬라이드에서 보여줄 이미지와 alt 정보 배열
 */
const sliderImages = [
  {
    src: typeof kpop1 === "string" ? kpop1 : kpop1?.src || "",
    alt: "슬라이드 1",
  },
  {
    src: typeof kpop2 === "string" ? kpop2 : kpop2?.src || "",
    alt: "슬라이드 2",
  },
];

const HEADER_WIDTH = "1500px"; // 헤더 최대 너비
const SLIDER_HEIGHT = "500px"; // 슬라이드 높이

/**
 * SwiperSlider: 상단 대표 이미지 슬라이드 컴포넌트
 */
export const SwiperSlider = memo(function SwiperSlider() {
  const [current, setCurrent] = useState(0); // 현재 활성화된 슬라이드 인덱스
  const slideInterval = useRef<NodeJS.Timeout | null>(null); // 자동 슬라이드 전환용 타이머 ref

  useEffect(() => {
    // 슬라이드가 5초마다 자동으로 넘어감
    slideInterval.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    // 언마운트 시 인터벌 해제
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  // 이전 슬라이드로 이동
  const goToPrev = useCallback(
    () =>
      setCurrent((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1)),
    []
  );
  // 다음 슬라이드로 이동
  const goToNext = useCallback(
    () => setCurrent((prev) => (prev + 1) % sliderImages.length),
    []
  );

  return (
    <div
      className="relative w-full flex-1 overflow-hidden select-none"
      style={{
        minHeight: SLIDER_HEIGHT,
        width: "100%",
        maxWidth: HEADER_WIDTH,
        margin: "0 auto",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        borderRadius: "12px",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
        background: "#f9fbff",
        position: "relative",
      }}
    >
      <div
        className="w-full h-full"
        style={{
          width: "100%",
          height: SLIDER_HEIGHT,
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* 슬라이드 이미지들 렌더링 (페이드 애니메이션 및 절대 위치) */}
        {sliderImages.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            style={{
              width: "100%",
              height: SLIDER_HEIGHT,
              objectFit: "cover",
              borderRadius: "12px",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: current === idx ? 1 : 0,
              zIndex: current === idx ? 1 : 0,
              transition: "opacity 0.7s",
              background: "#eee",
              pointerEvents: current === idx ? "auto" : "none",
            }}
            draggable={false}
            loading={current === idx ? "eager" : "lazy"}
            aria-hidden={current !== idx}
          />
        ))}
        {/* 이전 버튼 (왼쪽) */}
        <button
          aria-label="이전 슬라이드"
          onClick={goToPrev}
          type="button"
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: 36,
            height: 36,
            zIndex: 2,
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
          tabIndex={0}
        >
          &#8592;
        </button>
        {/* 다음 버튼 (오른쪽) */}
        <button
          aria-label="다음 슬라이드"
          onClick={goToNext}
          type="button"
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.7)",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: 36,
            height: 36,
            zIndex: 2,
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
          tabIndex={0}
        >
          &#8594;
        </button>
        {/* 하단 인디케이터(동그라미) 클릭시 해당 슬라이드로 이동 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 14,
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            zIndex: 3,
          }}
        >
          {sliderImages.map((_, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: idx === current ? "#0073e8" : "#bbb",
                opacity: 0.9,
                cursor: "pointer",
                border:
                  idx === current ? "2px solid #0073e8" : "2px solid #f9fbff",
                transition: "all 0.2s",
              }}
              onClick={() => setCurrent(idx)}
              tabIndex={0}
              aria-label={`${idx + 1}번째 슬라이드로 이동`}
              role="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

