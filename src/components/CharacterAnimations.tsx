"use client";
import { useState, useCallback, FC, useRef } from "react";
import AnimatedVideo from "@/components/AnimatedVideo";
import { useInView } from "react-intersection-observer";

const ITEMS_PER_PAGE = 6;

export interface ICharacterAnimationsProps {
  animations: string[];
  slug: string;
}

const CharacterAnimations: FC<ICharacterAnimationsProps> = ({ animations, slug }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref: inViewRef } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const totalPages = Math.ceil(animations.length / ITEMS_PER_PAGE);
  const paginatedAnimations = animations.slice(0, currentPage * ITEMS_PER_PAGE);

  const loadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="rounded-xl w-full grid grid-cols-1 mb-4 pb-4 mt-6">
      <div
        id="animations-container"
        ref={containerRef}
        className="
          transition-all duration-300 ease-in-out
          h-auto overflow-hidden"
      >
        <div className="h-fit p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginatedAnimations.map((filename, index) => {
            const videoSrc = `/assets/character-animations/${encodeURIComponent(slug)}/${encodeURIComponent(filename)}.mp4`;
            const formattedName = filename
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
              .replace(/\//g, " / ");

            return (
              <div key={filename} ref={index === paginatedAnimations.length - 1 ? inViewRef : null}>
                <AnimatedVideo src={videoSrc} alt={formattedName} filename={filename} />
              </div>
            );
          })}
        </div>

        {currentPage < totalPages && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              className={`
                    px-4 py-2 bg-teal-400/20 font-black text-teal-400 rounded
                    hover:bg-teal-400/30 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-teal-400
                  `}
              aria-label="Load more animations"
            >
              Load More ({paginatedAnimations.length} of {animations.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterAnimations;
