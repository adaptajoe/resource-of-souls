"use client";
import { useState, useCallback, FC } from "react";
import AnimatedVideo from "@/components/AnimatedVideo";

export interface CharacterAnimationsProps {
  animations: string[];
  slug: string;
}

const CharacterAnimations: FC<CharacterAnimationsProps> = ({ animations, slug }) => {
  const [animationTabIsOpen, setAnimationTabIsOpen] = useState(false);

  const toggleAnimationTab = useCallback(() => {
    setAnimationTabIsOpen((prevState) => !prevState);
  }, []);

  return (
    <div className="border border-white rounded-xl w-full grid grid-cols-1 mb-4 pb-4 mt-6">
      <button className="font-bold text-teal-400 flex items-center gap-2 ml-4 mt-4" onClick={toggleAnimationTab}>
        Click to {animationTabIsOpen ? "hide" : "expand"}
        {animationTabIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
      </button>
      {animationTabIsOpen && (
        <div className="h-fit p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {animations.map((filename) => {
            const videoSrc = `/assets/character-animations/${encodeURIComponent(slug)}/${encodeURIComponent(filename)}.mp4`;
            return (
              <AnimatedVideo
                key={filename}
                src={videoSrc}
                alt={filename
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
                  .replace(/\//g, " / ")}
                filename={filename}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CharacterAnimations;
