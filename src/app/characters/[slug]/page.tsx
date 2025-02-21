import Image from "next/image";
import Link from "next/link";
import characterDataRaw from "@/data/characterData.json";
import { Character, CharacterData } from "@/types/characterDataTypes";
import { parseGameTerms } from "@/utils/termParser";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import StarRatingWrapper from "@/components/StarRatingWrapper";
import YouTubeEmbedWrapper from "@/components/EmbedYoutubeVideoWrapper";
import RadarChartComponentWrapper from "@/components/RadarChartComponentWrapper";
import CharacterMovesWrapper from "@/components/CharacterMovesWrapper";
import CharacterAnimationsWrapper from "@/components/CharacterAnimationsWrapper";
import CharacterSidebarWrapper from "@/components/CharacterSidebarWrapper";

export async function generateStaticParams() {
  return Object.keys(characterData).map((slug) => ({
    slug: slug,
  }));
}

export const dynamic = "force-static";

function formatTagName(tag: string): string {
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
}

const characterData = characterDataRaw as CharacterData;

type PageParams = {
  slug: string;
};

type Props = {
  params: Promise<PageParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getCharacterAnimations(characterSlug: string): string[] {
  const animationsDir = path.join(process.cwd(), "public", "assets", "character-animations", characterSlug);
  try {
    const files = fs.readdirSync(animationsDir);
    return files.filter((file) => file.endsWith(".mp4")).map((file) => file.replace(".mp4", ""));
  } catch {
    return [];
  }
}

export default async function CharacterDetails(props: Props) {
  const params = await props.params;
  console.log("Available characters:", Object.keys(characterData).length);
  console.log("Requested slug:", params.slug);
  const character = characterData[params.slug] as Character;

  if (!character) {
    notFound();
  }

  const totalStats = character.stats[0].power + character.stats[0].speed + character.stats[0].range + character.stats[0].defense + character.stats[0].technique;
  const animations = getCharacterAnimations(params.slug);
  const hasAnimations = Array.isArray(animations) && animations.length > 0;

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-3">
        <div className="col-span-1 xl:col-span-2 mb-6">
          <div className="p-16 space-y-4 text-white mr-4">
            <div className="flex flex-row space-x-2">
              <Link href="/" className="text-teal-400 hover:underline">
                Home
              </Link>
              <p>/</p>
              <Link href="/characters" className="text-teal-400 hover:underline">
                Character Roster
              </Link>
              <p>/</p>
              <Link href={`/characters/${character.id}`} className="text-teal-400 hover:underline">
                {character.name}
              </Link>
            </div>
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4 first-letter:text-red-600">{character.name}</h2>
            {character.abilities.map((ability, index) => (
              <p className="text-gray-600 italic font-bebasFont text-xl" key={index}>
                {ability.abilityQuoteTemplate.replace("{quote}", ability.abilityQuote).replace("{ability}", ability.abilityName)}
              </p>
            ))}
            <p className="text-gray-400 xl:hidden">Character #{character.characterNumber}</p>
            <div className="flex flex-wrap gap-4 my-4">
              <Link href="#character-info" className="text-teal-400 hover:underline">
                Character Info
              </Link>
              <span className="text-gray-400">•</span>
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
              <span className="text-gray-400">•</span>
              <Link href="#trivia" className="text-teal-400 hover:underline">
                Trivia
              </Link>
            </div>
            <Image
              src={`/assets/character-hero/${params.slug}-hero.png`}
              height="800"
              width="800"
              alt={character.name}
              className="max-h-[800px] w-full rounded-xl object-cover object-top-center border-2 border-gray-400"
              style={{
                objectFit: "cover",
                objectPosition: "0% 0%",
                aspectRatio: "3/1",
              }}
              loading="lazy"
            />
          </div>

          {/* Mobile-only View */}
          <div className="xl:hidden text-white">
            <div className="my-4 w-full flex flex-col items-center">
              <strong>Ease of Use</strong>
              <div className="my-auto">
                <StarRatingWrapper rating={character.characterEaseOfUse} character={character} />
              </div>
            </div>
            <div className="mt-4 w-full flex flex-col items-center px-4">
              <div className="text-center grid grid-cols-3 space-x-4">
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
            <hr className="my-6 pr-20" />
          </div>

          {/* Continue Page View */}
          <div className="text-white px-16 mr-4">
            {/* Character Info */}
            <div id="character-info">
              <h3 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
                <span className="text-red-600">C</span>haracter Info
              </h3>
              <h4 className="italic text-xl text-gray-400 my-8 mr-8 border-l-4 border-l-gray-400 pl-4 py-6">&quot;{character.quote}&quot;</h4>
              <div>{parseGameTerms(character.description)}</div>
            </div>
            <hr className="my-6" />
            {/* Stats */}
            <div id="stats">
              <h3 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
                <span className="text-red-600">S</span>tats
              </h3>
              <div className="border-2 border-gray-400 rounded-xl mt-6">
                <RadarChartComponentWrapper stats={character.stats[0]} characterName={character.name} character={character} />
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
            </div>
            <hr className="my-6" />
            {/* Trailers */}
            <div id="trailers">
              <h3 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
                <span className="text-red-600">T</span>railers
              </h3>
              <div className="border-2 border-gray-400 rounded-xl mt-6 p-4">
                <YouTubeEmbedWrapper character={character} />
              </div>
            </div>
            <hr className="my-6" />
            {/* Movelist */}
            <div id="movelist">
              <h3 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
                <span className="text-red-600">M</span>ovelist
              </h3>
              <div className="border-2 border-gray-400 rounded-xl mt-6 pt-4">
                <CharacterMovesWrapper moves={character.moves} characterId={character.id} />
              </div>
            </div>
            <hr className="my-6" />
            {/* Animations */}
            <div id="animations">
              <h3 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
                <span className="text-red-600">A</span>nimations
              </h3>
              {hasAnimations ? (
                <CharacterAnimationsWrapper animations={animations} slug={params.slug} />
              ) : (
                <div className="border border-white rounded-xl w-full p-4">
                  <p className="text-gray-400">No animations available for this character.</p>
                </div>
              )}
            </div>
            <hr className="my-6" />
            {/* Trivia */}
            <div id="trivia">
              <h3 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
                <span className="text-red-600">T</span>rivia
              </h3>
              <ul className="mt-6 list-disc border-2 border-gray-400 rounded-xl p-4">
                <li className="ml-6">{character.trivia}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop Character Right Sidebar */}
        <div className="hidden xl:grid col-span-1 justify-self-end text-white">
          <CharacterSidebarWrapper character={character} slug={params.slug} />
        </div>
      </div>
    </div>
  );
}
