"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import characterData from "@/data/characterData.json";
import supplementaryData from "@/data/supplementaryData.json";
import { ICharacterData } from "@/types/characterDataTypes";
import { ISupplementaryData } from "@/types/supplementaryDataTypes";
import ArchetypeTooltip from "@/components/ArchetypeTooltip";
import StarRatingWrapper from "@/components/StarRatingWrapper";

type SortType = {
  type: "number" | "alphabetical" | "easeOfUse" | "power" | "speed" | "range" | "defense" | "technique";
  ascending: boolean;
};

type AffiliationType = "all" | "worldOfTheLiving" | "soulSociety" | "huecoMundo";

export default function Characters() {
  const characters = characterData as ICharacterData;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortType>({ type: "number", ascending: true });
  const [affiliationFilter, setAffiliationFilter] = useState<AffiliationType>("all");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");
  const [imageSources, setImageSources] = useState<{ [key: string]: string }>({});
  // const [showEchoFighters, setShowEchoFighters] = useState(false);
  // const [isEchoTooltipVisible, setIsEchoTooltipVisible] = useState(false);

  const handleImageError = (slug: string) => {
    setImageSources((prev) => ({
      ...prev,
      [slug]: "/assets/character-banner/placeholder.png",
    }));
  };

  const formatArchetype = (archetype: string): { display: string; url: string } => {
    const specialCases: { [key: string]: string } = {
      kidō: "Kidō",
    };

    if (specialCases[archetype.toLowerCase()]) {
      return {
        display: specialCases[archetype.toLowerCase()],
        url: `/glossary?highlight=kido`,
      };
    }

    const withSpaces = archetype.replace(/([A-Z])/g, " $1");
    const display = withSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .trim();

    const url = `/glossary?highlight=${archetype
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/^-/, "")}`;

    return { display, url };
  };

  const filteredAndSortedCharacters = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();

    const filtered = Object.entries(characters).filter(([, character]) => {
      if (character.show === false) {
        return false;
      }

      // if (!showEchoFighters && character.isEcho) {
      //   return false;
      // }

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

      const matchesGender =
        genderFilter === "all" || (genderFilter === "male" && character.tags.characteristics.includes("male")) || (genderFilter === "female" && character.tags.characteristics.includes("female"));

      return matchesSearch && matchesAffiliation && matchesGender;
    });

    return filtered.sort(([, a], [, b]) => {
      if (sortConfig.type === "alphabetical") {
        return sortConfig.ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (sortConfig.type === "number") {
        return sortConfig.ascending ? a.characterNumber - b.characterNumber : b.characterNumber - a.characterNumber;
      }
      if (sortConfig.type === "easeOfUse") {
        return sortConfig.ascending ? a.characterEaseOfUse - b.characterEaseOfUse : b.characterEaseOfUse - a.characterEaseOfUse;
      }
      if (sortConfig.type === "power") {
        return sortConfig.ascending ? a.stats[0].power - b.stats[0].power : b.stats[0].power - a.stats[0].power;
      }
      if (sortConfig.type === "speed") {
        return sortConfig.ascending ? a.stats[0].speed - b.stats[0].speed : b.stats[0].speed - a.stats[0].speed;
      }
      if (sortConfig.type === "range") {
        return sortConfig.ascending ? a.stats[0].range - b.stats[0].range : b.stats[0].range - a.stats[0].range;
      }
      if (sortConfig.type === "defense") {
        return sortConfig.ascending ? a.stats[0].defense - b.stats[0].defense : b.stats[0].defense - a.stats[0].defense;
      }
      if (sortConfig.type === "technique") {
        return sortConfig.ascending ? a.stats[0].technique - b.stats[0].technique : b.stats[0].technique - a.stats[0].technique;
      }
      return 0;
    });
  }, [characters, searchTerm, sortConfig, affiliationFilter, genderFilter]);

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
    const archetypeData = (supplementaryData as ISupplementaryData).archetypes[archetypeKey];

    return <ArchetypeTooltip archetype={archetype} display={display} shortDescription={archetypeData?.shortDescription} highlighted={highlighted} />;
  };

  return (
    <div className="text-white">
      <div className="p-4 xl:p-16 space-y-4 text-white">
        <div className="flex flex-row space-x-2">
          <Link href="/" className="text-teal-400 hover:underline">
            Home
          </Link>
          <p>/</p>
          <Link href="/characters" className="text-teal-400 hover:underline">
            Character Roster
          </Link>
          <p>/</p>
        </div>
        <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
          <span className="text-red-600">C</span>haracter Roster
        </h2>
        <p>
          The world of BLEACH is vast and diverse - Find your new main based on looks, affiliation, Archetype, stats or more! There&apos;s a character for every kind of player, from hyper-technical to
          simple and effective.
        </p>
        <hr className="my-6" />
        <div className="bg-black">
          <input
            type="text"
            placeholder="Search by Name or Archetype..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded bg-transparent text-white"
          />
        </div>
        <div>
          <div className="w-fit text-sm xl:w-full font-bebasFont tracking-wider flex flex-col items-center xl:flex-row mt-4 space-y-4 xl:space-y-0 xl:space-x-4">
            <div className="flex flex-row space-x-2 pr-4 border-0 xl:border-r-2 border-gray-400">
              {/* <div className="relative" onMouseEnter={() => setIsEchoTooltipVisible(true)} onMouseLeave={() => setIsEchoTooltipVisible(false)}>
                <button
                  onClick={() => setShowEchoFighters((prev) => !prev)}
                  className={`px-3 py-1 rounded flex transition-colors items-center font-black gap-1 hover:bg-red-600 hover:text-black ${
                    showEchoFighters ? "bg-teal-400 text-black hover:bg-teal-600" : "bg-gray-800 text-gray-300"
                  }`}
                >
                  {showEchoFighters ? "Exclude" : "Include"} Alternates
                </button>
                {isEchoTooltipVisible && (
                  <div className="absolute z-10 ml-12 border-2 border-gray-400 w-52 font-sans p-4 mt-2 transform -translate-x-1/4 bg-gray-800 rounded shadow-lg">
                    <div className="absolute -top-2 border-l-2 border-t-2 border-gray-400 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-gray-800"></div>
                    <p className="text-sm text-gray-300">
                      Alternates (Wiki Term) are similar to existing characters, but have unique animations and voice lines. DLC outfits like TYBW outfits do NOT count.
                    </p>
                  </div>
                )}
              </div> */}

              <button
                onClick={() =>
                  setSortConfig((prev) => ({
                    type: "number",
                    ascending: prev.type === "number" ? !prev.ascending : true,
                  }))
                }
                className={`px-3 py-1 rounded flex transition-colorss items-center font-black gap-1 hover:bg-red-600 hover:text-black ${
                  sortConfig.type === "number" ? "bg-teal-400 text-black hover:bg-teal-600" : "bg-gray-800 text-gray-300"
                }`}
              >
                Release Order
                {sortConfig.type === "number" && <span>{sortConfig.ascending ? <span>&uarr;</span> : <span>&darr;</span>}</span>}
              </button>

              <button
                onClick={() =>
                  setSortConfig((prev) => ({
                    type: "alphabetical",
                    ascending: prev.type === "alphabetical" ? !prev.ascending : true,
                  }))
                }
                className={`px-3 py-1 font-black rounded flex transition-colors items-center gap-1 hover:bg-red-600 hover:text-black ${
                  sortConfig.type === "alphabetical" ? "bg-teal-400 text-black hover:bg-teal-600" : "bg-gray-800 text-gray-300"
                }`}
              >
                A-Z
                {sortConfig.type === "alphabetical" && <span>{sortConfig.ascending ? <span>&uarr;</span> : <span>&darr;</span>}</span>}
              </button>

              <button
                onClick={() =>
                  setSortConfig((prev) => ({
                    type: "easeOfUse",
                    ascending: prev.type === "easeOfUse" ? !prev.ascending : true,
                  }))
                }
                className={`px-3 py-1 font-black rounded flex transition-colors items-center gap-1 hover:bg-red-600 hover:text-black ${
                  sortConfig.type === "easeOfUse" ? "bg-teal-400 text-black hover:bg-teal-600" : "bg-gray-800 text-gray-300"
                }`}
              >
                Ease of Use
                {sortConfig.type === "easeOfUse" && <span>{sortConfig.ascending ? <span>&uarr;</span> : <span>&darr;</span>}</span>}
              </button>

              <div className="flex flex-row space-x-2">
                {[
                  { type: "power", label: "Power" },
                  { type: "speed", label: "Speed" },
                  { type: "range", label: "Range" },
                  { type: "defense", label: "Defense" },
                  { type: "technique", label: "Technique" },
                ].map((stat) => (
                  <button
                    key={stat.type}
                    onClick={() =>
                      setSortConfig((prev) => ({
                        type: stat.type as SortType["type"],
                        ascending: prev.type === stat.type ? !prev.ascending : true,
                      }))
                    }
                    className={`px-3 py-1 font-black hover:bg-red-600 hover:text-black rounded ${
                      sortConfig.type === stat.type ? "bg-teal-400 text-black hover:bg-teal-600" : "bg-gray-800 text-gray-300"
                    } transition-colors`}
                  >
                    {stat.label}
                    {sortConfig.type === stat.type && <span>{sortConfig.ascending ? <span>&darr;</span> : <span>&uarr;</span>}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-row space-x-2 pr-4 border-0 xl:border-r-2 border-gray-400">
              {[
                { value: "all", label: "All Affiliations" },
                { value: "worldOfTheLiving", label: "World of the Living" },
                { value: "soulSociety", label: "Soul Society" },
                { value: "huecoMundo", label: "Hueco Mundo" },
              ].map((aff) => (
                <button
                  key={aff.value}
                  onClick={() => setAffiliationFilter(aff.value as AffiliationType)}
                  className={`px-3 py-1 transition-colors font-black hover:bg-red-600 hover:text-black rounded ${
                    affiliationFilter === aff.value ? "bg-teal-400 text-black hover:bg-teal-600" : "bg-gray-800 text-gray-300"
                  }`}
                >
                  {aff.label}
                </button>
              ))}
            </div>

            <div className="flex flex-row pr-4 space-x-2 border-0">
              {[
                { value: "all", label: "All" },
                { value: "male", label: "Male-Only" },
                { value: "female", label: "Female-Only" },
              ].map((gender) => (
                <button
                  key={gender.value}
                  onClick={() => setGenderFilter(gender.value as "all" | "male" | "female")}
                  className={`px-3 py-1 font-black hover:bg-red-600 hover:text-black rounded ${
                    genderFilter === gender.value ? "bg-teal-400 text-black hover:bg-teal-600" : "bg-gray-800 text-gray-300"
                  } transition-colors`}
                >
                  {gender.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-400 pt-4">
            {filteredAndSortedCharacters.length} {filteredAndSortedCharacters.length === 1 ? "character" : "characters"} found
            {searchTerm && " matching search"}
            {affiliationFilter !== "all" && genderFilter !== "all" ? (
              <> in selected Affiliation and in selected Gender</>
            ) : (
              <>
                {affiliationFilter !== "all" && " in selected Affiliation"}
                {genderFilter !== "all" && " in selected Gender"}
              </>
            )}
          </div>
          <hr className="my-6" />
          {filteredAndSortedCharacters.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No characters found matching your criteria</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {filteredAndSortedCharacters.map(([slug, character]) => (
                <div key={slug} className="border hover:border-red-600 transition-colors rounded-lg bg-black">
                  <Link href={`/characters/${slug}`} className="block">
                    <Image
                      src={imageSources[slug] || `/assets/character-banner/${slug}-banner.png`}
                      height="300"
                      width="300"
                      alt={character.name}
                      className="max-h-[300px] w-fit object-cover rounded-t-lg object-top-center"
                      style={{
                        objectFit: "cover",
                        objectPosition: "50% 40%",
                        aspectRatio: "2/1",
                      }}
                      onError={() => handleImageError(slug)}
                      loading="lazy"
                    />
                    <div className="p-4 pt-2 border-t-2 border-gray-800">
                      <h2 className="font-bold text-xl flex flex-row items-center py-2">
                        #{character.characterNumber}
                        {!character.isEcho ? null : <p className="text-teal-400">&epsilon;</p>}: {character.name}
                      </h2>
                      <hr className="my-2" />
                      <div className="my-auto flex flex-row items-center justify-between py-2">
                        <p className="text-gray-400">Ease of Use:</p>
                        <StarRatingWrapper rating={character.characterEaseOfUse} character={character} />
                      </div>
                      <hr className="my-2" />
                      <div className="text-xl grid grid-cols-5 text-center space-x-2 font-bebasFont">
                        <div className="text-red-700 rounded p-1">P{character.stats[0].power}</div>
                        <div className="text-yellow-700 rounded p-1">S{character.stats[0].speed}</div>
                        <div className="text-purple-700 rounded p-1">R{character.stats[0].range}</div>
                        <div className="text-green-700 rounded p-1">D{character.stats[0].defense}</div>
                        <div className="text-blue-700 rounded p-1">T{character.stats[0].technique}</div>
                      </div>
                      <hr className="my-2" />
                      <p className="text-gray-400 text-sm my-2 pt-4 italic">&quot;{character.quote}&quot;</p>
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
    </div>
  );
}
