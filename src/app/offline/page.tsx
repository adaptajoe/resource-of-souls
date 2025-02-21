import Link from "next/link";

export default function Offline() {
  return (
    <div className="p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/offline" className="text-teal-400 hover:underline">
          Offline
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">O</span>ffline
      </h2>
      <p>Research all of the Offline Modes like Story Mode, Side Stories, Secret Stories, Mission Mode, and Custom Offline Matches for BLEACH - Rebirth of Souls here.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 space-x-0 lg:space-x-4">
        <Link href="/offline/story-mode" className="p-8 text-center font-bebasFont text-3xl hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl">
          Story Mode
        </Link>
        <Link href="/offline/side-stories-mode" className="p-8 text-center font-bebasFont text-3xl hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl">
          Side Stories Mode
        </Link>
        <Link href="/offline/secret-stories-mode" className="p-8 text-center font-bebasFont text-3xl hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl">
          Secret Stories Mode
        </Link>
        <Link href="/offline/mission-mode" className="p-8 text-center font-bebasFont text-3xl hover:bg-red-600 hover:text-black transition-colors border-2 border-red-600 rounded-xl">
          Mission Mode
        </Link>
      </div>
    </div>
  );
}
