"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Creator = {
  name: string;
  description: string;
  videoSrc?: string;
  imageSrc?: string;
};

const creators: Creator[] = [
  {
    name: "WeebsGuild",
    description: `Introducing the Weebs Guild channel! The home of the popular Bleach Boys podcast, their channel and Discord server is home to many loyal BLEACH fans and they aim to create a fun
    and enduring BLEACH - Rebirth of Souls community. With planned tournaments, special game modes, and more! If you're looking for a place filled with BLEACH fans, this is it. Every
    Sunday there's a podcast on their YouTube channel, which is filled with BLEACH content and much more!`,
    videoSrc: "https://www.youtube.com/embed/wNIXW6zGJ0w?start=1",
  },
  {
    name: "TheRealQuinnJr",
    description: `I'm an anime YouTube channel that covers the newest anime games. You'll see some gameplay but a lot of my content is also tips, guides, and discussions! I'll be
    hosting streams and some tournaments once the game releases and dropping a guide on

 all the characters! I pride myself on the goal of trying to build. Strong community with my
    supporters. All weebs welcome.`,
    videoSrc: "https://www.youtube.com/embed/ey5ltavjSX4?si=_FwIj985DalTwxNm",
  },
  {
    name: "Lee The Warlord Gaming",
    description: `It's ya boi, Lee The Warlord! I'm a YouTuber/Streamer that covers Games, Anime, Manga, and whatever else comes to mind! Currently Rebirth of Souls DOMINATES my channel. I
    also do Let's Build streams where we build different Lego sets, and have a Let's Read series where right now we're reading Kagurabachi (Streams

 on Saturday and Sunday)!
    You can also join the Militia and talk with us DIRECTLY on Discord, so make sure you enlist by subscribing & joining now!`,
    videoSrc: "https://www.youtube.com/embed/PXZ4EM-PYfU?si=m0A0jIOYbKxI4kMQ",
  },
  {
    name: "Contourxci",
    description: `Introducing the 'Rebirth Of Souls' Server made by Contourxci. A place that builds the bridge between competitive and casual player bases. The home for those who love
    bleach. They offer clan battles, tournaments, fun events, and matchmaking for every platform. If you're looking for more people to play Bleach Rebirth Of Souls with then feel free
    to join.`,
    imageSrc: "/assets/site-assets/ros-header.png",
  },
];

export default function Creators() {
  const [selectedCreator, setSelectedCreator] = useState<Creator>(creators[0]);

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

      <div className="flex flex-col sm:flex-row overflow-x-scroll mb-6">
        {creators.map((creator) => (
          <button
            key={creator.name}
            onClick={() => setSelectedCreator(creator)}
            className={`px-4 py-2 m-1 rounded font-bebasFont text-xl ${selectedCreator.name === creator.name ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            {creator.name}
          </button>
        ))}
      </div>
      <hr className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 lg-space-y-0">
        <div className="mr-0 lg:mx-4">
          <h3 className="text-3xl">
            <span className="text-red-600">{selectedCreator.name[0]}</span>
            {selectedCreator.name.slice(1)}
          </h3>
          <p className="italic text-gray-400">&quot;{selectedCreator.description}&quot;</p>
        </div>
        {selectedCreator.videoSrc ? (
          <iframe
            src={selectedCreator.videoSrc}
            height={350}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full max-h-[800px] p-2 border-2 border-gray-400 hover:border-red-600"
          />
        ) : selectedCreator.imageSrc ? (
          <Image src={selectedCreator.imageSrc} alt="" height={350} width={250} title="Image" className="w-full max-h-[800px] p-2 border-2 border-gray-400 hover:border-red-600" />
        ) : null}
      </div>
    </div>
  );
}
