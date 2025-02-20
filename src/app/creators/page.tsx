import Link from "next/link";

export default function Creators() {
  return (
    <div className="p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/creators" className="text-teal-400 hover:underline">
          Creators
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">C</span>reators
      </h2>
      <p>
        Find high-quality BLEACH - Rebirth of Souls content creators and other affiliated<span className="text-red-600">*</span> programs and sites here!
      </p>
      <p className="text-sm italic text-gray-400 mb-6">
        (<span className="text-red-600">*</span>Affiliated content creators, programs and sites are not paid for affiliation, nor have they paid to be listed.)
      </p>
      <hr className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 lg-space-y-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-400 pb-4 pr-0 lg:pr-4 lg:pb-0 space-y-4 lg-space-y-0">
          <div className="mr-0 lg:mr-4">
            <h3 className="text-3xl">
              <span className="text-red-600">W</span>eebsGuild
            </h3>
            <p>
              Introducing the Weebs Guild channel! The home of the popular Bleach Boys podcast, their channel and Discord server is home to many loyal BLEACH fans and they aim to create a fun and
              enduring BLEACH - Rebirth of Souls community. With planned tournaments, special game modes, and more! If you&apos;re looking for a place filled with BLEACH fans, this is it. Every Sunday
              there&apos;s a podcast on their YouTube channel, which is filled with BLEACH content and much more!
            </p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/wNIXW6zGJ0w?start=1"
            height={250}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full max-h-[800px]"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="mx-0 lg:mx-4">
            <h3 className="text-3xl">
              <span className="text-red-600">T</span>o be announced!
            </h3>
            <p>
              Know of a cool content creator that could be featured here? Let <span className="text-amber-400">@jojicus</span> know!
            </p>
          </div>
          <p>Also send one of their videos!</p>
        </div>
      </div>
    </div>
  );
}
