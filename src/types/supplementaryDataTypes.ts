export interface ISupplementaryData {
  gameTerms: { [key: string]: IGameTerm };
  archetypes: { [key: string]: IArchetype };
}

export interface IGameTerm {
  id: string;
  name: string;
  engName: string;
  shortDescription: string;
  description: string;
}

export interface IArchetype {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
}
