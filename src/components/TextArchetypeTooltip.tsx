"use client";
import Link from "next/link";
import { memo, useMemo, useState, useCallback } from "react";

interface ArchetypeData {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
}

interface ArchetypeTooltipProps {
  archetype: ArchetypeData;
  display?: string;
  className?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const formatArchetypeName = (name: string): string =>
  name
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

const tooltipPositionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-8 left-1/2 -translate-x-1/2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const tooltipArrowClasses = {
  top: "bottom-[-12px] left-1/2 -translate-x-1/2 rotate-180",
  bottom: "top-[-12px] left-1/2 -translate-x-1/2",
  left: "right-[-12px] top-1/2 -translate-y-1/2 rotate-90",
  right: "left-[-12px] top-1/2 -translate-y-1/2 -rotate-90",
};

interface TooltipProps {
  shortDescription: string;
  position: "top" | "bottom" | "left" | "right";
  isVisible: boolean;
}

const Tooltip = memo(({ shortDescription, position, isVisible }: TooltipProps) => (
  <div
    className={`
      absolute 
      ${isVisible ? "visible opacity-100" : "invisible opacity-0"}
      ${tooltipPositionClasses[position]}
      z-10 
      mb-2 w-48 p-2 rounded-lg 
      font-black text-sm 
      bg-red-900 border-red-600 border-2 
      text-white shadow-lg
      transition-all duration-200
    `}
    role="tooltip"
  >
    {shortDescription}
    <div
      className={`
        absolute 
        ${tooltipArrowClasses[position]}
        w-0 h-0 
        border-r-[12px] border-r-transparent 
        border-b-[12px] border-b-red-600 
        border-l-[12px] border-l-transparent
      `}
    />
  </div>
));

Tooltip.displayName = "ArchetypeTooltip";

const TextArchetypeTooltip = memo(function TextArchetypeTooltip({ archetype, display, className = "", tooltipPosition = "bottom" }: ArchetypeTooltipProps) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const url = useMemo(() => `/glossary?highlight=${formatArchetypeName(archetype.name)}`, [archetype.name]);

  const handleMouseEnter = useCallback(() => {
    setTooltipVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltipVisible(false);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleMouseEnter} onBlur={handleMouseLeave}>
      <Link href={url} className="text-red-600 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 rounded" aria-label={`View details for ${archetype.name} archetype`}>
        {display || archetype.name}
      </Link>
      {archetype.shortDescription && <Tooltip shortDescription={archetype.shortDescription} position={tooltipPosition} isVisible={isTooltipVisible} />}
    </div>
  );
});

TextArchetypeTooltip.displayName = "TextArchetypeTooltip";

export default TextArchetypeTooltip;
