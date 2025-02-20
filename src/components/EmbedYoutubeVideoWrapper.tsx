"use client";
import { Character } from "@/types/characterDataTypes";
import dynamic from "next/dynamic";
import { FC } from "react";

interface Props {
  character: Character;
}

const EmbedYoutube = dynamic(() => import("./EmbedYoutubeVideo"), { ssr: false });

const EmbedYoutubeVideoWrapper: FC<Props> = (props) => {
  return <EmbedYoutube {...props} />;
};

export default EmbedYoutubeVideoWrapper;
