"use client";
import Link from "next/link";
import characterData from "@/data/characterData.json";
import supplementaryData from "@/data/supplementaryData.json";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { TbChevronUp, TbChevronDown } from "react-icons/tb";

interface IArchetypeCardProps {
  title: string;
  id: string;
  description: string;
}

interface IGameTermCardProps {
  title: string;
  id: string;
  englishTitle?: string;
  description: string;
  isFocused?: boolean;
}

const normalizeSpecialCharacters = (str: string): string => {
  const charMap: { [key: string]: string } = {
    ū: "u", // For Genryūsai
    ō: "o", // For Tōsen, Tōshiro, Shihōin
  };

  return str
    .split("")
    .map((char) => charMap[char] || char)
    .join("");
};

const getCharactersByArchetype = (archetype: string): { name: string; slug: string }[] => {
  const normalizedArchetype = normalizeSpecialCharacters(archetype).toLowerCase().replace(/\s+/g, "");

  return Object.values(characterData)
    .filter((character) => {
      const characterArchetypes = character.characterArchetype.map((arch) => normalizeSpecialCharacters(arch).toLowerCase().replace(/\s+/g, ""));
      return characterArchetypes.includes(normalizedArchetype);
    })
    .map((character) => ({
      name: character.name,
      slug: normalizeSpecialCharacters(character.name)
        .toLowerCase()
        .replace(/\s*\((.*?)\)/g, "-$1")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, "")
        .trim(),
    }));
};

const TerminologyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [archetypesIsOpen, setArchetypesIsOpen] = useState(false);
  const [gameTermsIsOpen, setGameTermsIsOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [imageExtensions, setImageExtensions] = useState<{ [key: string]: string }>({});

  const filterItems = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredArchetypes = Object.values(supplementaryData.archetypes).filter((archetype) => filterItems(archetype.name) || filterItems(archetype.description));

  const filteredGameTerms = Object.values(supplementaryData.gameTerms).filter((term) => filterItems(term.name) || filterItems(term.description) || (term.engName && filterItems(term.engName)));

  const handleImageError = (id: string, currentExt: string) => {
    if (currentExt === "png") {
      // Try GIF if PNG fails
      setImageExtensions((prev) => ({ ...prev, [id]: "gif" }));
    } else {
      // If both PNG and GIF fail, mark as failed
      setFailedImages((prev) => new Set(prev).add(id));
    }
  };

  const getImageSrc = (id: string) => {
    if (failedImages.has(id)) {
      return "/assets/terminology-assets/placeholder.png";
    }
    const extension = imageExtensions[id] || "png";
    return `/assets/terminology-assets/${id}.${extension}`;
  };

  const searchParams = useSearchParams();
  const highlightedArchetype = searchParams.get("highlight");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setHighlightedId(hash);
      setGameTermsIsOpen(true);

      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 200;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else if (highlightedArchetype) {
      setHighlightedId(highlightedArchetype);
      setArchetypesIsOpen(true);

      setTimeout(() => {
        const element = document.getElementById(highlightedArchetype);
        if (element) {
          const headerOffset = 200;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [highlightedArchetype]);

  const ArchetypeCard = ({ title, description, id }: IArchetypeCardProps) => {
    const characters = getCharactersByArchetype(title);
    const isHighlighted = id === highlightedId;

    return (
      <div id={id} className={`border transition-all duration-300 scroll-mt-24 ${isHighlighted ? "border-red-600 ring-2 ring-red-600 bg-red-900/10" : "border-gray-400"}`}>
        <div className="relative w-full border-b-2 border-gray-800">
          <Image
            src={getImageSrc(id)}
            alt={title}
            width={300}
            height={150}
            className="w-full h-[150px] object-cover"
            onError={() => handleImageError(id, imageExtensions[id] || "png")}
            priority
            unoptimized={imageExtensions[id] === "gif"}
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-xl mb-2">{title}</h2>
          <p className="text-gray-400 italic pb-2 text-sm">{description}</p>
          {characters.length > 0 && (
            <div className="mt-2 w-full border-t border-gray-400">
              <div className="text-sm font-semibold pt-2">Characters:</div>
              <div className="flex flex-wrap gap-2 pt-2">
                {characters.map((character, index) => (
                  <Link
                    key={index}
                    className="text-xs bg-black border border-gray-600 hover:border-red-600 text-gray-400 px-2 py-1 hover:bg-red-900 hover:text-white transition-all"
                    href={`/characters/${character.slug}`}
                  >
                    {character.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const GameTermCard = ({ title, englishTitle, description, id }: IGameTermCardProps) => {
    const isHighlighted = id === highlightedId;

    return (
      <div id={id} className={`border transition-all duration-300 scroll-mt-24 ${isHighlighted ? "border-teal-400 ring-2 ring-teal-400 bg-teal-900/10" : "border-gray-400"}`}>
        <div className="relative w-full border-b-2 border-gray-800">
          <Image
            src={getImageSrc(id)}
            alt={title}
            width={300}
            height={150}
            className="w-full h-[150px] object-cover"
            onError={() => handleImageError(id, imageExtensions[id] || "png")}
            priority
            unoptimized={imageExtensions[id] === "gif"}
          />
        </div>
        <div className="p-4">
          <div className="font-bold text-xl mb-2 flex items-baseline">
            <h2 className="text-xl">{title}</h2>
            {englishTitle && <p className="text-xs text-gray-400 ml-2 italic">(ENG: {englishTitle})</p>}
          </div>
          <p className="text-gray-400 italic text-sm">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container p-8 min-w-fit">
      <nav className="flex flex-row">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p className="px-2">/</p>
        <Link href="/terminology" className="text-teal-400 hover:underline">
          Terminology
        </Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Terminology</h1>
      <div>
        <input
          type="text"
          placeholder="Search Archetypes and Game Terms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 bg-gray-900 border border-gray-400 rounded text-white"
        />
      </div>

      <div className="border-y border-gray-400 py-4">
        <h2 className="text-2xl font-bold text-white">Archetypes</h2>
        <div className="px-4">
          {!searchQuery && (
            <>
              <p className="mb-6 pt-4">
                An Archetype - or role, if you prefer - is a label we assign to characters to make them easily identifiable and accessible to new players, to help them understand what a character does
                without delving into the weeds of minutia...
              </p>
              <p className="mb-4 text-gray-400 italic">At present, there are {Object.keys(supplementaryData.archetypes).length} Archetypes to learn about.</p>
            </>
          )}
          {(!searchQuery || filteredArchetypes.length > 0) && (
            <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setArchetypesIsOpen((prevState) => !prevState)}>
              <span>Click to {archetypesIsOpen ? "hide" : "expand"}</span>
              {archetypesIsOpen ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
            </button>
          )}
          {archetypesIsOpen && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
              {filteredArchetypes.map((archetype) => (
                <ArchetypeCard key={archetype.id} id={archetype.id} title={archetype.name} description={archetype.description} />
              ))}
            </div>
          )}
          {searchQuery && filteredArchetypes.length === 0 && <p className="text-gray-400 italic mt-2">No matching Archetypes found.</p>}
        </div>
      </div>

      <hr />

      <div className="mt-4 border-b border-gray-400 pb-4">
        <h2 className="text-2xl font-bold text-white">Game Terms</h2>
        <div className="px-4">
          {!searchQuery && (
            <div className="mb-6 pt-4">
              <p>Bleach is a franchise filled with terms that may be confusing to newcomers...</p>
              <ul className="list-disc mt-4 pl-4">
                <li>The Reishi Gauge is your HP.</li>
                <li>Konpaku are your Stocks.</li>
                <li>Kikon Moves are your Ultimates.</li>
                <li>Clashes are failed Kikon Moves, triggered when over 30% Reishi (HP) and guarding.</li>
                <li>The Fighting Spirit Gauge is your Transformation Gauge and Buff Gauge, filled by landing hits, getting hit and hitting Kikon Moves (Ultimates).</li>
                <li>Awakenings are a First Transformation that costs Fighting Spirit.</li>
                <li>Reawakenings are a Second Transformation that also costs Fighting Spirit.</li>
                <li>Counters are teleporting Counters.</li>
                <li>Follow-up Hoho is a teleporting combo extender.</li>
                <li>The Reiatsu Gauge is your Special Bar.</li>
                <li>Quick Attacks are Light Attacks that build the Reiatsu Gauge (Special Bar).</li>
                <li>Flash Attacks are Heavy Attacks that damages Guards.</li>
                <li>Breakers are Grabs that break Guards.</li>
                <li>Guards are... Well, Guards. They&apos;re broken by Breakers and Flash Attacks.</li>
                <li>The Guard Gauge is a resource showing how much more you can Guard.</li>
              </ul>
            </div>
          )}
          {(!searchQuery || filteredGameTerms.length > 0) && (
            <>
              {!searchQuery && <p className="mb-4 text-gray-400 italic">At present, there are {Object.keys(supplementaryData.gameTerms).length} Game Terms to learn about.</p>}
              <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setGameTermsIsOpen((prevState) => !prevState)}>
                <span>Click to {gameTermsIsOpen ? "hide" : "expand"}</span>
                {gameTermsIsOpen ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
              </button>
            </>
          )}
          {gameTermsIsOpen && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
              {filteredGameTerms.map((term) => (
                <GameTermCard key={term.id} id={term.id} title={term.name} englishTitle={term.engName} description={term.description} />
              ))}
            </div>
          )}
          {searchQuery && filteredGameTerms.length === 0 && <p className="text-gray-400 italic mt-2">No matching Game Terms found.</p>}
        </div>
      </div>
    </div>
  );
};

export default function Terminology() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TerminologyPage />
    </Suspense>
  );
}
