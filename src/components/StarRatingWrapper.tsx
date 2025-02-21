"use client";
import dynamic from "next/dynamic";
import type { FC } from "react";
import type { Character } from "@/types/characterDataTypes";

interface StarRatingProps {
  character: Character;
  rating: number;
}

const StarRating = dynamic(() => import("./StarRating"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center space-x-1 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-4 h-4 bg-gray-500/30 rounded-full" />
      ))}
    </div>
  ),
});

const StarRatingWrapper: FC<StarRatingProps> = ({ rating }) => <StarRating rating={rating} />;

StarRatingWrapper.displayName = "StarRatingWrapper";

export default StarRatingWrapper;
