"use client";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";

interface AnimatedVideoProps {
  src: string;
  alt: string;
  filename: string;
}

export default function AnimatedVideo({ src, alt, filename }: AnimatedVideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debug the incoming src
  useEffect(() => {
    console.log("Video source path:", src);
  }, [src]);

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
        playPromise.catch((error) => {
          console.error("Error playing video:", error);
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
    console.log("Video loaded successfully:", src);
    setIsVideoLoaded(true);
  }, [src]);

  // Try to detect if the file exists
  useEffect(() => {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Video file exists:", src);
      })
      .catch((error) => {
        console.error("Video file not found:", src, error);
        setVideoError(true);
      });
  }, [src]);

  return (
    <div className="relative aspect-video group mx-2 cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} tabIndex={0}>
      <div className="relative w-full h-full">
        <Image
          src={staticImageSrc}
          alt={alt}
          width={300}
          height={300}
          className={`w-full h-full object-cover transition-opacity duration-200 ${isHovered && !videoError ? "opacity-0" : "opacity-100"}`}
          style={{ filter: "grayscale(100%)" }}
          loading="lazy"
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
            preload="auto"
            onLoadedData={handleVideoLoaded}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <p className={`text-sm text-center font-black italic py-2 border-b border-gray-400 transition-colors ${isHovered && !videoError ? "text-red-600" : "text-gray-400"}`}>
        {formatFilename(filename)}
      </p>
    </div>
  );
}
