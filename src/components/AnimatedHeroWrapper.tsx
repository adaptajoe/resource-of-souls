"use client";
import dynamic from "next/dynamic";

const AnimatedHero = dynamic(() => import("./AnimatedHero"), { ssr: false });

interface AnimatedHeroWrapperProps {
  src: string;
  alt: string;
  filename: string;
}

const AnimatedHeroWrapper: React.FC<AnimatedHeroWrapperProps> = (props) => {
  return <AnimatedHero {...props} />;
};

export default AnimatedHeroWrapper;
