import React from "react";
import Link from "next/link";
import { AutoT } from "../../AutoT";
import { Slide } from "../types";

interface HeroSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  currentSectionIndex: number;
  slides: Slide[];
  currentSlide: number;
  showSlideIdx: number;
  prevSlideIdx: number;
  isFading: boolean;
  nextSlideIdx: number | null;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  children?: React.ReactNode;
}

export function HeroSection({
  sectionRef,
  currentSectionIndex,
  slides,
  currentSlide,
  showSlideIdx,
  prevSlideIdx,
  isFading,
  nextSlideIdx,
  goToSlide,
  nextSlide,
  prevSlide,
  children,
}: HeroSectionProps) {
  const renderSlide = (slideIdx: number, showing: boolean) => {
    const slide = slides[slideIdx];
    return (
      <div
        className={`w-full h-full heromain-fade-anim ${showing ? "heromain-showing" : ""}`}
        key={slideIdx}
        aria-hidden={!showing}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-1000 ease-in-out`}>
          <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl home-animate-float"></div>
          <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl home-animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl home-animate-float-slow"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full px-3 sm:px-4 md:px-6 lg:px-8 overflow-x-hidden">
          <div className="px-10 max-w-2000xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="space-y-3 sm:space-y-4 md:space-y-6 home-animate-slideUp w-full">
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <h1 className="w-full max-w-full break-words text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight">
                  <AutoT text={slide.title} />
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 font-medium break-words">
                  <AutoT text={slide.subtitle} />
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/80 leading-relaxed max-w-full lg:max-w-lg break-words">
                  <AutoT text={slide.detail} />
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4">
                <Link
                  href={slide.ctaPrimaryLink}
                  className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  <AutoT text={slide.ctaPrimary} />
                </Link>
                <Link
                  href={slide.ctaSecondaryLink}
                  className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 text-center text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  <AutoT text={slide.ctaSecondary} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="text-[150px] xl:text-[200px] 2xl:text-[300px] font-black text-white/10 select-none home-animate-scale">
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
    <section
      ref={sectionRef}
      className={`w-full h-screen overflow-hidden max-w-full flex-shrink-0 transition-opacity duration-500 ${
        currentSectionIndex === 0 ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
      }`}
    >
      <nav className="relative z-20 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="hidden sm:flex items-center gap-4 sm:gap-6 md:gap-8">
          <button
            onClick={prevSlide}
            disabled={isFading}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg disabled:opacity-50"
            aria-label="이전 슬라이드"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={isFading}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg disabled:opacity-50"
            aria-label="다음 슬라이드"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isFading}
              className={`transition-all duration-300 rounded-full ${
                index === showSlideIdx
                  ? "w-6 h-1.5 sm:w-8 sm:h-2 bg-white"
                  : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 hover:bg-white/60"
              } disabled:opacity-50`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      </nav>
      <div className="absolute inset-0 w-full h-full z-0">
        {renderSlide(prevSlideIdx, !isFading || nextSlideIdx === null)}
        {isFading && nextSlideIdx !== null && renderSlide(nextSlideIdx, true)}
      </div>
      {children}
    </section>
  );
}
