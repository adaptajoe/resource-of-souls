"use client";

import dynamic from "next/dynamic";

const CharacterMoves = dynamic(() => import("./CharacterMoves"), { ssr: false });

const CharacterMovesWrapper = (props: any) => {
  return <CharacterMoves {...props} />;
};

export default CharacterMovesWrapper;
