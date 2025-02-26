"use client";
import { memo } from "react";
import { Radar, RadarChart, PolarGrid, PolarRadiusAxis, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface IStats {
  power: number;
  speed: number;
  range: number;
  defense: number;
  technique: number;
}

interface IRadarChartProps {
  stats: IStats;
  characterName: string;
}

const STATS_CONFIG = [
  { key: "power", subject: "Power", color: "#ef4444" },
  { key: "speed", subject: "Speed", color: "#f59e0b" },
  { key: "range", subject: "Range", color: "#8b5cf6" },
  { key: "defense", subject: "Defense", color: "#22c55e" },
  { key: "technique", subject: "Technique", color: "#3b82f6" },
] as const;

interface IRadarDataPoint {
  subject: string;
  value: number;
  maxValue: number;
  fullMark: number;
  color: string;
}

interface ICustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
  data: IRadarDataPoint[];
}

const CustomTick = memo(({ x = 0, y = 0, payload, data }: ICustomTickProps) => {
  if (!payload) return null;

  const dataPoint = data.find((item) => item.subject === payload.value);
  return (
    <text x={x} y={y} textAnchor="middle" fill={dataPoint?.color} fontSize="14px" fontWeight="500">
      {payload.value}
    </text>
  );
});

CustomTick.displayName = "CustomTick";

const transformStatsToRadarData = (stats: IStats): IRadarDataPoint[] =>
  STATS_CONFIG.map(({ key, subject, color }) => ({
    subject,
    value: stats[key as keyof IStats],
    maxValue: 5,
    fullMark: 5,
    color,
  }));

const RadarChartComponent = memo(function RadarChartComponent({ stats, characterName }: IRadarChartProps) {
  const data = transformStatsToRadarData(stats);

  return (
    <div className="h-[300px] w-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#444" strokeOpacity={0.5} />
          <PolarRadiusAxis domain={[0, 5]} axisLine={false} tick={false} tickCount={6} />
          <PolarAngleAxis dataKey="subject" tick={(props) => <CustomTick {...props} data={data} />} tickLine={false} />
          <Radar name="Max" dataKey="maxValue" stroke="white" fill="none" strokeWidth={2} strokeOpacity={0.5} />
          <Radar name={characterName} dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.4} animationDuration={500} animationEasing="ease-out" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default RadarChartComponent;
