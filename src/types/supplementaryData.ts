interface ArchetypeData {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
}

interface GameTypeData {
  id: string;
  name: string;
  engName: string;
  shortDescription: string;
  description: string;
}

export interface SupplementaryDataType {
  archetypes: {
    [key: string]: ArchetypeData;
  };
  gameTerms: {
    [key: string]: GameTypeData;
  };
}
