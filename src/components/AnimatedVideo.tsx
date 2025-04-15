"use client";
import { X, CaretLeft, CaretRight, Play, Pause, PushPinSimple } from "@phosphor-icons/react/dist/ssr";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startPin, setStartPin] = useState<number | null>(null);
  const [endPin, setEndPin] = useState<number | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [fps, setFps] = useState(60); // Default FPS, will be calculated if possible
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [actualFps, setActualFps] = useState<number | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const frameCountRef = useRef<number>(0);
  const fpsIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Calculate actual FPS by counting frames over time
  const calculateActualFps = useCallback(() => {
    if (isPlaying) {
      const fps = frameCountRef.current;
      setActualFps(fps);
      frameCountRef.current = 0;
    }
  }, [isPlaying]);

  // Smooth time update function using requestAnimationFrame
  const updateTimeDisplay = useCallback(() => {
    if (videoRef.current && isPlaying) {
      setCurrentTime(videoRef.current.currentTime);
      setCurrentFrame(Math.floor(videoRef.current.currentTime * fps));

      // Count frames for FPS calculation
      frameCountRef.current++;

      // Continue the animation loop
      rafRef.current = requestAnimationFrame(updateTimeDisplay);
    }
  }, [fps, isPlaying]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current && isVideoLoaded) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setVideoError(true);
        });
      }
      setIsPlaying(true);
    }
  }, [isVideoLoaded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      // Get video dimensions
      setVideoWidth(videoRef.current.videoWidth);
      setVideoHeight(videoRef.current.videoHeight);

      // Try to detect framerate from video metadata if possible
      // This is an approximation as HTML5 video doesn't expose exact FPS
      const detectedFps = estimateVideoFrameRate(videoRef.current);
      if (detectedFps) {
        setFps(detectedFps);
      }

      // Estimate total frames based on duration and fps
      setTotalFrames(Math.floor(videoRef.current.duration * fps));

      // Set initial playback rate
      videoRef.current.playbackRate = playbackRate;
    }
  }, [fps, playbackRate]);

  // Estimate video frame rate based on video properties
  const estimateVideoFrameRate = (video: HTMLVideoElement): number | null => {
    // If the filename contains fps information, try to extract it
    const fpsMatch = filename.match(/(\d+)fps/i);
    if (fpsMatch && !isNaN(parseInt(fpsMatch[1]))) {
      return parseInt(fpsMatch[1]);
    }

    // Otherwise make an educated guess based on duration and resolution
    if (video.videoHeight >= 1080) {
      // Higher resolution videos often use 30 or 60 fps
      return video.duration < 10 ? 60 : 30;
    } else {
      // Lower resolution videos often use 24 or 30 fps
      return 30;
    }
  };

  const handleFullscreenToggle = useCallback(() => {
    // Don't allow fullscreen for animations with 0 frames
    if (totalFrames === 0) return;

    setIsFullscreen((prev) => !prev);
  }, [totalFrames]);

  const handleFullscreenClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsFullscreen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsFullscreen(false);
    } else if (event.key === "ArrowLeft") {
      stepBackward();
    } else if (event.key === "ArrowRight") {
      stepForward();
    } else if (event.key === " ") {
      togglePlay();
      event.preventDefault();
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const stepForward = useCallback(() => {
    if (!videoRef.current) return;

    // Pause the video
    videoRef.current.pause();
    setIsPlaying(false);

    // Move forward by one frame (approximately)
    const frameTime = 1 / fps;
    videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + frameTime);

    // Update time immediately for a responsive UI
    setCurrentTime(videoRef.current.currentTime);
    setCurrentFrame(Math.floor(videoRef.current.currentTime * fps));
  }, [fps]);

  const stepBackward = useCallback(() => {
    if (!videoRef.current) return;

    // Pause the video
    videoRef.current.pause();
    setIsPlaying(false);

    // Move backward by one frame (approximately)
    const frameTime = 1 / fps;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - frameTime);

    // Update time immediately for a responsive UI
    setCurrentTime(videoRef.current.currentTime);
    setCurrentFrame(Math.floor(videoRef.current.currentTime * fps));
  }, [fps]);

  const setPlaybackSpeed = useCallback((speed: number) => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  }, []);

  const setStartPinAtCurrentFrame = useCallback(() => {
    if (!videoRef.current) return;

    setStartPin(videoRef.current.currentTime);
    // If end pin exists and is before start pin, reset it
    if (endPin !== null && endPin < videoRef.current.currentTime) {
      setEndPin(null);
    }
  }, [endPin]);

  const setEndPinAtCurrentFrame = useCallback(() => {
    if (!videoRef.current) return;

    setEndPin(videoRef.current.currentTime);
    // If start pin doesn't exist or is after end pin, reset it
    if (startPin === null || startPin > videoRef.current.currentTime) {
      setStartPin(null);
    }
  }, [startPin]);

  const clearPins = useCallback(() => {
    setStartPin(null);
    setEndPin(null);
  }, []);

  const handleTimelineClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current || !timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * videoRef.current.duration;

      videoRef.current.currentTime = newTime;

      // Update time immediately for a responsive UI
      setCurrentTime(newTime);
      setCurrentFrame(Math.floor(newTime * fps));
    },
    [fps]
  );

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;

    // For non-playing states or as a fallback
    if (!isPlaying) {
      setCurrentTime(videoRef.current.currentTime);
      setCurrentFrame(Math.floor(videoRef.current.currentTime * fps));
    }
  }, [fps, isPlaying]);

  // Calculate frames between pins
  const framesBetweenPins = startPin !== null && endPin !== null ? Math.floor((endPin - startPin) * fps) : null;

  // Start/stop the animation frame loop when play state changes
  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(updateTimeDisplay);

      // Start FPS calculation interval
      frameCountRef.current = 0;
      fpsIntervalRef.current = setInterval(calculateActualFps, 1000);
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      // Clear FPS calculation interval
      if (fpsIntervalRef.current) {
        clearInterval(fpsIntervalRef.current);
        fpsIntervalRef.current = null;
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (fpsIntervalRef.current) {
        clearInterval(fpsIntervalRef.current);
        fpsIntervalRef.current = null;
      }
    };
  }, [isPlaying, updateTimeDisplay, calculateActualFps]);

  // Update video playback rate when it changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      if (fpsIntervalRef.current) {
        clearInterval(fpsIntervalRef.current);
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, []);

  // Format time as MM:SS.ms with true millisecond precision (3 digits)
  const formatTime = (time: number) => {
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 1000);
    return `${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  };

  const renderVideoControls = () => (
    <div className="bg-black bg-opacity-70 p-2 transition-opacity duration-200 border-t-2 border-t-gray-400 rounded-b-xl">
      <p className="text-xl text-center text-gray-400 italic">&quot;{formatFilename(filename)}&quot;</p>
      {/* Timeline */}
      <div className="p-2 pb-0">
        <div ref={timelineRef} className="relative h-8 bg-gray-700 mb-2 cursor-pointer" onClick={handleTimelineClick}>
          <div className="absolute top-0 left-0 h-full bg-red-600" style={{ width: `${(currentTime / duration) * 100}%` }} />

          {/* Start pin marker */}
          {startPin !== null && <div className="absolute top-0 h-full w-1 bg-green-500" style={{ left: `${(startPin / duration) * 100}%` }} />}

          {/* End pin marker */}
          {endPin !== null && <div className="absolute top-0 h-full w-1 bg-blue-500" style={{ left: `${(endPin / duration) * 100}%` }} />}
        </div>
      </div>

      {/* Controls */}
      <div className="items-center justify-center md:justify-between grid grid-cols-1 md:grid-cols-4">
        <div className="flex col-span-1 items-center justify-center space-x-2 mr-2 mb-2 md:mb-0">
          <button
            onClick={stepBackward}
            className="bg-black rounded-xl border-2 border-gray-400 text-xs py-2 px-4 text-white flex flex-col items-center hover:text-red-500 transition-colors"
            aria-label="Previous frame"
          >
            <CaretLeft size={20} />
            &#8722;1 Frame
          </button>

          <button
            onClick={togglePlay}
            className="bg-black rounded-xl border-2 border-gray-400 text-xs py-2 px-4 text-white flex flex-col items-center hover:text-red-500 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={stepForward}
            className="bg-black rounded-xl border-2 border-gray-400 mx-4 text-xs py-2 px-4 text-white flex flex-col items-center hover:text-red-500 transition-colors"
            aria-label="Next frame"
          >
            <CaretRight size={20} />
            &#43;1 Frame
          </button>
        </div>

        <div className="flex col-span-1 items-center justify-center space-x-2 mb-2 md:mb-0">
          <button
            onClick={setStartPinAtCurrentFrame}
            className={`transition-colors bg-black rounded-xl border-2 border-gray-400 text-xs py-2 px-4 text-white flex flex-col items-center  ${
              startPin !== null ? "text-green-500" : "text-white hover:text-green-500"
            }`}
            aria-label="Set start pin"
          >
            <PushPinSimple size={20} weight={startPin !== null ? "fill" : "regular"} />
            Set Pin A
          </button>

          <button
            onClick={setEndPinAtCurrentFrame}
            className={`transition-colors bg-black rounded-xl border-2 border-gray-400 text-xs py-2 px-4 text-white flex flex-col items-center  ${
              endPin !== null ? "text-blue-500" : "text-white hover:text-blue-500"
            }`}
            aria-label="Set end pin"
          >
            <PushPinSimple size={20} weight={endPin !== null ? "fill" : "regular"} className="transform rotate-180" />
            Set Pin B
          </button>

          {(startPin !== null || endPin !== null) && (
            <button
              onClick={clearPins}
              className="bg-black rounded-xl border-2 border-gray-400 text-xs py-2 px-4 flex flex-col text-white items-center hover:text-red-500 transition-colors"
              aria-label="Clear pins"
            >
              <X size={20} />
              Remove all Pins
            </button>
          )}
        </div>

        <div className="flex col-span-1 items-center justify-center space-x-2 mb-2 md:mb-0 ml-2">
          {[0.25, 0.5, 0.75, 1].map((speed) => (
            <button
              className={`bg-black rounded-xl border-2 border-gray-400 text-xs py-2 px-4 flex flex-col text-white items-center transition-colors ${
                playbackRate === speed ? "bg-red-600 text-white hover:text-white" : "bg-black hover:text-red-600"
              }`}
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              aria-label={`Set playback speed to ${speed}x`}
            >
              {speed}x<p>Speed</p>
            </button>
          ))}
        </div>

        <div className="text-white text-sm justify-center flex flex-col items-center pt-2 md:pt-0">
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <span className="text-gray-400 italic mb-2 text-xs">Seconds.milliseconds</span>
          <span className="ml-2">
            Frame: {currentFrame} / {totalFrames}
          </span>
          {framesBetweenPins !== null && <span className="ml-2 text-yellow-400">Selected: {framesBetweenPins} frames</span>}

          {/* Video metadata */}
          <div className="text-xs text-gray-400 mt-1">
            <span>
              {videoWidth}×{videoHeight} • {fps}fps
            </span>
            {actualFps !== null && isPlaying && <span> • Playback: {actualFps}fps</span>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`relative flex flex-col items-center aspect-video group mx-2 ${totalFrames > 0 ? "cursor-pointer" : "cursor-default"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleFullscreenToggle}
        tabIndex={totalFrames > 0 ? 0 : -1}
        role={totalFrames > 0 ? "button" : "presentation"}
        aria-label={totalFrames > 0 ? `Play ${formatFilename(filename)} animation` : `${formatFilename(filename)} (no animation available)`}
      >
        <div className={`relative ${totalFrames === 0 ? "w-20 h-auto" : "w-full h-auto"}`}>
          <Image
            src={staticImageSrc}
            alt={alt}
            width={300}
            height={300}
            className={`w-full h-full object-cover transition-opacity duration-200 ${isHovered && !videoError ? "opacity-0" : "opacity-100"}`}
            style={{ filter: totalFrames > 0 ? "grayscale(100%)" : "none" }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 300px"
          />

          {totalFrames > 0 && !isHovered && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black bg-opacity-30 rounded-full p-4">
                <Play size={40} weight="fill" className="text-white opacity-80" />
              </div>
            </div>
          )}

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
              onTimeUpdate={handleTimeUpdate}
            >
              <source src={src} type="video/mp4" />
            </video>
          )}
        </div>

        <p className={`text-sm text-center font-black w-full italic py-2 border-b border-gray-400 transition-colors ${isHovered && !videoError ? "text-red-600" : "text-gray-400"}`}>
          {formatFilename(filename)}
        </p>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" onClick={handleFullscreenClick}>
          <div className="relative max-w-full max-h-full p-4">
            <div className="relative border-2 rounded-b-xl border-gray-400">
              <video ref={videoRef} src={src} className="max-w-[1300px] w-full max-h-full" loop muted autoPlay={isPlaying} onLoadedData={handleVideoLoaded} onTimeUpdate={handleTimeUpdate} />
              {renderVideoControls()}
            </div>
            <button className="absolute top-2 -right-8 text-white text-2xl" onClick={handleFullscreenToggle} aria-label="Close fullscreen">
              <X size={40} className="hover:bg-gray-800 rounded-xl p-1 transition-colors" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
