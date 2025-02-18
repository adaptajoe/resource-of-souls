import { FC, ReactNode } from "react";

interface OfflineLayoutProps {
  children: ReactNode;
}

const OfflineLayout: FC<OfflineLayoutProps> = ({ children }) => {
  return <div className="bg-black text-white pb-16">{children}</div>;
};

export default OfflineLayout;
