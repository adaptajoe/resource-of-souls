"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

interface AnimatedVideoProps {
  src: string;
  alt: string;
  filename: string;
}

export default function AnimatedVideo({ src, alt, filename }: AnimatedVideoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatFilename = (filename: string) => {
    return filename
      .split("-")
      .map((word) => {
        if (word.startsWith("#")) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  // Convert MP4 path to static image path (first frame)
  const staticImageSrc = src.replace(".mp4", ".png");

  // Encode the URLs to handle special characters
  const encodedStaticSrc = staticImageSrc.replace(/#/g, "%23");
  const encodedVideoSrc = src.replace(/#/g, "%23");

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleFocus = useCallback(() => setIsHovered(true), []);
  const handleBlur = useCallback(() => setIsHovered(false), []);

  return (
    <div className="relative aspect-video group mx-2 cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleFocus} onBlur={handleBlur} tabIndex={0}>
      {isHovered ? (
        <video
          width={600}
          height={300}
          src={encodedVideoSrc}
          className={`border border-gray-400 w-full h-full rounded-lg transition-all duration-200 ${isHovered ? "border-red-600" : "grayscale"}`}
          style={{
            objectFit: "cover",
          }}
          autoPlay
          loop
          muted
        />
      ) : (
        <Image
          width={600}
          height={300}
          src={encodedStaticSrc}
          alt={alt}
          className={`border border-gray-400 w-full h-full rounded-lg transition-all duration-200 ${isHovered ? "border-red-600" : "grayscale"}`}
          style={{
            objectFit: "cover",
          }}
          priority={true} // Use priority for important images
        />
      )}

      <p className={`text-sm text-center font-black italic py-2 border-b border-gray-400 transition-colors ${isHovered ? "text-red-600" : "text-gray-400"}`}>{formatFilename(filename)}</p>
    </div>
  );
}
