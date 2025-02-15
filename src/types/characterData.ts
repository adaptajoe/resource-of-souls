import { AffiliationTag, RelationshipTag, AbilityTag, CharacteristicTag } from "./characterTags";

type MoveTag = "melee" | "ranged" | "kido" | "stanceChange" | "heal" | "resourceGain" | "resourceLoss" | "sp1" | "sp2" | "signature" | "kikon" | "reversal" | "guard" | "counter" | "none";

type Archetype =
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

interface Ability {
  abilityName: string;
  abilityQuote: string;
  abilityQuoteTemplate: string;
}

interface MoveInput {
  id: string;
  input: string;
  damage: number;
  name: string;
  description: string;
  frames: number;
  resourceCost?: number;
  moveTags: MoveTag[];
}

interface Moves {
  base: MoveInput[];
  awakened: MoveInput[];
  reawakened?: MoveInput[];
}

interface Stats {
  power: number;
  speed: number;
  range: number;
  defense: number;
  technique: number;
}

interface CharacterTags {
  affiliations: AffiliationTag[];
  relationships: RelationshipTag[];
  abilities: AbilityTag[];
  characteristics: CharacteristicTag[];
}

export interface Character {
  name: string;
  id: string;
  race: string;
  quote: string;
  description: string;
  characterNumber: number;
  characterEaseOfUse: number;
  characterArchetype: Archetype[];
  characterJpTrailer: string;
  characterEngTrailer: string;
  characterOutfits: string[];
  abilities: Ability[];
  moves: Moves;
  tags: CharacterTags;
  stats: Stats;
}

export interface CharacterData {
  [key: string]: Character;
}
