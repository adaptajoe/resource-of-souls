interface CharacterTags {
  affiliations: Array<
    | "soulSociety"
    | "huecoMundo"
    | "worldOfTheLiving"
    | "squad1"
    | "squad2"
    | "squad3"
    | "squad4"
    | "squad5"
    | "squad6"
    | "squad7"
    | "squad8"
    | "squad9"
    | "squad10"
    | "squad11"
    | "squad12"
    | "squad13"
    | "kidoCorps"
    | "espada0"
    | "espada1"
    | "espada2"
    | "espada3"
    | "espada4"
    | "espada5"
    | "espada6"
    | "espada7"
    | "espada8"
    | "espada9"
    | "espada10"
    | "shinigami"
    | "arrancar"
    | "human"
    | "quincy"
  >;
  relationships: Array<"friend" | "enemy" | "neutral" | "protagonist">;
  abilities: Array<"shikai" | "bankai" | "awakening" | "reawakening" | "resurrección" | "hollowfication" | "segunda etapa" | "fullHollowfication">;
  characteristics: Array<
    | "male"
    | "female"
    | "ungendered"
    | "captain"
    | "lieutenant"
    | "seatedOfficer"
    | "unseatedOfficer"
    | "espada"
    | "fracción"
    | "exile"
    | "traitor"
    | "karakuraResident"
    | "ArrancarArmy"
    | "gotei13"
    | "vizard"
    | "charge"
    | "balanced"
  >;
}

export type Archetype =
  | "berserker"
  | "charge"
  | "fast"
  | "gambler"
  | "gauge"
  | "giantSummon"
  | "gimmick"
  | "hybridRange"
  | "instakill"
  | "kido"
  | "longRange"
  | "melee"
  | "ramper"
  | "ranged"
  | "reloader"
  | "reviver"
  | "rushdown"
  | "shortRange"
  | "slow"
  | "stance"
  | "trickster"
  | "vampiric"
  | "zoner"
  | "balanced";

export interface Ability {
  abilityName: string;
  abilityQuote: string;
  abilityQuoteTemplate: string;
}

export type MoveTag =
  | "melee"
  | "ranged"
  | "kidō"
  | "stanceChange"
  | "heal"
  | "resourceGain"
  | "resourceLoss"
  | "sp1"
  | "sp2"
  | "signature"
  | "kikon"
  | "reversal"
  | "guard"
  | "counter"
  | "quickAttack"
  | "flashAttack"
  | "none";

export interface MoveInput {
  id: string;
  name: string;
  description: string;
  input: string;
  damage: number;
  frames: number;
  resourceCost?: number;
  moveTags: MoveTag[];
}

export interface MoveCategoryContainer {
  neutral: MoveInput[];
  heavy?: MoveInput[];
  light?: MoveInput[];
}

export interface Stats {
  power: number;
  speed: number;
  range: number;
  defense: number;
  technique: number;
}

export interface Character {
  name: string;
  id: string;
  race: string;
  quote: string;
  description: string;
  tags: CharacterTags;
  characterEaseOfUse: number;
  characterArchetype: Archetype[];
  characterJpTrailer: string;
  characterEngTrailer: string;
  characterNumber: number;
  characterOutfits: string[];
  abilities: Ability[];
  moves: MoveCategoryContainer[];
  stats: Stats[];
}

export interface CharacterData {
  [key: string]: Character;
}
