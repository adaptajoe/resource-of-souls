"use client";
import Link from "next/link";
import { useMemo, useState, useCallback } from "react";

interface ArchetypeTooltipProps {
  archetype: string;
  display: string;
  shortDescription: string;
  highlighted?: boolean;
}

export default function ArchetypeTooltip({ archetype, display, shortDescription, highlighted = false }: ArchetypeTooltipProps) {
  const [isFocused, setIsFocused] = useState(false);

  const url = useMemo(() => {
    const formattedArchetype = archetype
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "")
      .trim();

    return `/glossary?highlight=${encodeURIComponent(formattedArchetype)}`;
  }, [archetype]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        setIsFocused(!isFocused);
      }
    },
    [isFocused]
  );

  const baseClasses = "text-xs px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = highlighted ? "bg-red-900 border-red-600 border text-white" : "bg-black border-gray-400 border text-gray-400";
  const hoverClasses = "hover:bg-red-900 hover:border-red-600 hover:text-white";

  return (
    <div className="relative inline-block" onMouseLeave={() => setIsFocused(false)}>
      <Link
        href={url}
        className={`${baseClasses} ${variantClasses} ${hoverClasses}`}
        aria-describedby={shortDescription ? `tooltip-${archetype}` : undefined}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        role="button"
      >
        {display}
      </Link>
      {shortDescription && (
        <div
          id={`tooltip-${archetype}`}
          role="tooltip"
          className={`
            absolute z-10 top-8 left-1/2 transform -translate-x-1/2 
            mb-2 w-48 max-h-[200px] overflow-y-auto p-2 rounded-lg 
            font-black text-sm bg-red-900 border-red-600 border-2 
            text-white shadow-lg transition-opacity duration-200
            ${isFocused || false ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          {shortDescription}
          <div
            className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 
                       w-0 h-0 border-r-[12px] border-r-transparent 
                       border-b-[12px] border-b-red-600 
                       border-l-[12px] border-l-transparent"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
