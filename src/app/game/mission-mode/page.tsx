import { Star } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function MissionMode() {
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
        <Link href="/game/mission-mode" className="text-teal-600 dark:text-teal-400 hover:underline">
          Mission Mode
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">M</span>isson Mode
      </h2>
      <p>
        Mission Mode in BLEACH - Rebirth of Souls is fairly simple - You choose a character, pick a level (Either Level 1, Level 2 or Level 3), pick your Soul Crystals and Spirit Talismans, and then
        face a set number of opponents. The CPU levels of your opponents varies depending on the Level, along with their maximum Konpaku. Your Reishi, Reiatsu, Konpaku, Fighting Spirit, State (Such as
        Base, Awakening or Reawakening) all persist across waves.
      </p>
      <hr className="my-6 border-black dark:border-white" />
      <p>Below you can find guides on how to best clear each mode, with the base roster (Excluding Ichigo Kurosaki (Final Getsugatensho)).</p>
      <div className="grid grid-cols-3 text-center border-2 p-4 rounded-xl bg-white dark:bg-black border-black dark:border-white">
        <div className="border-r-2 border-black dark:border-white pr-4">
          <p className="font-bebasFont text-3xl">Level 1</p>
          <div className="flex flex-row items-center justify-center">
            <Star />
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>Character: Ulquiorra Shifar</p>
            <p>Outfit: Any</p>
            <p>Red Soul Crystal: X</p>
            <p>Blue Soul Crystal: X</p>
            <p>Green Soul Crystal: X</p>
            <p>Yellow Soul Crystal: X</p>
            <p>Spirit Talismans: Optional</p>
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>
              Make liberal use of Breakers and Spiritual Pressure Move 1: Cero; thanks to your Soul Crystals, we&apos;ve made a build where Ulquiorra&apos;s Spiritual Pressure Move 1: Cero actually
              refunds all of the Reishi he would normally spend to fire the move, making it risk-free. Remember that Spiritual Pressure Move 1: Cero deals chip damage through Guard. This is also - at
              the moment - the best way to farm coins in the game.
            </p>
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>Average Time to Clear: X</p>
            <p>Rewards: X</p>
          </div>
        </div>
        <div className="px-4">
          <p className="font-bebasFont text-3xl">Level 2</p>
          <div className="flex flex-row items-center justify-center">
            <Star />
            <Star />
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>Character: X</p>
            <p>Outfit: Any</p>
            <p>Red Soul Crystal: X</p>
            <p>Blue Soul Crystal: X</p>
            <p>Green Soul Crystal: X</p>
            <p>Yellow Soul Crystal: X</p>
            <p>Spirit Talismans: X</p>
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>X</p>
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>Average Time to Clear: X</p>
            <p>Rewards: X</p>
          </div>
        </div>
        <div className="border-l-2 border-black dark:border-white pl-4">
          <p className="font-bebasFont text-3xl">Level 3</p>
          <div className="flex flex-row items-center justify-center">
            <Star />
            <Star />
            <Star />
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>Character: X</p>
            <p>Outfit: Any</p>
            <p>Red Soul Crystal: X</p>
            <p>Blue Soul Crystal: X</p>
            <p>Green Soul Crystal: X</p>
            <p>Yellow Soul Crystal: X</p>
            <p>Spirit Talismans: X</p>
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>X</p>
          </div>
          <hr className="my-4 border-black dark:border-white" />
          <div className="text-left pl-4 italic text-gray-600 dark:text-gray-400">
            <p>Average Time to Clear: X</p>
            <p>Rewards: X</p>
          </div>
        </div>
      </div>
    </div>
  );
}
