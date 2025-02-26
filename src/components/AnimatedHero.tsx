"use client";
import { FC, useState } from "react";

interface IAnimatedHeroProps {
  src: string;
  alt: string;
}

const AnimatedHero: FC<IAnimatedHeroProps> = ({ src, alt }) => {
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative w-full overflow-hidden" role="banner" aria-label={alt}>
      {!isError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover border-b border-gray-400"
          preload="metadata"
          onError={() => setIsError(true)}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
      ) : (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-gray-800 flex items-center justify-center">
          <p>Failed to load video</p>
        </div>
      )}
    </div>
  );
};

export default AnimatedHero;
