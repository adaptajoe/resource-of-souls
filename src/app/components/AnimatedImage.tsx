"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface AnimatedImageProps {
  id: string;
  alt: string;
  onError: (id: string, ext: string) => void;
  currentExtension: string;
  className?: string;
  hoveredImageId: string | null;
  setHoveredImageId: (id: string | null) => void;
}

export default function AnimatedImage({ id, alt, onError, currentExtension, className, hoveredImageId, setHoveredImageId }: AnimatedImageProps) {
  const isHovered = hoveredImageId === id;
  const [loadedGif, setLoadedGif] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  // Preload GIF when hovering
  useEffect(() => {
    if (isHovered && !loadedGif && !hasError) {
      const gifUrl = `/assets/terminology-assets/${id}.${currentExtension}`;
      const img: HTMLImageElement = new window.Image();
      img.src = gifUrl;
      img.onload = () => setLoadedGif(gifUrl);
      img.onerror = () => {
        setHasError(true);
        onError(id, currentExtension);
      };
    }
  }, [isHovered, id, currentExtension, loadedGif, hasError, onError]);

  return (
    <div
      className="relative w-full h-[150px]"
      onMouseEnter={() => setHoveredImageId(id)}
      onMouseLeave={() => setHoveredImageId(null)}
    >
      <Image
        src={isHovered && loadedGif && !hasError ? loadedGif : `/assets/terminology-assets/${id}.png`}
        alt={alt}
        width={300}
        height={150}
        className={className || "w-full h-[150px] object-cover"}
        onError={() => {
          setHasError(true);
          onError(id, currentExtension);
        }}
        priority={false}
        unoptimized={isHovered}
      />
    </div>
  );
}
