"use client";
import { useState, useCallback, useMemo, JSX } from "react";
import { MoveCategoryContainer, MoveInput } from "@/types/character";
import Image from "next/image";
import React from "react";

interface CharacterMovesProps {
  moves: MoveCategoryContainer[];
  characterId: string;
}

interface MoveAnimationTooltipProps {
  characterId: string;
  moveId: string;
  children: React.ReactNode;
}

const MoveAnimationTooltip = ({ characterId, moveId, children }: MoveAnimationTooltipProps) => {
  const [imageError, setImageError] = useState(false);

  // Encode the moveId to handle special characters
  const encodedMoveId = encodeURIComponent(moveId);
  const animationPath = `/assets/character-animations/${characterId}/${encodedMoveId}.mp4`;

  return (
    <div className="relative inline-block group">
      <span className={`cursor-pointer ${imageError ? "text-red-600" : "text-teal-400"}`}>{children}</span>
      {!imageError && (
        <>
          {/* Mobile tooltip (above) */}
          <div
            className="md:hidden absolute invisible group-hover:visible z-10 p-1 rounded-lg bg-black border-teal-400 border-2 shadow-lg
            left-1/2 -translate-x-1/2 bottom-full mb-4"
          >
            <Image src={animationPath} alt={`${moveId} animation`} width={300} height={300} className="rounded-lg max-w-[300px]" onError={() => setImageError(true)} />
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-[-12px] w-0 h-0 
              border-l-[12px] border-l-transparent 
              border-t-[12px] border-t-teal-400 
              border-r-[12px] border-r-transparent"
            />
          </div>

          {/* Desktop tooltip (right) */}
          <div
            className="hidden md:block absolute invisible group-hover:visible z-10 p-1 rounded-lg bg-black border-teal-400 border-2 shadow-lg
            left-full ml-4 top-1/2 -translate-y-1/2"
          >
            <Image src={animationPath} alt={`${moveId} animation`} width={300} height={300} className="rounded-lg max-w-[300px]" onError={() => setImageError(true)} />
            <div
              className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-0 h-0 
              border-t-[12px] border-t-transparent 
              border-r-[12px] border-r-teal-400 
              border-b-[12px] border-b-transparent"
            />
          </div>
        </>
      )}
    </div>
  );
};

const formatMoveTag = (tag: string): string => {
  const specialCases: { [key: string]: string } = {
    sp1: "SP1",
    sp2: "SP2",
  };

  if (tag.toLowerCase() in specialCases) {
    return specialCases[tag.toLowerCase()];
  }

  const withSpaces = tag.replace(/([A-Z])/g, " $1");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).trim();
};

const useTranslateInput = (input: string): JSX.Element => {
  const translations: { [key: string]: JSX.Element } = useMemo(
    () => ({
      Q: <strong className="bg-teal-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">Q</strong>,
      F: <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">F</strong>,
      SF: <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">SF</strong>,
      SQ: <strong className="bg-teal-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">SQ</strong>,
      SI: <strong className="bg-indigo-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">SI</strong>,
      BK: <strong className="bg-purple-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">BK</strong>,
      R: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">R</strong>,
      BR: <strong className="bg-red-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">BR</strong>,
      CR: <strong className="bg-orange-300 align-middle rounded-full p-1 size-[25px] inline-flex items.center ml-1 text-black text-center text-xs font-black justify-center">CR</strong>,
      SR: <strong className="bg-blue-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">SR</strong>,
      KI: <strong className="bg-pink-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">KI</strong>,
      S1: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">S1</strong>,
      S2: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">S2</strong>,
      AW: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">AW</strong>,
      RE: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">RE</strong>,
      HH: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">HH</strong>,
      GD: <strong className="bg-green-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">GD</strong>,
      CO: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">CO</strong>,
      NORTHEAST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">&nearr;</strong>,
      NORTHWEST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">&nwarr;</strong>,
      SOUTHEAST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">&searr;</strong>,
      SOUTHWEST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">&swarr;</strong>,
      NORTH: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">&uarr;</strong>,
      SOUTH: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">&darr;</strong>,
      EAST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">&rarr;</strong>,
      WEST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">&larr;</strong>,
    }),
    []
  );

  // Sort keys by length in descending order to match longer patterns first
  const sortedKeys = useMemo(() => Object.keys(translations).sort((a, b) => b.length - a.length), [translations]);

  // Split the input string into parts that match the pattern
  const parts = useMemo(() => input.split(new RegExp(`(${sortedKeys.join("|")}|[+\\-])`, "g")), [input, sortedKeys]);

  // Map each part to either its translation or itself
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>{translations[part] || part}</React.Fragment>
      ))}
    </>
  );
};

const CharacterMoves = ({ moves, characterId }: CharacterMovesProps) => {
  const [activeTab, setActiveTab] = useState<"base" | "awakened" | "reawakened">("base");

  const hasAwakening = useMemo(() => moves.some((category) => category.awakened && category.awakened.length > 0), [moves]);
  const hasReawakening = useMemo(() => moves.some((category) => category.reawakened && category.reawakened.length > 0), [moves]);

  const handleTabClick = useCallback((tab: "base" | "awakened" | "reawakened") => {
    setActiveTab(tab);
  }, []);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 ml-4">
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "base" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("base")}
        >
          Base
        </button>
        {hasAwakening && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "awakened" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("awakened")}
          >
            Awakened
          </button>
        )}
        {hasReawakening && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "reawakened" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("reawakened")}
          >
            Reawakened
          </button>
        )}
      </div>

      {/* Content */}
      <div>
        {moves.map((moveCategory, categoryIndex) => (
          <div key={categoryIndex}>
            {activeTab === "base" && moveCategory.base.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}

            {activeTab === "awakened" && moveCategory.awakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}

            {activeTab === "reawakened" && moveCategory.reawakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

// Subcomponent to display individual moves
interface MoveDisplayProps {
  move: MoveInput;
  characterId: string;
}

const MoveDisplay = ({ move, characterId }: MoveDisplayProps) => {
  const translatedInput = useTranslateInput(move.input);

  return (
    <div className="border-t border-white">
      <div className="grid grid-cols-2 gap-4 items-start py-2 pr-2">
        <div>
          <MoveAnimationTooltip characterId={characterId} moveId={move.id}>
            <strong className="italic ml-4">{move.name.replace(/\//g, " / ")}</strong>
          </MoveAnimationTooltip>
          <p className="text-sm italic ml-4 text-gray-400">{move.description}</p>
        </div>
        <div className="flex flex-wrap mt-2">
          {move.moveTags.map((tag, index) => (
            <strong key={index} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 ml-2 mb-2">
              {formatMoveTag(tag)}
            </strong>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center pr-2">
        <strong className="ml-4 mb-4">{translatedInput}</strong>
        <div className="flex flex-wrap mb-2">
          <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 ml-2">Cost: {move.resourceCost}</strong>
          <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 ml-2">Damage: {move.damage}</strong>
          <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 ml-2">Frames: {move.frames}</strong>
        </div>
      </div>
    </div>
  );
};

export default CharacterMoves;
