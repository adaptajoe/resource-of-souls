"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const AnimatedHero = dynamic(() => import("./AnimatedHero"), {
  ssr: false,
  loading: () => <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-gray-800 animate-pulse" />,
});

interface AnimatedHeroWrapperProps {
  src: string;
  alt: string;
}

const AnimatedHeroWrapper: React.FC<AnimatedHeroWrapperProps> = ({ src, alt }) => {
  return (
    <Suspense fallback={<div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-gray-800 animate-pulse" />}>
      <AnimatedHero src={src} alt={alt} />
    </Suspense>
  );
};

export default AnimatedHeroWrapper;
