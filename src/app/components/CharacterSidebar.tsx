"use client";
import { useEffect, useState, useCallback, useMemo, FC } from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import { Character } from "@/types/character";
import {
  TbCircleArrowUpRightFilled,
  TbCircleArrowUpLeftFilled,
  TbCircleArrowDownRightFilled,
  TbCircleArrowDownLeftFilled,
  TbCircleArrowUpFilled,
  TbCircleArrowDownFilled,
  TbCircleArrowRightFilled,
  TbCircleArrowLeftFilled,
  TbChevronDown,
  TbChevronUp,
} from "react-icons/tb";

export interface CharacterSidebarProps {
  character: Character;
  slug: string;
}

const CharacterSidebar: FC<CharacterSidebarProps> = ({ character, slug }) => {
  const [movesetKeyIsOpen, setMovesetKeyIsOpen] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState("base-outfit-1");
  const [availableOutfits, setAvailableOutfits] = useState<{ base: number[]; dlc: number[] }>({ base: [1], dlc: [] });
  const totalStats = useMemo(() => character.stats[0].power + character.stats[0].speed + character.stats[0].range + character.stats[0].defense + character.stats[0].technique, [character.stats]);
  const [fullBodyImageSrc, setFullBodyImageSrc] = useState(`/assets/character-fullbody/${slug}-fullbody.png`);

  const imageExists = useCallback(async (imagePath: string): Promise<boolean> => {
    try {
      const response = await fetch(imagePath, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const checkOutfits = async () => {
      const baseOutfits = [];
      const dlcOutfits = [];

      // Check base outfits (1-3)
      for (let i = 1; i <= 3; i++) {
        const exists = await imageExists(`/assets/character-fullbody/${slug}-base-outfit-${i}.png`);
        if (exists) baseOutfits.push(i);
      }

      // Check DLC outfits (1-2)
      for (let i = 1; i <= 2; i++) {
        const exists = await imageExists(`/assets/character-fullbody/${slug}-dlc-outfit-${i}.png`);
        if (exists) dlcOutfits.push(i);
      }

      setAvailableOutfits({ base: baseOutfits, dlc: dlcOutfits });
    };

    checkOutfits();
  }, [slug, imageExists]);

  const handleOutfitChange = useCallback((outfitType: string, outfitNumber: number) => {
    const newOutfit = `${outfitType}-outfit-${outfitNumber}`;
    setCurrentOutfit(newOutfit);
  }, []);

  const formatTagName = useCallback((tag: string): string => {
    // Handle Squad numbers first
    if (tag.toLowerCase().includes("squad")) {
      return tag.replace(/squad(\d+)/i, (_, num) => `Squad ${num}`);
    }

    // Handle Gotei 13 specifically
    if (tag.toLowerCase().includes("gotei")) {
      return tag.replace(/gotei(\d+)/i, (_, num) => `Gotei ${num}`);
    }

    const spanishTerms = ["Segunda Etapa", "Espada", "Cero", "Bala", "Cero Oscuras", "Gran Ray Cero", "Hierro", "Sonido"];
    for (const term of spanishTerms) {
      if (tag.toLowerCase().includes(term.toLowerCase())) {
        return tag.replace(new RegExp(term, "i"), term);
      }
    }

    const acronyms = ["DLC", "PVP", "NPC"];
    // Split on capital letters, numbers, hyphens, and underscores
    const words = tag.split(/(?=[A-Z0-9])|[-_]/);

    return words
      .map((word) => {
        const lowercaseWord = word.toLowerCase();
        if (acronyms.includes(lowercaseWord.toUpperCase())) {
          return lowercaseWord.toUpperCase();
        }
        // Handle numbers by adding a space before them
        if (/^\d+$/.test(word)) {
          return ` ${word}`;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ")
      .trim()
      .replace(/\s+/g, " ");
  }, []);

  return (
    <div className="container flex-col items-center w-fit md:w-[500px] border border-r-0 border-t-0 border-white justify-start h-fit rounded-bl-xl hidden lg:flex">
      <div className="flex flex-row w-full">
        <div className="py-4 border-b border-b-white text-center w-full">
          <h2 className="text-3xl">{character.name}</h2>
          <p className="italic text-sm text-gray-400">Character #{character.characterNumber}</p>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="py-1 text-sm border-b border-b-white text-center w-full justify-around flex flex-row px-4">
          {availableOutfits.base.map((outfitNum) => (
            <button
              key={`base-${outfitNum}`}
              onClick={() => handleOutfitChange("base", outfitNum)}
              className={`hover:underline transition-colors ${currentOutfit === `base-outfit-${outfitNum}` ? "text-red-600 hover:no-underline" : "text-teal-400"}`}
            >
              <strong>Outfit {outfitNum}</strong>
            </button>
          ))}
          {availableOutfits.dlc.map((outfitNum) => (
            <button
              key={`dlc-${outfitNum}`}
              onClick={() => handleOutfitChange("dlc", outfitNum)}
              className={`hover:underline transition-colors ${currentOutfit === `dlc-outfit-${outfitNum}` ? "text-red-600 hover:no-underline" : "text-teal-400"}`}
            >
              <strong>DLC {outfitNum}</strong>
            </button>
          ))}
        </div>
      </div>
      <Image
        src={`/assets/character-fullbody/${slug}-${currentOutfit}.png`}
        height="300"
        width="300"
        alt={character.name}
        className="max-h-[300px] w-fit pt-2 object-cover object-top-center"
        style={{
          objectFit: "cover",
          objectPosition: "25% 0%",
          aspectRatio: "1/1",
        }}
        onError={() => setFullBodyImageSrc("/assets/character-fullbody/placeholder.png")}
      />
      <p className="hidden">{fullBodyImageSrc}</p>
      <div className="border-white border border-r-0 border-l-0 border-b-0 w-full">
        <div className="border-b border-white w-full flex flex-row text-center text-sm">
          <div className="w-1/6 bg-red-700 flex flex-col border-r border-white">
            <strong>P{character.stats[0].power}</strong>
          </div>
          <div className="w-1/6 bg-yellow-700 flex flex-col border-r border-white">
            <strong>S{character.stats[0].speed}</strong>
          </div>
          <div className="w-1/6 bg-purple-700 flex flex-col border-r border-white">
            <strong>R{character.stats[0].range}</strong>
          </div>
          <div className="w-1/6 bg-green-700 flex flex-col border-r border-white">
            <strong>D{character.stats[0].defense}</strong>
          </div>
          <div className="w-1/6 bg-blue-700 flex flex-col border-r border-white">
            <strong>T{character.stats[0].technique}</strong>
          </div>
          <div className="w-1/6 bg-black flex flex-col">
            <strong>{totalStats}</strong>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col w-auto items-center text-center px-4 border-b border-r border-white py-2">
            <h2 className="text-xl">Ease of Use</h2>
            <div className="my-auto">
              <StarRating rating={character.characterEaseOfUse} />
            </div>
          </div>
          <div className="flex flex-col items-center text-center w-3/4 border-b border-white p-2">
            <h2 className="text-xl">Archetypes</h2>
            <div className="flex flex-wrap justify-center my-1 mb-2">
              {character.characterArchetype.map((archetype) => (
                <strong key={archetype} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1 ml-2">
                  {formatTagName(archetype)}
                </strong>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-left w-full border-b border-white p-2 pb-4">
          <h2 className="w-full text-left mb-2 ml-2 text-xl">Affiliations</h2>
          <div className="w-auto flex flex-wrap flex-row">
            {character.tags.affiliations.map((affiliation) => (
              <strong key={affiliation} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1 ml-2">
                {formatTagName(affiliation)}
              </strong>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-left w-full border-b border-white p-2 pb-4">
          <h2 className="w-fit text-center mb-2 ml-2 text-xl">Relationships</h2>
          <div className="w-auto flex flex-wrap flex-row">
            {character.tags.relationships.map((relationship) => (
              <strong key={relationship} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1 ml-2">
                {formatTagName(relationship)}
              </strong>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-left w-full border-b border-white p-2 pb-4">
          <h2 className="w-fit text-center mb-2 ml-2 text-xl">Abilities</h2>
          <div className="w-auto flex flex-wrap flex-row">
            {character.tags.abilities.map((ability) => (
              <strong key={ability} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1 ml-2">
                {formatTagName(ability)}
              </strong>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-left w-full border-b border-white  p-2 mb-2">
          <h2 className="w-fit text-center mb-2 ml-2 text-xl">Characteristics</h2>
          <div className="w-auto flex flex-wrap flex-row">
            {character.tags.characteristics.map((characteristic) => (
              <strong key={characteristic} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1 ml-2">
                {formatTagName(characteristic)}
              </strong>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-left w-full p-2 mb-2">
          <h2 className="w-fit text-center mb-2 ml-2 text-xl">Movelist Key</h2>
          <button className="font-bold text-teal-400 flex items-center gap-2 ml-2" onClick={() => setMovesetKeyIsOpen((prevState) => !prevState)}>
            Click to {movesetKeyIsOpen ? "hide" : "expand"}
            {movesetKeyIsOpen ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
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
                  SP Move 1
                </div>
                <div>
                  <strong className="bg-white align-middle rounded-full p-1 size-[25px] inline-flex items-center mr-1 text-black text-center text-xs font-black justify-center">S2</strong>
                  SP Move 2
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
                  <TbCircleArrowUpRightFilled className="inline text-white" size={30} /> Up-Right
                </div>
                <div>
                  <TbCircleArrowUpLeftFilled className="inline text-white" size={30} /> Up-Left
                </div>
                <div>
                  <TbCircleArrowDownRightFilled className="inline text-white" size={30} /> Down-Right
                </div>
                <div>
                  <TbCircleArrowDownLeftFilled className="inline text-white" size={30} /> Down-Left
                </div>
                <div>
                  <TbCircleArrowUpFilled className="inline text-white" size={30} /> Up
                </div>
                <div>
                  <TbCircleArrowDownFilled className="inline text-white" size={30} /> Down
                </div>
                <div>
                  <TbCircleArrowRightFilled className="inline text-white" size={30} /> Right
                </div>
                <div>
                  <TbCircleArrowLeftFilled className="inline text-white" size={30} /> Left
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSidebar;
