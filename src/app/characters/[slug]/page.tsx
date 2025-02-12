import { notFound } from "next/navigation";
import characterDataRaw from "@/data/characterData.json";
import { CharacterData, Character } from "@/types/character";
import Link from "next/link";
import Image from "next/image";
import RadarChartComponent from "@/app/components/RadarChartComponent";
import StarRating from "@/app/components/StarRating";
import YouTubeEmbed from "@/app/components/EmbedYoutubeVideo";
import CharacterMoves from "@/app/components/CharacterMoves";
import CharacterSidebar from "@/app/components/CharacterSidebar";
import fs from "fs";
import path from "path";
import { parseGameTerms } from "@/utils/termParser";
import CharacterAnimations from "@/app/components/CharacterAnimations";

function formatTagName(tag: string): string {
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
}

const characterData = characterDataRaw as CharacterData;

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

function getCharacterAnimations(characterSlug: string): string[] {
  const animationsDir = path.join(process.cwd(), "public", "assets", "character-animations", characterSlug);
  try {
    const files = fs.readdirSync(animationsDir);
    return files.filter((file) => file.endsWith(".gif")).map((file) => file.replace(".gif", ""));
  } catch {
    return [];
  }
}

export default async function CharacterPage({ params }: Props) {
  const character = characterData[params.slug] as Character;
  const totalStats = character.stats[0].power + character.stats[0].speed + character.stats[0].range + character.stats[0].defense + character.stats[0].technique;
  const animations = getCharacterAnimations(params.slug);

  if (!character) {
    notFound();
  }

  const hasAnimations = Array.isArray(animations) && animations.length > 0;

  return (
    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between">
      <div className="container ml-8 w-full lg:w-3/4 mt-8">
        <nav className="flex flex-row">
          <Link href="/" className="text-teal-400 hover:underline">
            Home
          </Link>
          <p className="px-2">/</p>
          <Link href="/characters" className="text-teal-400 hover:underline">
            Characters
          </Link>
          <p className="px-2">/</p>
          <Link href={`/characters/${character.id}`} className="text-teal-400 hover:underline">
            {character.name}
          </Link>
        </nav>

        <h1 className="text-3xl font-bold">{character.name}</h1>
        <h2 className="text-sm italic text-gray-400 mb-2">
          {character.abilities.map((ability, index) => (
            <div key={index}>{ability.abilityQuoteTemplate.replace("{quote}", ability.abilityQuote).replace("{ability}", ability.abilityName)}</div>
          ))}
        </h2>
        <p className="text-gray-400 lg:hidden">Character #{character.characterNumber}</p>
        <div className="flex flex-wrap gap-4 my-4">
          <Link href="#stats" className="text-teal-400 hover:underline">
            Stats
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="#trailers" className="text-teal-400 hover:underline">
            Trailers
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="#movelist" className="text-teal-400 hover:underline">
            Movelist
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="#animations" className="text-teal-400 hover:underline">
            Animations
          </Link>
        </div>
        <div className="pr-8 lg:pr-16 pt-2">
          <Image
            src={`/assets/character-hero/${params.slug}-hero.png`}
            height="800"
            width="800"
            alt={character.name}
            className="max-h-[800px] w-full rounded-xl object-cover object-top-center border-2 border-white"
            style={{
              objectFit: "cover",
              objectPosition: "0% 0%",
              aspectRatio: "3/1",
            }}
          />
          <div className="lg:hidden">
            <div className="my-4 w-full flex flex-col items-center border-b border-gray-400 pb-6">
              <strong>Ease of Use</strong>
              <div className="my-auto">
                <StarRating rating={character.characterEaseOfUse} />
              </div>
            </div>
            <div className="mt-4 w-full flex flex-col items-center border-b border-gray-400 pb-6">
              <div className="text-center grid grid-cols-3">
                <div>
                  <strong>Affiliations</strong>
                  <div className="flex flex-wrap justify-center mt-1 mb-2">
                    {character.characterArchetype.map((affiliation) => (
                      <strong key={affiliation} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1 ml-2">
                        {formatTagName(affiliation)}
                      </strong>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Archetypes</strong>
                  <div className="flex flex-wrap justify-center mt-1 mb-2">
                    {character.characterArchetype.map((archetype) => (
                      <strong key={archetype} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1 ml-2">
                        {formatTagName(archetype)}
                      </strong>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Abilities</strong>
                  <div className="flex flex-wrap justify-center mt-1 mb-2">
                    {character.tags.abilities.map((ability) => (
                      <strong key={ability} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1  ml-2">
                        {formatTagName(ability)}
                      </strong>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center grid grid-cols-2 mt-4">
                <div>
                  <strong>Relationships</strong>
                  <div className="flex flex-wrap justify-center mt-1 mb-2">
                    {character.tags.relationships.map((relationship) => (
                      <strong key={relationship} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1  ml-2">
                        {formatTagName(relationship)}
                      </strong>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Characteristics</strong>
                  <div className="flex flex-wrap justify-center mt-1 mb-2">
                    {character.tags.characteristics.map((characteristic) => (
                      <strong key={characteristic} className="text-xs bg-black border-gray-400 border text-gray-400 px-2 py-1 my-1  ml-2">
                        {formatTagName(characteristic)}
                      </strong>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <blockquote className="italic text-lg text-gray-400 my-8 mr-8 border-l-4 border-l-gray-400 pl-4 py-6">`&quot;`{character.quote}`&quot;`</blockquote>
        </div>
        <div className="mb-8 mr-8">
          <div>{parseGameTerms(character.description)}</div>
        </div>

        <div className="mb-8">
          <div className="bg-black shadow-md">
            <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-6 pr-8 mb-8">
              <div id="stats" className="border border-white rounded-xl w-full grid grid-cols-1 h-full">
                <h2 className="text-xl font-semibold mb-2 p-2 pl-4">Stats</h2>
                <div className="p-2">
                  <RadarChartComponent stats={character.stats[0]} characterName={character.name} />
                </div>
                <div className="w-full flex flex-row text-center items-end text-sm">
                  <div className="w-1/6 bg-red-700 flex flex-col border border-l-0 border-b-0 border-white rounded-bl-xl">
                    <strong>P{character.stats[0].power}</strong>
                  </div>
                  <div className="w-1/6 bg-yellow-700 flex flex-col border-r border-t border-white">
                    <strong>S{character.stats[0].speed}</strong>
                  </div>
                  <div className="w-1/6 bg-purple-700 flex flex-col border-r border-t border-white">
                    <strong>R{character.stats[0].range}</strong>
                  </div>
                  <div className="w-1/6 bg-green-700 flex flex-col border-r border-t border-white">
                    <strong>D{character.stats[0].defense}</strong>
                  </div>
                  <div className="w-1/6 bg-blue-700 flex flex-col border-r border-t border-white">
                    <strong>T{character.stats[0].technique}</strong>
                  </div>
                  <div className="w-1/6 bg-black border-r-0 border-t border-white flex flex-col rounded-br-xl">
                    <strong>{totalStats}</strong>
                  </div>
                </div>
              </div>

              <div id="trailers" className="border border-white rounded-xl w-full grid col-span-2 h-full mt-4 xl:mt-0">
                <h2 className="text-xl font-semibold mb-2 p-2 pl-4">Trailers</h2>
                <div className="m-2">
                  <YouTubeEmbed character={character} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 pr-8 mb-4">
              <div id="movelist" className="border border-white rounded-xl w-full grid grid-cols-1 mb-4 lg:mb-8">
                <h2 className="text-xl font-semibold p-2 pl-4 static">Movelist</h2>
                <div className="h-fit">
                  <CharacterMoves moves={character.moves} />
                </div>
              </div>

              <div id="animations">
                {hasAnimations ? (
                  <CharacterAnimations animations={animations} slug={params.slug} />
                ) : (
                  <div className="border border-white rounded-xl w-full p-4">
                    <h2 className="text-xl font-semibold mb-2">Animations</h2>
                    <p className="text-gray-400">No animations available for this character.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CharacterSidebar character={character} slug={params.slug} />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(characterData).map((slug) => ({
    slug,
  }));
}
