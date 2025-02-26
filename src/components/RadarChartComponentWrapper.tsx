"use client";
import dynamic from "next/dynamic";
import type { FC } from "react";
import type { ICharacter } from "@/types/characterDataTypes";

interface IStats {
  power: number;
  speed: number;
  range: number;
  defense: number;
  technique: number;
}

interface IRadarChartProps {
  character: ICharacter;
  stats: IStats;
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

const RadarChartComponentWrapper: FC<IRadarChartProps> = ({ stats, characterName }) => <RadarChartComponent stats={stats} characterName={characterName} />;
RadarChartComponentWrapper.displayName = "RadarChartComponentWrapper";

export default RadarChartComponentWrapper;
