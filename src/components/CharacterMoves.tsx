"use client";
import { useState, useCallback, useMemo, useEffect, useRef, JSX } from "react";
import { IMoves, IMove } from "@/types/characterDataTypes";
import React from "react";
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, Circle, Plus, Square, Triangle, X } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

type NotationType = "term" | "pc" | "playstation" | "xbox" | "universal";
interface ICharacterMovesProps {
  moves: IMoves[];
  characterId: string;
}

interface ITranslateInputProps {
  input: string;
  notation: NotationType;
}

interface ITranslationElement {
  [key: string]: JSX.Element;
}

interface ITranslations {
  term: ITranslationElement;
  pc: ITranslationElement;
  playstation: ITranslationElement;
  xbox: ITranslationElement;
  universal: ITranslationElement;
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

const TranslateInput = ({ input, notation }: ITranslateInputProps) => {
  const translations = useMemo<ITranslations>(
    () => ({
      term: {
        Q: (
          <strong className="bg-teal-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Quick Attack
          </strong>
        ),
        F: (
          <strong className="bg-amber-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Flash Attack
          </strong>
        ),
        SF: (
          <strong className="bg-amber-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Special Flash Attack
          </strong>
        ),
        SQ: (
          <strong className="bg-teal-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Step Quick Attack
          </strong>
        ),
        SI: (
          <strong className="bg-indigo-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Signature Move
          </strong>
        ),
        BK: (
          <strong className="bg-purple-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Breaker
          </strong>
        ),
        R: (
          <strong className="bg-white align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Reverse
          </strong>
        ),
        BR: (
          <strong className="bg-red-300 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Burst Reverse
          </strong>
        ),
        CR: (
          <strong className="bg-orange-300 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Chain Reverse
          </strong>
        ),
        SR: (
          <strong className="bg-blue-300 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Soul Reverse
          </strong>
        ),
        KI: (
          <strong className="bg-pink-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Kikon
          </strong>
        ),
        S1: (
          <strong className="bg-white align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Spiritual Pressure Move 1
          </strong>
        ),
        S2: (
          <strong className="bg-white align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Spiritual Pressure Move 2
          </strong>
        ),
        AW: (
          <strong className="bg-white align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Awakening
          </strong>
        ),
        RE: (
          <strong className="bg-white align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Reawakening
          </strong>
        ),
        S: (
          <strong className="bg-white align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            4-Directional Step
          </strong>
        ),
        D: (
          <strong className="bg-amber-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Dash
          </strong>
        ),
        HH: (
          <strong className="bg-white align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Hohō
          </strong>
        ),
        GD: (
          <strong className="bg-green-400 align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Guard
          </strong>
        ),
        CO: (
          <strong className="bg-white align-middle rounded-full p-1 px-2 w-fit font-bebasFont tracking-wider inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            Counter
          </strong>
        ),
        NORTHEAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUpRight size={30} />
          </strong>
        ),
        NORTHWEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUpLeft size={30} />
          </strong>
        ),
        SOUTHEAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDownRight size={30} />
          </strong>
        ),
        SOUTHWEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDownLeft size={30} />
          </strong>
        ),
        NORTH: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUp size={30} />
          </strong>
        ),
        SOUTH: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDown size={30} />
          </strong>
        ),
        EAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowRight size={30} />
          </strong>
        ),
        WEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowLeft size={30} />
          </strong>
        ),
      },
      pc: {
        Q: <strong className="bg-teal-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">Q</strong>,
        F: <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">F</strong>,
        SF: <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">SF</strong>,
        SQ: <strong className="bg-teal-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">SQ</strong>,
        SI: <strong className="bg-indigo-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">SI</strong>,
        BK: <strong className="bg-purple-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">BK</strong>,
        R: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">R</strong>,
        BR: <strong className="bg-red-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">BR</strong>,
        CR: <strong className="bg-orange-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">CR</strong>,
        SR: <strong className="bg-blue-300 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">SR</strong>,
        KI: <strong className="bg-pink-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">KI</strong>,
        S1: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">S1</strong>,
        S2: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">S2</strong>,
        AW: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">AW</strong>,
        RE: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">RE</strong>,
        S: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">S</strong>,
        D: <strong className="bg-amber-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">D</strong>,
        HH: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">HH</strong>,
        GD: <strong className="bg-green-400 align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">GD</strong>,
        CO: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">CO</strong>,
        NORTHEAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUpRight size={30} />
          </strong>
        ),
        NORTHWEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUpLeft size={30} />
          </strong>
        ),
        SOUTHEAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDownRight size={30} />
          </strong>
        ),
        SOUTHWEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDownLeft size={30} />
          </strong>
        ),
        NORTH: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUp size={30} />
          </strong>
        ),
        SOUTH: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDown size={30} />
          </strong>
        ),
        EAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowRight size={30} />
          </strong>
        ),
        WEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowLeft size={30} />
          </strong>
        ),
      },
      playstation: {
        Q: (
          <div className="bg-fuchsia-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border p-1 bg-black rounded-full">
              <Square size={15} className="text-fuchsia-400" />
            </div>
          </div>
        ),
        F: (
          <div className="bg-lime-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border p-1 bg-black rounded-full">
              <Triangle size={15} className="text-lime-400" />
            </div>
          </div>
        ),
        SF: (
          <div className="bg-lime-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="pl-2">
              LS <span className=" tracking-wider">(In any direction)</span>
            </p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <Triangle size={15} className="text-lime-400" />
            </div>
          </div>
        ),
        SQ: (
          <div className="bg-fuchsia-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="pl-2">
              LS <span className=" tracking-wider">(In any direction)</span>
            </p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <Square size={15} className="text-fuchsia-400" />
            </div>
          </div>
        ),
        SI: (
          <div className="bg-red-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border p-1 bg-black rounded-full">
              <Circle size={15} className="text-red-400" />
            </div>
          </div>
        ),
        BK: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest">R1</p>
          </div>
        ),
        R: (
          <div className="bg-fuchsia-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">L2</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <Square size={15} className="text-fuchsia-400" />
            </div>
          </div>
        ),
        BR: (
          <div className="bg-fuchsia-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">L2</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <Square size={15} className="text-fuchsia-400" />
            </div>
            <p className="ml-2  tracking-wider pr-1">(Whilst being hit)</p>
          </div>
        ),
        CR: (
          <div className="bg-fuchsia-400 align-middle rounded-full w-fit h-6 mr-1  inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">L2</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <Square size={15} className="text-fuchsia-400" />
            </div>
            <p className="ml-2  tracking-wider pr-1">(Whilst attacking)</p>
          </div>
        ),
        SR: (
          <div className="bg-fuchsia-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">L2</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <Square size={15} className="text-fuchsia-400" />
            </div>
            <p className="ml-2  tracking-wider pr-1">(When not being hit / attacking)</p>
          </div>
        ),
        KI: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest">R2</p>
          </div>
        ),
        S1: (
          <div className="bg-lime-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">L2</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <Triangle size={15} className="text-lime-400" />
            </div>
          </div>
        ),
        S2: (
          <div className="bg-red-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">L2</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <Circle size={15} className="text-red-400" />
            </div>
          </div>
        ),
        AW: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-1">L3</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-1">R3</p>
          </div>
        ),
        RE: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-1">L3</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-1">R3</p>
          </div>
        ),
        S: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border p-1 bg-black rounded-full">
              <X size={15} className="text-blue-400" />
            </div>
          </div>
        ),
        D: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border p-1 bg-black rounded-full">
              <X size={15} className="text-blue-400" />
            </div>
            <p className="ml-2  tracking-wider pr-1">(Hold)</p>
          </div>
        ),
        HH: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">L2</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <X size={15} className="text-blue-400" />
            </div>
          </div>
        ),
        GD: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest">L1</p>
          </div>
        ),
        CO: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 mr-1 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">L2</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border p-1 bg-black rounded-full">
              <X size={15} className="text-blue-400" />
            </div>
            <p className="ml-2  tracking-wider pr-1">(With perfect timing)</p>
          </div>
        ),
        NORTHEAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUpRight size={30} />
          </strong>
        ),
        NORTHWEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUpLeft size={30} />
          </strong>
        ),
        SOUTHEAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDownRight size={30} />
          </strong>
        ),
        SOUTHWEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDownLeft size={30} />
          </strong>
        ),
        NORTH: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUp size={30} />
          </strong>
        ),
        SOUTH: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDown size={30} />
          </strong>
        ),
        EAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowRight size={30} />
          </strong>
        ),
        WEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowLeft size={30} />
          </strong>
        ),
      },
      xbox: {
        Q: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border bg-black rounded-full">
              <p className="text-blue-400 px-2">X</p>
            </div>
          </div>
        ),
        F: (
          <div className="bg-amber-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border bg-black rounded-full">
              <p className="text-amber-400 px-2">Y</p>
            </div>
          </div>
        ),
        SF: (
          <div className="bg-amber-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="pl-2">
              LS <span className=" tracking-wider">(In any direction)</span>
            </p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-amber-400 px-2">Y</p>
            </div>
          </div>
        ),
        SQ: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="pl-2">
              LS <span className=" tracking-wider">(In any direction)</span>
            </p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-blue-400 px-2">X</p>
            </div>
          </div>
        ),
        SI: (
          <div className="bg-red-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border bg-black rounded-full">
              <p className="text-red-400 px-2">B</p>
            </div>
          </div>
        ),
        BK: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest">RB</p>
          </div>
        ),
        R: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">LT</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-blue-400 px-2">X</p>
            </div>
          </div>
        ),
        BR: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">LT</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-blue-400 px-2">X</p>
            </div>
            <p className="ml-2  tracking-wider pr-2">(Whilst being hit)</p>
          </div>
        ),
        CR: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">LT</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-blue-400 px-2">X</p>
            </div>
            <p className="ml-2  tracking-wider pr-2">(Whilst attacking)</p>
          </div>
        ),
        SR: (
          <div className="bg-blue-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">LT</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-blue-400 px-2">X</p>
            </div>
            <p className="ml-2  tracking-wider pr-2">(When not being hit / attacking)</p>
          </div>
        ),
        KI: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest">RT</p>
          </div>
        ),
        S1: (
          <div className="bg-amber-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">LT</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-amber-400 px-2">Y</p>
            </div>
          </div>
        ),
        S2: (
          <div className="bg-red-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">LT</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-red-400 px-2">B</p>
            </div>
          </div>
        ),
        AW: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-1">LS</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-1">RS</p>
          </div>
        ),
        RE: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-1">LS</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-1">RS</p>
          </div>
        ),
        S: (
          <div className="bg-lime-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border bg-black rounded-full">
              <p className="text-lime-400 px-2">A</p>
            </div>
          </div>
        ),
        D: (
          <div className="bg-lime-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="border-black border bg-black rounded-full">
              <p className="text-lime-400 px-2">A</p>
            </div>
            <p className="ml-2  tracking-wider pr-1">(Hold)</p>
          </div>
        ),
        HH: (
          <div className="bg-lime-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">LT</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-lime-400 px-2">A</p>
            </div>
          </div>
        ),
        GD: (
          <div className="bg-gray-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest">LB</p>
          </div>
        ),
        CO: (
          <div className="bg-lime-400 align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="tracking-widest ml-2">LT</p>
            <Plus size={20} className="mx-2" />
            <div className="border-black border bg-black rounded-full">
              <p className="text-lime-400 px-2">A</p>
            </div>
            <p className="ml-2  tracking-wider pr-2">(With perfect timing)</p>
          </div>
        ),
        NORTHEAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUpRight size={30} />
          </strong>
        ),
        NORTHWEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUpLeft size={30} />
          </strong>
        ),
        SOUTHEAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDownRight size={30} />
          </strong>
        ),
        SOUTHWEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDownLeft size={30} />
          </strong>
        ),
        NORTH: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowUp size={30} />
          </strong>
        ),
        SOUTH: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowDown size={30} />
          </strong>
        ),
        EAST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowRight size={30} />
          </strong>
        ),
        WEST: (
          <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">
            <ArrowLeft size={30} />
          </strong>
        ),
      },
      universal: {
        Q: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="p-1">
              <p className="px-1">A</p>
            </div>
          </div>
        ),
        F: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="p-1">
              <p className="px-1">B</p>
            </div>
          </div>
        ),
        SF: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="ml-2">B</p>
            <p>1</p>
            <p className="ml-2  tracking-wider pr-1">(Or any other movement)</p>
          </div>
        ),
        SQ: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="ml-2">A</p>
            <p>1</p>
            <p className="ml-2  tracking-wider pr-1">(Or any other movement)</p>
          </div>
        ),
        SI: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="p-1">
              <p className="px-1">D</p>
            </div>
          </div>
        ),
        BK: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="p-1">
              <p className="px-1">E</p>
            </div>
          </div>
        ),
        R: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-2">F</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-2">A</p>
          </div>
        ),
        BR: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-2">F</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-2">D</p>
            <p className="ml-2  tracking-wider pr-1">(When not SR / CR)</p>
          </div>
        ),
        CR: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-2">F</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-2">D</p>
            <p className="ml-2  tracking-wider pr-1">(Whilst attacking)</p>
          </div>
        ),
        SR: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-2">F</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-2">D</p>
            <p className="ml-2  tracking-wider pr-1">(Whilst being hit)</p>
          </div>
        ),
        KI: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="p-1">
              <p className="px-1">H</p>
            </div>
          </div>
        ),
        S1: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-2">F</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-2">B</p>
          </div>
        ),
        S2: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-2 py-4 justify-center">
            <p className="tracking-widest ml-2">F</p>
            <Plus size={20} className="mx-2" />
            <p className="tracking-widest mr-2">D</p>
          </div>
        ),
        AW: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="ml-2">J</p>
            <Plus size={20} className="mx-2" />
            <div className="p-1 mr-1">I</div>
          </div>
        ),
        RE: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="ml-2">J</p>
            <Plus size={20} className="mx-2" />
            <div className="p-1 mr-1">I</div>
          </div>
        ),
        S: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="p-1">
              <p className="px-1">C</p>
            </div>
          </div>
        ),
        D: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="p-1">
              <p className="px-1">C</p>
            </div>
            <p className="ml-2  tracking-wider pr-1">(Hold)</p>
          </div>
        ),
        HH: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="ml-2">F</p>
            <Plus size={20} className="mx-2" />
            <div className="p-1 mr-1">A</div>
          </div>
        ),
        GD: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <div className="p-1">
              <p className="px-1">G</p>
            </div>
          </div>
        ),
        CO: (
          <div className="bg-white align-middle rounded-full w-fit h-6 inline-flex flex-row items-center ml-1 text-black text-center font-bebasFont px-1 py-4 justify-center">
            <p className="ml-2">F</p>
            <Plus size={20} className="ml-2" />
            <div className="p-1">
              <p className="ml-2">A</p>
            </div>
            <p className="ml-2  tracking-wider pr-1">(With perfect timing)</p>
          </div>
        ),
        NORTHEAST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">2</strong>,
        NORTHWEST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">8</strong>,
        SOUTHEAST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">4</strong>,
        SOUTHWEST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">6</strong>,
        NORTH: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">1</strong>,
        SOUTH: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">5</strong>,
        EAST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">3</strong>,
        WEST: <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center ml-1 text-black text-center  font-black justify-center">7</strong>,
      },
    }),
    []
  );

  const sortedKeys = useMemo(() => Object.keys(translations[notation]).sort((a, b) => b.length - a.length), [translations, notation]);
  const parts = useMemo(() => input.split(new RegExp(`(${sortedKeys.join("|")}|[+\\-])`, "g")), [input, sortedKeys]);

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>{translations[notation][part] || part}</React.Fragment>
      ))}
    </>
  );
};

