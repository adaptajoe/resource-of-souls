import Link from "next/link";

export default function Modding() {
  return (
    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between">
      <div className="container ml-8 w-full mt-8">
        <nav className="flex flex-row">
          <Link href="/" className="text-teal-400 hover:underline">
            Home
          </Link>
          <p className="px-2">/</p>
          <Link href="/modding" className="text-teal-400 hover:underline">
            Modding
          </Link>
        </nav>
        <h1 className="text-3xl font-bold">Modding</h1>
        <div className="grid grid-cols-2">
          <p className="mt-4 mb-6 col-span-1">Learn about modding BLEACH - Rebirth of Souls (If it&pos;s possible lmao).</p>
        </div>
        <div className="space-x-4 justify-center items-center">Modding information will be added here.</div>
      </div>
    </div>
  );
}
