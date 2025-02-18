"use client";
import Link from "next/link";
import { useMemo } from "react";

interface ArchetypeTooltipProps {
  archetype: string;
  display: string;
  shortDescription: string;
  highlighted?: boolean;
}

export default function ArchetypeTooltip({ archetype, display, shortDescription, highlighted = false }: ArchetypeTooltipProps) {
  const url = useMemo(() => {
    return `/terminology?highlight=${archetype
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "")}`;
  }, [archetype]);

  return (
    <div className="relative inline-block group">
      <Link
        href={url}
        className={`text-xs px-2 py-1 transition-colors ${
          highlighted ? "bg-red-900 border-red-600 border text-white" : "bg-black border-gray-400 border text-gray-400"
        } hover:bg-red-900 hover:border-red-600 hover:text-white`}
      >
        {display}
      </Link>
      {shortDescription && (
        <div className="absolute invisible group-hover:visible z-10 top-8 left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 rounded-lg font-black text-sm bg-red-900 border-red-600 border-2 text-white shadow-lg">
          {shortDescription}
          <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-r-[12px] border-r-transparent border-b-[12px] border-b-red-600 border-l-[12px] border-l-transparent" />
        </div>
      )}
    </div>
  );
}
