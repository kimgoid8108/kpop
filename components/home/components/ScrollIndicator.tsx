import React from "react";
import { AutoT } from "../../AutoT";

interface ScrollIndicatorProps {
  isVisible: boolean;
}

export function ScrollIndicator({ isVisible }: ScrollIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-2 scroll-indicator">
      <div className="flex flex-col items-center gap-1">
        <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wider">
          <AutoT text="scroll" />
        </span>
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-white/90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
