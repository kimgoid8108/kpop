"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AutoT } from "../AutoT";

// Fade transition duration (ms) – should match CSS transition
const TRANSITION_DURATION = 600;

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  detail: string;
  ctaPrimary: string;
  ctaPrimaryLink: string;
  ctaSecondary: string;
  ctaSecondaryLink: string;
  year: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "글로벌케이팝 진흥원",
    subtitle: "K-POP의 미래를 만들어갑니다",
    detail: "세계적인 K-POP 아티스트를 양성하고 한류 문화를 전 세계에 전파합니다",
    ctaPrimary: "교육과정 보기",
    ctaPrimaryLink: "/courses/structure",
    ctaSecondary: "자격증 안내",
    ctaSecondaryLink: "/certificates/about",
    year: "2025",
    gradient: "from-purple-600 via-pink-500 to-red-500",
  },
  {
    id: 2,
    title: "전문가 양성 프로그램",
    subtitle: "댄스, 보컬, K-POP 퍼포먼스",
    detail: "체계적인 커리큘럼과 실전 경험을 통해 전문가를 양성합니다",
    ctaPrimary: "강의 리스트",
    ctaPrimaryLink: "/classroom/list",
    ctaSecondary: "강사진 소개",
    ctaSecondaryLink: "/courses/instructors",
    year: "2025",
    gradient: "from-blue-600 via-cyan-500 to-teal-500",
  },
  {
    id: 3,
    title: "온라인 교육 플랫폼",
    subtitle: "언제 어디서나 학습하세요",
    detail: "LMS를 통해 체계적인 온라인 교육을 제공합니다",
    ctaPrimary: "나의 학습실",
    ctaPrimaryLink: "/classroom/progress",
    ctaSecondary: "시험/과제",
    ctaSecondaryLink: "/classroom/exam",
    year: "2025",
    gradient: "from-indigo-600 via-purple-500 to-pink-500",
  },
];

const quickInfoCards = [
  {
    icon: "🎓",
    title: "교육과정",
    value: "50+",
    label: "다양한 프로그램",
  },
  {
    icon: "👥",
    title: "수강생",
    value: "10,000+",
    label: "전 세계 학습자",
  },
  {
    icon: "🏆",
    title: "자격증",
    value: "3종",
    label: "국가 인정 자격",
  },
];

// 슬라이드 전환(Fade) CSS
const fadeStyles = `
.heromain-fade-anim {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${TRANSITION_DURATION}ms cubic-bezier(0.45, 0.1, 0.27, 1.04);
  position: absolute;
  inset: 0;
  z-index: 1;
}
.heromain-fade-anim.heromain-showing {
  opacity: 1;
  pointer-events: all;
  z-index: 2;
  transition: opacity ${TRANSITION_DURATION}ms cubic-bezier(0.45, 0.1, 0.27, 1.04);
}
`;

export default function HeroMain() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [nextSlideIdx, setNextSlideIdx] = useState<number | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Inject fade CSS
    if (typeof window !== "undefined") {
      if (!document.getElementById("heromain-fade-style")) {
        const style = document.createElement("style");
        style.id = "heromain-fade-style";
        style.innerHTML = fadeStyles;
        document.head.appendChild(style);
      }
    }
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || isFading) return;

    autoplayRef.current = setInterval(() => {
      triggerFade((currentSlide + 1) % slides.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line
  }, [isAutoPlaying, currentSlide, isFading]);

  function triggerFade(targetIdx: number) {
    if (isFading || targetIdx === currentSlide) return;
    setNextSlideIdx(targetIdx);
    setIsFading(true);

    // Wait for fade animation, then swap slide
    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentSlide(targetIdx);
      setIsFading(false);
      setNextSlideIdx(null);
    }, TRANSITION_DURATION);
  }

  const goToSlide = (index: number) => {
    if (index === currentSlide || isFading) return;
    setIsAutoPlaying(false);
    triggerFade(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    if (isFading) return;
    setIsAutoPlaying(false);
    triggerFade((currentSlide + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    if (isFading) return;
    setIsAutoPlaying(false);
    triggerFade((currentSlide - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // clean up on unmount
  useEffect(() => {
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  const showSlideIdx = isFading && nextSlideIdx !== null ? nextSlideIdx : currentSlide;
  const prevSlideIdx = currentSlide;

  // prepare two layers for fade transition
  const renderSlide = (slideIdx: number, showing: boolean) => {
    const slide = slides[slideIdx];
    return (
      <div
        className={`w-full h-full heromain-fade-anim ${showing ? "heromain-showing" : ""}`}
        key={slideIdx}
        aria-hidden={!showing}
      >
        {/* 배경 그라데이션 */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-1000 ease-in-out`}
        >
          {/* 장식 블러 원들 */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl home-animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl home-animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl home-animate-float-slow"></div>
        </div>
        {/* 메인 콘텐츠 */}
        <div className="relative z-10 flex items-center justify-center h-full px-8">
          <div className="max-w-8xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pl-30">
            {/* 왼쪽: 히어로 콘텐츠 */}
            <div className="space-y-6 home-animate-slideUp">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  <AutoT text={slide.title} />
                </h1>
                <h2 className="text-2xl md:text-3xl text-white/90 font-medium">
                  <AutoT text={slide.subtitle} />
                </h2>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg">
                  <AutoT text={slide.detail} />
                </p>
              </div>

              {/* CTA 버튼들 */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={slide.ctaPrimaryLink}
                  className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
                >
                  <AutoT text={slide.ctaPrimary} />
                </Link>
                <Link
                  href={slide.ctaSecondaryLink}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 inline-block"
                >
                  <AutoT text={slide.ctaSecondary} />
                </Link>
              </div>
            </div>

            {/* 오른쪽: 연도 워터마크 */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="text-[200px] md:text-[300px] font-black text-white/10 select-none home-animate-scale">
                  {slide.year}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 상단 네비게이션 */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <button
            onClick={prevSlide}
            disabled={isFading}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg disabled:opacity-50"
            aria-label="이전 슬라이드"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={isFading}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg disabled:opacity-50"
            aria-label="다음 슬라이드"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 인디케이터 dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isFading}
              className={`transition-all duration-300 rounded-full ${
                index === showSlideIdx
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              } disabled:opacity-50`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </nav>

      {/* 슬라이드 페이드 트랜지션 레이어 */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* 하단 레이어: 현재 슬라이드 */}
        {renderSlide(prevSlideIdx, !isFading || nextSlideIdx === null)}
        {/* 상단 페이드인 레이어: 다음 슬라이드 */}
        {isFading && nextSlideIdx !== null && renderSlide(nextSlideIdx, true)}
      </div>

      {/* 오른쪽 하단 퀵 인포 카드들 */}
      <div className="absolute bottom-8 right-8 z-20 space-y-4 hidden lg:block">
        {quickInfoCards.map((card, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[200px] border border-white/20 hover:bg-white/20 transition-all duration-300 home-animate-slideInRight"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{card.icon}</div>
              <div>
                <div className="text-white/80 text-sm font-medium">
                  <AutoT text={card.title} />
                </div>
                <div className="text-white text-2xl font-bold">{card.value}</div>
                <div className="text-white/60 text-xs">
                  <AutoT text={card.label} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
