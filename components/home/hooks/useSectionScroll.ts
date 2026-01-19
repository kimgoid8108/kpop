import { useState, useEffect, useRef, useCallback } from "react";

interface UseSectionScrollProps {
  sections: Array<React.RefObject<HTMLElement | null>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function useSectionScroll({ sections, scrollContainerRef }: UseSectionScrollProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollLockRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchEndYRef = useRef(0);

  const scrollToSection = useCallback(
    (index: number) => {
      if (scrollLockRef.current || isScrolling) return;
      if (index < 0 || index >= sections.length) return;

      const scrollContainer = scrollContainerRef.current;
      const targetSection = sections[index].current;
      if (!scrollContainer || !targetSection) return;

      scrollLockRef.current = true;
      setIsScrolling(true);
      setCurrentSectionIndex(index);

      const containerRect = scrollContainer.getBoundingClientRect();
      const sectionRect = targetSection.getBoundingClientRect();
      const scrollTop = scrollContainer.scrollTop + (sectionRect.top - containerRect.top);

      scrollContainer.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        scrollLockRef.current = false;
        setIsScrolling(false);
      }, 800);
    },
    [isScrolling, sections, scrollContainerRef]
  );

  const goToNextSection = useCallback(() => {
    setCurrentSectionIndex((prev) => {
      if (prev < sections.length - 1) {
        scrollToSection(prev + 1);
        return prev + 1;
      }
      return prev;
    });
  }, [sections.length, scrollToSection]);

  const goToPrevSection = useCallback(() => {
    setCurrentSectionIndex((prev) => {
      if (prev > 0) {
        scrollToSection(prev - 1);
        return prev - 1;
      }
      return prev;
    });
  }, [scrollToSection]);

  const updateCurrentSection = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollTop = scrollContainer.scrollTop;
    const containerHeight = scrollContainer.clientHeight;

    sections.forEach((sectionRef, index) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const sectionTop = rect.top - containerRect.top + scrollContainer.scrollTop;

      if (
        scrollTop >= sectionTop - containerHeight * 0.3 &&
        scrollTop < sectionTop + section.offsetHeight - containerHeight * 0.3
      ) {
        setCurrentSectionIndex((prev) => {
          if (prev !== index) {
            return index;
          }
          return prev;
        });
      }
    });
  }, [sections, scrollContainerRef]);

  // Wheel event handler
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      if (scrollLockRef.current || isScrolling) {
        e.preventDefault();
        return;
      }

      const target = e.target as HTMLElement;
      const scrollableParent = target.closest('[class*="overflow-y-auto"], [class*="overflow-y-scroll"]');

      if (scrollableParent && scrollableParent !== scrollContainerRef.current) {
        const element = scrollableParent as HTMLElement;
        const isAtTop = element.scrollTop === 0;
        const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

        if (!isAtTop && !isAtBottom) {
          return;
        }

        if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
          e.preventDefault();
          if (e.deltaY > 0) {
            goToNextSection();
          } else if (e.deltaY < 0) {
            goToPrevSection();
          }
        }
      } else {
        e.preventDefault();
        if (e.deltaY > 0) {
          goToNextSection();
        } else if (e.deltaY < 0) {
          goToPrevSection();
        }
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, [goToNextSection, goToPrevSection, isScrolling, scrollContainerRef]);

  // Scroll position update
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!scrollLockRef.current) {
        updateCurrentSection();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [updateCurrentSection, scrollContainerRef]);

  // Touch event handler
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollLockRef.current || isScrolling) return;

      touchEndYRef.current = e.changedTouches[0].clientY;
      const diff = touchStartYRef.current - touchEndYRef.current;
      const minSwipeDistance = 50;

      if (Math.abs(diff) > minSwipeDistance) {
        const target = e.target as HTMLElement;
        const scrollableParent = target.closest('[class*="overflow-y-auto"], [class*="overflow-y-scroll"]');

        if (scrollableParent && scrollableParent !== scrollContainerRef.current) {
          const element = scrollableParent as HTMLElement;
          const isAtTop = element.scrollTop === 0;
          const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 1;

          if (!isAtTop && !isAtBottom) {
            return;
          }

          if ((diff > 0 && isAtBottom) || (diff < 0 && isAtTop)) {
            if (diff > 0) {
              goToNextSection();
            } else if (diff < 0) {
              goToPrevSection();
            }
          }
        } else {
          if (diff > 0) {
            goToNextSection();
          } else if (diff < 0) {
            goToPrevSection();
          }
        }
      }
    };

    scrollContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
    scrollContainer.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goToNextSection, goToPrevSection, isScrolling, scrollContainerRef]);

  return {
    currentSectionIndex,
    isScrolling,
  };
}
