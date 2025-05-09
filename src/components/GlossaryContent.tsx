"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import characterData from "@/data/characterData.json";
import supplementaryData from "@/data/supplementaryData.json";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface IArchetypeCardProps {
  title: string;
  id: string;
  description: string;
  shortDescription?: string;
}

interface IGameTermCardProps {
  title: string;
  id: string;
  englishTitle?: string;
  description: string;
  shortDescription?: string;
  isFocused?: boolean;
  hoveredImageId: string | null;
  setHoveredImageId: (id: string | null) => void;
}

const formatTermId = (term: string): string => {
  return term
    .replace(/%20/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
};

const normalizeSpecialCharacters = (str: string): string => {
  const charMap: { [key: string]: string } = {
    ū: "u",
    ō: "o",
  };

  return str
    .split("")
    .map((char) => charMap[char] || char)
    .join("");
};

const getCharactersByArchetype = (archetype: string): { name: string; slug: string; id: string }[] => {
  const normalizedArchetype = normalizeSpecialCharacters(archetype).toLowerCase().replace(/\s+/g, "");

  return Object.values(characterData)
    .filter((character) => {
      const characterArchetypes = character.characterArchetype.map((arch) => normalizeSpecialCharacters(arch).toLowerCase().replace(/\s+/g, ""));
      return characterArchetypes.includes(normalizedArchetype);
    })
    .map((character) => ({
      name: character.name,
      id: character.id,
      slug: normalizeSpecialCharacters(character.name)
        .toLowerCase()
        .replace(/\s*\((.*?)\)/g, "-$1")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]/g, "")
        .trim(),
    }));
};

