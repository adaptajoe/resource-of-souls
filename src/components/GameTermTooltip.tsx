"use client";
import Link from "next/link";
import { useState, memo, useCallback } from "react";

interface ITerm {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  engName?: string;
}

interface IGameTermTooltipProps {
  term: ITerm;
  display?: string;
  className?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  tooltipWidth?: "auto" | "fit" | number;
}

const tooltipPositionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const tooltipArrowClasses = {
  top: {
    position: "bottom-[-12px] left-1/2 -translate-x-1/2",
    border: "border-l-[12px] border-l-transparent border-t-[12px] border-t-teal-400 border-r-[12px] border-r-transparent",
  },
  bottom: {
    position: "top-[-12px] left-1/2 -translate-x-1/2",
    border: "border-l-[12px] border-l-transparent border-b-[12px] border-b-teal-400 border-r-[12px] border-r-transparent",
  },
  left: {
    position: "right-[-12px] top-1/2 -translate-y-1/2",
    border: "border-t-[12px] border-t-transparent border-l-[12px] border-l-teal-400 border-b-[12px] border-b-transparent",
  },
  right: {
    position: "left-[-12px] top-1/2 -translate-y-1/2",
    border: "border-t-[12px] border-t-transparent border-r-[12px] border-r-teal-400 border-b-[12px] border-b-transparent",
  },
};

interface ITooltipContentProps {
  shortDescription: string;
  position: "top" | "bottom" | "left" | "right";
  isVisible: boolean;
  width: string | number;
}

const TooltipContent = memo(({ shortDescription, position, isVisible, width }: ITooltipContentProps) => (
  <div
    className={`
      absolute 
      ${tooltipPositionClasses[position]}
      ${isVisible ? "visible opacity-100" : "invisible opacity-0"}
      px-3 py-2 rounded-lg 
      font-black text-sm 
      bg-teal-900 border-teal-400 border-2 
      text-white shadow-lg 
      z-10
      transition-all duration-200 ease-in-out
    `}
    style={{
      width: typeof width === "number" ? `${width}px` : width === "auto" ? "auto" : "fit-content",
    }}
    role="tooltip"
  >
    {shortDescription}
    <div
      className={`
        absolute 
        ${tooltipArrowClasses[position].position}
        ${tooltipArrowClasses[position].border}
        w-0 h-0 
        z-20
      `}
    />
  </div>
));

TooltipContent.displayName = "TooltipContent";

const GameTermTooltip = memo(function GameTermTooltip({ term, display, className = "", tooltipPosition = "top", tooltipWidth = "fit" }: IGameTermTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <span className={`relative inline-block ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleMouseEnter} onBlur={handleMouseLeave}>
      <Link
        href={`/glossary#${term.id}`}
        className="
          text-teal-600 dark:text-teal-400 hover:underline cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-teal-400 rounded
          transition-colors duration-200
        "
        aria-label={`View details for ${term.name}${term.engName ? ` (${term.engName})` : ""}`}
      >
        {display || term.name}
      </Link>
      <TooltipContent shortDescription={term.shortDescription} position={tooltipPosition} isVisible={isHovered} width={tooltipWidth} />
    </span>
  );
});

GameTermTooltip.displayName = "GameTermTooltip";

export default GameTermTooltip;
