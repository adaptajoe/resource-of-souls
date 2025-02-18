"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
import { Character } from "@/types/character";

interface Stats {
  power: number;
  speed: number;
  range: number;
  defense: number;
  technique: number;
}

interface RadarChartProps {
  character: Character;
  stats: Stats;
  characterName: string;
}

const RadarChartComponent = dynamic(() => import("./RadarChartComponent"), { ssr: false });

const RadarChartComponentWrapper: FC<RadarChartProps> = (props) => {
  return <RadarChartComponent {...props} />;
};

export default RadarChartComponentWrapper;
