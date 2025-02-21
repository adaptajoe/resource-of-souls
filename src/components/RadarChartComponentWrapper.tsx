"use client";
import dynamic from "next/dynamic";
import type { FC } from "react";
import type { Character } from "@/types/characterDataTypes";

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

const RadarChartComponent = dynamic(() => import("./RadarChartComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-auto flex items-center justify-center bg-black/20 rounded-lg">
      <div className="animate-pulse text-gray-400">Loading chart...</div>
    </div>
  ),
});

// Memoize the wrapper component
const RadarChartComponentWrapper: FC<RadarChartProps> = ({ stats, characterName }) => <RadarChartComponent stats={stats} characterName={characterName} />;

// Add display name for better debugging
RadarChartComponentWrapper.displayName = "RadarChartComponentWrapper";

export default RadarChartComponentWrapper;
