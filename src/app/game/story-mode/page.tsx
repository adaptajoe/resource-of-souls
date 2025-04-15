import Link from "next/link";

export default function StoryMode() {
  return (
    <div className="p-4 lg:p-16 space-y-4 text-black dark:text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/game" className="text-teal-600 dark:text-teal-400 hover:underline">
          Game
        </Link>
        <p>/</p>
        <Link href="/game/story-mode" className="text-teal-600 dark:text-teal-400 hover:underline">
          Main Story
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">M</span>ain Story
      </h2>
      <p>
        BLEACH - Rebirth of Souls features an extensive Story Mode that&apos;ll run you around 40 hours if you don&apos;t skip cutscenes. Sit back, relax, grab a drink and your controller (Or
        keyboard), and fall in love with the world of BLEACH.
      </p>
      <p className="text-gray-600 dark:text-gray-400 italic text-xs">Note, you do get extra rewards by playing on Extreme difficulty, but there is no content locked behind Extreme difficulty.</p>
      <p className="text-gray-600 dark:text-gray-400 italic text-xs">
        Clearing Main Story&apos;s final node unlocks Ichigo Kurosaki (Final Getsugatensho) as a playable character. There is no way to work around this requirement.
      </p>
      <hr className="my-6 border-black dark:border-white" />
      <p>Coming soon!</p>
    </div>
  );
}
