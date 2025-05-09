"use client";
import { useEffect, useState, useCallback, useMemo, FC } from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import { ICharacter } from "@/types/characterDataTypes";
import { useInView } from "react-intersection-observer";

export interface ICharacterSidebarProps {
  character: ICharacter;
  slug: string;
}

const CharacterSidebar: FC<ICharacterSidebarProps> = ({ character, slug }) => {
  const [currentOutfit, setCurrentOutfit] = useState("base-outfit-1");
  const [availableOutfits, setAvailableOutfits] = useState<{ base: number[]; dlc: number[] }>({ base: [1], dlc: [] });
  const totalStats = useMemo(() => character.stats[0].power + character.stats[0].speed + character.stats[0].range + character.stats[0].defense + character.stats[0].technique, [character.stats]);
  const [imageError, setImageError] = useState(false);

  const { ref: imageRef, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const imageExists = useCallback(async (imagePath: string): Promise<boolean> => {
    try {
      const response = await fetch(imagePath, {
        method: "HEAD",
        cache: "force-cache",
      });
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const checkOutfits = async () => {
      const basePromises = Array.from({ length: 3 }, (_, i) => imageExists(`/assets/character-fullbody/${slug}/${slug}-base-outfit-${i + 1}.png`));
      const dlcPromises = Array.from({ length: 2 }, (_, i) => imageExists(`/assets/character-fullbody/${slug}/${slug}-dlc-outfit-${i + 1}.png`));

      const [baseResults, dlcResults] = await Promise.all([Promise.all(basePromises), Promise.all(dlcPromises)]);

      const baseOutfits = baseResults.map((exists, index) => (exists ? index + 1 : null)).filter((index): index is number => index !== null);

      const dlcOutfits = dlcResults.map((exists, index) => (exists ? index + 1 : null)).filter((index): index is number => index !== null);

      setAvailableOutfits({ base: baseOutfits, dlc: dlcOutfits });
    };

    checkOutfits();
  }, [slug, imageExists]);

  const handleOutfitChange = useCallback((outfitType: string, outfitNumber: number) => {
    const newOutfit = `${outfitType}-outfit-${outfitNumber}`;
    setCurrentOutfit(newOutfit);
  }, []);

  const formatTagName = useCallback((tag: string): string => {
    if (tag.toLowerCase().includes("squad")) {
      return tag.replace(/squad(\d+)/i, (_, num) => `Squad ${num}`);
    }

    if (tag.toLowerCase().includes("gotei")) {
      return tag.replace(/gotei(\d+)/i, (_, num) => `Gotei ${num}`);
    }

    const acronyms = ["DLC", "PVP", "NPC"];
    const words = tag.split(/(?=[A-Z0-9])|[-_]/);

    return words
      .map((word) => {
        const lowercaseWord = word.toLowerCase();
        if (acronyms.includes(lowercaseWord.toUpperCase())) {
          return lowercaseWord.toUpperCase();
        }
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
    <div className="container flex-col items-center w-fit md:w-[500px] border border-r-0 border-t-0 border-black dark:border-white justify-start h-fit rounded-bl-xl hidden lg:flex">
      <div className="flex flex-row w-full">
        <div className="py-4 border-b border-b-black dark:border-b-white text-center bg-white dark:bg-black w-full">
          <h2 className="text-3xl text-black dark:text-white">{character.name}</h2>
          <div className="italic text-gray-600 dark:text-gray-400 flex flex-row items-center justify-center">
            Character #{character.characterNumber}
            {!character.isEcho ? null : <p className="text-teal-600 dark:text-teal-400 ml-1">&epsilon;</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="py-1 text-sm border-b border-b-black dark:border-b-white bg-white dark:bg-black text-center w-full justify-around flex flex-row px-4">
          {availableOutfits.base.map((outfitNum) => (
            <button
              key={`base-${outfitNum}`}
              onClick={() => handleOutfitChange("base", outfitNum)}
              className={`hover:underline transition-colors ${currentOutfit === `base-outfit-${outfitNum}` ? "text-red-600 hover:no-underline" : "text-teal-600 dark:text-teal-400"}`}
            >
              <strong>Outfit {outfitNum}</strong>
            </button>
          ))}
          {availableOutfits.dlc.map((outfitNum) => (
            <button
              key={`dlc-${outfitNum}`}
              onClick={() => handleOutfitChange("dlc", outfitNum)}
              className={`hover:underline transition-colors ${currentOutfit === `dlc-outfit-${outfitNum}` ? "text-red-600 hover:no-underline" : "text-teal-600 dark:text-teal-400"}`}
            >
              <strong>DLC {outfitNum}</strong>
            </button>
          ))}
        </div>
      </div>
      <div ref={imageRef} className="relative w-[300px] h-[300px]">
        {inView && (
          <Image
            src={imageError ? "/assets/character-fullbody/placeholder.png" : `/assets/character-fullbody/${slug}/${slug}-${currentOutfit}.png`}
            fill
            priority={false}
            sizes="300px"
            alt={character.name}
            className="max-h-[300px] w-fit pt-2 object-cover object-top-center"
            style={{
              objectFit: "cover",
              objectPosition: "25% 0%",
            }}
            onError={() => setImageError(true)}
            loading="lazy"
            quality={75}
          />
        )}
      </div>
      <div className="border-black dark:border-white border border-r-0 border-l-0 border-b-0 w-full">
        <div className="border-b border-black dark:border-white w-full flex flex-row text-center text-sm">
          <div className="w-1/6 bg-red-700 flex flex-col border-r border-black dark:border-white">
            <strong>P{character.stats[0].power}</strong>
          </div>
          <div className="w-1/6 bg-yellow-700 flex flex-col border-r border-black dark:border-white">
            <strong>S{character.stats[0].speed}</strong>
          </div>
          <div className="w-1/6 bg-purple-700 flex flex-col border-r border-black dark:border-white">
            <strong>R{character.stats[0].range}</strong>
          </div>
          <div className="w-1/6 bg-green-700 flex flex-col border-r border-black dark:border-white">
            <strong>D{character.stats[0].defense}</strong>
          </div>
          <div className="w-1/6 bg-blue-700 flex flex-col border-r border-black dark:border-white">
            <strong>T{character.stats[0].technique}</strong>
          </div>
          <div className="w-1/6 bg-black flex flex-col">
            <strong>{totalStats}</strong>
          </div>
        </div>
        <div className="flex bg-white dark:bg-black flex-row">
          <div className="flex flex-col w-auto items-center text-center px-4 border-b border-r border-black dark:border-white py-2">
            <h2 className="text-xl text-black dark:text-white">Ease of Use</h2>
            <div className="my-auto">
              <StarRating rating={character.characterEaseOfUse} />
            </div>
          </div>
          <div className="flex flex-col items-center text-center w-3/4 border-b border-black dark:border-white p-2">
            <h2 className="text-xl text-black dark:text-white">Archetypes</h2>
            <div className="flex flex-wrap justify-center my-1 mb-2">
              {character.characterArchetype.map((archetype) => (
                <strong key={archetype} className="text-xs bg-white dark:bg-black border-gray-600 dark:border-gray-400 border text-gray-600 dark:text-gray-400 px-2 py-1 my-1 ml-2">
                  {formatTagName(archetype)}
                </strong>
              ))}
            </div>
          </div>
        </div>
        <div className="flex bg-white dark:bg-black flex-row flex-wrap items-left w-full border-b border-black dark:border-white p-2 pb-4">
          <h2 className="w-full text-left mb-2 ml-2 text-xl text-black dark:text-white">Affiliations</h2>
          <div className="w-auto flex flex-wrap flex-row">
            {character.tags.affiliations.map((affiliation) => (
              <strong key={affiliation} className="text-xs bg-white dark:bg-black border-gray-600 dark:border-gray-400 border text-gray-600 dark:text-gray-400 px-2 py-1 my-1 ml-2">
                {formatTagName(affiliation)}
              </strong>
            ))}
          </div>
        </div>
        <div className="flex bg-white dark:bg-black flex-col flex-wrap items-left w-full border-b border-black dark:border-white p-2 pb-4">
          <h2 className="w-fit text-center mb-2 ml-2 text-xl text-black dark:text-white">Relationships</h2>
          <div className="w-auto flex flex-wrap flex-row">
            {character.tags.relationships.map((relationship) => (
              <strong key={relationship} className="text-xs bg-white dark:bg-black border-gray-600 dark:border-gray-400 border text-gray-600 dark:text-gray-400 px-2 py-1 my-1 ml-2">
                {formatTagName(relationship)}
              </strong>
            ))}
          </div>
        </div>
        <div className="flex bg-white dark:bg-black flex-col flex-wrap items-left w-full border-b border-black dark:border-white p-2 pb-4">
          <h2 className="w-fit text-center mb-2 ml-2 text-xl text-black dark:text-white">Abilities</h2>
          <div className="w-auto flex flex-wrap flex-row">
            {character.tags.abilities.map((ability) => (
              <strong key={ability} className="text-xs bg-white dark:bg-black border-gray-600 dark:border-gray-400 border text-gray-600 dark:text-gray-400 px-2 py-1 my-1 ml-2">
                {formatTagName(ability)}
              </strong>
            ))}
          </div>
        </div>
        <div className="flex bg-white dark:bg-black flex-col flex-wrap items-left w-full p-2 rounded-bl-xl">
          <h2 className="w-fit text-center mb-2 ml-2 text-xl text-black dark:text-white">Characteristics</h2>
          <div className="w-auto flex flex-wrap flex-row">
            {character.tags.characteristics.map((characteristic) => (
              <strong key={characteristic} className="text-xs bg-white dark:bg-black border-gray-600 dark:border-gray-400 border text-gray-600 dark:text-gray-400 px-2 py-1 my-1 ml-2">
                {formatTagName(characteristic)}
              </strong>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSidebar;
