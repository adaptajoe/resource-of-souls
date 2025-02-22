import Link from "next/link";

export default function Game() {
  return (
    <div className="p-4 lg:p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/game" className="text-teal-400 hover:underline">
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
      <div className="grid grid-cols-1 lg:grid-cols-4 text-center font-bebasFont md:text-3xl text-2xl">
        <Link href="/game/story-mode" className="p-8  hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl m-2">
          Story Mode
        </Link>
        <Link href="/game/side-stories-mode" className="p-8 hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl m-2">
          Side Stories Mode
        </Link>
        <Link href="/game/secret-stories-mode" className="p-8 hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl m-2">
          Secret Stories Mode
        </Link>
        <Link href="/game/mission-mode" className="p-8 hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl m-2">
          Mission Mode
        </Link>
        <Link href="/game/stages" className="p-8 hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl m-2">
          Stages
        </Link>
        <Link href="/game/urahara-shop" className="p-8 hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl m-2">
          Urahara Shop
        </Link>
      </div>
    </div>
  );
}
