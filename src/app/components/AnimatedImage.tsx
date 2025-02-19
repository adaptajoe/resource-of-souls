"use client";
import { useState, useEffect, useCallback } from "react";
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
  const [loadedVideo, setLoadedVideo] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  // Preload video when hovering
  useEffect(() => {
    if (isHovered && !loadedVideo && !hasError) {
      const videoUrl = `/assets/terminology-assets/${id}.${currentExtension}`;
      const video = document.createElement("video");
      video.src = videoUrl;
      video.oncanplaythrough = () => setLoadedVideo(videoUrl);
      video.onerror = () => {
        setHasError(true);
        onError(id, currentExtension);
      };
    }
  }, [isHovered, id, currentExtension, loadedVideo, hasError, onError]);

  const handleMouseEnter = useCallback(() => setHoveredImageId(id), [id, setHoveredImageId]);
  const handleMouseLeave = useCallback(() => setHoveredImageId(null), [setHoveredImageId]);
  const handleError = useCallback(() => {
    setHasError(true);
    onError(id, currentExtension);
  }, [id, currentExtension, onError]);

  return (
    <div className="relative w-full h-[150px]" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isHovered && loadedVideo && !hasError ? (
        <video src={loadedVideo} width={300} height={150} className={className || "w-full h-[150px] object-cover"} autoPlay loop muted onError={handleError} />
      ) : (
        <Image
          src={`/assets/terminology-assets/${id}.png`}
          alt={alt}
          width={300}
          height={150}
          className={className || "w-full h-[150px] object-cover"}
          onError={handleError}
          priority={false}
          unoptimized={isHovered}
        />
      )}
    </div>
  );
}
