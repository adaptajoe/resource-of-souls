
"use client";

import dynamic from "next/dynamic";

const CharacterSidebar = dynamic(() => import("./CharacterSidebar"), { ssr: false });

const CharacterSidebarWrapper = (props: any) => {
  return <CharacterSidebar {...props} />;
};

export default CharacterSidebarWrapper;
