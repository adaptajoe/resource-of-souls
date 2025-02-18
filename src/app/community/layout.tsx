import { FC, ReactNode } from "react";

interface CommunityLayoutProps {
  children: ReactNode;
}

const CommunityLayout: FC<CommunityLayoutProps> = ({ children }) => {
  return <div className="bg-black text-white pb-16">{children}</div>;
};

export default CommunityLayout;
