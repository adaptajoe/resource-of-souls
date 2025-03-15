"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { calculateElo } from "../../../utils/elo";
import playerData from "../../../data/playerData.json";

interface Player {
  name: string;
  elo: number;
  region: string;
  timezone: string;
  mains: string[];
}

type Platform = "pc" | "playstation" | "xbox";

export default function RankedLeaderboard() {
  const [platform, setPlatform] = useState<Platform>("pc");
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerA, setSelectedPlayerA] = useState<string>("");
  const [selectedPlayerB, setSelectedPlayerB] = useState<string>("");
  const [newRatingA, setNewRatingA] = useState<number | null>(null);
  const [newRatingB, setNewRatingB] = useState<number | null>(null);
  const [winner, setWinner] = useState<"A" | "B" | null>(null);

  useEffect(() => {
    setPlayers(playerData[platform]);
  }, [platform]);

  const handleCalculateElo = () => {
    if (winner && selectedPlayerA && selectedPlayerB) {
      const playerA = players.find((player) => player.name === selectedPlayerA);
      const playerB = players.find((player) => player.name === selectedPlayerB);

      if (playerA && playerB) {
        const { newRatingA, newRatingB } = calculateElo(playerA.elo, playerB.elo, winner);
        setNewRatingA(newRatingA);
        setNewRatingB(newRatingB);
      }
    }
  };

  const highestElo = Math.max(...players.map((player) => player.elo));
  const tiers = {
    "Top Tier": players.filter((player) => player.elo >= highestElo * 0.9),
    "Mid Tier": players.filter((player) => player.elo < highestElo * 0.9 && player.elo >= highestElo * 0.7),
    "Low Tier": players.filter((player) => player.elo < highestElo * 0.7),
  };

  return (
    <div className="p-4 lg:p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/community" className="text-teal-400 hover:underline">
          Community
        </Link>
        <p>/</p>
        <Link href="/ranked-leaderboard" className="text-teal-400 hover:underline">
          Ranked Leaderboard
        </Link>
        <p>/</p>
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-3 mr-8">
          <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
            <span className="text-red-600">L</span>eaderboard
          </h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button onClick={() => setPlatform("pc")} className={`p-2 ${platform === "pc" ? "bg-teal-400" : "bg-gray-700"} rounded`}>
                PC
              </button>
              <button onClick={() => setPlatform("playstation")} className={`p-2 ${platform === "playstation" ? "bg-teal-400" : "bg-gray-700"} rounded`}>
                PlayStation
              </button>
              <button onClick={() => setPlatform("xbox")} className={`p-2 ${platform === "xbox" ? "bg-teal-400" : "bg-gray-700"} rounded`}>
                Xbox
              </button>
            </div>
            {Object.entries(tiers).map(([tierName, tierPlayers]) => (
              <div key={tierName}>
                <h3 className="text-xl font-bold">{tierName}</h3>
                <ul>
                  {tierPlayers.map((player) => (
                    <li key={player.name} className="flex justify-between">
                      <span>{player.name}</span>
                      <span>{player.elo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 space-y-4">
          <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
            <span className="text-red-600">E</span>LO Calculator
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label>
                Player A:
                <select value={selectedPlayerA} onChange={(e) => setSelectedPlayerA(e.target.value)} className="ml-2 p-1 text-black">
                  <option value="" disabled>
                    Select Player A
                  </option>
                  {players.map((player) => (
                    <option key={player.name} value={player.name}>
                      {player.name} ({player.elo})
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Player B:
                <select value={selectedPlayerB} onChange={(e) => setSelectedPlayerB(e.target.value)} className="ml-2 p-1 text-black">
                  <option value="" disabled>
                    Select Player B
                  </option>
                  {players.map((player) => (
                    <option key={player.name} value={player.name}>
                      {player.name} ({player.elo})
                    </option>
                  ))}
                </select>
              </label>
              <div>
                <label>
                  Winner:
                  <select value={winner ?? ""} onChange={(e) => setWinner(e.target.value as "A" | "B" | null)} className="ml-2 p-1 text-black">
                    <option value="" disabled>
                      Select Winner
                    </option>
                    <option value="A">Player A</option>
                    <option value="B">Player B</option>
                  </select>
                </label>
              </div>
              <button onClick={handleCalculateElo} className="bg-teal-400 text-black p-2 rounded">
                Calculate ELO
              </button>
            </div>
            {newRatingA !== null && newRatingB !== null && (
              <div className="space-y-2">
                <p>
                  New {selectedPlayerA} ELO Rating: {newRatingA}
                </p>
                <p>
                  New {selectedPlayerB} ELO Rating: {newRatingB}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