export default function GlossaryContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [archetypesIsOpen, setArchetypesIsOpen] = useState(true);
  const [gameTermsIsOpen, setGameTermsIsOpen] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const FilterButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => {
    return (
      <button
        onClick={onClick}
        className={`px-3 m-1 w-auto py-1 font-black hover:bg-red-600 hover:text-black text-base tracking-wide rounded ${
          isActive ? "bg-teal-400 text-black hover:bg-teal-600" : "bg-gray-800 text-white"
        } transition-colors`}
      >
        {label}
      </button>
    );
  };

  const FilterButtons = () => {
    const commonFilters = ["Attack", "Breaker", "Fighting", "Flash", "Quick", "Kikon", "Konpaku", "Movement", "Guard", "Reiatsu", "Reishi", "Reverse", "Signature"];

    return (
      <div className="w-fit lg:w-full font-bebasFont text-xl flex items-center justify-center mt-4 space-y-4 lg:space-y-0">
        <div className="grid grid-cols-3 lg:grid-cols-auto grid-flow-row-dense xl:grid-flow-col-dense items-center w-fit">
          {commonFilters.map((filter) => (
            <FilterButton
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => {
                if (activeFilter === filter) {
                  setActiveFilter(null);
                  setSearchQuery("");
                } else {
                  setActiveFilter(filter);
                  setSearchQuery(filter);
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const searchParams = useSearchParams();

  const scrollToElement = (elementId: string) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const headerOffset = 200;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  useEffect(() => {
    const highlight = searchParams.get("highlight");
    const hash = window.location.hash.slice(1);

    if (hash) {
      const decodedHash = decodeURIComponent(hash);
      const formattedHash = formatTermId(decodedHash);
      setHighlightedId(formattedHash);
      setGameTermsIsOpen(true);
      scrollToElement(formattedHash);
    } else if (highlight) {
      const decodedHighlight = decodeURIComponent(highlight);
      const formattedHighlight = formatTermId(decodedHighlight);
      setHighlightedId(formattedHighlight);

      const isGameTerm = Object.values(supplementaryData.gameTerms).some((term) => formatTermId(term.name) === formattedHighlight);

      if (isGameTerm) {
        setGameTermsIsOpen(true);
      } else {
        setArchetypesIsOpen(true);
      }

      scrollToElement(formattedHighlight);
    }
  }, [searchParams]);

  const filterItems = (text: string | undefined) => {
    if (!searchQuery || !text) return !searchQuery; // Return true if no search query, false if text is undefined but there is a query

    const searchWords = searchQuery.toLowerCase().split(/\s+/);
    const targetWords = text.toLowerCase().split(/\s+/);

    return searchWords.every((searchWord) =>
      targetWords.some(
        (targetWord) => targetWord === searchWord || targetWord === searchWord + "." || targetWord === searchWord + "," || targetWord === searchWord + ":" || targetWord === searchWord + ";"
      )
    );
  };

  const filteredArchetypes = useMemo(() => {
    return Object.values(supplementaryData.archetypes)
      .filter((archetype) => {
        return filterItems(archetype.name) || filterItems(archetype.description);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery]);

  const filteredGameTerms = useMemo(() => {
    return Object.values(supplementaryData.gameTerms)
      .filter((term) => filterItems(term.name) || filterItems(term.description) || filterItems(term.shortDescription) || (term.engName && filterItems(term.engName)))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery]);

  const ArchetypeCard = ({ title, description, id, shortDescription }: IArchetypeCardProps) => {
    const characters = getCharactersByArchetype(title);
    const formattedId = formatTermId(id);
    const isHighlighted = formattedId === highlightedId;

    return (
      <div
        id={formattedId}
        className={`rounded-xl bg-white dark:bg-black border transition-all duration-300 scroll-mt-24 ${isHighlighted ? "border-red-600 ring-2 ring-red-600 bg-red-900/10" : "border-gray-400"}`}
      >
        <div className="relative w-full border-b-2 border-white dark:border-gray-800">
          <Image width="300" height="150" alt="" id={id} src={`/assets/term-assets/archetypes/${id}.png`} className="rounded-t-xl w-full h-[150px] object-cover" />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-xl mb-2 first-letter:text-red-600 border-l-4 border-red-600 pl-2">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 italic pb-2 text-xs">{description}</p>
          <hr className="my-4 border-black dark:border-white" />
          <strong>TLDR:</strong> <p className="text-gray-600 dark:text-gray-400 italic text-xs mt-2">{shortDescription}</p>
          {characters.length > 0 && (
            <div className="mt-4 w-full border-t border-black dark:border-white">
              <div className="text-sm font-semibold pt-2">Characters:</div>
              <div className="flex flex-wrap gap-2 pt-2">
                {characters.map((character, index) => (
                  <Link
                    key={index}
                    className="text-xs bg-white dark:bg-black border border-gray-600 hover:border-red-600 text-gray-600 dark:text-gray-400 px-2 py-1 hover:bg-red-900 hover:text-white transition-all rounded-xl"
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

  const GameTermCard = ({ title, englishTitle, description, shortDescription, id }: IGameTermCardProps) => {
    const formattedId = formatTermId(id);
    const isHighlighted = formattedId === highlightedId;

    return (
      <div
        id={formattedId}
        className={`rounded-b-xl text-black dark:text-white bg-white dark:bg-black border transition-all duration-300 scroll-mt-24 ${
          isHighlighted ? "border-teal-400 ring-2 ring-teal-400 bg-teal-900/10" : "border-gray-400"
        }`}
      >
        <div className="p-4 flex flex-col">
          <div className="font-bold text-xl flex items-baseline">
            <h2 className="text-xl first-letter:text-red-600 border-l-4 border-red-600 pl-2">{title}</h2>
            {englishTitle && <p className="text-xs text-gray-600 dark:text-gray-400 ml-2 italic">(ENG: {englishTitle})</p>}
          </div>
          <hr className="my-4" />
          <p className="text-gray-600 dark:text-gray-400 italic text-xs">{description}</p>
          <hr className="my-4" />
          <strong>TLDR:</strong> <p className="text-gray-600 dark:text-gray-400 italic text-xs mt-2">{shortDescription}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-16  space-y-4 text-black dark:text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/glossary" className="text-teal-600 dark:text-teal-400 hover:underline">
          Glossary
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">G</span>lossary
      </h2>
      <p>
        BLEACH - Rebirth of Souls has a wealth of terms that can be confusing to newcomers. To assist with this, we&apos;ve laid out easy-to-read, easy-to-view examples below of these terms in action.
        Additionally, to help players and commentators to understand what a character does at a glance, we&apos;ve developed the Archetype System; a method of tagging characters with common gameplay
        mechanics like &quot;fast&quot; or &quot;melee&quot; in order to give a one-glance summary of everything a character entails.
      </p>
      <hr className="my-6 border-black dark:border-white" />
      <input
        type="text"
        placeholder="Search Archetypes and Game Terms..."
        value={searchQuery}
        onChange={(e) => {
          setArchetypesIsOpen(true);
          setGameTermsIsOpen(true);
          setSearchQuery(e.target.value);
        }}
        className="w-full p-2 bg-white dark:bg-gray-700 border-2 border-gray-400 rounded-xl text-black dark:text-white"
      />
      <FilterButtons />
      <hr className="my-6 border-black dark:border-white" />
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white">Archetypes</h2>
        <div className="px-4 space-y-4">
          {!searchQuery && (
            <>
              <p className="mt-4">
                An Archetype - or role, if you prefer - is a label we assign to characters to make them easily identifiable and accessible to new players, to help them understand what a character does
                without delving into the weeds of minutia.
              </p>
              <p className="text-gray-600 dark:text-gray-400 italic">At present, there are {Object.keys(supplementaryData.archetypes).length} Archetypes to learn about.</p>
            </>
          )}
          {(!searchQuery || filteredArchetypes.length > 0) && (
            <button className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setArchetypesIsOpen((prevState) => !prevState)}>
              <span>Click to {archetypesIsOpen ? "hide" : "expand"}</span>
              {archetypesIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
            </button>
          )}
          {archetypesIsOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
              {filteredArchetypes.map((archetype) => (
                <ArchetypeCard key={archetype.id} title={archetype.name} id={archetype.id} description={archetype.description} shortDescription={archetype.shortDescription} />
              ))}
            </div>
          )}
          {searchQuery && filteredArchetypes.length === 0 && <p className="text-gray-400 italic mt-2">No matching Archetypes found.</p>}
        </div>
      </div>
      <hr className="my-6 border-black dark:border-white" />
      <div>
        <h2 className="text-2xl font-bold text-black dark:text-white">Game Terms</h2>
        <div className="px-4 space-y-4">
          {!searchQuery && (
            <>
              <p className="mt-4">
                BLEACH is a franchise filled with terms that may be confusing to newcomers, and BLEACH - Rebirth of Souls definitely embraces this. Fear not, however, for if you understand the basics,
                then you can&apos;t fear your own world! If you wanted to quickly learn, however, then...
              </p>
              <ul className="list-disc mt-4 pl-4 text-xs">
                <li>The Reishi Gauge is your HP Gauge. It is filled with Reishi (HP).</li>
                <li>Konpaku are your Stocks.</li>
                <li>Kikon Moves are your Ultimates.</li>
                <li>Clashes are failed Kikon Moves, triggered when over 30% Reishi (HP) and guarding.</li>
                <li>
                  The Fighting Spirit Gauge is your Transformation Gauge and Buff Gauge, filled by landing hits, getting hit and hitting Kikon Moves (Ultimates). It is filled with Fighting Spirit
                  (FS).
                </li>
                <li>Awakenings are a First Transformation that costs Fighting Spirit.</li>
                <li>Reawakenings are a Second Transformation that also costs Fighting Spirit.</li>
                <li>Perfect Hohō Counter are teleporting near-frame-perfect dodges.</li>
                <li>Counters are character-specific fakeouts. They often have a visual indicator and can be beaten by Breakers.</li>
                <li>Follow-up Hohō is a teleporting combo extender.</li>
                <li>The Reiatsu Gauge is your Special Bar. It is filled with Reiatsu (SP).</li>
                <li>Quick Attacks are Light Attacks that build the Reiatsu Gauge (Special Bar).</li>
                <li>Hakugeki is a smack-back attack that can transition to a Kikon Move if held down.</li>
                <li>Signature Moves are free special moves.</li>
                <li>Spiritual Pressure Moves are two additional special moves. The first costs 50 Reiatsu, the second costs 100 Reiatsu.</li>
                <li>Flash Attacks are Heavy Attacks that does big damage to Guards.</li>
                <li>Breakers are Grabs that break Guards and cancel Counters.</li>
                <li>Guards are... Well, Guards. They&apos;re broken by Breakers and Flash Attacks.</li>
                <li>The Guard Gauge is a resource showing how much more you can Guard. Two guesses what it&apos;s filled with..?</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 italic">At present, there are {Object.keys(supplementaryData.gameTerms).length} Game Terms to learn about.</p>
            </>
          )}
          {(!searchQuery || filteredGameTerms.length > 0) && (
            <>
              <button className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setGameTermsIsOpen((prevState) => !prevState)}>
                <span>Click to {gameTermsIsOpen ? "hide" : "expand"}</span>
                {gameTermsIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
              </button>
            </>
          )}
          {gameTermsIsOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-2">
              {filteredGameTerms.map((term) => (
                <GameTermCard
                  key={term.id}
                  id={term.id}
                  title={term.name}
                  englishTitle={term.engName}
                  description={term.description}
                  shortDescription={term.shortDescription}
                  hoveredImageId={hoveredImageId}
                  setHoveredImageId={setHoveredImageId}
                />
              ))}
            </div>
          )}
          {searchQuery && filteredGameTerms.length === 0 && <p className="text-gray-400 italic mt-2">No matching Game Terms found.</p>}
        </div>
      </div>
    </div>
  );
}
