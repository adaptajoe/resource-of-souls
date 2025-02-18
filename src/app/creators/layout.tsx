import { FC, ReactNode } from "react";

interface CreatorsLayoutProps {
  children: ReactNode;
}

const CreatorsLayout: FC<CreatorsLayoutProps> = ({ children }) => {
  return <div className="bg-black text-white pb-16">{children}</div>;
};

export default CreatorsLayout;
