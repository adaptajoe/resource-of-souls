"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { useMemo, useCallback } from "react";

interface RadarChartProps {
  stats: {
    power: number;
    speed: number;
    range: number;
    defense: number;
    technique: number;
  };
  characterName: string;
}

const transformStatsToRadarData = (stats: RadarChartProps["stats"]) => [
  {
    subject: "Power",
    value: stats.power,
    maxValue: 5,
    fullMark: 5,
    color: "#ef4444",
  },
  {
    subject: "Speed",
    value: stats.speed,
    maxValue: 5,
    fullMark: 5,
    color: "#f59e0b",
  },
  {
    subject: "Range",
    value: stats.range,
    maxValue: 5,
    fullMark: 5,
    color: "#8b5cf6",
  },
  {
    subject: "Defense",
    value: stats.defense,
    maxValue: 5,
    fullMark: 5,
    color: "#22c55e",
  },
  {
    subject: "Technique",
    value: stats.technique,
    maxValue: 5,
    fullMark: 5,
    color: "#3b82f6",
  },
];

export default function RadarChartComponent({ stats, characterName }: RadarChartProps) {
  const data = useMemo(() => transformStatsToRadarData(stats), [stats]);

  return (
    <div className="h-[300px] w-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#444" strokeOpacity={0.5} />
          <PolarRadiusAxis domain={[0, 5]} axisLine={false} tick={false} tickCount={6} />
          {/* Add max level outline */}
          <Radar name="Max" dataKey="maxValue" stroke="white" fill="none" strokeWidth={2} strokeOpacity={0.5} />
          {/* Character stats */}
          <Radar name={characterName} dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.4} animationDuration={350} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
