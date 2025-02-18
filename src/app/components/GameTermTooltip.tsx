"use client";
import Link from "next/link";
import { useState, useCallback, useMemo } from "react";

interface Term {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  engName?: string;
}

interface GameTermTooltipProps {
  term: Term;
  display?: string;
}

export default function GameTermTooltip({ term, display }: GameTermTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const tooltipContent = useMemo(
    () => (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg font-black text-sm bg-teal-900 border-teal-400 border-2 text-white shadow-lg w-fit z-10">
        {term.shortDescription}
        <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-teal-400 border-r-[12px] border-r-transparent z-20" />
      </div>
    ),
    [term.shortDescription]
  );

  return (
    <span className="relative inline-block">
      <Link href={`/terminology#${term.id}`} className="text-teal-400 hover:underline cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {display || term.name}
      </Link>
      {isHovered && tooltipContent}
    </span>
  );
}
