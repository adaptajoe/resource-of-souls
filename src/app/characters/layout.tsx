import { FC, ReactNode } from "react";

interface CharactersLayoutProps {
  children: ReactNode;
}

const CharactersLayout: FC<CharactersLayoutProps> = ({ children }) => {
  return <div className="bg-black text-white pb-16">{children}</div>;
};

export default CharactersLayout;
