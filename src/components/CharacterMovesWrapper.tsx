"use client";
import dynamic from "next/dynamic";
import { Moves } from "@/types/characterDataTypes";

const CharacterMoves = dynamic(() => import("./CharacterMoves"), { ssr: false });

interface CharacterMovesWrapperProps {
  moves: Moves[];
  characterId: string;
}

const CharacterMovesWrapper = (props: CharacterMovesWrapperProps) => {
  return <CharacterMoves {...props} />;
};

export default CharacterMovesWrapper;
