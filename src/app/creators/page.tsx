import Link from "next/link";
import Image from "next/image";

export default function Creators() {
  return (
    <div className="p-4 lg:p-16 space-y-4 text-white">
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
          <div className="mr-0 lg:mx-4">
            <h3 className="text-3xl">
              <span className="text-red-600">W</span>eebsGuild
            </h3>
            <p className="italic text-gray-400">
              &quot;Introducing the Weebs Guild channel! The home of the popular Bleach Boys podcast, their channel and Discord server is home to many loyal BLEACH fans and they aim to create a fun
              and enduring BLEACH - Rebirth of Souls community. With planned tournaments, special game modes, and more! If you&apos;re looking for a place filled with BLEACH fans, this is it. Every
              Sunday there&apos;s a podcast on their YouTube channel, which is filled with BLEACH content and much more!&quot;
            </p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/wNIXW6zGJ0w?start=1"
            height={250}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full max-h-[800px] p-2 border-2 border-black hover:border-red-600"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="mx-0 lg:mx-4">
            <h3 className="text-3xl">
              <span className="text-red-600">T</span>heRealQuinnJr
            </h3>
            <p className="italic text-gray-400">
              &quot;I&apos;m an anime YouTube channel that covers the newest anime games. You&apos;ll see some gameplay but a lot of my content is also tips, guides, and discussions! I&apos;ll be
              hosting streams and some tournaments once the game releases and dropping a guide on all the characters! I pride myself on the goal of trying to build. Strong community with my
              supporters. All weebs welcome.&quot;
            </p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/ey5ltavjSX4?si=_FwIj985DalTwxNm"
            height={250}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full max-h-[800px] p-2 border-2 border-black hover:border-red-600"
          />
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 lg-space-y-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-400 pb-4 pr-0 lg:pr-4 lg:pb-0 space-y-4 lg-space-y-0">
          <div className="mr-0 lg:mx-4">
            <h3 className="text-3xl">
              <span className="text-red-600">L</span>ee The Warlord Gaming
            </h3>
            <p className="italic text-gray-400">
              &quot;It&apos;s ya boi, Lee The Warlord! I&apos;m a YouTuber/Streamer that covers Games, Anime, Manga, and whatever else comes to mind! Currently Rebirth of Souls DOMINATES my channel. I
              also do Let&apos;s Build streams where we build different Lego sets, and have a Let&apos;s Read series where right now we&apos;re reading Kagurabachi (Streams on Saturday and Sunday)!
              You can also join the Militia and talk with us DIRECTLY on Discord, so make sure you enlist by subscribing & joining now!&quot;
            </p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/PXZ4EM-PYfU?si=m0A0jIOYbKxI4kMQ"
            height={250}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full max-h-[800px] p-2 border-2 border-black hover:border-red-600"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="mx-0 lg:mx-4">
            <h3 className="text-3xl">
              <span className="text-red-600">C</span>ontourxci
            </h3>
            <p className="italic text-gray-400">
              &quot;Introducing the &apos;Rebirth Of Souls&apos; Server made by Contourxci. A place that builds the bridge between competitive and casual player bases. The home for those who love
              bleach. They offer clan battles, tournaments, fun events, and matchmaking for every platform. If you&apos;re looking for more people to play Bleach Rebirth Of Souls with then feel free
              to join.&quot;
            </p>
          </div>
          <Image
            src="/assets/site-assets/ros-header.png"
            alt=""
            height={250}
            width={250}
            title="YouTube video player"
            className="w-full max-h-[800px] p-2 border-2 border-black hover:border-red-600"
          />
        </div>
      </div>
    </div>
  );
}
