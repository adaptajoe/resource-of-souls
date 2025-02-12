"use client";
import Link from "next/link";
import Image from "next/image";
import characterData from "@/data/characterData.json";
import supplementaryData from "@/data/supplementaryData.json";
import { SupplementaryDataType } from "@/types/supplementaryData";
import { CharacterData } from "@/types/character";
import { useState, useMemo } from "react";
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";
import ArchetypeTooltip from "../components/ArchetypeTooltip";

type SortType = {
  type: "number" | "alphabetical";
  ascending: boolean;
};
type AffiliationType = "all" | "worldOfTheLiving" | "soulSociety" | "huecoMundo";

export default function Characters() {
  const characters = characterData as CharacterData;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortType>({ type: "number", ascending: true });

  const [affiliationFilter, setAffiliationFilter] = useState<AffiliationType>("all");

  const formatArchetype = (archetype: string): { display: string; url: string } => {
    const specialCases: { [key: string]: string } = {
      kidō: "Kidō",
    };

    if (specialCases[archetype.toLowerCase()]) {
      return {
        display: specialCases[archetype.toLowerCase()],
        url: `/terminology?highlight=kido`,
      };
    }

    const withSpaces = archetype.replace(/([A-Z])/g, " $1");
    const display = withSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .trim();

    const url = `/terminology?highlight=${archetype
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "")}`;

    return { display, url };
  };

  const filteredAndSortedCharacters = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();

    let filtered = Object.entries(characters).filter(([_, character]) => {
      // Apply search filter
      const matchesSearch =
        character.name.toLowerCase().includes(searchTermLower) ||
        character.tags.characteristics.some((char) => char.toLowerCase().includes(searchTermLower)) ||
        character.tags.relationships.some((rel) => rel.toLowerCase().includes(searchTermLower)) ||
        character.tags.affiliations.some((aff) => aff.toLowerCase().includes(searchTermLower)) ||
        character.characterArchetype.some((arch) => arch.toLowerCase().includes(searchTermLower)) ||
        character.tags.abilities.some((ability) => ability.toLowerCase().includes(searchTermLower));

      const matchesAffiliation =
        affiliationFilter === "all" ||
        (affiliationFilter === "worldOfTheLiving" && character.tags.affiliations.includes("worldOfTheLiving")) ||
        (affiliationFilter === "soulSociety" && character.tags.affiliations.includes("soulSociety")) ||
        (affiliationFilter === "huecoMundo" && character.tags.affiliations.includes("huecoMundo"));

      return matchesSearch && matchesAffiliation;
    });

    return filtered.sort(([, a], [, b]) => {
      if (sortConfig.type === "alphabetical") {
        return sortConfig.ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return sortConfig.ascending ? a.characterNumber - b.characterNumber : b.characterNumber - a.characterNumber;
    });
  }, [characters, searchTerm, sortConfig, affiliationFilter]);

  const shouldHighlightArchetype = (archetype: string): boolean => {
    return searchTerm.length > 0 && archetype.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const normalizeArchetypeKey = (archetype: string): string => {
    return archetype
      .replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/^-/, "");
  };

  const ArchetypeCard = ({ archetype, highlighted }: { archetype: string; highlighted: boolean }) => {
    const { display } = formatArchetype(archetype);
    const archetypeKey = normalizeArchetypeKey(archetype);
    const archetypeData = (supplementaryData as SupplementaryDataType).archetypes[archetypeKey];

    console.log({
      archetype,
      archetypeKey,
      found: (supplementaryData as SupplementaryDataType).archetypes[archetypeKey] !== undefined,
    });

    return <ArchetypeTooltip archetype={archetype} display={display} shortDescription={archetypeData?.shortDescription} highlighted={highlighted} />;
  };

  return (
    <div className="container p-8 min-w-fit">
      <nav className="flex flex-row">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p className="px-2">/</p>
        <Link href="/characters" className="text-teal-400 hover:underline">
          Characters
        </Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Characters</h1>

      <div className="space-y-3 mb-6">
        <div>
          <div>
            <input
              type="text"
              placeholder="Search by Name or Archetype..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded bg-transparent text-white"
            />
          </div>
          <div className="w-fit lg:w-full flex flex-col lg:flex-row mt-4 space-y-4 lg:space-y-0 lg:space-x-4">
            <button
              onClick={() =>
                setSortConfig((prev) => ({
                  type: "number",
                  ascending: prev.type === "number" ? !prev.ascending : true,
                }))
              }
              className={`px-3 py-1 rounded flex items-center font-black gap-1 ${sortConfig.type === "number" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300"}`}
            >
              Release Order
              {sortConfig.type === "number" && <span>{sortConfig.ascending ? <TbArrowBigUpFilled size={20} /> : <TbArrowBigDownFilled size={20} />}</span>}
            </button>
            <button
              onClick={() =>
                setSortConfig((prev) => ({
                  type: "alphabetical",
                  ascending: prev.type === "alphabetical" ? !prev.ascending : true,
                }))
              }
              className={`px-3 py-1 font-black rounded flex items-center gap-1 ${sortConfig.type === "alphabetical" ? "bg-red-600  text-white" : "bg-gray-800 text-gray-300"}`}
            >
              A-Z
              {sortConfig.type === "alphabetical" && <span>{sortConfig.ascending ? <TbArrowBigUpFilled size={20} /> : <TbArrowBigDownFilled size={20} />}</span>}
            </button>

            {/* Affiliation Filters */}
            {[
              { value: "all", label: "All Affiliations" },
              { value: "worldOfTheLiving", label: "World of the Living" },
              { value: "soulSociety", label: "Soul Society" },
              { value: "huecoMundo", label: "Hueco Mundo" },
            ].map((aff) => (
              <button
                key={aff.value}
                onClick={() => setAffiliationFilter(aff.value as AffiliationType)}
                className={`px-3 py-1 font-black rounded ${affiliationFilter === aff.value ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300"}`}
              >
                {aff.label}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {filteredAndSortedCharacters.length} {filteredAndSortedCharacters.length === 1 ? "character" : "characters"} found
          {searchTerm && " matching search"}
          {affiliationFilter !== "all" && " in selected Affiliation"}
        </div>
        {/* Character Grid */}
        {filteredAndSortedCharacters.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No characters found matching your criteria</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAndSortedCharacters.map(([slug, character]) => (
              <div key={slug} className="border hover:border-red-600 transition-colors">
                <Link href={`/characters/${slug}`} className="block">
                  <Image
                    src={`/assets/character-banner/${slug}-banner.png`}
                    height="300"
                    width="300"
                    alt={character.name}
                    className="max-h-[300px] w-fit object-cover object-top-center"
                    style={{
                      objectFit: "cover",
                      objectPosition: "50% 40%",
                      aspectRatio: "2/1",
                    }}
                  />
                  <div className="p-4">
                    <div className="font-bold text-xl my-2">
                      #{character.characterNumber}: {character.name}
                    </div>
                    <p className="text-gray-400 text-sm mb-2 italic">"{character.quote}"</p>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2 border-t pt-2 border-gray-400">
                    {character.characterArchetype.map((archetype, index) => (
                      <ArchetypeCard key={index} archetype={archetype} highlighted={shouldHighlightArchetype(archetype)} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
