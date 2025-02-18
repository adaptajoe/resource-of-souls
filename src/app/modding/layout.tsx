import { FC, ReactNode } from "react";

interface ModdingLayoutProps {
  children: ReactNode;
}

const ModdingLayout: FC<ModdingLayoutProps> = ({ children }) => {
  return <div className="bg-black text-white pb-16">{children}</div>;
};

export default ModdingLayout;
