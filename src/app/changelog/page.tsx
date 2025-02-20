import Link from "next/link";
import { useMemo } from "react";

const ChangelogEntry = ({ version, date, changes }: { version: string; date: string; changes: string[] }) => (
  <div className="flex flex-col border-t-2 border-gray-400">
    <strong className="text-lg pt-2">{version}</strong>
    <p className="text-gray-400 text-sm italic ml-4">{date}</p>
    <ul className="list-disc ml-8 my-2 text-xs">
      {changes.map((change, index) => (
        <li key={index}>{change}</li>
      ))}
    </ul>
  </div>
);

export default function Changelog() {
  const rebirthOfSoulsChangelog = useMemo(
    () => [
      {
        version: "v1.0.1",
        date: "??/??/????",
        changes: ["TBC."],
      },
      {
        version: "v1.0.0",
        date: "21/03/2025",
        changes: ["BLEACH - Rebirth of Souls released on the Xbox Marketplace.", "BLEACH - Rebirth of Souls released on the PlayStation Store.", "BLEACH - Rebirth of Souls released on Steam."],
      },
    ],
    []
  );

  const resourceOfSoulsChangelog = useMemo(
    () => [
      {
        version: "v1.0.1",
        date: "??/??/????",
        changes: ["TBC."],
      },
      {
        version: "v1.0.0",
        date: "??/0?/2025",
        changes: [
          "BLEACH - Resource of Souls released.",
          "Homepage was added.",
          "Character page was added.",
          "Character page searching was added.",
          "Character alphabetical order filtering was added.",
          "Character release order filtering was added.",
          "Character realm filtering was added.",
          "Character gender filtering was added.",
          "Character Detail pages were added.",
          "Character Detail page outfit system was added.",
          "Character Detail page Game Term tooltip system was added.",
          "Character Detail page Archetype tooltip system was added.",
          "Character Detail page Animation tooltip system was added.",
          "Character Detail page Animations were added.",
          "Character Detail page Moveset system was added.",
          "Terminology page was added.",
          "Terminology page searching was added.",
          "Archetypes were added.",
          "Game Terms were added.",
          "Offline page was added.",
          "Story Mode page was added.",
          "Side Story Mode page was added.",
          "Secret Story Mode page was added.",
          "Mission Mode page was added.",
          "Changelog page was added.",
          "Community page was added.",
          "Ranked Community Leaderboard page was added.",
          "Versus Image Generator page was added.",
          "Modding page was added.",
          "Creators page was added.",
          "A public GitHub Repository was established.",
        ],
      },
    ],
    []
  );

  return (
    <div className="p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/changelog" className="text-teal-400 hover:underline">
          Changelog
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">C</span>hangelog
      </h2>
      <div>View BLEACH - Rebirth of Souls and BLEACH - Resource of Souls&apos; respective changelogs.</div>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-2">Rebirth of Souls</h2>
          {rebirthOfSoulsChangelog.map((entry, index) => (
            <ChangelogEntry key={index} version={entry.version} date={entry.date} changes={entry.changes} />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-4 md:mt-0">Resource of Souls</h2>
          {resourceOfSoulsChangelog.map((entry, index) => (
            <ChangelogEntry key={index} version={entry.version} date={entry.date} changes={entry.changes} />
          ))}
        </div>
      </div>
    </div>
  );
}
