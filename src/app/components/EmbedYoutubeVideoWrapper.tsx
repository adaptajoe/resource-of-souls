"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
import { Character } from "@/types/character";

interface Props {
  character: Character;
}

const EmbedYoutube = dynamic(() => import("./EmbedYoutubeVideo"), { ssr: false });

const EmbedYoutubeVideoWrapper: FC<Props> = (props) => {
  return <EmbedYoutube {...props} />;
};

export default EmbedYoutubeVideoWrapper;
