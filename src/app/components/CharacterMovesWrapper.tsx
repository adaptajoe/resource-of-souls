"use client";

import dynamic from "next/dynamic";
import { MoveCategoryContainer } from "@/types/character";

const CharacterMoves = dynamic(() => import("./CharacterMoves"), { ssr: false });

interface CharacterMovesWrapperProps {
  moves: MoveCategoryContainer[];
  characterId: string;
}

const CharacterMovesWrapper = (props: CharacterMovesWrapperProps) => {
  return <CharacterMoves {...props} />;
};

export default CharacterMovesWrapper;
