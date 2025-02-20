"use client";
import dynamic from "next/dynamic";
import { FC } from "react";
import { Character } from "@/types/characterDataTypes";

interface StarRatingProps {
  character: Character;
  rating: number;
}

const StarRating = dynamic(() => import("./StarRating"), { ssr: false });

const StarRatingWrapper: FC<StarRatingProps> = (props) => {
  return <StarRating {...props} />;
};

export default StarRatingWrapper;
