import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-white">
      <div className="flex bg-black flex-col items-center w-full py-2 text-base justify-center px-4 md:text-xl border-b-2 border-b-gray-400 font-bebasFont">
        <p className="border-l-8 border-l-red-600 border-r-8 border-r-teal-400 text-center px-4 mb-2">
          We have multiple Tournaments being ran on the 28th / 29th March for
          <span className="text-blue-500"> PS4 / PS5</span>, <span className="text-lime-400">Xbox</span> and <span className="text-red-600">PC</span> - Sign up on the{" "}
          <Link className="text-teal-400 hover:underline" href="/community/community-leaderboard">
            COMMUNITY LEADERBOARD PAGE
          </Link>
          ..!
        </p>
        <hr className="p-1 my-1 w-full" />
        <p className="border-l-8 border-l-red-600 border-r-8 border-r-teal-400 text-center px-4">
          All Characters now have 100% accurate movelists & ease of use ratings! Some aspects like damage, frame and tagging values are still missing, so please bear with us.
        </p>
      </div>
      <div className="border-b-2 border-gray-400">
        {/* <AnimatedHeroWrapper src={"/assets/site-assets/site-hero.mp4"} alt={""} /> */}
        <Image
          src="/assets/site-assets/game-hero-1.png"
          height={300}
          width={300}
          alt=""
          className="max-h-[600px] w-full object-cover rounded-t-lg object-top-center"
          style={{
            objectFit: "cover",
            objectPosition: "50% 20%",
            aspectRatio: "2/1",
          }}
        />
      </div>
      <div className="p-4 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">W</span>elcome to BLEACH - Resource of Souls; the definitive unofficial <span className="text-red-600 underline underline-offset-4">FAN</span> Wiki for
              Bleach - Rebirth of Souls.
            </h2>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4 px-6">
              <p>Learn about the characters in the game, plan tournaments, view frame data and movelists, research game terms and view the game&apos;s changelog.</p>
              <p className="flex flex-col">
                Awaken the blade within you and reverse your fate in BLEACH Rebirth of Souls! Engage in thrilling battles with powerful sword abilities and characters from this legendary anime
                franchise.
              </p>
              <p>
                <Link className="px-4 py-2 w-fit font-bebasFont text-xl rounded bg-gray-700 hover:bg-red-600 hover:text-black transition-colors" href={"/characters"}>
                  View the Character Roster
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-self-end pr-6">
            <Image
              src={`/assets/character-banner/ichigo-kurosaki-banner.png`}
              height="300"
              width="300"
              alt={""}
              className="max-h-[300px] my-6 lg:mt-0 ml-4 w-fit object-cover object-top-center border-2 border-gray-400 rounded-xl"
              style={{
                objectFit: "cover",
                objectPosition: "50% 40%",
                aspectRatio: "2/1",
              }}
              loading="lazy"
            />
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex justify-self-start pr-6">
            <Image
              src={`/assets/site-assets/game-screenshot-2.png`}
              height="300"
              width="300"
              alt={""}
              className="max-h-[300px] my-6 lg:mt-0 ml-4 w-[600px] object-cover object-top-center border-2 border-gray-400 rounded-xl"
              style={{
                objectFit: "cover",
                objectPosition: "50% 40%",
                aspectRatio: "2/1",
              }}
              loading="lazy"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">A</span> Home for Community, a Home for Clashes.
            </h2>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4 px-6">
              <p>
                Engage in thrilling community tournaments, challenge presets, and challenge yourself to rank on the community leaderboads! Gain exclusive, permanent clout awards for all to see, and
                possibly even earn prizes (Only in specific Tournaments)..!
              </p>
              <p>
                <Link className="px-4 py-2 w-fit font-bebasFont text-xl rounded bg-gray-700 hover:bg-red-600 hover:text-black transition-colors" href={"/community"}>
                  View the Community Hub
                </Link>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">B</span>uilt for Offline Players, Online Players and Competitive Players.
            </h2>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4 px-6">
              <p>
                Don&apos;t fancy all of that &apos;online&apos; malarkey? No need to fear. Resource of Souls has you covered! Discover guides for the Story Mode, Mission Mode and find out what
                unlockables you may want to strive for!
              </p>
              <p>
                <Link className="px-4 py-2 w-fit font-bebasFont text-xl rounded bg-gray-700 hover:bg-red-600 hover:text-black transition-colors" href={"/game"}>
                  View the Game Guides
                </Link>
              </p>
              <hr className="my-6" />
              <p className="flex flex-col">Similarly, for esports and tournament hosts, find easy-to-refer-to sheets for each character, term and archetype in the game!</p>
              <p>
                <Link className="px-4 py-2 w-fit font-bebasFont text-xl rounded bg-gray-700 hover:bg-red-600 hover:text-black transition-colors" href={"/glossary"}>
                  View the Glossary
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-self-end pr-6">
            <Image
              src={`/assets/site-assets/game-screenshot-3.png`}
              height="300"
              width="300"
              alt={""}
              className="max-h-[300px] my-6 lg:mt-0 ml-4 w-[600px] object-cover object-top-center border-2 border-gray-400 rounded-xl"
              style={{
                objectFit: "cover",
                objectPosition: "50% 40%",
                aspectRatio: "2/1",
              }}
              loading="lazy"
            />
          </div>
        </div>
        <hr className="lg:mb-16 my-6" />
        <div className="grid grid-cols-1 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl xl:text-5xl mb-4">
              <span className="text-red-600">A</span>d free. <span className="text-teal-400 underline">Forever</span>.
            </h2>
            <p>
              BLEACH - Resource of Souls is a passion-project from dedicated long-time BLEACH fans; we&apos;ll <span className="text-red-600">never</span> paywall content, add advertisements, or ask
              for donations, and promise to open-source all of our code <span className="text-teal-400 underline">forever</span>.
            </p>
            <div className="flex flex-row items-baseline justify-center">
              <h2 className="text-2xl xl:text-3xl text-red-400 mt-4">
                - @jojicus<span className="text-white">,</span>
              </h2>{" "}
              <h2 className="text-2xl xl:text-3xl text-fuchsia-400 mt-4 ml-2">@john30688</h2>
              <h2 className="text-2xl xl:text-3xl text-white ml-2 mt-4">&amp; the rest of the the Resource of Souls Team.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
