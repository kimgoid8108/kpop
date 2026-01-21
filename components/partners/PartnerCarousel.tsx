"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Partner } from "../../lib/partners";

interface PartnerCarouselProps {
  partners: Partner[];
  autoPlay?: boolean;
  loop?: boolean;
  showName?: boolean;
  pauseOnHover?: boolean;
}

export function PartnerCarousel({
  partners,
  autoPlay = false,
  loop = false,
  showName = false,
  pauseOnHover = false,
}: PartnerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // keen-slider 자동재생 플러그인
  const AutoPlayPlugin: KeenSliderPlugin = (slider) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver && !pauseOnHover) return;
      timeout = setTimeout(() => {
        if (loop) {
          slider.next();
        } else {
          if (slider.track.details.abs < slider.track.details.length - 1) {
            slider.next();
          }
        }
      }, 3000);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  // 반응형 slidesPerView 설정
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: loop,
      rtl: false,
      slides: {
        perView: 1, // 기본 모바일: 1개
        spacing: 16, // gap
      },
      breakpoints: {
        "(min-width: 360px)": {
          slides: { perView: 1, spacing: 16 },
        },
        "(min-width: 640px)": {
          slides: { perView: 2, spacing: 20 },
        },
        "(min-width: 768px)": {
          slides: { perView: 3, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 4, spacing: 28 },
        },
        "(min-width: 1280px)": {
          slides: { perView: 5, spacing: 32 },
        },
        "(min-width: 1536px)": {
          slides: { perView: 6, spacing: 36 },
        },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created(slider) {
        setLoaded(true);
      },
    },
    autoPlay ? [AutoPlayPlugin] : []
  );

  const handleImageClick = useCallback((e: React.MouseEvent, partner: Partner) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPartner(partner);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  }, []);

  // ESC 키로 모달 닫기 및 body 스크롤 방지
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPaddingRight = document.body.style.paddingRight;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlPaddingRight = document.documentElement.style.paddingRight;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

      window.addEventListener("keydown", handleEscape);

      return () => {
        window.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.paddingRight = originalBodyPaddingRight;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.documentElement.style.paddingRight = originalHtmlPaddingRight;
      };
    }
  }, [isModalOpen, handleCloseModal]);

  // 마우스 호버로 일시정지
  useEffect(() => {
    if (pauseOnHover && autoPlay) {
      setPause(false);
    }
  }, [pauseOnHover, autoPlay]);

  if (!mounted || partners.length === 0) return null;

  return (
    <div className="w-full overflow-x-hidden">
      <div
        ref={sliderRef}
        className="keen-slider"
        onMouseEnter={() => pauseOnHover && setPause(true)}
        onMouseLeave={() => pauseOnHover && setPause(false)}
      >
        {partners.map((partner) => (
          <div key={partner.id} className="keen-slider__slide">
            <div className="flex flex-col items-center justify-center h-full px-2 sm:px-3 md:px-4">
              <div
                className="relative w-full flex items-center justify-center bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px]"
                onClick={(e) => handleImageClick(e, partner)}
                style={{ minHeight: "120px" }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              {showName && (
                <div className="mt-2 sm:mt-3 w-full px-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-700 text-center break-words line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                    {partner.name}
                  </p>
                </div>
              )}
              {partner.url && partner.url !== "#" && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 sm:mt-2 text-xs text-indigo-600 hover:text-indigo-700 hover:underline whitespace-nowrap min-h-[44px] flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  홈페이지 →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 화살표 (선택사항, 필요시 추가) */}
      {loaded && instanceRef.current && partners.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4 sm:mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            disabled={!loop && currentSlide === 0}
            className="p-2 sm:p-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="이전 슬라이드"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-1.5 sm:gap-2">
            {partners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`h-2 sm:h-2.5 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  currentSlide === idx ? "w-6 sm:w-8 bg-indigo-600" : "w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`슬라이드 ${idx + 1}로 이동`}
              />
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            disabled={!loop && instanceRef.current && currentSlide === instanceRef.current.track.details.length - 1}
            className="p-2 sm:p-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="다음 슬라이드"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* 로고 이미지 모달 */}
      {isModalOpen && selectedPartner && (
        <>
          {createPortal(
            <>
              <div
                className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
                onClick={handleCloseModal}
              >
                <div
                  className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-[10000]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate pr-4">
                      {selectedPartner.name}
                    </h2>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="닫기"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="p-4 sm:p-6 md:p-8 flex items-center justify-center bg-gray-50">
                    <div className="relative w-full max-w-3xl aspect-video flex items-center justify-center bg-white rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-12 shadow-inner">
                      <img
                        src={selectedPartner.logo}
                        alt={selectedPartner.name}
                        className="w-full h-full max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {selectedPartner.url && selectedPartner.url !== "#" && (
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex justify-center">
                      <a
                        href={selectedPartner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 sm:px-6 py-2 sm:py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                      >
                        홈페이지 방문 →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>,
            document.body
          )}
        </>
      )}
    </div>
  );
}
