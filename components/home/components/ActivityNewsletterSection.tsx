import React, { useState, useEffect, useRef } from "react";
import { AutoT } from "../../AutoT";
import { ExpandedCard } from "../types";
import { ActivityCard } from "./ActivityCard";
import { NewsletterCard } from "./NewsletterCard";

interface ActivityNewsletterSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  currentSectionIndex: number;
}

export function ActivityNewsletterSection({
  sectionRef,
  currentSectionIndex,
}: ActivityNewsletterSectionProps) {
  const [expandedCard, setExpandedCard] = useState<ExpandedCard>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const observerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const toggleCard = (cardType: "activity" | "newsletter") => {
    setExpandedCard((prev) => (prev === cardType ? null : cardType));
  };

  return (
    <section
      ref={sectionRef}
      className={`w-full min-h-screen flex-shrink-0 bg-gray-50 overflow-x-hidden transition-opacity duration-500 ${
        currentSectionIndex === 1 ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
      }`}
    >
      <div
        ref={observerRef as React.RefObject<HTMLDivElement>}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 min-h-screen flex flex-col"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 flex-1">
          <ActivityCard
            expandedCard={expandedCard}
            isSectionVisible={isSectionVisible}
            onToggle={() => toggleCard("activity")}
          />
          <NewsletterCard
            expandedCard={expandedCard}
            isSectionVisible={isSectionVisible}
            onToggle={() => toggleCard("newsletter")}
          />
        </div>
      </div>
    </section>
  );
}
