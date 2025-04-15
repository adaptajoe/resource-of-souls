import { BookOpenText, Broadcast, Coins, CompassRose, GameController, GraduationCap, MapPinArea, Medal } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Game() {
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
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">G</span>ame
      </h2>
      <p>
        Research all of the Game aspects, like the different Stages, Urahara Shop Items, Modes like Story Mode, Side Stories, Secret Stories, Mission Mode, and Custom Offline Matches for BLEACH -
        Rebirth of Souls here.
      </p>
      <hr className="my-6 border-black dark:border-white" />
      <div className="grid grid-cols-2 lg:grid-cols-4 text-center font-bebasFont md:text-3xl text-2xl">
        <Link
          href="/game/story-mode"
          className="p-8 flex flex-col items-center hover:bg-red-600 hover:text-black hover:dark:bg-red-600 transition-colors bg-white dark:bg-black border-2 border-black dark:border-white hover:dark:border-red-600 hover:border-red-600 rounded-xl m-2"
        >
          <BookOpenText size={60} className="mb-4" />
          Main Story
        </Link>
        <Link
          href="/game/secret-stories-mode"
          className="p-8 flex flex-col items-center hover:bg-red-600 hover:text-black hover:dark:bg-red-600 transition-colors bg-white dark:bg-black border-2 border-black dark:border-white hover:dark:border-red-600 hover:border-red-600 rounded-xl m-2"
        >
          <CompassRose size={60} className="mb-4" />
          Secret Stories
        </Link>
        <Link
          href="/game/mission-mode"
          className="p-8 flex flex-col items-center hover:bg-red-600 hover:text-black hover:dark:bg-red-600 transition-colors bg-white dark:bg-black border-2 border-black dark:border-white hover:dark:border-red-600 hover:border-red-600 rounded-xl m-2"
        >
          <Medal size={60} className="mb-4" />
          Mission Mode
        </Link>
        <Link
          href="/game/online-modes"
          className="p-8 flex flex-col items-center hover:bg-red-600 hover:text-black hover:dark:bg-red-600 transition-colors bg-white dark:bg-black border-2 border-black dark:border-white hover:dark:border-red-600 hover:border-red-600 rounded-xl m-2"
        >
          <Broadcast size={60} className="mb-4" />
          Online
        </Link>
        <Link
          href="/game/stages"
          className="p-8 flex flex-col items-center hover:bg-red-600 hover:text-black hover:dark:bg-red-600 transition-colors bg-white dark:bg-black border-2 border-black dark:border-white hover:dark:border-red-600 hover:border-red-600 rounded-xl m-2"
        >
          <MapPinArea size={60} className="mb-4" />
          Stages
        </Link>
        <Link
          href="/game/urahara-shop"
          className="p-8 flex flex-col items-center hover:bg-red-600 hover:text-black hover:dark:bg-red-600 transition-colors bg-white dark:bg-black border-2 border-black dark:border-white hover:dark:border-red-600 hover:border-red-600 rounded-xl m-2"
        >
          <Coins size={60} className="mb-4" />
          Urahara Shop
        </Link>
        <Link
          href="/game/tutorial"
          className="p-8 flex flex-col items-center hover:bg-red-600 hover:text-black hover:dark:bg-red-600 transition-colors bg-white dark:bg-black border-2 border-black dark:border-white hover:dark:border-red-600 hover:border-red-600 rounded-xl m-2"
        >
          <GraduationCap size={60} className="mb-4" />
          Tutorial
        </Link>
        <Link
          href="/game/user-interface-breakdown"
          className="p-8 flex flex-col items-center hover:bg-red-600 hover:text-black hover:dark:bg-red-600 transition-colors bg-white dark:bg-black border-2 border-black dark:border-white hover:dark:border-red-600 hover:border-red-600 rounded-xl m-2"
        >
          <GameController size={60} className="mb-4" />
          User Interface Breakdown
        </Link>
      </div>
    </div>
  );
}
