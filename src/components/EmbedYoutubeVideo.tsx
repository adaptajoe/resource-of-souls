import React, { useMemo, useCallback } from "react";

interface ICharacter {
  characterEngTrailer: string;
  characterJpTrailer: string;
}

interface IProps {
  character: ICharacter;
}

const EmbedYoutube: React.FC<IProps> = ({ character }) => {
  const getYouTubeEmbedUrl = useCallback((url: string) => {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
  }, []);

  const engTrailerId = useMemo(() => getYouTubeEmbedUrl(character.characterEngTrailer), [character.characterEngTrailer, getYouTubeEmbedUrl]);
  const jpTrailerId = useMemo(() => getYouTubeEmbedUrl(character.characterJpTrailer), [character.characterJpTrailer, getYouTubeEmbedUrl]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div className="p-2">
        <strong>English</strong>
        <div className="border border-white rounded-xl hover:border-red-600 transition-colors">
          <iframe
            height="300"
            src={`https://www.youtube.com/embed/${engTrailerId}`}
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="English Trailer"
            className="rounded-xl w-full"
          />
        </div>
      </div>
      <div className="p-2">
        <strong>Japanese</strong>
        <div className="border border-white rounded-xl hover:border-red-600 transition-colors">
          <iframe
            height="300"
            src={`https://www.youtube.com/embed/${jpTrailerId}`}
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Japanese Trailer"
            className="rounded-xl w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default EmbedYoutube;
