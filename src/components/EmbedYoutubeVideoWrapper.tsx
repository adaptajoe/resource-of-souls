"use client";
import React, { useMemo, useCallback, useState } from "react";

interface Character {
  characterEngTrailer: string;
  characterJpTrailer: string;
}

interface Props {
  character: Character;
}

interface VideoFrameProps {
  videoId: string;
  title: string;
  onError: () => void;
  isLoading: boolean;
  onLoad: () => void;
}

// Separate video frame component for better reusability
const VideoFrame: React.FC<VideoFrameProps> = React.memo(({ videoId, title, onError, isLoading, onLoad }) => (
  <div className="relative">
    {isLoading && (
      <div className="absolute inset-0 bg-gray-900 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
      </div>
    )}
    <iframe
      height="300"
      src={`https://www.youtube.com/embed/${videoId}`}
      loading="lazy"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title}
      className={`rounded-xl w-full transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
      onError={onError}
      onLoad={onLoad}
    />
  </div>
));

VideoFrame.displayName = "VideoFrame";

const EmbedYoutube: React.FC<Props> = ({ character }) => {
  const [engError, setEngError] = useState(false);
  const [jpError, setJpError] = useState(false);
  const [engLoading, setEngLoading] = useState(true);
  const [jpLoading, setJpLoading] = useState(true);

  // Enhanced YouTube URL parser
  const getYouTubeEmbedUrl = useCallback((url: string): string | null => {
    try {
      // Handle different YouTube URL formats
      const patterns = [/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i, /^[a-zA-Z0-9_-]{11}$/];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }

      console.warn("Invalid YouTube URL format:", url);
      return null;
    } catch (error) {
      console.error("Error parsing YouTube URL:", error);
      return null;
    }
  }, []);

  const engTrailerId = useMemo(() => getYouTubeEmbedUrl(character.characterEngTrailer), [character.characterEngTrailer, getYouTubeEmbedUrl]);

  const jpTrailerId = useMemo(() => getYouTubeEmbedUrl(character.characterJpTrailer), [character.characterJpTrailer, getYouTubeEmbedUrl]);

  // Error message component
  const ErrorMessage: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
    <div className="flex flex-col items-center justify-center h-[300px] bg-gray-900 rounded-xl border border-red-500">
      <p className="text-red-500 mb-4">Failed to load video</p>
      <button onClick={onRetry} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
        Retry
      </button>
    </div>
  );

  const handleRetry = useCallback((type: "eng" | "jp") => {
    if (type === "eng") {
      setEngError(false);
      setEngLoading(true);
    } else {
      setJpError(false);
      setJpLoading(true);
    }
  }, []);

  if (!engTrailerId && !jpTrailerId) {
    return <div className="p-4 text-center text-red-500">No valid trailer URLs provided</div>;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {engTrailerId && (
        <div className="p-2">
          <strong className="block mb-2">English</strong>
          <div className="border border-white rounded-xl hover:border-red-600 transition-colors overflow-hidden">
            {engError ? (
              <ErrorMessage onRetry={() => handleRetry("eng")} />
            ) : (
              <VideoFrame videoId={engTrailerId} title="English Trailer" onError={() => setEngError(true)} isLoading={engLoading} onLoad={() => setEngLoading(false)} />
            )}
          </div>
        </div>
      )}
      {jpTrailerId && (
        <div className="p-2">
          <strong className="block mb-2">Japanese</strong>
          <div className="border border-white rounded-xl hover:border-red-600 transition-colors overflow-hidden">
            {jpError ? (
              <ErrorMessage onRetry={() => handleRetry("jp")} />
            ) : (
              <VideoFrame videoId={jpTrailerId} title="Japanese Trailer" onError={() => setJpError(true)} isLoading={jpLoading} onLoad={() => setJpLoading(false)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Add display name for better debugging
EmbedYoutube.displayName = "EmbedYoutube";

export default React.memo(EmbedYoutube);
