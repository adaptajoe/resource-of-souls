import React from "react";
import supplementaryData from "@/data/supplementaryData.json";
import GameTermTooltip from "@/components/GameTermTooltip";
import TextArchetypeTooltip from "@/components/TextArchetypeTooltip";

interface Term {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  engName?: string;
}

const formatTermId = (term: string): string => {
  return term
    .toLowerCase()
    .replace(/([A-Z])/g, "-$1")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const findGameTerm = (term: string): Term | undefined => {
  const foundTerm = Object.values(supplementaryData.gameTerms).find((t) => t.name === term);
  if (foundTerm) {
    return {
      ...foundTerm,
      id: formatTermId(term),
    };
  }
  return undefined;
};

const findArchetype = (term: string): Term | undefined => {
  const foundArchetype = Object.values(supplementaryData.archetypes).find((a) => a.name === term);
  if (foundArchetype) {
    return {
      ...foundArchetype,
      id: formatTermId(term),
    };
  }
  return undefined;
};

const gameTerms = Object.values(supplementaryData.gameTerms).map((term) => term.name);
const archetypeTerms = Object.values(supplementaryData.archetypes).map((term) => term.name);

export const parseGameTerms = (text: string): React.ReactNode[] => {
  if (!text) return [];

  const termPattern = [...gameTerms, ...archetypeTerms]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  const regex = new RegExp(`\\b(${termPattern})\\b`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const gameTerm = findGameTerm(part);
    if (gameTerm) {
      return (
        <GameTermTooltip
          key={index}
          term={{
            ...gameTerm,
            id: formatTermId(part),
          }}
          display={part}
        />
      );
    }

    const archetype = findArchetype(part);
    if (archetype) {
      return (
        <TextArchetypeTooltip
          key={index}
          archetype={{
            ...archetype,
            id: formatTermId(part),
          }}
          display={part}
        />
      );
    }

    return part;
  });
};
