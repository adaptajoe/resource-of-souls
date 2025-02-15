import Link from "next/link";

export default function Creators() {
  return (
    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between">
      <div className="container ml-8 w-full mt-8">
        <nav className="flex flex-row">
          <Link href="/" className="text-teal-400 hover:underline">
            Home
          </Link>
          <p className="px-2">/</p>
          <Link href="/creators" className="text-teal-400 hover:underline">
            Creators
          </Link>
        </nav>
        <h1 className="text-3xl font-bold">Creators</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 pr-8">
          <div>
            <p className="mt-4">
              Find high-quality BLEACH - Rebirth of Souls content creators and other affiliated<span className="text-red-600">*</span> programs and sites here!
            </p>
            <p className="text-sm italic text-gray-400 mb-6">
              (<span className="text-red-600">*</span>Affiliated content creators, programs and sites are not paid for affiliation, nor have they paid to be listed.)
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Link className={`px-4 py-2 w-fit my-4 font-black rounded text-white bg-gray-800 hover:bg-red-600 transition-colors`} href={"/terminology"}>
              Navigate to the BLEACH - Rebirth of Souls Press Kit
            </Link>
          </div>
        </div>
        <hr />
        <div className="space-x-4 justify-center items-center mt-4">Creators will be added here.</div>
      </div>
    </div>
  );
}
