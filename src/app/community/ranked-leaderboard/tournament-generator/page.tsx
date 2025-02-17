"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SingleEliminationBracket, Match, SVGViewer } from "@g-loot/react-tournament-brackets";

const initialPlayers = [
  { id: "1", name: "Player 1" },
  { id: "2", name: "Player 2" },
  { id: "3", name: "Player 3" },
  { id: "4", name: "Player 4" },
];

export default function TournamentGenerator() {
  const [players, setPlayers] = useState(initialPlayers);
  const [matches, setMatches] = useState([]);

  const handleAddPlayer = () => {
    const newPlayer = { id: `${players.length + 1}`, name: `Player ${players.length + 1}` };
    setPlayers([...players, newPlayer]);
  };

  const handleGenerateTournament = () => {
    // Generate matches based on players
    const generatedMatches = [
      { id: "1", name: "Match 1", participants: [players[0], players[1]] },
      { id: "2", name: "Match 2", participants: [players[2], players[3]] },
    ];
    setMatches(generatedMatches);
  };

  return (
    <div className="min-h-screen p-12">
      <div className="mb-6">
        <div>
          <nav className="flex flex-row">
            <Link href="/" className="text-teal-400 hover:underline">
              Home
            </Link>
            <p className="px-2">/</p>
            <Link href="/community/" className="text-teal-400 hover:underline">
              Community
            </Link>
            <p className="px-2">/</p>
            <Link href="/community/ranked-leaderboard" className="text-teal-400 hover:underline">
              Community Ranked Leaderboard
            </Link>
            <p className="px-2">/</p>
            <Link href="/community/ranked-leaderboard/tournament-generator" className="text-teal-400 hover:underline">
              Tournament Generator
            </Link>
          </nav>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold mb-6">Tournament Generator</h1>
            <div className="mr-6 text-xl">
              <button onClick={handleAddPlayer} className="mb-4 p-2 bg-blue-500 text-white rounded">
                Add Player
              </button>
              <button onClick={handleGenerateTournament} className="mb-4 p-2 bg-green-500 text-white rounded">
                Generate Tournament
              </button>
              <div>
                {players.map((player) => (
                  <p key={player.id}>{player.name}</p>
                ))}
              </div>
              <div>
                {matches.length > 0 && (
                  <SVGViewer width={500} height={500}>
                    <SingleEliminationBracket
                      matches={matches}
                      matchComponent={Match}
                      svgWrapper={({ children, ...props }) => (
                        <svg {...props}>{children}</svg>
                      )}
                    />
                  </SVGViewer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
