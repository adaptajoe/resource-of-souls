"use client";
import Link from "next/link";
import characterData from "@/data/characterData.json";
import supplementaryData from "@/data/supplementaryData.json";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
  const [archetypesIsOpen, setArchetypesIsOpen] = useState(false);
  const [gameTermsIsOpen, setGameTermsIsOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

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
      <div id={id} className={`p-4 border transition-all duration-300 scroll-mt-24 ${isHighlighted ? "border-red-600 ring-2 ring-red-600 bg-red-900/10" : "border-gray-400"}`}>
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-400 italic pb-2 text-sm">{description}</p>
        {characters.length > 0 && (
          <div className="mt-2 w-full border-t border-gray-400">
            <div className="text-sm font-semibold pt-2">Characters:</div>
            <div className="flex flex-wrap gap-2 pt-2">
              {characters.map((character, index) => (
                <Link
                  key={index}
                  className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 hover:bg-red-900 hover:border-red-600 hover:text-white transition-colors"
                  href={`/characters/${character.slug}`}
                >
                  {character.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const GameTermCard = ({ title, englishTitle, description, id }: IGameTermCardProps) => {
    const isHighlighted = id === highlightedId;

    return (
      <div id={id} className={`p-4 border transition-all duration-300 scroll-mt-24 ${isHighlighted ? "border-teal-400 ring-2 ring-teal-400 bg-teal-900/10" : "border-gray-400"}`}>
        <div className="font-bold text-xl mb-2 flex items-baseline">
          <h2 className="text-xl">{title}</h2>
          {englishTitle && <p className="text-xs text-gray-400 ml-2 italic">(ENG: {englishTitle})</p>}
        </div>
        <p className="text-gray-400 italic text-sm">{description}</p>
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
        {/* Archetype Section */}
        <div className="border-y border-gray-400 py-4">
          <h2 className="text-2xl font-bold text-white">Archetypes</h2>
          <div className="px-4">
            <p className="mb-6 pt-4">
              An Archetype - or role, if you prefer - is a label we assign to characters to make them easily identifiable and accessible to new players, to help them understand what a character does
              without delving into the weeds of minutia...
            </p>
            <p className="mb-4 text-gray-400 italic">At present, there are {Object.keys(supplementaryData.archetypes).length} Archetypes to learn about.</p>
            <button className="font-bold text-teal-400 flex items-center gap-2" onClick={() => setArchetypesIsOpen((prevState) => !prevState)}>
              Click to {archetypesIsOpen ? "hide" : "expand"}
              {archetypesIsOpen ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
            </button>
            {!archetypesIsOpen ? null : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
                {Object.values(supplementaryData.archetypes).map((archetype) => (
                  <ArchetypeCard key={archetype.id} id={archetype.id} title={archetype.name} description={archetype.description} />
                ))}
              </div>
            )}
          </div>
        </div>

        <hr />

        <div className="mt-4 border-b border-gray-400 pb-4">
          <h2 className="text-2xl font-bold text-white">Game Terms</h2>
          <div className="px-4">
            <div className="mb-6 pt-4">
              <p>
                Bleach is a franchise filled with terms that may be confusing to newcomers. Learn about the game&apos;s terms and their equivalents in the Fighting Game scene here. To boil the
                game&apos;s sytems down to their most basic state...
              </p>
              <ul className="list-disc mt-4 pl-4">
                <li>The Reishi Gauge is your HP.</li>
                <li>Konpaku are your Stocks.</li>
                <li>Kikon Moves are your Ultimates.</li>
                <li>Clashes are failed Kikon Moves, triggered when over 30% Reishi and guarding.</li>
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
            <p className="mb-4 text-gray-400 italic">At present, there are {Object.keys(supplementaryData.gameTerms).length} Game Terms to learn about.</p>
            <button className="font-bold text-teal-400 flex items-center gap-2" onClick={() => setGameTermsIsOpen((prevState) => !prevState)}>
              <span>Click to {gameTermsIsOpen ? "hide" : "expand"}</span>
              {gameTermsIsOpen ? <TbChevronUp size={20} /> : <TbChevronDown size={20} />}
            </button>
            {!gameTermsIsOpen ? null : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
                {Object.values(supplementaryData.gameTerms).map((term) => (
                  <GameTermCard key={term.id} id={term.id} title={term.name} englishTitle={term.engName} description={term.description} />
                ))}
              </div>
            )}
          </div>
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
