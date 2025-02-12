"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Badge {
  name: string;
  owner: string | null;
  lastChallenged: string | null;
}

export default function RankedLeaderboard() {
  const [activeTable, setActiveTable] = useState<string>("World of the Living League");

  const worldOfLivingLeagueBadges: Badge[] = [
    { name: "K.O.N. (King of New York)", owner: null, lastChallenged: null },
    { name: "Karakura-Raizer", owner: null, lastChallenged: null },
    { name: "Karakura-Raizer Spirit", owner: null, lastChallenged: null },
    { name: "Karakura-Raizer Tiny-Devil", owner: null, lastChallenged: null },
    { name: "Karakura-Raizer Beast", owner: null, lastChallenged: null },
    { name: "Karakura-Raizer Erotic", owner: null, lastChallenged: null },
    { name: "Karakura-Raizer Delicate", owner: null, lastChallenged: null },
    { name: "Bread Queen", owner: null, lastChallenged: null },
    { name: "Xcution Member #001", owner: null, lastChallenged: null },
    { name: "Xcution Member #002", owner: null, lastChallenged: null },
    { name: "Xcution Member #003", owner: null, lastChallenged: null },
    { name: "Xcution Member #004", owner: null, lastChallenged: null },
    { name: "Xcution Member #005", owner: null, lastChallenged: null },
    { name: "Xcution Member #006", owner: null, lastChallenged: null },
    { name: "Xcution Member #007", owner: null, lastChallenged: null },
    { name: "Xcution Member #008", owner: null, lastChallenged: null },
    { name: "Xcution Member #009", owner: null, lastChallenged: null },
  ];

  const soulSocietyLeagueBadges: Badge[] = [
    { name: "Soul King", owner: null, lastChallenged: null },
    { name: "Squad 0 - Captain", owner: null, lastChallenged: null },
    { name: "Squad 0 - Divine General of the East", owner: null, lastChallenged: null },
    { name: "Squad 0 - Divine General of the West", owner: null, lastChallenged: null },
    { name: "Squad 0 - Divine General of the South", owner: null, lastChallenged: null },
    { name: "Squad 0 - Divine General of the North", owner: null, lastChallenged: null },
    { name: "Head Captain", owner: null, lastChallenged: null },
    { name: "Squad 1 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 2 Captain", owner: null, lastChallenged: null },
    { name: "Squad 2 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 3 Captain", owner: null, lastChallenged: null },
    { name: "Squad 3 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 4 Captain", owner: null, lastChallenged: null },
    { name: "Squad 4 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 5 Captain", owner: null, lastChallenged: null },
    { name: "Squad 5 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 6 Captain", owner: null, lastChallenged: null },
    { name: "Squad 6 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 7 Captain", owner: null, lastChallenged: null },
    { name: "Squad 7 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 8 Captain", owner: null, lastChallenged: null },
    { name: "Squad 8 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 9 Captain", owner: null, lastChallenged: null },
    { name: "Squad 9 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 10 Captain", owner: null, lastChallenged: null },
    { name: "Squad 10 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 11 Captain", owner: null, lastChallenged: null },
    { name: "Squad 11 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 12 Captain", owner: null, lastChallenged: null },
    { name: "Squad 12 Lieutenant", owner: null, lastChallenged: null },
    { name: "Squad 13 Captain", owner: null, lastChallenged: null },
    { name: "Squad 13 Lieutenant", owner: null, lastChallenged: null },
  ];

  const huecoMundoLeagueBadges: Badge[] = [
    { name: "Queen of Hueco Mundo", owner: null, lastChallenged: null },
    { name: "'King' of Hueco Mundo", owner: null, lastChallenged: null },
    { name: "Primordial Hollow", owner: null, lastChallenged: null },
    { name: "Cero Espada", owner: null, lastChallenged: null },
    { name: "Primera Espada", owner: null, lastChallenged: null },
    { name: "Segunda Espada", owner: null, lastChallenged: null },
    { name: "Tres Espada", owner: null, lastChallenged: null },
    { name: "Cuatro Espada", owner: null, lastChallenged: null },
    { name: "Quinto Espada", owner: null, lastChallenged: null },
    { name: "Sexta Espada", owner: null, lastChallenged: null },
    { name: "Séptima Espada", owner: null, lastChallenged: null },
    { name: "Octava Espada", owner: null, lastChallenged: null },
    { name: "Noveno Espada", owner: null, lastChallenged: null },
    { name: "Diez Espada", owner: null, lastChallenged: null },
  ];

  const schattenBereichLeagueBadges: Badge[] = [
    { name: "Quincy King", owner: null, lastChallenged: null },
    { name: "Quincy Successor", owner: null, lastChallenged: null },
    { name: "Quincy Grandmaster", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: A", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: B", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: C", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: D", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: E", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: F", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: G", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: H", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: I", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: J", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: K", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: L", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: M", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: N", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: O", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: P", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: Q", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: R", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: S", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: T", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: U", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: V", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: W", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: X", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: Y", owner: null, lastChallenged: null },
    { name: "Schrift-bearer: Z", owner: null, lastChallenged: null },
  ];

  const specialLeagueBadges: Badge[] = [
    { name: "'A Huge Zanpakuto'", owner: null, lastChallenged: null },
    { name: "Brick Thrower", owner: null, lastChallenged: null },
  ];

  const tables = {
    "World of the Living League": worldOfLivingLeagueBadges,
    "Soul Society League": soulSocietyLeagueBadges,
    "Hueco Mundo League": huecoMundoLeagueBadges,
    "Schatten Bereich League": schattenBereichLeagueBadges,
    "Special League": specialLeagueBadges,
  };

  const calculateDaysSince = (dateString: string | null) => {
    if (!dateString) return "Never challenged";
    const challengeDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - challengeDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  const calculateGlobalStats = () => {
    let totalBadges = 0;
    let totalClaimed = 0;

    Object.values(tables).forEach((badges) => {
      totalBadges += badges.length;
      totalClaimed += badges.filter((badge) => badge.owner !== null).length;
    });

    return { totalBadges, totalClaimed };
  };

  const globalStats = calculateGlobalStats();

  // Add these helper functions inside your component
  const getOwnerBadgeCounts = () => {
    const ownerCounts: { [key: string]: Badge[] } = {};

    Object.values(tables).forEach((badges) => {
      badges.forEach((badge) => {
        if (badge.owner) {
          if (!ownerCounts[badge.owner]) {
            ownerCounts[badge.owner] = [];
          }
          ownerCounts[badge.owner].push(badge);
        }
      });
    });

    return ownerCounts;
  };

  const getLeagueOwnerBadgeCounts = (leagueBadges: Badge[]) => {
    const ownerCounts: { [key: string]: Badge[] } = {};

    leagueBadges.forEach((badge) => {
      if (badge.owner) {
        if (!ownerCounts[badge.owner]) {
          ownerCounts[badge.owner] = [];
        }
        ownerCounts[badge.owner].push(badge);
      }
    });

    return ownerCounts;
  };

  const BadgeChampions = () => {
    const ownerCounts = getOwnerBadgeCounts();

    if (Object.keys(ownerCounts).length === 0) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">No records...</p>
        </div>
      );
    }

    // Group owners by their badge count
    const groupedByBadgeCount: { [key: number]: Array<[string, Badge[]]> } = {};
    Object.entries(ownerCounts).forEach(([owner, badges]) => {
      const count = badges.length;
      if (!groupedByBadgeCount[count]) {
        groupedByBadgeCount[count] = [];
      }
      groupedByBadgeCount[count].push([owner, badges]);
    });

    // Sort badge counts in descending order
    const sortedCounts = Object.keys(groupedByBadgeCount)
      .map(Number)
      .sort((a, b) => b - a);

    // Get all competitors up to third place (including ties)
    const topCompetitors: Array<[string, Badge[]]> = [];
    let currentRank = 1;

    for (const count of sortedCounts) {
      const tiedCompetitors = groupedByBadgeCount[count];
      if (currentRank <= 3) {
        topCompetitors.push(...tiedCompetitors);
        currentRank += tiedCompetitors.length;
      } else {
        break;
      }
    }

    const getRankStyles = (badgeCount: number) => {
      // Find which place this badge count represents
      const rank = sortedCounts.indexOf(badgeCount) + 1;

      switch (rank) {
        case 1: // Gold
          return {
            background: "linear-gradient(to bottom right, #ffd700, #b8860b)",
            border: "2px solid #ffd700",
            textColor: "text-black",
            glowColor: "#ffd700",
            shadowColor: "shadow-[#ffd700]",
          };
        case 2: // Silver
          return {
            background: "linear-gradient(to bottom right, #c0c0c0, #808080)",
            border: "2px solid #c0c0c0",
            textColor: "text-black",
            glowColor: "#c0c0c0",
            shadowColor: "shadow-[#c0c0c0]",
          };
        case 3: // Bronze
          return {
            background: "linear-gradient(to bottom right, #cd7f32, #8b4513)",
            border: "2px solid #cd7f32",
            textColor: "text-black",
            glowColor: "#cd7f32",
            shadowColor: "shadow-[#cd7f32]",
          };
        default:
          return {
            background: "bg-gray-800",
            border: "border-gray-700",
            textColor: "text-white",
            glowColor: "none",
            shadowColor: "shadow-none",
          };
      }
    };

    return (
      <div className="grid grid-cols-3 gap-4 mb-8">
        {topCompetitors.map(([owner, badges]) => {
          const styles = getRankStyles(badges.length);
          return (
            <div
              key={owner}
              className="relative p-4 rounded-lg shadow-lg"
              style={{
                background: styles.background,
                border: styles.border,
              }}
            >
              <div className="relative z-10 space-y-2 text-center">
                <div className={`${styles.textColor} text-lg font-bold`}>{owner}</div>
                <div className={`${styles.textColor} text-sm font-black`}>Total Badges: {badges.length}</div>
                <div className={`${styles.textColor} text-xs italic font-black`}>{badges.map((badge) => badge.name).join(", ")}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const LeagueChampions = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(tables).map(([leagueName, badges]) => {
          const ownerCounts = getLeagueOwnerBadgeCounts(badges);

          if (Object.keys(ownerCounts).length === 0) {
            return (
              <div key={leagueName} className="bg-gray-800 p-4 rounded-lg">
                <div className="text-teal-400 text-lg font-bold mb-2">{leagueName}</div>
                <p className="text-gray-400 text-left">No records...</p>
              </div>
            );
          }

          // Group owners by their badge count
          const groupedByBadgeCount: { [key: number]: Array<[string, Badge[]]> } = {};
          Object.entries(ownerCounts).forEach(([owner, badges]) => {
            const count = badges.length;
            if (!groupedByBadgeCount[count]) {
              groupedByBadgeCount[count] = [];
            }
            groupedByBadgeCount[count].push([owner, badges]);
          });

          // Sort badge counts in descending order
          const sortedCounts = Object.keys(groupedByBadgeCount)
            .map(Number)
            .sort((a, b) => b - a);

          // Get all competitors up to third place (including ties)
          const topCompetitors: Array<[string, Badge[]]> = [];
          let currentRank = 1;

          for (const count of sortedCounts) {
            const tiedCompetitors = groupedByBadgeCount[count];
            if (currentRank <= 3) {
              topCompetitors.push(...tiedCompetitors);
              currentRank += tiedCompetitors.length;
            } else {
              break;
            }
          }

          const getRankStyles = (badgeCount: number) => {
            const rank = sortedCounts.indexOf(badgeCount) + 1;
            switch (rank) {
              case 1:
                return "text-yellow-400"; // Gold
              case 2:
                return "text-gray-400"; // Silver
              case 3:
                return "text-amber-700"; // Bronze
              default:
                return "text-white";
            }
          };

          return (
            <div key={leagueName} className="bg-gray-800 p-4 rounded-lg">
              <div className="text-teal-400 text-lg font-bold mb-2">{leagueName}</div>
              {topCompetitors.map(([owner, badges]) => {
                const rankStyle = getRankStyles(badges.length);
                const rank = sortedCounts.indexOf(badges.length) + 1;
                return (
                  <div key={owner} className="mb-2">
                    <div className={`${rankStyle} font-bold`}>
                      #{rank} {owner} ({badges.length} badges)
                    </div>
                    <div className="text-gray-400 text-xs">{badges.map((badge) => badge.name).join(", ")}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const BadgeTable = ({ badges }: { title: string; badges: Badge[] }) => (
    <div>
      {/* Stats Section */}
      <div className="flex gap-2 mb-4 justify-between">
        <div className="flex flex-row space-x-2">
          <div className="px-4 font-black py-2 rounded-lg transition-colors bg-gray-800">
            <p className="text-teal-400 text-sm">Number of Badges in League</p>
            <p className="text-white font-bold text-xl">{badges.length}</p>
          </div>
          <div className="px-4 font-black py-2 rounded-lg transition-colors bg-gray-800">
            <p className="text-teal-400 text-sm">Unclaimed Badges in League</p>
            <p className="text-white font-bold text-xl">{badges.filter((badge) => badge.owner === null).length}</p>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="px-4 font-black py-2 rounded-lg transition-colors bg-gray-800">
            <p className="text-teal-400 text-sm">Total Badges Available</p>
            <p className="text-white font-bold text-xl">{globalStats.totalBadges}</p>
          </div>
          <div className="px-4 font-black py-2 rounded-lg transition-colors bg-gray-800">
            <p className="text-teal-400 text-sm">Total Badges Unclaimed</p>
            <p className="text-white font-bold text-xl">{globalStats.totalBadges - globalStats.totalClaimed}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="bg-black text-teal-400">
            <th className="border p-2 text-left">Badge</th>
            <th className="border p-2 text-left">Current Owner</th>
            <th className="border p-2 text-left">Last Challenged</th>
          </tr>
        </thead>
        <tbody>
          {badges.map((badge, index) => (
            <tr key={index} className="italic">
              <td className="border p-2">{badge.name}</td>
              <td className="border p-2">{badge.owner || "Unawarded"}</td>
              <td className="border p-2">{calculateDaysSince(badge.lastChallenged)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen p-12">
      <div className="grid grid-cols-2 mb-6">
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
          </nav>
          <h1 className="text-3xl font-bold mb-6">Community Ranked Leaderboard</h1>
          <div className="mr-6 text-xl">
            <p className="mb-4">
              Badges represent marks of mastery, earned exclusively by participating in Tournaments. See a Badge that you&apos;d like against your name? Challenge the Badge owner via Discord, and duel
              for it! Elevate the stakes by wagering your own Badges against your opponents - The winner takes all wagered Badges!
            </p>
            <p className="mb-4">You alone shall stand at the top. Claim that intolerable vaccuum, and stand upon the heavens!</p>
            <p className="mb-4 text-gray-400 italic">(Badges expire after 6 months with no Challenges - See one that should be expired? Message @jojicus on Discord!)</p>
          </div>
        </div>
        <div>
          <div className="flex justify-center xl:justify-end">
            <Image
              src={`/assets/character-banner/aizen-sosuke-banner.png`}
              height="800"
              width="800"
              alt={""}
              className="max-h-[800px] w-full rounded-xl object-cover object-top-center border-2 border-white mb-8"
              style={{
                objectFit: "cover",
                objectPosition: "0% 40%",
                aspectRatio: "3/1",
              }}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2 space-x-20 mt-12">
        <div>
          <div className="mb-8">
            <p className="text-xl font-black mb-4">Badge Champions</p>
            <BadgeChampions />
          </div>
          <div>
            <p className="text-xl font-black mb-4">League Champions</p>
            <LeagueChampions />
          </div>
        </div>
        <div>
          <p className="text-xl font-black mb-4 ml-2">Badges Leaderboard</p>
          <div className="w-full rounded-xl p-4 border border-gray-400">
            {/* League Tabs */}
            <div className="flex gap-2 mb-4">
              {Object.keys(tables).map((tableName) => (
                <button
                  key={tableName}
                  onClick={() => setActiveTable(tableName)}
                  disabled={activeTable === tableName}
                  className={`px-4 font-black py-2 rounded-lg transition-colors ${activeTable === tableName ? "bg-red-600 text-white cursor-not-allowed" : "bg-gray-800 hover:bg-red-600"}`}
                >
                  {tableName}
                </button>
              ))}
            </div>
            <BadgeTable title={activeTable} badges={tables[activeTable as keyof typeof tables]} />
          </div>
        </div>
      </div>
    </div>
  );
}
