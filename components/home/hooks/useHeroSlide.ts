import { useState, useEffect, useRef, useCallback } from "react";
import { slides, TRANSITION_DURATION, fadeStyles } from "../data";

export function useHeroSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [nextSlideIdx, setNextSlideIdx] = useState<number | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Inject fade CSS
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.getElementById("heromain-fade-style")) {
        const style = document.createElement("style");
        style.id = "heromain-fade-style";
        style.innerHTML = fadeStyles;
        document.head.appendChild(style);
      }
    }
  }, []);

  const triggerFade = useCallback((targetIdx: number) => {
    if (isFading || targetIdx === currentSlide) return;
    setNextSlideIdx(targetIdx);
    setIsFading(true);

    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentSlide(targetIdx);
      setIsFading(false);
      setNextSlideIdx(null);
    }, TRANSITION_DURATION);
  }, [isFading, currentSlide]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide || isFading) return;
    setIsAutoPlaying(false);
    triggerFade(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [currentSlide, isFading, triggerFade]);

  const nextSlide = useCallback(() => {
    if (isFading) return;
    setIsAutoPlaying(false);
    triggerFade((currentSlide + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [isFading, currentSlide, triggerFade]);

  const prevSlide = useCallback(() => {
    if (isFading) return;
    setIsAutoPlaying(false);
    triggerFade((currentSlide - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [isFading, currentSlide, triggerFade]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || isFading) return;

    autoplayRef.current = setInterval(() => {
      triggerFade((currentSlide + 1) % slides.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoPlaying, currentSlide, isFading, triggerFade]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  const showSlideIdx = isFading && nextSlideIdx !== null ? nextSlideIdx : currentSlide;
  const prevSlideIdx = currentSlide;

  return {
    currentSlide,
    showSlideIdx,
    prevSlideIdx,
    isFading,
    nextSlideIdx,
    goToSlide,
    nextSlide,
    prevSlide,
  };
}
