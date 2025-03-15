"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface IMoveAnimationTooltipProps {
  characterId: string;
  moveId: string;
  children: React.ReactNode;
}

export const MoveAnimationTooltip = ({ characterId, moveId, children }: IMoveAnimationTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { ref: containerRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const cleanMoveId = moveId.replace(".mp4", "");

  const normalizedMoveId = cleanMoveId.normalize("NFKD").replace(/\u0304/g, "\u0304"); // Ensure consistent macron encoding

  const animationPath = `/assets/character-animations/${encodeURIComponent(characterId)}/${encodeURIComponent(normalizedMoveId)}.mp4`;

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
    <div ref={containerRef} className="relative inline-block pl-4" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className={`cursor-pointer ${videoError ? "text-red-600" : "text-teal-400"}`}>{children}</span>

      {!videoError && inView && (
        <>
          {/* Mobile tooltip (above) */}
          <div
            className={`
              md:hidden absolute z-10 p-1 rounded-lg bg-black border-teal-400 border-2 shadow-lg
              left-1/2 -translate-x-1/2 bottom-full mb-4
              transition-all duration-200
              ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
          >
            <video
              ref={videoRef}
              width={300}
              height={300}
              className="rounded-lg max-w-[300px]"
              onError={() => setVideoError(true)}
              onLoadedData={() => setIsVideoLoaded(true)}
              muted
              playsInline
              autoPlay
              loop
              preload="metadata"
            >
              <source src={animationPath} type="video/mp4" />
            </video>
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-[-12px] w-0 h-0 
              border-l-[12px] border-l-transparent 
              border-t-[12px] border-t-teal-400 
              border-r-[12px] border-r-transparent"
            />
          </div>

          {/* Desktop tooltip (right) */}
          <div
            className={`
              hidden md:block absolute z-10 p-1 rounded-lg bg-black border-teal-400 border-2 shadow-lg
              left-full ml-4 top-1/2 -translate-y-1/2
              transition-all duration-200
              ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
          >
            <video
              ref={videoRef}
              width={300}
              height={300}
              className="rounded-lg max-w-[300px]"
              onError={() => setVideoError(true)}
              onLoadedData={() => setIsVideoLoaded(true)}
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={animationPath} type="video/mp4" />
            </video>
            <div
              className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-0 h-0 
              border-t-[12px] border-t-transparent 
              border-r-[12px] border-r-teal-400 
              border-b-[12px] border-b-transparent"
            />
          </div>
        </>
      )}
    </div>
  );
};
