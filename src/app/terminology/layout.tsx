import { FC, ReactNode } from "react";

interface TerminologyLayoutProps {
  children: ReactNode;
}

const TerminologyLayout: FC<TerminologyLayoutProps> = ({ children }) => {
  return <div className="bg-black text-white pb-16">{children}</div>;
};

export default TerminologyLayout;
