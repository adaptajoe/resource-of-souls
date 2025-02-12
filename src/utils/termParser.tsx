import React from "react";
import GameTermTooltip from "@/app/components/GameTermTooltip";
import TextArchetypeTooltip from "@/app/components/TextArchetypeTooltip";
import supplementaryData from "@/data/supplementaryData.json";

interface Term {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  engName?: string;
}

const findGameTerm = (term: string): Term | undefined => {
  return Object.values(supplementaryData.gameTerms).find((t) => t.name === term);
};

const findArchetype = (term: string): Term | undefined => {
  return Object.values(supplementaryData.archetypes).find((a) => a.name === term);
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
      return <GameTermTooltip key={index} term={gameTerm} display={part} />;
    }

    const archetype = findArchetype(part);
    if (archetype) {
      return <TextArchetypeTooltip key={index} archetype={archetype} display={part} />;
    }

    return part;
  });
};
