"use client";

import { useState, useCallback } from "react";
import { TbChevronUp, TbChevronDown } from "react-icons/tb";
import AnimatedGif from "@/app/components/AnimatedGif";

interface CharacterAnimationsProps {
  animations: string[];
  slug: string;
}

export default function CharacterAnimations({ animations, slug }: CharacterAnimationsProps) {
  const [animationTabIsOpen, setAnimationTabIsOpen] = useState(false);

  const toggleAnimationTab = useCallback(() => {
    setAnimationTabIsOpen((prevState) => !prevState);
  }, []);

  return (
    <div className="border border-white rounded-xl w-full grid grid-cols-1 mb-4 pb-4">
      <h2 className="text-xl font-semibold p-2 pl-4 static">Animations</h2>
      <button className="font-bold text-teal-400 flex items-center gap-2 ml-4" onClick={toggleAnimationTab}>
        Click to {animationTabIsOpen ? "hide" : "expand"}
        {animationTabIsOpen ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
      </button>
      {animationTabIsOpen && (
        <div className="h-fit p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {animations.map((filename) => (
            <AnimatedGif
              key={filename}
              src={`/assets/character-animations/${slug}/${filename}.gif`}
              alt={filename
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
              filename={filename}
            />
          ))}
        </div>
      )}
    </div>
  );
}
