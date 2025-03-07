"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import badgesData from "../../../data/badgesData.json";

interface IBadge {
  name: string;
  pcOwner: string | null;
  psOwner: string | null;
  xboxOwner: string | null;
  pcLastChallenged: string | null;
  psLastChallenged: string | null;
  xboxLastChallenged: string | null;
}

export default function CommunityLeaderboard() {
  const [activeTable, setActiveTable] = useState<string>("World of the Living League");

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

  const calculateDaysSince = (dateString: string | null) => {
    if (!dateString) return "Never challenged";
    const challengeDate = new Date(dateString);
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
              className="relative p-4 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
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

  const BadgeTable = ({ badges }: { badges: IBadge[] }) => (
    <div className="bg-black">
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
              <td className="border p-2">{badge.name}</td>
              <td className="border p-2">{badge.pcOwner || "Unawarded"}</td>
              <td className="border p-2">{calculateDaysSince(badge.pcLastChallenged)}</td>
              <td className="border p-2">{badge.psOwner || "Unawarded"}</td>
              <td className="border p-2">{calculateDaysSince(badge.psLastChallenged)}</td>
              <td className="border p-2">{badge.xboxOwner || "Unawarded"}</td>
              <td className="border p-2">{calculateDaysSince(badge.xboxLastChallenged)}</td>
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
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/community" className="text-teal-400 hover:underline">
          Community
        </Link>
        <p>/</p>
        <Link href="/community-leaderboard" className="text-teal-400 hover:underline">
          Community Leaderboard
        </Link>
        <p>/</p>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">C</span>ommunity Leaderboard
            </h2>
            <div className="pr-4 space-y-4 px-6">
              <p>
                Badges represent marks of mastery, earned exclusively by participating in Tournaments. See a Badge that you&apos;d like against your name? Challenge the Badge owner via Discord, and
                duel for it! Elevate the stakes by wagering your own Badges against your opponents - The winner takes all wagered Badges!
              </p>
              <hr />
              <h3 className="text-3xl">Rules</h3>
              <ul className="text-sm list-disc italic mb-8 pl-4 space-y-4">
                <li>Badges have three copies, and ONLY three copies. One for PC, one for PlayStation, and one for Xbox.</li>
                <li>
                  &quot;Unawarded Badges&quot; are earned through placing FIRST in Tournaments either hosted by the &quot;BLEACH - Rebirth of Souls Subreddit&quot; Discord, or by affiliated Discords
                  participating in Resource of Souls Tournaments. If you win a Badge, you MUST supply your public Discord username. If you do not, then the Badge will go to the runner-up (And so forth
                  until someone supplies their public Discord username).
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
                  Additionally, there may be &quot;Pro League Tournaments&quot; that will require applicants to wager Badges as a MANDATORY entry requirement. In these instances, the number of Badges
                  will be divided in bespoke ways (For instance, divided across the Top 4 Additionally, there may be &quot;Pro League Tournaments&quot; that will require applicants to wager Badges as
                  a MANDATORY entry requirement. In these instances, the number of Badges will be divided in bespoke ways (For instance, divided across the Top 4, Top 8 and so forth). This will be
                  communicated in the Tournament details if applicable.
                </li>
                <li className="text-red-600">
                  If a user is found to be in breach of either the Subreddit or Discord rules, or is found to be cheating, using exploits, non-cosmetic mods, server-side mods, or client-side mods that
                  grant any form of advantage, or is being generally toxic (A 3 strike system will be used), then their Badge will be FORCIBLY revoked and their Discord username will be added to a
                  Community Leaderboard Blacklist. False flagging will count as a strike against your Discord username. This is NON-NEGOTIABLE. Selling Badges or trading Badges outside of the
                  honor-based &quot;Duel&quot; system will result in an immediate blacklist.
                </li>
                <li>BLEACH - Resource of Souls reserves the right to edit, remove or add to these rules at any time.</li>
              </ul>
              <hr />
              <h3 className="text-3xl">Currently Earnable Badges</h3>
              <p>
                Click the blue links below to register for a Badge&apos;s Tournament. Finding that the Tournament is full? Watch for who places first in the Tournament and challenge them for the
                Badge!
              </p>
              <hr />
              <h3 className="text-3xl">Sign Up for Available Tournaments</h3>
              <ul className="list-disc pl-4">
                <li>
                  <span className="text-amber-400">Queen of Hueco Mundo</span> - PlayStation -{" "}
                  <Link className="text-teal-400 hover:underline" href="https://challonge.com/6kqo6q99">
                    john30688&apos;s &apos;Warfare of Souls&apos; Tournament
                  </Link>{" "}
                  - 29/03/2025
                </li>
                <li>
                  <span className="text-amber-400">Bankai Spammer</span> - PC -{" "}
                  <Link className="text-teal-400 hover:underline" href="https://challonge.com/4t9d5lew#">
                    john30688&apos;s &apos;Warfare of Souls&apos; Tournament
                  </Link>{" "}
                  - 29/03/2025
                </li>
                <li>
                  <span className="text-amber-400">Karakura-Raizer Spirit</span> - PlayStation -{" "}
                  <Link className="text-teal-400 hover:underline" href="https://www.start.gg/tournament/chains-of-fate-opening-tournament/details">
                    Contourxci&apos;s &apos;Chains of Fate&apos; Tournament
                  </Link>{" "}
                  - 29/03/2025
                </li>
                <li>
                  <span className="text-amber-400">Tres Espada</span> - PC -{" "}
                  <Link className="text-teal-400 hover:underline" href="https://www.start.gg/tournament/society-scramble-weekly/details">
                    Owlflame&apos;s &apos;Society Scramble&apos; Tournament
                  </Link>{" "}
                  - 28/03/2025
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-self-end pr-6">
            <Image
              src={`/assets/character-banner/aizen-sosuke-banner.png`}
              height="300"
              width="300"
              alt={""}
              className="max-h-[300px] my-6 lg:mt-0 ml-4 w-fit object-cover object-top-center border-2 border-gray-400 rounded-xl"
              style={{
                objectFit: "cover",
                objectPosition: "50% 40%",
                aspectRatio: "2/1",
              }}
              loading="lazy"
            />
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid grid-cols-1 xl:grid-cols-3 xl:space-x-20 mt-12 space-x-0 space-y-4 xl:space-y-0">
          <div className="xl:col-span-1">
            <div className="mb-8">
              <p className="font-bebasFont text-2xl mb-4">Badge Champions</p>
              <BadgeChampions />
            </div>
            <div>
              <p className="text-2xl font-bebasFont mb-4">League Champions</p>
              <LeagueChampions />
            </div>
          </div>
          <div className="xl:col-span-2">
            <p className="text-2xl font-bebasFont mb-4 ml-2">Badges Leaderboard</p>
            <div className="w-full rounded-xl p-4 border border-gray-400">
              <div className="flex gap-2 mb-4 overflow-x-scroll">
                {Object.keys(tables).map((tableName) => (
                  <button
                    key={tableName}
                    onClick={() => setActiveTable(tableName)}
                    disabled={activeTable === tableName}
                    className={`px-4 text-sm font-black py-2 rounded-lg transition-colors ${activeTable === tableName ? "bg-red-600 text-white cursor-not-allowed" : "bg-gray-800 hover:bg-red-600"}`}
                  >
                    {tableName}
                  </button>
                ))}
              </div>
              <BadgeTable badges={tables[activeTable as keyof typeof tables]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
