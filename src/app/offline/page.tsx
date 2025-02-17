import Link from "next/link";
import { GiAbstract069, GiButterfly, GiFire, GiPathDistance } from "react-icons/gi";

export default function Offline() {
  return (
    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between">
      <div className="container mx-0 md:mx-8 w-full mt-8">
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
          <p className="mt-4 mb-6 col-span-2 md:col-span-1">
            Research all of the Offline Modes like Story Mode, Side Stories, Secret Stories, Mission Mode, and Custom Offline Matches for BLEACH - Rebirth of Souls here.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="mr-4 mb-4 md:mb-0">
            <Link
              href="/offline/story-mode"
              className="rounded-xl flex flex-col items-center border-2 border-red-600 bg-red-600 hover:bg-black hover:border-red-600 hover:text-red-600 transition-colors p-2"
            >
              <GiButterfly size={80} />
              <h2 className="text-3xl mt-4">Story Mode</h2>
            </Link>
          </div>
          <div className="mr-0 md:mr-4 mb-4 md:mb-0">
            <Link
              href="/offline/side-stories"
              className="rounded-xl flex flex-col items-center border-2 border-red-600 bg-red-600 hover:bg-black hover:border-red-600 hover:text-red-600 transition-colors p-2"
            >
              <GiPathDistance size={80} />
              <h2 className="text-3xl mt-4">Side Stories</h2>
            </Link>
          </div>
          <div className="mr-4 mb-4 md:mb-0">
            <Link
              href="/offline/secret-stories"
              className="rounded-xl flex flex-col items-center border-2 border-red-600 bg-red-600 hover:bg-black hover:border-red-600 hover:text-red-600 transition-colors p-2"
            >
              <GiAbstract069 size={80} />
              <h2 className="text-3xl mt-4">Secret Stories</h2>
            </Link>
          </div>
          <div className="mr-0 md:mr-4 mb-4 md:mb-0">
            <Link
              href="/offline/mission-mode"
              className="rounded-xl flex flex-col items-center border-2 border-red-600 bg-red-600 hover:bg-black hover:border-red-600 hover:text-red-600 transition-colors p-2"
            >
              <GiFire size={80} />
              <h2 className="text-3xl mt-4">Mission Mode</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