const CharacterMoves = ({ moves, characterId }: ICharacterMovesProps) => {
  const [activeTab, setActiveTab] = useState<"base" | "awakened" | "reawakened" | "kikon" | "baseCombos" | "awakenedCombos" | "reawakenedCombos">("base");
  const [movesetKeyIsOpen, setMovesetKeyIsOpen] = useState(false);
  const [notation, setNotation] = useState<NotationType>("term");

  const hasReawakening = useMemo(() => moves.some((category) => category.reawakened && category.reawakened.length > 0), [moves]);

  const handleTabClick = useCallback((tab: "base" | "awakened" | "reawakened" | "kikon" | "baseCombos" | "awakenedCombos" | "reawakenedCombos") => {
    setActiveTab(tab);
  }, []);

  const handleNotationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNotation(event.target.value as NotationType);
  };

  const translatedKeys = useMemo(() => {
    return [
      { key: "Q", label: "Quick Attack" },
      { key: "F", label: "Flash Attack" },
      { key: "SQ", label: "Step Quick Attack" },
      { key: "SF", label: "Special Flash Attack" },
      { key: "SI", label: "Signature Move" },
      { key: "BK", label: "Breaker" },
      { key: "R", label: "Reverse" },
      { key: "BR", label: "Burst Reverse" },
      { key: "CR", label: "Chain Reverse" },
      { key: "SR", label: "Soul Reverse" },
      { key: "KI", label: "Kikon Move" },
      { key: "S1", label: "Spiritual Pressure Move 1" },
      { key: "S2", label: "Spiritual Pressure Move 2" },
      { key: "AW", label: "Awakening" },
      { key: "RE", label: "Reawakening" },
      { key: "S", label: "4-Directional Step" },
      { key: "D", label: "Dash" },
      { key: "HH", label: "Follow-up Hohō" },
      { key: "GD", label: "Guard" },
      { key: "CO", label: "Counter" },
      { key: "NORTHEAST", label: "Up-Right" },
      { key: "NORTHWEST", label: "Up-Left" },
      { key: "SOUTHEAST", label: "Down-Right" },
      { key: "SOUTHWEST", label: "Down-Left" },
      { key: "NORTH", label: "Up" },
      { key: "SOUTH", label: "Down" },
      { key: "EAST", label: "Right" },
      { key: "WEST", label: "Left" },
    ];
  }, [notation]);

  const renderMovelistKey = () => (
    <div className="w-auto flex flex-wrap flex-row mt-4">
      <div className="grid grid-cols-2 w-full gap-2 ml-4 text-gray-400">
        {translatedKeys.map(({ key, label }) => (
          <div key={key}>
            <TranslateInput input={key} notation={notation} /> {label}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div>
        <div className="flex flex-col flex-wrap items-left w-full p-2 pt-0 mb-4">
          <label className="font-bold text-teal-400 flex items-center gap-2 ml-2">
            Notation Style:
            <select value={notation} onChange={handleNotationChange} className="ml-2 p-1 bg-gray-800 w-full sm:w-fit text-white rounded">
              <option value="term">Term Notation</option>
              <option value="pc">Default PC Keybind Notation</option>
              <option value="playstation">PlayStation Notation</option>
              <option value="xbox">Xbox Notation</option>
              <option value="universal">Universal Notation</option>
            </select>
          </label>
          <hr className="my-4 w-full" />
          <button className="font-bold text-teal-400 flex items-center gap-2 ml-2 mt-2" onClick={() => setMovesetKeyIsOpen((prevState) => !prevState)}>
            Click to {movesetKeyIsOpen ? "hide Movelist Key" : "show Movelist Key"}
            {movesetKeyIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
          </button>
          {movesetKeyIsOpen && renderMovelistKey()}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 pl-4 border-b border-b-gray-400 overflow-x-scroll">
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
          <div key={categoryIndex} className="h-fit bg-gray-700 rounded-b-xl">
            {activeTab === "base" && moveCategory.base.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} />)}

            {activeTab === "awakened" && moveCategory.awakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} />)}

            {activeTab === "reawakened" && moveCategory.reawakened?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} />)}

            {activeTab === "kikon" && moveCategory.kikon.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} />)}

            {activeTab === "baseCombos" && moveCategory.baseCombos.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} />)}

            {activeTab === "awakenedCombos" && moveCategory.awakenedCombos?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} />)}

            {activeTab === "reawakenedCombos" && moveCategory.reawakenedCombos?.map((move, moveIndex) => <MoveDisplay key={moveIndex} move={move} characterId={characterId} notation={notation} />)}
          </div>
        ))}
      </div>
    </div>
  );
};

