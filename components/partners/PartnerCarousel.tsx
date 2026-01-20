"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (autoPlay && !isPaused && partners.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (loop) {
            return (prev + 1) % partners.length;
          } else {
            return prev < partners.length - 1 ? prev + 1 : prev;
          }
        });
      }, 3000); // 3초마다 슬라이드 변경
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPaused, loop, partners.length]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const handleImageClick = (e: React.MouseEvent, partner: Partner) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  };

  // ESC 키로 모달 닫기 및 body 스크롤 방지
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      // 스크롤바 너비 계산
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // 원래 스타일 저장
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPaddingRight = document.body.style.paddingRight;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlPaddingRight = document.documentElement.style.paddingRight;

      // 스크롤 막기
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;

      window.addEventListener("keydown", handleEscape);

      return () => {
        window.removeEventListener("keydown", handleEscape);

        // 원래 스타일 복원
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.paddingRight = originalBodyPaddingRight;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.documentElement.style.paddingRight = originalHtmlPaddingRight;
      };
    }
  }, [isModalOpen]);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="flex-shrink-0 w-full flex items-center justify-center px-4"
              style={{ minWidth: "100%" }}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div
                  className="relative w-full max-w-[400px] h-[240px] md:max-w-[500px] md:h-[300px] flex items-center justify-center bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={(e) => handleImageClick(e, partner)}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {showName && (
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {partner.name}
                  </span>
                )}
                {partner.url && partner.url !== "#" && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    홈페이지 방문 →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 */}
      {partners.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}

      {/* 로고 이미지 모달 */}
      {isModalOpen && selectedPartner && mounted && (
        <>
          {createPortal(
            <>
              {/* 배경 딤 처리 */}
              <div
                className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4"
                onClick={handleCloseModal}
              >
                {/* 모달 컨텐츠 */}
                <div
                  className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-[10000]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* 헤더 */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedPartner.name}
                    </h2>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      aria-label="닫기"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* 이미지 */}
                  <div className="p-6 md:p-8 flex items-center justify-center bg-gray-50">
                    <div className="relative w-full max-w-3xl aspect-video flex items-center justify-center bg-white rounded-lg border border-gray-200 p-8 md:p-12 shadow-inner">
                      <img
                        src={selectedPartner.logo}
                        alt={selectedPartner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* 링크 (있는 경우) */}
                  {selectedPartner.url && selectedPartner.url !== "#" && (
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
                      <a
                        href={selectedPartner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
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
