"use client";
import { X } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";

interface IAnimatedVideoProps {
  src: string;
  alt: string;
  filename: string;
}

export default function AnimatedVideo({ src, alt, filename }: IAnimatedVideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const staticImageSrc = src.replace(".mp4", ".png");

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current && isVideoLoaded) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setVideoError(true);
        });
      }
    }
  }, [isVideoLoaded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const handleFullscreenClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsFullscreen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, handleKeyDown]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  return (
    <>
      <div
        className="relative aspect-video group mx-2 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleFullscreenToggle}
        tabIndex={0}
        role="button"
        aria-label={`Play ${formatFilename(filename)} animation`}
      >
        <div className="relative w-full h-full">
          <Image
            src={staticImageSrc}
            alt={alt}
            width={300}
            height={300}
            className={`w-full h-full object-cover transition-opacity duration-200 ${isHovered && !videoError ? "opacity-0" : "opacity-100"}`}
            style={{ filter: "grayscale(100%)" }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 300px"
          />

          {!videoError && (
            <video
              ref={videoRef}
              width={300}
              height={300}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-200 ${isHovered && isVideoLoaded ? "opacity-100" : "opacity-0"}`}
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={handleVideoLoaded}
              onError={() => setVideoError(true)}
            >
              <source src={src} type="video/mp4" />
            </video>
          )}
        </div>

        <p className={`text-sm text-center font-black italic py-2 border-b border-gray-400 transition-colors ${isHovered && !videoError ? "text-red-600" : "text-gray-400"}`}>
          {formatFilename(filename)}
        </p>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleFullscreenClick}>
          <div className="relative max-w-full max-h-full p-4">
            <video src={src} className="max-w-[1200px] w-full max-h-full" controls loop muted autoPlay />
            <button className="absolute top-2 -right-8 text-white text-2xl" onClick={handleFullscreenToggle} aria-label="Close fullscreen">
              <X size={40} className="hover:bg-gray-800 rounded-xl p-1 transition-colors" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
