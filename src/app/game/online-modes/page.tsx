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
        <Link href="/game/online-modes" className="text-teal-600 dark:text-teal-400 hover:underline">
          Online Modes
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">O</span>nline Modes
      </h2>
      <p>BLEACH - Rebirth of Souls&apos; Online Modes are changing as indicated by recent leaks - Please bear with us as we collect that information!</p>
      <hr className="my-6 border-black dark:border-white" />
      <p>Coming soon!</p>
    </div>
  );
}
