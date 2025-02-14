import Link from "next/link";
import { GiAbstract069, GiButterfly, GiFire, GiPathDistance } from "react-icons/gi";

export default function Offline() {
  return (
    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between">
      <div className="container ml-8 w-full mt-8">
        <nav className="flex flex-row">
          <Link href="/" className="text-teal-400 hover:underline">
            Home
          </Link>
          <p className="px-2">/</p>
          <Link href="/offline" className="text-teal-400 hover:underline">
            Offline Modes
          </Link>
        </nav>
        <h1 className="text-3xl font-bold">Offline Modes</h1>
        <div className="grid grid-cols-2">
          <p className="mt-4 mb-6 col-span-1">
            Research all of the Offline Modes like Story Mode, Side Stories, Secret Stories, Mission Mode, and Custom Offline Matches for BLEACH - Rebirth of Souls here.
          </p>
        </div>
        <div className="grid grid-cols-4 space-x-4 justify-center items-center">
          <Link href="/offline/story-mode">
            <div className="border-4 border-red-600 hover:border-white p-2">
              <div className="bg-red-600 border-black border p-10 transition-colors text-black flex flex-col items-center">
                <GiButterfly size={100} className="mb-4" />
                <h2 className="text-4xl">Story Mode</h2>
              </div>
            </div>
          </Link>
          <Link href="/offline/side-stories">
            <div className="border-4 border-teal-400 hover:border-white p-2">
              <div className="bg-teal-400 border-black border p-10 transition-colors text-black flex flex-col items-center">
                <GiPathDistance size={100} className="mb-4" />
                <h2 className="text-4xl">Side Story Mode</h2>
              </div>
            </div>
          </Link>
          <Link href="/offline/secret-stories">
            <div className="border-4 border-amber-400 hover:border-white p-2">
              <div className="bg-amber-400 border-black border p-10 transition-colors text-black flex flex-col items-center">
                <GiAbstract069 size={100} className="mb-4" />
                <h2 className="text-4xl">Secret Story Mode</h2>
              </div>
            </div>
          </Link>
          <Link href="/offline/mission-mode">
            <div className="border-4 border-purple-400 hover:border-white p-2">
              <div className="bg-purple-400 border-black border p-10 transition-colors text-black flex flex-col items-center">
                <GiFire size={100} className="mb-4" />
                <h2 className="text-4xl">Mission Mode</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
