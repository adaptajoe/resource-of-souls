"use client";

import dynamic from "next/dynamic";

const CharacterAnimations = dynamic(() => import("./CharacterAnimations"), { ssr: false });

const CharacterAnimationsWrapper = (props: any) => {
  return <CharacterAnimations {...props} />;
};

export default CharacterAnimationsWrapper;
