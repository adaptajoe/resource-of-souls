export interface ICharacterData {
  [key: string]: ICharacter;
}

export interface ICharacter {
  name: string;
  id: string;
  race: string;
  quote: string;
  description: string;
  tags: ITags;
  characterEaseOfUse: number;
  characterArchetype: string[];
  characterJpTrailer: string;
  characterEngTrailer: string;
  characterNumber: number;
  isEcho?: boolean;
  tldr?: string;
  characterOutfits: string[];
  abilities: IAbility[];
  moves: IMoves[];
  stats: IStat[];
  trivia: string[];
  show: boolean;
}

export interface ITags {
  affiliations: string[];
  relationships: string[];
  abilities: string[];
  characteristics: string[];
}

export interface IAbility {
  abilityName: string;
  abilityQuote: string;
  abilityQuoteTemplate: string;
}

export interface IMoves {
  base: IMove[];
  awakened?: IMove[];
  reawakened?: IMove[];
  kikon: IMove[];
  baseCombos: IMove[];
  awakenedCombos?: IMove[];
  reawakenedCombos?: IMove[];
}

export interface IMove {
  id: string;
  name: string;
  description: string;
  input: string;
  damage: number | null;
  frames: number | null;
  hits: number | null;
  reishiGain?: number | null;
  reishiCost?: number | null;
  reiatsuGain?: number | null;
  reiatsuCost?: number | null;
  fightingSpiritGain?: number | null;
  fightingSpiritCost?: number | null;
  reversalGain?: number | null;
  reversalCost?: number | null;
  gaugeGain?: number | null;
  gaugeCost?: number | null;
  resourceGain?: number | null;
  resourceCost?: number | null;
  cooldown?: string | null;
  moveTags: string[];
}

export interface IStat {
  power: number;
  speed: number;
  range: number;
  defense: number;
  technique: number;
}
