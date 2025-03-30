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
  weakened?: IMove[];
  kikon: IMove[];
  baseCombos: IMove[];
  awakenedCombos?: IMove[];
  reawakenedCombos?: IMove[];
  weakenedCombos?: IMove[];
}

export interface IMove {
  id: string;
  name: string;
  description: string;
  input: string | null;
  damage: string | number | null;
  frames: string | number | null;
  hits: string | number | null;
  hasOfficialName?: boolean;
  reishiGain?: string | number | null;
  reishiCost?: string | number | null;
  reiatsuGain?: string | number | null;
  reiatsuCost?: string | number | null;
  fightingSpiritGain?: string | number | null;
  fightingSpiritCost?: string | number | null;
  reversalGain?: string | number | null;
  reversalCost?: string | number | null;
  gaugeGain?: string | number | null;
  gaugeCost?: string | number | null;
  resourceGain?: string | number | null;
  resourceCost?: string | number | null;
  cooldown?: string | number | null;
  moveTags: string[];
}

export interface IStat {
  power: number;
  speed: number;
  range: number;
  defense: number;
  technique: number;
}
