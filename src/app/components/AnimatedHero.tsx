"use client";

import { FC } from "react";

interface AnimatedHeroProps {
  src: string;
  alt: string;
  filename: string;
}

const AnimatedHero: FC<AnimatedHeroProps> = ({ src, alt }) => {
  return (
    <div className="relative w-full overflow-hidden" tabIndex={0}>
      <video autoPlay loop muted playsInline className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover border-b border-gray-400" preload="auto">
        <source src={src} type="video/mp4" />
        {alt}
      </video>
    </div>
  );
};

export default AnimatedHero;
