import { FC } from "react";
import Link from "next/link";

const Creators: FC = () => {
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
            <Link className="px-4 py-2 w-fit my-4 font-black rounded text-white bg-gray-800 hover:bg-red-600 transition-colors" href="/terminology">
              Navigate to the BLEACH - Rebirth of Souls Press Kit
            </Link>
          </div>
        </div>
        <hr />
        <div className="space-x-4 justify-center items-center mt-4">
          <div>
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <div className="space-y-4 pr-4 xl:border-r border-gray-400 grid grid-cols-1 xl:grid-cols-2">
                <div>
                  <h2 className="text-4xl">
                    <span className="text-red-600">W</span>eebs Guild
                  </h2>
                  <p className="pr-4">
                    Introducing the Weebs Guild channel! The home of the popular Bleach Boys podcast, their channel and Discord server is home to many loyal BLEACH fans and they aim to create a fun
                    and enduring BLEACH - Rebirth of Souls community. With planned tournaments, special game modes, and more! If you&apos;re looking for a place filled with BLEACH fans, this is it.
                    Every Sunday there&apos;s a podcast on their YouTube channel, which is filled with BLEACH content and much more!
                  </p>
                </div>
                <div>
                  <iframe
                    src="https://www.youtube.com/embed/wNIXW6zGJ0w?start=1"
                    height={250}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full max-h-[800px]"
                  />
                </div>
              </div>
              {/* <div className="space-y-4 pl-4 border-l border-gray-400 grid grid-cols-2">
                <div>
                  <h2 className="text-4xl">
                    <span className="text-red-600">S</span>lot 2
                  </h2>
                  <p className="pr-4">A</p>
                </div>
                <div>
                  <iframe
                    src="https://www.youtube.com/embed/wNIXW6zGJ0w?start=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full max-h-[800px]"
                  />
                </div>
              </div> */}
            </div>
            <hr className="my-4" />
            {/* <div className="grid grid-cols-2">
              <div className="space-y-4 pr-4 border-r border-gray-400 grid grid-cols-2">
                <div>
                  <h2 className="text-4xl">
                    <span className="text-red-600">S</span>lot 3
                  </h2>
                  <p className="pr-4">A</p>
                </div>
                <div>
                  <iframe
                    src="https://www.youtube.com/embed/wNIXW6zGJ0w?start=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full max-h-[800px]"
                  />
                </div>
              </div>
              <div className="space-y-4 pl-4 border-l border-gray-400 grid grid-cols-2">
                <div>
                  <h2 className="text-4xl">
                    <span className="text-red-600">S</span>lot 4
                  </h2>
                  <p className="pr-4">A</p>
                </div>
                <div>
                  <iframe
                    src="https://www.youtube.com/embed/wNIXW6zGJ0w?start=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full max-h-[800px]"
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creators;
