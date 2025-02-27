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
        version: "v1.0.6.",
        date: "26/02/2025",
        changes: ["Further cleaned up Character Movelists", "Added new Kikon Moves for `Grimmjow`, `Rukia`, `Yamamoto` `Tōshiro` and `Aizen`.", "Added Stage information."],
      },
      {
        version: "v1.0.5.",
        date: "26/02/2025",
        changes: [
          "Unified code Interfaces across the app.",
          "Added Master League to the Ranked Leaderboard Badges.",
          "Added `Signature Move`, `Spiritual Pressure Move 1` and `Spiritual Pressure Move 2` to the Glossary Page.",
          "Fixed the Move Tag Parser to improve handling of spaces and numbers.",
          "Greatly expanded the Move Tagging System and Move Data System.",
          "Rewrote all Tags and Data for every character's moves (Yes, all 31 of them...)",
          "Got our first hate comment: 'this website looks like shit - @DDarkxwind via X - 25/02/2025'. This is the only hate comment that will ever be featured on the site. For the memes, of course.",
        ],
      },
      {
        version: "v1.0.4.",
        date: "24/02/2025",
        changes: [
          "Added proper Stats and Ease of Use details for `Coyote Starrk`.",
          "Added Awakening and Reawakening descriptions with details on which every Awakening and Reawakening does in the game.",
          "Added the new `Base Combos`, `Awakened Combos` and `Reawakened Combos` to showcase common combos for Character Movelists.",
          "Edited the names of some MP4 and PNG files in Character Animations.",
        ],
      },
      {
        version: "v1.0.3.",
        date: "24/02/2025",
        changes: [
          "Fixed all instances of characters having incorrect stat ratings.",
          "Fixed all instances of characters having incorrect Ease of Use ratings.",
          "Added the new `MidRange` Archetype, and added appropriate characters to said Archetype.",
          "Added the `Online Modes` page to the Game section.",
          "Fixed a bug where Mobile Movelist Animations were playing off the screen.",
          "(Hopefully) Fixed a bug where moves with special characters (I.E. ō, ū, é) weren't loading their animations properly for the Movelist Tooltip.",
          "Adjusted the descriptions of `ShortRange`, `LongRange` and `HybridRange` Archetypes.",
          "Added `Character #31 - Coyote Starrk`.",
          "Added placeholder imagery for Coyote Starrk.",
          "Added placeholder Ease of Use and Stats for Coyote Starrk (These will be updated later today in v1.0.4.).",
        ],
      },
      {
        version: "v1.0.2.",
        date: "23/02/2025",
        changes: [
          "Added enhanced Filters to the Glossary Page that lets you filter everything on the Glossary Page based on which mechanic it affects (Reishi, Kikon, etc).",
          "Added a new tab to every character's Movelist, `Kikon`, which shows their Kikon Moves along with a description.",
          "Added new Creators to the Creator page.",
          "Fixed an issue causing Character Details Full-body Images to load extremely slowly.",
          "Added placeholder info for Barragan and Starrk (Let's face it, they're getting in) along with placeholder custom Banners which is hidden for now.",
          "Added the FAQ page, which includes a roadmap for Resource of Souls.",
          "Added the currently running Tournaments to the Community Ranked Leaderboard Page.",
          "Edited the Home Page announcement and Community Page announcement to better notify users of upcoming Tournaments.",
        ],
      },
      {
        version: "v1.0.1.",
        date: "23/02/2025",
        changes: [
          "Fixed an issue where Rukia was incorrectly assigned the first character slot.",
          "Fixed an issue where Ichigo (Shikai) was incorrectly assigned the second character slot.",
          "Removed redundant Moveset Key expander from the Character Sidebar component.",
          "Added custom Banner and Hero Images to Ichigo Kurosaki (Bankai), which will be replaced once Bandai Namco releases his wallpapers.",
          "Fixed various mobile-only issues.",
          "Renamed the 'Terms' page to the 'Glossary' page.",
          "Set Archetypes and Game Terms on the Glossary page to be expanded by default.",
          "Fixed a bug where Game Terms and Archetypes on Character pages wouldn't take you to their Glossary entry if they had two or more words.",
          "Renamed the 'Offline' page to the 'Game' page.",
          "Added the current Version Number to the Footer.",
          "Updated the order of the Desktop navigation.",
          "Increased kerning on headings to improve readability for Dyslexic users.",
          "Fixed Mobile views across the site.",
          "Fixed a typo on Rukia's page.",
          "Fixed issues where Japanese Character Trailers were appearing in English Character Trailer spots.",
        ],
      },
      {
        version: "v1.0.0",
        date: "21/02/2025",
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
          "Character Detail page Trivia was added.",
          "Glossary page was added.",
          "Glossary page searching was added.",
          "Archetypes were added.",
          "Game Terms were added.",
          "Game page was added.",
          "Story Mode page was added.",
          "Side Story Mode page was added.",
          "Secret Story Mode page was added.",
          "Mission Mode page was added.",
          "Changelog page was added.",
          "Community page was added.",
          "Ranked Community Leaderboard page was added.",
          "Modding page was added.",
          "Creators page was added.",
          "A public GitHub Repository was established.",
        ],
      },
    ],
    []
  );

  return (
    <div className="p-4 lg:p-16 space-y-4 text-white">
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
