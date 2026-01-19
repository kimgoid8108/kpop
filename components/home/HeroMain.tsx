"use client";

import React, { useRef } from "react";
import { useHeroSlide } from "./hooks/useHeroSlide";
import { useSectionScroll } from "./hooks/useSectionScroll";
import { HeroSection } from "./components/HeroSection";
import { ActivityNewsletterSection } from "./components/ActivityNewsletterSection";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { slides } from "./data";

export default function HeroMain() {
  // 섹션 refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const activitySectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 커스텀 훅
  const heroSlide = useHeroSlide();
  const { currentSectionIndex } = useSectionScroll({
    sections: [heroSectionRef, activitySectionRef],
    scrollContainerRef,
  });

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <HeroSection
        sectionRef={heroSectionRef}
        currentSectionIndex={currentSectionIndex}
        slides={slides}
        currentSlide={heroSlide.currentSlide}
        showSlideIdx={heroSlide.showSlideIdx}
        prevSlideIdx={heroSlide.prevSlideIdx}
        isFading={heroSlide.isFading}
        nextSlideIdx={heroSlide.nextSlideIdx}
        goToSlide={heroSlide.goToSlide}
        nextSlide={heroSlide.nextSlide}
        prevSlide={heroSlide.prevSlide}
      >
        <ScrollIndicator isVisible={currentSectionIndex === 0} />
      </HeroSection>

      <ActivityNewsletterSection
        sectionRef={activitySectionRef}
        currentSectionIndex={currentSectionIndex}
      />
    </div>
  );
}
