export interface SupplementaryData {
  gameTerms: { [key: string]: GameTerm };
  archetypes: { [key: string]: Archetype };
}

export interface GameTerm {
  id: string;
  name: string;
  engName: string;
  shortDescription: string;
  description: string;
}

export interface Archetype {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
}
