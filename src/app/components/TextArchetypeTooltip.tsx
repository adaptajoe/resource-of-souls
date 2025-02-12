"use client";
import Link from "next/link";

interface ArchetypeData {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
}

interface ArchetypeTooltipProps {
  archetype: ArchetypeData;
  display?: string;
}

export default function TextArchetypeTooltip({ archetype, display }: ArchetypeTooltipProps) {
  const url = `/terminology?highlight=${archetype.name
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "")}`;

  return (
    <div className="relative inline-block group">
      <Link href={url} className="text-red-600 hover:underline cursor-pointer">
        {display || archetype.name}
      </Link>
      {archetype.shortDescription && (
        <div className="absolute invisible group-hover:visible z-10 top-8 left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 rounded-lg font-black text-sm bg-red-900 border-red-600 border-2 text-white shadow-lg">
          {archetype.shortDescription}
          <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-r-[12px] border-r-transparent border-b-[12px] border-b-red-600 border-l-[12px] border-l-transparent" />
        </div>
      )}
    </div>
  );
}