interface IMoveDisplayProps {
  move: IMove;
  characterId: string;
  notation: NotationType;
}

const MoveDisplay = ({ move, characterId, notation }: IMoveDisplayProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const playVideo = async () => {
      if (!videoRef.current || !isMounted.current) return;

      try {
        if (isHovered && !videoError) {
          await videoRef.current.play();
        } else {
          videoRef.current.pause();
          if (videoRef.current.paused) {
            videoRef.current.currentTime = 0;
          }
        }
      } catch (error) {
        if (isMounted.current) {
          console.error("Error handling video:", error);
          setVideoError(true);
        }
      }
    };

    const timeoutId = setTimeout(playVideo, 50);
    return () => clearTimeout(timeoutId);
  }, [isHovered, videoError]);

  return (
    <div
      className="border-b border-gray-400 bg-black hover:bg-gray-900 transition-colors last:mb-0 last:rounded-b-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Top bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-400">
        <div className="flex flex-col border-r border-gray-400 items-start justify-center ml-4">
          <div className="flex items-center">
            <span className={`transform ${isExpanded ? "rotate-180" : ""} mr-2`}>▼</span>
            <p className="font-bebasFont text-3xl tracking-wide text-teal-400 py-2 mr-2">{move.name}</p>
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-wrap">
            {move.moveTags.map((tag, index) => (
              <strong key={index} className="text-xs bg-black border-gray-400 border text-gray-400 m-1 px-2 py-1">
                {formatMoveTag(tag)}
              </strong>
            ))}
          </div>
        </div>
      </div>

      {/* Collapsible content */}
      <div className={`transition-all duration-300 ${isExpanded ? "block" : "hidden"}`}>
        {/* Middle */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-400">
          <div className="border-r border-gray-400 p-8 px-4 text-gray-400 italic text-sm">
            <p>&quot;{move.description}&quot;</p>
          </div>
          <div className="p-4">
            <div className="flex flex-col h-full relative items-center justify-center">
              <Image
                src={`/assets/character-animations/${characterId}/${move.id}.png`}
                alt={`${move.name} first frame`}
                width={300}
                height={300}
                className={`w-fit border-2 border-gray-400 block ${isHovered && !videoError ? "grayscale" : ""}`}
                onError={(e) => {
                  e.currentTarget.src = "/assets/character-animations/placeholder.png";
                }}
              />

              {!videoError && (
                <video
                  ref={videoRef}
                  width={300}
                  height={300}
                  className={`absolute border-2 border-gray-400 w-fit ${isHovered ? "block" : "hidden"}`}
                  onError={() => setVideoError(true)}
                  src={`/assets/character-animations/${characterId}/${move.id}.mp4`}
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              )}
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="border-b border-gray-400 p-4">
          <TranslateInput input={move.input} notation={notation} />
        </div>

        {/* Bottom Tags */}
        <div className="p-2 flex flex-row flex-wrap">
          {(() => {
            const hasAnyStats =
              move.reishiGain !== null ||
              move.reishiCost !== null ||
              move.reiatsuGain !== null ||
              move.reiatsuCost !== null ||
              move.fightingSpiritGain !== null ||
              move.fightingSpiritCost !== null ||
              move.reversalGain !== null ||
              move.reversalCost !== null ||
              move.resourceGain !== null ||
              move.resourceCost !== null ||
              move.damage !== null ||
              move.hits !== null ||
              move.frames !== null ||
              move.cooldown !== "X Seconds";

            if (!hasAnyStats) {
              return <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">No Move Stats</strong>;
            }

            return (
              <>
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
                {move.hits !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Hits: {move.hits}</strong>}
                {move.frames !== null && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Frames: {move.frames}</strong>}
                {move.cooldown !== "X Seconds" && <strong className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 m-1">Cooldown: {move.cooldown}</strong>}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default CharacterMoves;
