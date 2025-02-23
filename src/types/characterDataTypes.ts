export interface CharacterData {
  [key: string]: Character;
}

export interface Character {
  name: string;
  id: string;
  race: string;
  quote: string;
  description: string;
  tags: Tags;
  characterEaseOfUse: number;
  characterArchetype: string[];
  characterJpTrailer: string;
  characterEngTrailer: string;
  characterNumber: number;
  characterOutfits: string[];
  abilities: Ability[];
  moves: Moves[];
  stats: Stat[];
  trivia: string[];
  show: boolean;
}

export interface Tags {
  affiliations: string[];
  relationships: string[];
  abilities: string[];
  characteristics: string[];
}

export interface Ability {
  abilityName: string;
  abilityQuote: string;
  abilityQuoteTemplate: string;
}

export interface Moves {
  base: Move[];
  awakened?: Move[];
  reawakened?: Move[];
  kikon: Move[];
}

export interface Move {
  id: string;
  name: string;
  description: string;
  input: string;
  damage: number;
  frames: number;
  resourceCost: number;
  moveTags: string[];
}

export interface Stat {
  power: number;
  speed: number;
  range: number;
  defense: number;
  technique: number;
}
