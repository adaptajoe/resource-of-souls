"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import badgesData from "../../../data/badgesData.json";
import tournamentData from "../../../data/tournamentData.json";
import { IBadge } from "@/types/badgeDataTypes";
import { ITournament } from "@/types/tournamentDataTypes";

export default function CommunityLeaderboard() {
  const [activeTable, setActiveTable] = useState<string>("All Leagues");
  const [expandRules, setExpandRules] = useState(false);
  const [expandActiveTournaments, setExpandActiveTournaments] = useState(false);
  const [expandBadgeTable, setExpandBadgeTable] = useState(false);

  const { worldOfLivingLeagueBadges, soulSocietyLeagueBadges, huecoMundoLeagueBadges, schattenBereichLeagueBadges, specialLeagueBadges, masterLeagueBadges } = badgesData;

  const tables = useMemo(
    () => ({
      "World of the Living League": worldOfLivingLeagueBadges,
      "Soul Society League": soulSocietyLeagueBadges,
      "Hueco Mundo League": huecoMundoLeagueBadges,
      "Schatten Bereich League": schattenBereichLeagueBadges,
      "Special League": specialLeagueBadges,
      "Master League": masterLeagueBadges,
    }),
    [worldOfLivingLeagueBadges, soulSocietyLeagueBadges, huecoMundoLeagueBadges, schattenBereichLeagueBadges, specialLeagueBadges, masterLeagueBadges]
  );

  const allBadges = useMemo(() => {
    return Object.values(tables).flat();
  }, [tables]);

  const tournamentInfo: ITournament[] = tournamentData.tournaments.map((tournament: any) => ({
    ...tournament,
    tournamentDate: new Date(tournament.tournamentDate),
    platform: tournament.platform.toUpperCase() as "PC" | "PlayStation" | "Xbox",
  }));

  const calculateDaysSince = (date: Date | null | undefined) => {
    if (!date) return "Never challenged";
    const challengeDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - challengeDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  const getOwnerBadgeCounts = useMemo(() => {
    const ownerCounts: { [key: string]: IBadge[] } = {};

    Object.values(tables).forEach((badges) => {
      badges.forEach((badge) => {
        [
          { owner: badge.pcOwner, platform: "PC" },
          { owner: badge.psOwner, platform: "PlayStation" },
          { owner: badge.xboxOwner, platform: "Xbox" },
        ].forEach(({ owner, platform }) => {
          if (owner) {
            const key = `${owner} (${platform})`;
            if (!ownerCounts[key]) {
              ownerCounts[key] = [];
            }
            ownerCounts[key].push(badge);
          }
        });
      });
    });

    return ownerCounts;
  }, [tables]);

  const getLeagueOwnerBadgeCounts = (leagueBadges: IBadge[]) => {
    const ownerCounts: { [key: string]: IBadge[] } = {};

    leagueBadges.forEach((badge) => {
      [
        { owner: badge.pcOwner, platform: "PC" },
        { owner: badge.psOwner, platform: "PlayStation" },
        { owner: badge.xboxOwner, platform: "Xbox" },
      ].forEach(({ owner, platform }) => {
        if (owner) {
          const key = `${owner} (${platform})`;
          if (!ownerCounts[key]) {
            ownerCounts[key] = [];
          }
          ownerCounts[key].push(badge);
        }
      });
    });

    return ownerCounts;
  };

  const Star = ({ style }: { style: React.CSSProperties }) => (
    <div
      className="absolute w-2 h-2"
      style={{
        ...style,
        animation: `starAnimation ${2 + Math.random() * 4}s infinite ease-in-out`,
      }}
    >
      <div className="absolute w-2 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-0.5 h-2 bg-white transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );

  const BadgeChampions = () => {
    const ownerCounts = getOwnerBadgeCounts;

    const generateRandomStars = (count: number) => {
      return Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 4}s`,
      }));
    };

    if (Object.keys(ownerCounts).length === 0) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <p className="text-gray-400">No records...</p>
        </div>
      );
    }

    const groupedByBadgeCount: { [key: number]: Array<[string, IBadge[]]> } = {};
    Object.entries(ownerCounts).forEach(([owner, badges]) => {
      const count = badges.length;
      if (!groupedByBadgeCount[count]) {
        groupedByBadgeCount[count] = [];
      }
      groupedByBadgeCount[count].push([owner, badges]);
    });

    const sortedCounts = Object.keys(groupedByBadgeCount)
      .map(Number)
      .sort((a, b) => b - a);

    const topCompetitors: Array<[string, IBadge[]]> = [];
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
          return {
            background: "linear-gradient(to bottom right, #ffd700, #b8860b)",
            border: "2px solid #ffd700",
            textColor: "text-black",
            boxShadow: "0 0 15px #ffd700",
          };
        case 2:
          return {
            background: "linear-gradient(to bottom right, #c0c0c0, #808080)",
            border: "2px solid #c0c0c0",
            textColor: "text-black",
            boxShadow: "0 0 15px #c0c0c0",
          };
        case 3:
          return {
            background: "linear-gradient(to bottom right, #cd7f32, #8b4513)",
            border: "2px solid #cd7f32",
            textColor: "text-black",
            boxShadow: "0 0 15px #cd7f32",
          };
        default:
          return {
            background: "bg-gray-800",
            border: "border-gray-700",
            textColor: "text-white",
            boxShadow: "none",
          };
      }
    };

    return (
      <div className="flex flex-col gap-4 mb-8">
        {topCompetitors.map(([owner, badges]) => {
          const styles = getRankStyles(badges.length);
          const stars = generateRandomStars(20);

          return (
            <div
              key={owner}
              className="relative font-bebasFont p-4 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
              style={{
                background: styles.background,
                border: styles.border,
                boxShadow: styles.boxShadow,
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  backgroundSize: "1000px 100%",
                  animation: "shimmer 3s infinite linear",
                }}
              />

              {/* Animated stars */}
              {stars.map((starStyle, index) => (
                <Star key={index} style={starStyle} />
              ))}

              {/* Content */}
              <div className="relative z-10 space-y-2 text-center backdrop-blur-sm">
                <div className={`${styles.textColor} text-3xl font-bold`}>{owner}</div>
                <div className={`${styles.textColor} text-xl font-black`}>Total Badges: {badges.length}</div>
                <div className={`${styles.textColor} text-sm italic font-black`}>{badges.map((badge) => badge.name).join(" | ")}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const LeagueChampions = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
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

          const groupedByBadgeCount: { [key: number]: Array<[string, IBadge[]]> } = {};
          Object.entries(ownerCounts).forEach(([owner, badges]) => {
            const count = badges.length;
            if (!groupedByBadgeCount[count]) {
              groupedByBadgeCount[count] = [];
            }
            groupedByBadgeCount[count].push([owner, badges]);
          });

          const sortedCounts = Object.keys(groupedByBadgeCount)
            .map(Number)
            .sort((a, b) => b - a);

          const topCompetitors: Array<[string, IBadge[]]> = [];
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
                return {
                  background: "linear-gradient(to bottom right, #ffd700, #b8860b)",
                  border: "2px solid #ffd700",
                  textColor: "text-black",
                  boxShadow: "0 0 15px #ffd700",
                };
              case 2:
                return {
                  background: "linear-gradient(to bottom right, #c0c0c0, #808080)",
                  border: "2px solid #c0c0c0",
                  textColor: "text-black",
                  boxShadow: "0 0 15px #c0c0c0",
                };
              case 3:
                return {
                  background: "linear-gradient(to bottom right, #cd7f32, #8b4513)",
                  border: "2px solid #cd7f32",
                  textColor: "text-black",
                  boxShadow: "0 0 15px #cd7f32",
                };
              default:
                return {
                  background: "bg-gray-800",
                  border: "border-gray-700",
                  textColor: "text-white",
                  boxShadow: "none",
                };
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

  const TournamentTable = ({ tournaments }: { tournaments: ITournament[] }) => {
    const [filter, setFilter] = useState<string>("ALL");

    const handleFilterChange = (newFilter: string) => {
      setFilter(newFilter);
    };

    const filteredTournaments = tournaments.filter((tournament) => {
      if (filter === "ALL") return true;
      if (filter === "PRIZE_POOL") return tournament.prizePool !== null;
      if (filter === "PC" || filter === "PLAYSTATION" || filter === "XBOX") return tournament.platform === filter;
      return tournament.tournamentRegion === filter;
    });

    const uniqueRegions = Array.from(new Set(tournaments.map((tournament) => tournament.tournamentRegion).filter(Boolean)));

    return (
      <div className="bg-black">
        <p>Simply click a Tournament card below to go to that Tournament&apos;s sign-up page.</p>
        <p className="mt-4">
          Currently, there are <span className="font-bebasFont text-xl text-red-600">{tournaments.length}</span> Tournaments planned.
        </p>
        <hr className="my-4" />
        <div className="mb-4 flex flex-row font-bebasFont tracking-wider">
          <button
            onClick={() => handleFilterChange("ALL")}
            className={`mr-2 px-3 py-1 rounded flex transition-colors items-center font-black gap-1 ${
              filter === "ALL" ? "bg-teal-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-black"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("PC")}
            className={`mr-2 px-3 py-1 rounded flex transition-colors items-center font-black gap-1 ${
              filter === "PC" ? "bg-teal-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-black"
            }`}
          >
            PC
          </button>
          <button
            onClick={() => handleFilterChange("PLAYSTATION")}
            className={`mr-2 px-3 py-1 rounded flex transition-colors items-center font-black gap-1 ${
              filter === "PLAYSTATION" ? "bg-teal-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-black"
            }`}
          >
            PlayStation
          </button>
          <button
            onClick={() => handleFilterChange("XBOX")}
            className={`mr-2 px-3 py-1 rounded flex transition-colors items-center font-black gap-1 ${
              filter === "XBOX" ? "bg-teal-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-black"
            }`}
          >
            Xbox
          </button>
          <button
            onClick={() => handleFilterChange("PRIZE_POOL")}
            className={`mr-2 px-3 py-1 rounded flex transition-colors items-center font-black gap-1 ${
              filter === "PRIZE_POOL" ? "bg-teal-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-black"
            }`}
          >
            Prize Pool
          </button>
          {uniqueRegions.map((region) => (
            <button
              key={region}
              onClick={() => handleFilterChange(region!)}
              className={`mr-2 px-3 py-1 rounded flex transition-colors items-center font-black gap-1 ${
                filter === region ? "bg-teal-400 text-black" : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-black"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        <p className="mt-4">
          <span className="font-bebasFont text-xl text-red-600">{filteredTournaments.length}</span> Tournaments found with the current filter.
        </p>
        <div>
          {filteredTournaments.map((tournament, index) => (
            <Link
              key={index}
              className="hover:bg-gray-800 transition-colors flex flex-row w-full border-2 border-gray-400 hover:border-red-600 rounded-xl p-1 my-4 items-center cursor-pointer text-gray-400 overflow-x-scroll"
              href={tournament.tournamentLink}
            >
              <div className="size-12 min-w-12 text-center p-1 ml-4 bg-black border-2 border-gray-400 rounded-full">
                {tournament.platform === "PLAYSTATION" && <Image height={50} width={50} src="/assets/site-assets/playstation.png" alt="PlayStation" className="aspect-square p-1" />}
                {tournament.platform === "PC" && <Image height={50} width={50} src="/assets/site-assets/steam.png" alt="Steam" />}
                {tournament.platform === "XBOX" && <Image height={50} width={50} src="/assets/site-assets/xbox.png" alt="Xbox" />}
              </div>
              <div className="mx-8 flex flex-col items-start w-fit min-w-40 md:w-96">
                <p className="text-amber-400 font-bebasFont tracking-wider text-base md:text-xl">{tournament.tournamentName}</p>
                <p className="text-xs md:text-base">
                  Hosted by: <span className="text-teal-400">@{tournament.tournamentHostName}</span>
                </p>
              </div>
              <p className="mx-8 w-fit  md:w-24 text-xs md:text-base text-center">
                Region: {tournament.tournamentRegion ? <span className="text-amber-400">{tournament.tournamentRegion}</span> : "??"}
              </p>
              <p className="mx-8 w-fit md:w-24 text-xs md:text-base text-center">{tournament.prizePool ? <span className="text-amber-400">{tournament.prizePool}</span> : "No Cash Prize"}</p>
              <div className="mx-8 w-fit md:w-40 text-center flex flex-col items-center min-w-64">
                <p className="text-xs md:text-sm">Badge to Earn:</p>
                <p className="text-amber-400 font-bebasFont tracking-wider text-base md:text-xl text-center">{tournament.assignedBadge}</p>
              </div>
              <div className="mx-8 w-fit md:w-40 min-w-64 text-center flex flex-col items-center">
                <p className=" text-xs md:text-sm">Tournament Date:</p>
                <p className="text-amber-400 font-bebasFont tracking-wider text-base md:text-xl text-center">
                  {tournament.tournamentDate !== null ? tournament.tournamentDate.toDateString() : "No date yet"}
                </p>
                <p className="text-amber-400 font-bebasFont tracking-wider text-base md:text-xl text-center">{tournament.tournamentStartTime}</p>
              </div>
              <div>
                <p className="mx-8 w-40 text-xs md:text-base">{tournament.notes ? <span className="text-amber-400">{tournament.notes}</span> : "No notes"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const BadgeTable = ({ badges }: { badges: IBadge[] }) => (
    <div className="bg-black font-bebasFont text-sm md:text-xl tracking-wider">
      <table className="w-full">
        <thead>
          <tr className="bg-black text-teal-400">
            <th className="border p-2 text-left">Badge</th>
            <th className="border p-2 text-left text-purple-600">PC Owner</th>
            <th className="border p-2 text-left text-purple-600">Last Challenged (PC)</th>
            <th className="border p-2 text-left text-blue-600">PlayStation Owner</th>
            <th className="border p-2 text-left text-blue-600">Last Challenged (PlayStation)</th>
            <th className="border p-2 text-left text-lime-500">Xbox Owner</th>
            <th className="border p-2 text-left text-lime-500">Last Challenged (Xbox)</th>
          </tr>
        </thead>
        <tbody>
          {badges.map((badge, index) => (
            <tr key={index} className="italic hover:bg-gray-700 transition-colors">
              <td className="border p-2 text-amber-400">{badge.name}</td>
              <td className={`border p-2 ${badge.pcOwner === null ? "text-gray-600" : "text-white"}`}>{badge.pcOwner || "Unawarded"}</td>
              <td className={`border p-2 ${badge.pcLastChallenged === null ? "text-gray-600" : "text-white"}`}>{calculateDaysSince(badge.pcLastChallenged)}</td>
              <td className={`border p-2 ${badge.psOwner === null ? "text-gray-600" : "text-white"}`}>{badge.psOwner || "Unawarded"}</td>
              <td className={`border p-2 ${badge.psLastChallenged === null ? "text-gray-600" : "text-white"}`}>{calculateDaysSince(badge.psLastChallenged)}</td>
              <td className={`border p-2 ${badge.xboxOwner === null ? "text-gray-600" : "text-white"}`}>{badge.xboxOwner || "Unawarded"}</td>
              <td className={`border p-2 ${badge.xboxLastChallenged === null ? "text-gray-600" : "text-white"}`}>{calculateDaysSince(badge.xboxLastChallenged)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Main return statement
  return (
    <div className="p-4 lg:p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" passHref>
          <p className="text-teal-400 hover:underline">Home</p>
        </Link>
        <p>/</p>
        <Link href="/community" passHref>
          <p className="text-teal-400 hover:underline">Community</p>
        </Link>
        <p>/</p>
        <Link href="/community-leaderboard" passHref>
          <p className="text-teal-400 hover:underline">Community Leaderboard</p>
        </Link>
        <p>/</p>
      </div>
      <div>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 space-x-0 md:space-x-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4 mb-4">
                  <span className="text-red-600">C</span>ommunity Leaderboard
                </h2>
                <p className="mr-2">
                  Badges represent marks of mastery, earned exclusively by participating in Tournaments. See a Badge that you&apos;d like against your name? Challenge the Badge owner via Discord, and
                  duel for it! Elevate the stakes by wagering your own Badges against your opponents - The winner takes all wagered Badges!
                </p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black border-l-8 border-teal-400 pl-4 mb-4 mt-4 md:mt-0">
                  <span className="text-teal-400">R</span>ules
                </h2>
                <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setExpandRules((prevState) => !prevState)}>
                  <span>Click to {expandRules ? "hide" : "expand"}</span>
                  {expandRules ? <span>&uarr;</span> : <span>&darr;</span>}
                </button>
                {!expandRules ? null : (
                  <ul className="text-sm list-disc italic my-8 pl-4 space-y-4">
                    <li>Badges have three copies, and ONLY three copies. One for PC, one for PlayStation, and one for Xbox.</li>
                    <li>
                      &quot;Unawarded Badges&quot; are earned through placing FIRST in Tournaments either hosted by the &quot;BLEACH - Rebirth of Souls Subreddit&quot; Discord, or by affiliated
                      Discords participating in Resource of Souls Tournaments. If you win a Badge, you MUST supply your public Discord username. If you do not, then the Badge will go to the runner-up
                      (And so forth until someone supplies their public Discord username).
                    </li>
                    <li>
                      &quot;Awarded Badges&quot; can be Dueled for in our Discord; to do this, join our Discord, and propose a Duel to the Discord username listed as the Badge Owner. After a Duel is
                      proposed, it becomes Unawarded temporarily. Duels are a set of three matches, and the player who wins two out of three matches wins the Badge.
                    </li>
                    <li className="text-amber-400">We are currently figuring out the rules surrounding redueling and duel rejection limitations.</li>
                    <li>
                      To heighten the stakes, Badge Owners can wager multiple Badges. To do this, mention that you wish to Wager in the Duel request. The number of Badges wagered must be equal between
                      opponents (For instance, Player X wagers 2 Badges; this means if Player Y accepts, they must also wager 2 Badges and no more or less).
                    </li>
                    <li>
                      Additionally, there may be &quot;Pro League Tournaments&quot; that will require applicants to wager Badges as a MANDATORY entry requirement. In these instances, the number of
                      Badges will be divided in bespoke ways (For instance, divided across the Top 4, Top 8 and so forth). This will be communicated in the Tournament details if applicable.
                    </li>
                    <li className="text-red-600">
                      If a user is found to be in breach of either the Subreddit or Discord rules, or is found to be cheating, using exploits, non-cosmetic mods, server-side mods, or client-side mods
                      that grant any form of advantage, or is being generally toxic (A 3 strike system will be used), then their Badge will be FORCIBLY revoked and their Discord username will be added
                      to a Community Leaderboard Blacklist. False flagging will count as a strike against your Discord username. This is NON-NEGOTIABLE. Selling Badges or trading Badges outside of the
                      honor-based &quot;Duel&quot; system will result in an immediate blacklist.
                    </li>
                    <li>BLEACH - Resource of Souls reserves the right to edit, remove or add to these rules at any time.</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-span-1 xl:col-span-2 my-8">
          <h2 className="text-2xl md:text-3xl font-black pl-4 border-l-8 border-red-600 mb-8">
            <span className="text-red-600">A</span>ctive Tournaments
          </h2>
          <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setExpandActiveTournaments((prevState) => !prevState)}>
            <span>Click to {expandActiveTournaments ? "hide" : "expand"}</span>
            {expandActiveTournaments ? <span>&uarr;</span> : <span>&darr;</span>}
          </button>
          {!expandActiveTournaments ? null : <TournamentTable tournaments={tournamentInfo} />}
        </div>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 space-x-0 md:space-x-8 mt-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4 mb-8">
              <span className="text-red-600">B</span>adge Champions
            </h2>
            <BadgeChampions />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-teal-400 pl-4 mb-8">
              <span className="text-teal-400">L</span>eague Champions
            </h2>
            <LeagueChampions />
          </div>
        </div>
        <hr className="my-6" />
        <div className="col-span-1">
          <h2 className="text-2xl md:text-3xl font-black border-l-8 border-teal-400 pl-4 mb-6">
            <span className="text-teal-400">B</span>adges
          </h2>
          <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setExpandBadgeTable((prevState) => !prevState)}>
            <span>Click to {expandBadgeTable ? "hide" : "expand"}</span>
            {expandBadgeTable ? <span>&uarr;</span> : <span>&darr;</span>}
          </button>
          {!expandBadgeTable ? null : (
            <>
              <div className="space-x-2 space-y-2 text-center md:space-x-4 md:space-y-0 my-4">
                <button
                  onClick={() => setActiveTable("All Leagues")}
                  disabled={activeTable === "All Leagues"}
                  className={`px-4 text-xl font-bebasFont font-black py-2 rounded-lg transition-colors ${
                    activeTable === "All Leagues" ? "bg-teal-400 text-black cursor-not-allowed" : "bg-gray-800 hover:bg-red-600"
                  }`}
                >
                  All Leagues
                </button>
                {Object.keys(tables).map((tableName) => (
                  <button
                    key={tableName}
                    onClick={() => setActiveTable(tableName)}
                    disabled={activeTable === tableName}
                    className={`px-4 text-xl font-bebasFont font-black py-2 rounded-lg transition-colors ${
                      activeTable === tableName ? "bg-teal-400 text-black cursor-not-allowed" : "bg-gray-800 hover:bg-red-600"
                    }`}
                  >
                    {tableName}
                  </button>
                ))}
              </div>
              <div className="overflow-x-scroll">
                <BadgeTable badges={activeTable === "All Leagues" ? allBadges : tables[activeTable as keyof typeof tables]} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
