import Link from "next/link";
import { useMemo } from "react";

const ChangelogEntry = ({ version, date, changes }: { version: string; date: string; changes: string[] }) => (
  <div className="flex flex-col border-t border-black dark:border-gray-400">
    <strong className="text-lg pt-2 text-black dark:text-white">{version}</strong>
    <p className="text-black dark:text-gray-400 text-sm italic ml-4">{date}</p>
    <ul className="list-disc ml-8 my-2 text-xs text-gray-500 dark:text-gray-400">
      {changes.map((change, index) => (
        <li key={index}>{change}</li>
      ))}
    </ul>
  </div>
);

export default function Changelog() {
  const resourceOfSoulsChangelog = useMemo(
    () => [
      {
        version: "v1.1.5.",
        date: "13/04/2025",
        changes: [
          "Implemented Light Mode across the entire site - Resource of Souls is not responsible for any retina damage caused by over-use.",
          "Sorted out a few Badge Owners.",
          "Added damage data to Shinji Hirako.",
          "Added new content to the Stages and Mission Mode pages.",
        ],
      },
      {
        version: "v1.1.4.",
        date: "03/04/2025",
        changes: [
          "Added unique UI assets specific to characters that have them.",
          "Added associated Movelist entries expanding on these assets, and their exact purpose and conditions.",
          "Added animations for Sosuke Aizen.",
          "Edited the fullscreen video player and how videos are handled on character pages.",
          "Updated the persistent header on the Home Page.",
        ],
      },
      {
        version: "v1.1.3.",
        date: "31/03/2025",
        changes: ["Added new Badge Owners.", "Added most move animations for Ulquiorra Shifar.", "Added missing Creator credits."],
      },
      {
        version: "v1.1.2.",
        date: "29/03/2025",
        changes: [
          "Added new Badge Owners.",
          "Fixed up Combo data for all characters.",
          "Added hit data and state data for Ichigo Kurosaki and Byakuya Kuchiki.",
          "Added intro / short intro animations to all characters excluding Ichigo Kurosaki (Final Getsugatensho).",
          "Added the new Fullscreen Animation Frame Breakdown system",
          "Added some new Badges.",
          "Fixed move icons.",
          "Added default PC Keybind Notation to Movelists.",
        ],
      },
      {
        version: "v1.1.1.",
        date: "20/03/2025",
        changes: [
          "Added 100% accurate Movelists for all remaining characters.",
          "Fixed all instances of Ease of Use being incorrect.",
          "Added new options to the Movelist component for how inputs are shown, Scrollable Combo Inputs, and added a few community combos.",
        ],
      },
      {
        version: "v1.1.0.",
        date: "20/03/2025",
        changes: [
          "Added 100% accurate Movelists for the following characters: Yasutora 'Chad' Sado, Ichigo Kurosaki, Ichigo Kurosaki (Bankai), Ichigo Kurosaki (Final Getsugatensho), Byakuya Kuchiki, Tier Halibel, Coyote Stark, Szayelaporro Granz, Ulquiorra Shifar, Grimmjow Jaegerjaquez, Nelliel Tu Odelschwanck, Gin Ichimaru, Sosuke Aizen, Kisuke Urahara, Shigekuni Genryusai Yamamoto, and Uryu Ishida. The remaining characters will be done in the next patch.",
          "Reworked the Character Details page with new features for asset downloading, viewing outfits, trailers, and animations.",
          "Added alt. colors for a number of characters. More to come!",
          "Reworked the Movelist component for better clarity, and to better match the in-game user interface.",
          "Added updated Tournament data to the Community Leaderboard Page.",
        ],
      },
      {
        version: "v1.0.15.",
        date: "15/03/2025",
        changes: [
          "Added new assets for the Home and Community Pages",
          "Added a site-wide background used by Bandai to look nicer.",
          "Completely reworked the Community Leaderboard page; now with filterable tournaments, entire Badge lists and more!",
          "Fixed poor footer views on Mobile.",
          "Fixed a ton of wrong Tournament information.",
        ],
      },
      {
        version: "v1.0.14.",
        date: "12/03/2025",
        changes: [
          "Added some new Tournaments.",
          "Added new information for Ikkaku Madarame, Kaname Tōsen, and Kenpachi Zaraki.",
          "Began adding new entries for each Character's Unique Mechanic (If applicable). So far, up to Aizen Sosuke is covered.",
        ],
      },
      {
        version: "v1.0.13.",
        date: "10/03/2025",
        changes: [
          "Cleaned up some redundant data.",
          "Removed White from the Alternates system, and removed the 'Include Alternates' filter (For now).",
          "Added new entries to the Creators Page.",
          "Added new Tournaments to the Community Leaderboard Page.",
        ],
      },
      {
        version: "v1.0.12.",
        date: "09/03/2025",
        changes: [
          "Disabled the PC Notation Scheme for now as we don't know the input map.",
          "Added a new placeholder for missing move animations.",
          "Added stat filters to the Character Roster page.",
          "Added new credits to the Footer.",
          "Added new Tournaments to the Community Leaderboard Page.",
          "Added new animations to a few pages from the newest trailer.",
        ],
      },
      {
        version: "v1.0.11.",
        date: "07/03/2025",
        changes: [
          "Reworked the Movelist component to better show more moves.",
          "Added base moves to every character, along with common combos shared across every character.",
          "Fixed some incorrect controls in the Movelist.",
          "Added official assets for Kaien Shiba.",
          "Edited some Game Term descriptions for better accuracy.",
          "Added Official English Terms for some moves for Ichigo Kurosaki (Shikai), Yoruichi Shihoin, Toshiro Hitsugaya, Rukia Kuchiki, Gin Ichimaru and Ulquiorra Shifar.",
        ],
      },
      {
        version: "v1.0.10.",
        date: "04/03/2025",
        changes: [
          "Added the new `Notation Toggle` system to Character Movelists, allowing you to see the plain terms, Xbox, PlayStation, PC Default Keybinds, and Universal Fighting Game Notaton.",
          "Added a new tournament to the Community Leaderboard.",
          "Added an Ease of Use filter, and added Ease of Use details to the Character Roster cards.",
          "Fixed poor aspect ratios of some Game Term MP4s.",
          "Edited some Game Term descriptions for better accuracy.",
        ],
      },
      {
        version: "v1.0.9.",
        date: "03/03/2025",
        changes: [
          "Added `Character #32 - Kaien Shiba`, along with his moves, animations and temporary assets.",
          "Added the Outfits tab to all Character Details pages for Mobile users.",
          "Added the Challenges and User Interface Breakdown pages to the Game page.",
          "Added official names for Ichigo Kurosaki's Signature, SP1, SP2, Awakened SP1 and SP2, along with new Animation videos.",
          "Added Rukia Kuchiki's Awakened Moveset for Signature, SP1 and SP2, along with new Animation videos.",
          "Added Uryu Ishida's Signature Move, along with a new Animation video.",
          "Added new Animations to Yoruichi Shihōin.",
          "Added new Animations to Gin Ichimaru.",
          "Added new Animations to Tōshiro Hitsugaya.",
          "Added new Animations to Ulquiorra Schifar",
          "Added new Animations to Soi-Fon.",
          "Added new Animations to Shuhei Hisagi.",
          "Added new Animations to Grimmjow Jaegerjaques.",
          "Added new Animations to Aizen Sosuke.",
          "Added new Animations to Genryūsai Shigekuni Yamamoto.",
          "Added SP costs to every SP1 and SP2 move so far.",
        ],
      },
      {
        version: "v1.0.8.",
        date: "28/02/2025",
        changes: [
          "Added the official art for `Coyote Starrk` to his Character Page.",
          "Began preliminary work on the new ELO-based Ranked Leaderboard.",
          "Added a different icon for `shortRange`, `midRange` and `longRange` based off of the new `Training Stage`; we plan on defining `shortRange` as one white grid square, `midRange` as two white grid squares, and `longRange` as anything covering three or more white grid squares.",
        ],
      },
      {
        version: "v1.0.7.",
        date: "27/02/2025",
        changes: [
          "Added the Alternate Character system to the Character Roster.",
          "Added `White` as an Alternate Character.",
          "Removed the `GitHub`, `Discord` and `Reddit` links from the main navigation.",
          "Added these links - and more - to the Footer. These are `GitHub`, `Discord`, `Reddit`, `Japanese Site`, `English Site`, `Steam Store Page`, `Xbox Marketplace Page` and `PlayStation Store Page`.",
          "Updated the Community Ranked Leaderboard.",
          "Reworked the `Creators Page` to accomodate more Creators by using a Tab system.",
          "Added presumptive data for `Aaroniero Aaruruerie` and `Kaien Shiba`.",
          "Fixed a long-standing bug that made it so that Moves with a special character (ō, ū, é, á, etc) could not find their animations, even if they existed.",
        ],
      },
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
    <div className="p-4 lg:p-16 space-y-4 text-black dark:text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/changelog" className="text-teal-600 dark:text-teal-400 hover:underline">
          Changelog
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">C</span>hangelog
      </h2>
      <div>View BLEACH - Resource of Souls&apos; changelog. For BLEACH - Rebirth of Souls&apos; changelog, please refer to official Bandai Namco &amp; Tamsoft press releases.</div>
      <hr className="border-black dark:border-white" />
      <div className="grid grid-cols-1">
        <div className="bg-white dark:bg-black p-4 rounded-xl">
          <h2 className="text-2xl font-bold mb-2 mt-4 md:mt-0">Resource of Souls</h2>
          {resourceOfSoulsChangelog.map((entry, index) => (
            <ChangelogEntry key={index} version={entry.version} date={entry.date} changes={entry.changes} />
          ))}
        </div>
      </div>
    </div>
  );
}
