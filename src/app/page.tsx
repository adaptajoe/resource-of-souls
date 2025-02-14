import Image from "next/image";
import AnimatedHero from "./components/AnimatedHero";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen -mx-4">
      <div className="relative w-full">
        <div className="absolute bg-black p-4 left-8 top-3/4 -translate-y-1/2 z-10 border-x-2 border-l-red-600 border-r-teal-400 max-w-[90%] md:max-w-[70%]">
          <div className="flex flex-col">
            <h1 className="text-white text-sm md:text-xl lg:text-2xl xl:text-4xl font-black">
              <span className="text-red-600">B</span>LEACH - Resource of Souls has launched!
            </h1>
            <p className="text-white text-xs md:text-sm xl:text-lg">Please bear with us as the game releases! A lot of data may be mistaken or missing.</p>
          </div>
        </div>
        <AnimatedHero src={"/assets/site-assets/site-hero.mp4"} alt={""} filename={""} />
      </div>
      <div className="p-4 md:p-8 bg-black text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between">
          <div className="text-base md:text-xl">
            <h2 className="mb-4 text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">W</span>elcome to BLEACH - Resource of Souls; the definitive unofficial Wiki for Bleach - Rebirth of Souls.
            </h2>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4">
              <p>Learn about the characters in the game, plan tournaments, view frame data and movelists, research game terms and view the game&apos;s changelog.</p>
              <p className="flex flex-col">
                Awaken the blade within you and reverse your fate in BLEACH Rebirth of Souls! Engage in thrilling battles with powerful sword abilities and characters from this legendary anime
                franchise.
                <Link className={`px-4 py-2 w-fit mt-4 font-black rounded text-white bg-gray-800 hover:bg-red-600 transition-colors`} href={"/characters"}>
                  View the Character Roster
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-center xl:justify-end">
            <Image
              src={`/assets/character-banner/ichigo-kurosaki-banner.png`}
              height="300"
              width="300"
              alt={""}
              className="max-h-[300px] w-fit object-cover object-top-center border-2 border-gray-400 rounded-xl"
              style={{
                objectFit: "cover",
                objectPosition: "50% 40%",
                aspectRatio: "2/1",
              }}
            />
          </div>
        </div>
        <hr className="my-8 md:my-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between">
          <div className="flex justify-center xl:justify-start order-2 md:order-1">
            <Image
              src={`/assets/site-assets/game-screenshot-2.png`}
              height="200"
              width="150"
              alt={"Bleach - Resource of Souls Gameplay"}
              className="border-2 w-full max-w-[500px] rounded-xl border-gray-400 transition-colors"
            />
          </div>
          <div className="text-base md:text-xl order-1 md:order-2">
            <h1 className="mb-4 text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">A</span> Home for Community, a Home for Clashes.
            </h1>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4">
              <p>
                BLEACH - Rebirth of Souls is a fighting game developed by Tamsoft, and published by Bandai Namco, and is releasing on March 21st 2025. The game focuses on 1v1 combat, and is unique for
                its&apos; dramatic comeback victories. The game is available on PS4, PS5, Xbox and Steam.
              </p>
              <p className="flex flex-col">
                Engage in thrilling community tournaments, challenge presets, and challenge yourself to rank on the community leaderboads! Gain exclusive, permanent clout awards for all to see, and
                possibly even earn prizes (Only in specific Tournaments)..!
                <Link className={`px-4 py-2 w-fit mt-4 font-black rounded text-white bg-gray-800 hover:bg-red-600 transition-colors`} href={"/community"}>
                  View the BLEACH - Resource of Souls Community Hub
                </Link>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-8 md:my-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between">
          <div className="text-base md:text-xl">
            <h1 className="mb-4 text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">B</span>uilt for Offline Players, Online Players and Competitive Players.
            </h1>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4">
              <p className="flex flex-col">
                Don&apos;t fancy all of that &apos;online&apos; malarkey? No need to fear. Resource of Souls has you covered! Discover guides for the Story Mode, Mission Mode and find out what
                unlockables you may want to strive for!
                <Link className={`px-4 py-2 w-fit mt-4 font-black rounded text-white bg-gray-800 hover:bg-red-600 transition-colors`} href={"/offline"}>
                  View the Offline Mode Guides
                </Link>
              </p>
              <hr />
              <p className="flex flex-col">
                Similarly, for esports and tournament hosts, find easy-to-refer-to sheets for each character, term and archetype in the game!
                <Link className={`px-4 py-2 w-fit mt-4 font-black rounded text-white bg-gray-800 hover:bg-red-600 transition-colors`} href={"/terminology"}>
                  View the Terminology Index for BLEACH - Rebirth of Souls
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-center xl:justify-end">
            <Image
              src={`/assets/site-assets/game-screenshot-3.png`}
              height="200"
              width="150"
              alt={"Bleach - Resource of Souls Gameplay"}
              className="border-2 w-full max-w-[500px] rounded-xl border-gray-400 transition-colors"
            />
          </div>
        </div>
        <hr className="my-8 md:my-10" />
        <div className="text-base md:text-xl">
          <div className="border-x-8 border-l-red-600 border-r-teal-400 px-4 text-center">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-black mb-4">
              <span className="text-red-600">A</span>d free. <span className="text-teal-400 underline">Forever</span>.
            </h2>
            <p>
              BLEACH - Resource of Souls is a passion-project from dedicated long-time BLEACH fans; we&apos;ll <span className="text-red-600">never</span> paywall content, add advertisements, or ask
              for donations, and promise to open-source all of our code <span className="text-teal-400 underline">forever</span>.
            </p>
            <h3 className="text-amber-400 font-black mt-4">- @jojicus</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
