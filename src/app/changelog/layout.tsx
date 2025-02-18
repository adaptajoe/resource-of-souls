import { FC, ReactNode } from "react";

interface ChangelogLayoutProps {
  children: ReactNode;
}

const ChangelogLayout: FC<ChangelogLayoutProps> = ({ children }) => {
  return <div className="bg-black text-white pb-16">{children}</div>;
};

export default ChangelogLayout;
