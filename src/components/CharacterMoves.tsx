"use client";
import { useState, useCallback, useMemo, JSX, useEffect } from "react";
import { Moves, Move } from "@/types/characterDataTypes";
import React from "react";

interface DebugInfo {
  originalMoveId: string;
  safeFileName: string;
  fullPath: string;
  isKikonMove: boolean;
}

interface CharacterMovesProps {
  moves: Moves[];
  characterId: string;
}

interface MoveAnimationTooltipProps {
  characterId: string;
  moveId: string;
  children: React.ReactNode;
}

const MoveAnimationTooltip = ({ characterId, moveId, children }: MoveAnimationTooltipProps) => {
  const [videoError, setVideoError] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);

  const safeFileName = moveId.replace(/\s+/g, "-").toLowerCase();
  const animationPath = `/assets/character-animations/${characterId}/${safeFileName}.mp4`;

  useEffect(() => {
    const isKikonMove = moveId.includes("kikon-move");
    setDebugInfo({
      originalMoveId: moveId,
      safeFileName,
      fullPath: animationPath,
      isKikonMove,
    });
  }, [moveId, safeFileName, animationPath]);

  return (
    <div className="relative inline-block group">
      <span className={`cursor-pointer ${videoError ? "text-red-600" : "text-teal-400"}`}>{children}</span>
      {!videoError && (
        <>
          {/* Mobile tooltip */}
          <div
            className="md:hidden absolute invisible group-hover:visible z-10 p-1 rounded-lg bg-black border-teal-400 border-2 shadow-lg
            left-36 -translate-x-1/2 bottom-full mb-4"
          >
            <video
              src={animationPath}
              width={300}
              height={300}
              className="rounded-lg max-w-[250px]"
              onError={(e) => {
                console.error("Video load error:", {
                  error: e,
                  debugInfo,
                  attemptedPath: animationPath,
                });
                setVideoError(true);
              }}
              onLoad={() => {
                console.log("Video loaded successfully:", debugInfo);
              }}
              autoPlay
              loop
              muted
            />
          </div>

          {/* Desktop tooltip */}
          <div
            className="hidden md:block absolute invisible group-hover:visible z-10 p-1 rounded-lg bg-black border-teal-400 border-2 shadow-lg
            left-full ml-4 top-1/2 -translate-y-1/2"
          >
            <video
              src={animationPath}
              width={300}
              height={300}
              className="rounded-lg max-w-[300px]"
              onError={(e) => {
                console.error("Video load error:", {
                  error: e,
                  debugInfo,
                  attemptedPath: animationPath,
                });
                setVideoError(true);
              }}
              autoPlay
              loop
              muted
            />
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
  const [activeTab, setActiveTab] = useState<"base" | "awakened" | "reawakened" | "kikon">("base");
  const [movesetKeyIsOpen, setMovesetKeyIsOpen] = useState(false);

  const hasReawakening = useMemo(() => moves.some((category) => category.reawakened && category.reawakened.length > 0), [moves]);

  const handleTabClick = useCallback((tab: "base" | "awakened" | "reawakened" | "kikon") => {
    setActiveTab(tab);
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col flex-wrap items-left w-full p-2 pt-0 mb-4">
          <button className="font-bold text-teal-400 flex items-center gap-2 ml-2" onClick={() => setMovesetKeyIsOpen((prevState) => !prevState)}>
            Click to {movesetKeyIsOpen ? "hide Movelist Key" : "show Movelist Key"}
            {movesetKeyIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
          </button>
          {movesetKeyIsOpen && (
            <div className="w-auto flex flex-wrap flex-row mt-4">
              <div className="grid grid-cols-2 w-full gap-2 ml-4 text-gray-400">
                <div>
                  <strong className="bg-teal-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">Q</strong> Quick
                  Attack
                </div>
                <div>
                  <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">F</strong> Flash
                  Attack
                </div>
                <div>
                  <strong className="bg-teal-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">SQ</strong>
                  Step Quick Attack
                </div>
                <div>
                  <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">SF</strong>
                  Special Flash Attack
                </div>
                <div>
                  <strong className="bg-indigo-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">SI</strong>
                  Signature Move
                </div>
                <div>
                  <strong className="bg-purple-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">BK</strong>
                  Breaker
                </div>
                <div>
                  <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">R</strong> Reverse
                </div>
                <div>
                  <strong className="bg-red-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">BR</strong>
                  Burst Reverse
                </div>
                <div>
                  <strong className="bg-orange-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">CR</strong>
                  Chain Reverse
                </div>
                <div>
                  <strong className="align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center bg-blue-300">SR</strong>
                  Soul Reverse
                </div>
                <div>
                  <strong className="bg-pink-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">KI</strong>
                  Kikon Move
                </div>
                <div>
                  <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">S1</strong>
                  Spiritual Pressure Move 1
                </div>
                <div>
                  <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">S2</strong>
                  Spiritual Pressure Move 2
                </div>
                <div>
                  <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">AW</strong>
                  Awakening
                </div>
                <div>
                  <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">RE</strong>
                  Reawakening
                </div>
                <div>
                  <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">HH</strong>
                  Follow-up Hoho
                </div>
                <div>
                  <strong className="bg-green-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">GD</strong>
                  Guard
                </div>
                <div>
                  <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">CO</strong>
                  Counter
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">&#8599;</span> Up-Right
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">&#8598;</span> Up-Left
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">&#8600;</span> Down-Right
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">&#8601;</span> Down-Left
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">&uarr;</span> Up
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">&darr;</span> Down
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">&rarr;</span> Right
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">&larr;</span> Left
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 ml-4">
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "base" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("base")}
        >
          Base
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "awakened" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("awakened")}
        >
          Awakened
        </button>
        {hasReawakening && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "reawakened" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("reawakened")}
          >
            Reawakened
          </button>
        )}
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "kikon" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("kikon")}
        >
          Kikon
        </button>
      </div>

      {/* Content */}
      <div>
        {moves.map((moveCategory, categoryIndex) => (
          <div key={categoryIndex}>
            {activeTab === "base" && moveCategory.base.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}

            {activeTab === "awakened" && moveCategory.awakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}

            {activeTab === "reawakened" && moveCategory.reawakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}

            {activeTab === "kikon" && moveCategory.kikon.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

interface MoveDisplayProps {
  move: Move;
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
