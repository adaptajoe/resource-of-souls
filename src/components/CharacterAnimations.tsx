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
  const [animationTabIsOpen, setAnimationTabIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref: inViewRef } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const totalPages = Math.ceil(animations.length / ITEMS_PER_PAGE);
  const paginatedAnimations = animations.slice(0, currentPage * ITEMS_PER_PAGE);

  const toggleAnimationTab = useCallback(() => {
    setAnimationTabIsOpen((prevState) => !prevState);
    if (!animationTabIsOpen) {
      setCurrentPage(1);
    }
  }, [animationTabIsOpen]);

  const loadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleAnimationTab();
      }
    },
    [toggleAnimationTab]
  );

  return (
    <div className="border border-white rounded-xl w-full grid grid-cols-1 mb-4 pb-4 mt-6">
      <button
        className={`
          font-bold text-teal-400 flex items-center gap-2 ml-4 mt-4 p-2
          hover:bg-teal-400/10 rounded transition-colors
          focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 w-fit
        `}
        onClick={toggleAnimationTab}
        onKeyPress={handleKeyPress}
        aria-expanded={animationTabIsOpen}
        aria-controls="animations-container"
      >
        <span className="sr-only">{animationTabIsOpen ? "Hide animations" : "Show animations"}</span>
        <span aria-hidden="true">
          Click to {animationTabIsOpen ? "hide" : "expand"}
          {animationTabIsOpen ? <span className="ml-2">&uarr;</span> : <span className="ml-2">&darr;</span>}
        </span>
      </button>

      <div
        id="animations-container"
        ref={containerRef}
        className={`
          transition-all duration-300 ease-in-out
          ${animationTabIsOpen ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}
        `}
        aria-hidden={!animationTabIsOpen}
      >
        {animationTabIsOpen && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterAnimations;
