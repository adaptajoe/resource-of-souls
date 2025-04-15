"use client";
import { useEffect, useState, useCallback, FC } from "react";
import Image from "next/image";
import { ICharacter } from "@/types/characterDataTypes";
import { useInView } from "react-intersection-observer";

export interface ICharacterOutfitsProps {
  character: ICharacter;
  slug: string;
}

const CharacterOutfits: FC<ICharacterOutfitsProps> = ({ character, slug }) => {
  const [currentOutfit, setCurrentOutfit] = useState("base-outfit-1");
  const [availableOutfits, setAvailableOutfits] = useState<{ base: number[]; dlc: number[] }>({ base: [1], dlc: [] });
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

  return (
    <div className="container flex-col items-center w-full border border-gray-400 justify-start h-fit rounded-xl flex">
      <div className="flex flex-row w-full">
        <div className="text-xl font-bebasFont border-b border-b-gray-400 text-center w-full justify-around flex flex-row p-4">
          {availableOutfits.base.map((outfitNum) => (
            <button
              key={`base-${outfitNum}`}
              onClick={() => handleOutfitChange("base", outfitNum)}
              className={`bg-gray-700 text-white hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl ${
                currentOutfit === `base-outfit-${outfitNum}` ? "bg-teal-600 text-black" : null
              }`}
            >
              <strong>Outfit {outfitNum}</strong>
            </button>
          ))}
          {availableOutfits.dlc.map((outfitNum) => (
            <button
              key={`dlc-${outfitNum}`}
              onClick={() => handleOutfitChange("dlc", outfitNum)}
              className={`bg-gray-700 hover:bg-red-600 text-white hover:text-black transition-colors p-4 py-3 rounded-xl ${
                currentOutfit === `dlc-outfit-${outfitNum}` ? "bg-teal-400 text-black" : null
              }`}
            >
              <strong>DLC {outfitNum}</strong>
            </button>
          ))}
        </div>
      </div>
      <div ref={imageRef} className="relative p-6">
        {inView && (
          <Image
            src={imageError ? "/assets/character-fullbody/placeholder.png" : `/assets/character-fullbody/${slug}/${slug}-${currentOutfit}.png`}
            layout="intrinsic"
            priority={false}
            width={300}
            height={300}
            alt={character.name}
            className="pt-2"
            onError={() => setImageError(true)}
            loading="lazy"
            quality={75}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterOutfits;
