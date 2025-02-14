import Link from "next/link";

export default function Side() {
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
          <p className="px-2">/</p>
          <Link href="/offline/side" className="text-teal-400 hover:underline">
            Side Story Mode
          </Link>
        </nav>
        <div>
          <p>Side Story Mode information goes here.</p>
        </div>
      </div>
    </div>
  );
}
