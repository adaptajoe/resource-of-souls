"use client";
import dynamic from "next/dynamic";
import { FC } from "react";
import { CharacterSidebarProps } from "./CharacterSidebar";

const CharacterSidebar = dynamic(() => import("./CharacterSidebar").then((mod) => mod.default), { ssr: false });

const CharacterSidebarWrapper: FC<CharacterSidebarProps> = (props) => {
  return <CharacterSidebar {...props} />;
};

export default CharacterSidebarWrapper;
