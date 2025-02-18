"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
import { CharacterAnimationsProps } from "./CharacterAnimations";

const CharacterAnimations = dynamic(() => import("./CharacterAnimations").then((mod) => mod.default), {
  ssr: false,
});

const CharacterAnimationsWrapper: FC<CharacterAnimationsProps> = (props) => {
  return <CharacterAnimations {...props} />;
};

export default CharacterAnimationsWrapper;
