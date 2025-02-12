"use client";

import Image from "next/image";
import { useState } from "react";

interface AnimatedGifProps {
  src: string;
  alt: string;
  filename: string;
}

export default function AnimatedGif({ src, alt, filename }: AnimatedGifProps) {
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

  // Convert GIF path to static image path (first frame)
  const staticImageSrc = src.replace(".gif", ".png");

  // Encode the URLs to handle special characters
  const encodedStaticSrc = staticImageSrc.replace(/#/g, "%23");
  const encodedGifSrc = src.replace(/#/g, "%23");

  // Create URL with timestamp to force reload
  const getGifUrl = () => `${encodedGifSrc}?t=${Date.now()}`;

  return (
    <div
      className="relative aspect-video group mx-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      <Image
        width={600}
        height={300}
        src={isHovered ? getGifUrl() : encodedStaticSrc}
        alt={alt}
        className={`border border-gray-400 w-full h-full rounded-lg transition-all duration-200 ${
          isHovered ? "border-red-600" : "grayscale"
        }`}
        style={{
          objectFit: "cover",
        }}
      />

      <p
        className={`text-sm text-center font-black italic py-2 border-b border-gray-400 transition-colors ${
          isHovered ? "text-red-600" : "text-gray-400"
        }`}
      >
        {formatFilename(filename)}
      </p>
    </div>
  );
}
