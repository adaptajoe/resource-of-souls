"use client";
import { useState, useCallback, useMemo, JSX } from "react";
import { IMoves, IMove } from "@/types/characterDataTypes";
import React from "react";
import { MoveAnimationTooltip } from "./MoveAnimationTooltip";
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

interface ICharacterMovesProps {
  moves: IMoves[];
  characterId: string;
}

const formatMoveTag = (tag: string): string => {
  const specialCases: { [key: string]: string } = {
    sp1: "SP1",
    sp2: "SP2",
  };

  if (tag.toLowerCase() in specialCases) {
    return specialCases[tag.toLowerCase()];
  }

  const withSpaces = tag.replace(/([A-Z])/g, " $1");
  const withSpacesBeforeNumbers = withSpaces.replace(/(\d+)/g, " $1");
  const cleaned = withSpacesBeforeNumbers.replace(/\s+/g, " ").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
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

  const sortedKeys = useMemo(() => Object.keys(translations).sort((a, b) => b.length - a.length), [translations]);
  const parts = useMemo(() => input.split(new RegExp(`(${sortedKeys.join("|")}|[+\\-])`, "g")), [input, sortedKeys]);

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>{translations[part] || part}</React.Fragment>
      ))}
    </>
  );
};

const CharacterMoves = ({ moves, characterId }: ICharacterMovesProps) => {
  const [activeTab, setActiveTab] = useState<"base" | "awakened" | "reawakened" | "kikon" | "baseCombos" | "awakenedCombos" | "reawakenedCombos">("base");
  const [movesetKeyIsOpen, setMovesetKeyIsOpen] = useState(false);

  const hasReawakening = useMemo(() => moves.some((category) => category.reawakened && category.reawakened.length > 0), [moves]);

  const handleTabClick = useCallback((tab: "base" | "awakened" | "reawakened" | "kikon" | "baseCombos" | "awakenedCombos" | "reawakenedCombos") => {
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
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">
                    <ArrowUpRight size={30} />
                  </span>{" "}
                  Up-Right
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">
                    <ArrowUpLeft size={30} />
                  </span>{" "}
                  Up-Left
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">
                    <ArrowDownRight size={30} />
                  </span>{" "}
                  Down-Right
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">
                    <ArrowDownLeft size={30} />
                  </span>{" "}
                  Down-Left
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">
                    <ArrowUp size={30} />
                  </span>{" "}
                  Up
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">
                    <ArrowDown size={30} />
                  </span>{" "}
                  Down
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">
                    <ArrowRight size={30} />
                  </span>{" "}
                  Right
                </div>
                <div>
                  <span className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">
                    <ArrowLeft size={30} />
                  </span>{" "}
                  Left
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 ml-4 overflow-x-scroll">
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
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "baseCombos" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("baseCombos")}
        >
          Base Combos
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "awakenedCombos" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
          onClick={() => handleTabClick("awakenedCombos")}
        >
          Awakened Combos
        </button>
        {hasReawakening && (
          <button
            className={`px-4 py-2 rounded-t-lg transition-colors ${activeTab === "reawakenedCombos" ? "bg-red-600 text-white" : "bg-gray-800 text-white hover:bg-red-800"}`}
            onClick={() => handleTabClick("reawakenedCombos")}
          >
            Reawakened Combos
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

            {activeTab === "kikon" && moveCategory.kikon.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}

            {activeTab === "baseCombos" && moveCategory.baseCombos.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}

            {activeTab === "awakenedCombos" && moveCategory.awakenedCombos?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}

            {activeTab === "reawakenedCombos" && moveCategory.reawakenedCombos?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

interface IMoveDisplayProps {
  move: IMove;
  characterId: string;
}

const MoveDisplay = ({ move, characterId }: IMoveDisplayProps) => {
  const translatedInput = useTranslateInput(move.input);

  return (
    <div className="border-t border-white hover:bg-gray-800 rounded-b-xl transition-colors">
      <div className="grid grid-cols-2 gap-4 items-start py-2 pr-2">
        <div>
          <MoveAnimationTooltip characterId={characterId} moveId={move.id}>
            <strong>{move.name}</strong>
          </MoveAnimationTooltip>
          <p className="text-sm italic ml-4 text-gray-400 mb-4">{move.description}</p>
          <div className="mb-4 mt-4">
            <strong className="ml-4">{translatedInput}</strong>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap mt-2">
            {move.moveTags.map((tag, index) => (
              <strong key={index} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 ml-2 mb-2">
                {formatMoveTag(tag)}
              </strong>
            ))}
          </div>
          <hr className="my-2" />
          <div className="flex flex-wrap mb-2 pt-2">
            {move.reishiGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reishi Gain: {move.reishiGain}</strong>}
            {move.reishiCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reishi Cost: {move.reishiCost}</strong>}
            {move.reiatsuGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reiatsu Gain: {move.reiatsuGain}</strong>}
            {move.reiatsuCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reiatsu Cost: {move.reiatsuCost}</strong>}
            {move.fightingSpiritGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Fighting Spirit Gain: {move.fightingSpiritGain}%</strong>}
            {move.fightingSpiritCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Fighting Spirit Cost: {move.fightingSpiritCost}%</strong>}
            {move.reversalGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reversal Gain: {move.reversalGain}%</strong>}
            {move.reversalCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Reversal Cost: {move.reversalCost}%</strong>}
            {move.resourceGain !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Resource Gain: {move.resourceGain}</strong>}
            {move.resourceCost !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Resource Cost: {move.resourceCost}</strong>}
            {move.damage !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Damage: {move.damage}</strong>}
            {move.frames !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Frames: {move.frames}</strong>}
            {move.cooldown !== "X Seconds" && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Cooldown: {move.cooldown}</strong>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterMoves;
