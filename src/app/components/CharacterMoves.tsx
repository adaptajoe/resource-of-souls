import { MoveCategories, MoveInput } from "@/types/character";
import React, { JSX } from "react";
import {
  TbCircleArrowUpRightFilled,
  TbCircleArrowUpLeftFilled,
  TbCircleArrowDownRightFilled,
  TbCircleArrowDownLeftFilled,
  TbCircleArrowUpFilled,
  TbCircleArrowDownFilled,
  TbCircleArrowRightFilled,
  TbCircleArrowLeftFilled,
  TbCircleArrowUpRight,
  TbCircleArrowUpLeft,
  TbCircleArrowDownRight,
  TbCircleArrowDownLeft,
  TbCircleArrowUp,
  TbCircleArrowDown,
  TbCircleArrowRight,
  TbCircleArrowLeft,
  TbCircleLetterRFilled,
  TbCircleLetterQFilled,
  TbCircleLetterFFilled,
} from "react-icons/tb";

interface CharacterMovesProps {
  moves: MoveCategories[];
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
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).trim();
};

const translateInput = (input: string): JSX.Element => {
  const translations: { [key: string]: JSX.Element } = {
    Q: <strong className="bg-teal-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">Q</strong>,
    F: <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">F</strong>,
    SF: <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">SF</strong>,
    SQ: <strong className="bg-teal-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">SQ</strong>,
    SI: <strong className="bg-indigo-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">SI</strong>,
    BK: <strong className="bg-purple-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">BK</strong>,
    R: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">R</strong>,
    BR: <strong className="bg-red-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">BR</strong>,
    CR: <strong className="bg-orange-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">CR</strong>,
    SR: <strong className="bg-blue-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">SR</strong>,
    KI: <strong className="bg-pink-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">KI</strong>,
    S1: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">S1</strong>,
    S2: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">S2</strong>,
    AW: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">AW</strong>,
    RE: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">RE</strong>,
    HH: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">HH</strong>,
    GD: <strong className="bg-green-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">GD</strong>,
    CO: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center text-xs font-black justify-center">CO</strong>,
    NORTHEAST: <TbCircleArrowUpRightFilled className="inline" size={30} />,
    NORTHWEST: <TbCircleArrowUpLeftFilled className="inline" size={30} />,
    SOUTHEAST: <TbCircleArrowDownRightFilled className="inline" size={30} />,
    SOUTHWEST: <TbCircleArrowDownLeftFilled className="inline" size={30} />,
    NORTH: <TbCircleArrowUpFilled className="inline" size={30} />,
    SOUTH: <TbCircleArrowDownFilled className="inline" size={30} />,
    EAST: <TbCircleArrowRightFilled className="inline" size={30} />,
    WEST: <TbCircleArrowLeftFilled className="inline" size={30} />,
    DNORTHEAST: <TbCircleArrowUpRight className="inline" size={30} />,
    DNORTHWEST: <TbCircleArrowUpLeft className="inline" size={30} />,
    DSOUTHEAST: <TbCircleArrowDownRight className="inline" size={30} />,
    DSOUTHWEST: <TbCircleArrowDownLeft className="inline" size={30} />,
    DNORTH: <TbCircleArrowUp className="inline" size={30} />,
    DSOUTH: <TbCircleArrowDown className="inline" size={30} />,
    DEAST: <TbCircleArrowRight className="inline" size={30} />,
    DWEST: <TbCircleArrowLeft className="inline" size={30} />,
  };

  // Sort keys by length in descending order to match longer patterns first
  const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);

  // Split the input string into parts that match the pattern
  const parts = input.split(new RegExp(`(${sortedKeys.join("|")}|[+\\-])`, "g"));

  // Map each part to either its translation or itself
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>{translations[part] || part}</React.Fragment>
      ))}
    </>
  );
};

const CharacterMoves = ({ moves }: CharacterMovesProps) => {
  return (
    <div>
      {moves.map((moveCategory, categoryIndex) => (
        <div key={categoryIndex}>
          <div>
            {moveCategory.neutral.map((move, moveIndex) => (
              <MoveDisplay key={moveIndex} move={move} />
            ))}
          </div>

          <div>
            {moveCategory.heavy?.map((move, moveIndex) => (
              <MoveDisplay key={moveIndex} move={move} />
            ))}
          </div>

          <div>
            {moveCategory.light?.map((move, moveIndex) => (
              <MoveDisplay key={moveIndex} move={move} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Subcomponent to display individual moves
interface MoveDisplayProps {
  move: MoveInput;
}

const MoveDisplay = ({ move }: MoveDisplayProps) => {
  return (
    <div className="border-t border-white">
      <div className="grid grid-cols-2 gap-4 items-start py-2 pr-2">
        <div>
          <strong className="italic ml-4">{move.name}</strong>
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
        <strong className="ml-4 mb-4">{translateInput(move.input)}</strong>
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
