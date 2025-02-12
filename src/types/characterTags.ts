// src/app/types/characterTags.ts

export const CharacterTags = {
  AFFILIATIONS: [
    "soulSociety",
    "huecoMundo",
    "worldOfTheLiving",
    "squad1",
    "squad2",
    "squad3",
    "squad4",
    "squad5",
    "squad6",
    "squad7",
    "squad8",
    "squad9",
    "squad10",
    "squad11",
    "squad12",
    "squad13",
    "kidoCorps",
    "espada0",
    "espada1",
    "espada2",
    "espada3",
    "espada4",
    "espada5",
    "espada6",
    "espada7",
    "espada8",
    "espada9",
    "espada10",
    "shinigami",
    "arrancar",
    "human",
    "quincy",
  ],
  RELATIONSHIPS: ["friend", "enemy", "neutral", "protagonist"],
  ABILITIES: [
    "shikai",
    "bankai",
    "kido",
    "bakudo",
    "hakuda",
    "stance",
    "giant",
    "awakening",
    "reawakening",
    "resurrección",
    "hollowfication",
    "fullHollowfication",
    "hogyoku",
    "letzStil",
    "brazoDerechaDeGigante",
    "brazoIzquierdaDelDiablo",
    "segunda etapa",
  ],
  CHARACTERISTICS: [
    "male",
    "female",
    "ungendered",
    "captain",
    "lieutenant",
    "seatedOfficer",
    "unseatedOfficer",
    "traitor",
    "exile",
    "quincy",
    "hollow",
    "espada",
    "fracción",
    "human",
    "vizard",
    "karakuraResident",
    "ArrancarArmy",
    "gotei13",
    "charge",
    "balanced",
  ],
} as const;

// Create union types for each category
export type AffiliationTag = (typeof CharacterTags.AFFILIATIONS)[number];
export type RelationshipTag = (typeof CharacterTags.RELATIONSHIPS)[number];
export type AbilityTag = (typeof CharacterTags.ABILITIES)[number];
export type CharacteristicTag = (typeof CharacterTags.CHARACTERISTICS)[number];

// Create a type that includes all possible tags
export type CharacterTag = AffiliationTag | RelationshipTag | AbilityTag | CharacteristicTag;

// Helper functions to check tag categories
export const isAffiliationTag = (tag: string): tag is AffiliationTag => CharacterTags.AFFILIATIONS.includes(tag as AffiliationTag);

export const isRelationshipTag = (tag: string): tag is RelationshipTag => CharacterTags.RELATIONSHIPS.includes(tag as RelationshipTag);

export const isAbilityTag = (tag: string): tag is AbilityTag => CharacterTags.ABILITIES.includes(tag as AbilityTag);

export const isCharacteristicTag = (tag: string): tag is CharacteristicTag => CharacterTags.CHARACTERISTICS.includes(tag as CharacteristicTag);

// Helper function to validate if a tag exists in any category
export const isValidCharacterTag = (tag: string): tag is CharacterTag => {
  return isAffiliationTag(tag) || isRelationshipTag(tag) || isAbilityTag(tag) || isCharacteristicTag(tag);
};

// Helper function to get tag category
export const getTagCategory = (tag: CharacterTag): "affiliation" | "relationship" | "ability" | "characteristic" | "unknown" => {
  if (isAffiliationTag(tag)) return "affiliation";
  if (isRelationshipTag(tag)) return "relationship";
  if (isAbilityTag(tag)) return "ability";
  if (isCharacteristicTag(tag)) return "characteristic";
  return "unknown";
};

// Helper function to get color scheme based on tag category
export const getTagColorScheme = (tag: CharacterTag): string => {
  const category = getTagCategory(tag);
  switch (category) {
    case "affiliation":
      return "bg-blue-100 text-blue-800";
    case "relationship":
      return "bg-yellow-100 text-yellow-800";
    case "ability":
      return "bg-purple-100 text-purple-800";
    case "characteristic":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
