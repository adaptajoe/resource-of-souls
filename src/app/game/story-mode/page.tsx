import Link from "next/link";

export default function StoryMode() {
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
        <Link href="/game/story-mode" className="text-teal-400 hover:underline">
          Story Mode
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">S</span>tory Mode
      </h2>
      <p>Information about BLEACH - Rebirth of Souls&apos; Story Mode will be hosted here when the game launches!</p>
    </div>
  );
}
