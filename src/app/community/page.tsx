import Image from "next/image";
import Link from "next/link";
import AnimatedHero from "../components/AnimatedHero";

export default function Community() {
  return (
    <div className="min-h-screen -mx-4">
      <div className="relative w-full">
        <div className="absolute bg-black left-8 top-2/3 -translate-y-1/2 z-10 border-l-2 border-l-red-600 max-w-[90%] md:max-w-[70%]">
          <Link href="https://challonge.com/n1h3cvgn" className="flex flex-col">
            <div className="text-xl lg:text-2xl xl:text-3xl font-black max-w-[400px]">
              <h2 className="text-black bg-red-600 p-2 md:p-4 border-red-600 border-b-2">NEW TOURNAMENT ANNOUNCEMENT</h2>
              <h2 className="p-4">The &quot;Warfare of Souls&quot; Tournament will begin on 29/03/2025!</h2>
            </div>
            <div className="text-white text-lg p-4 pt-0">
              Register <span className="text-teal-400 hover:underline">here</span>!
            </div>
          </Link>
        </div>
        <AnimatedHero src={"/assets/site-assets/community-hero.mp4"} alt={""} filename={""} />
      </div>
      <div className="p-4 md:p-8 bg-black text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between">
          <div className="text-base md:text-xl">
            <h1 className="mb-4 text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">C</span>ommunity Ranked Leaderboard
            </h1>
            <div className="border-r-8 border-teal-400 pr-4">
              <p className="mb-8">
                Test your mettle and earn a unique Badge in our Community Ranked Leaderboard; wager your Badge against others to raise the stakes, or discover previous Tournament results and victors.
              </p>
              <p className="text-sm text-gray-400 italic mb-8">(Badges expire after 6 months with no Challenges).</p>
              <Link className={`px-4 py-2 font-black rounded text-white bg-gray-800 hover:bg-red-600 transition-colors`} href={"/community/ranked-leaderboard"}>
                View the Community Ranked Leaderboard
              </Link>
            </div>
          </div>
          <div className="flex justify-center xl:justify-end">
            <Image
              src={`/assets/site-assets/game-screenshot-1.png`}
              height="200"
              width="150"
              alt={"Bleach - Resource of Souls Gameplay"}
              className="border-2 w-full max-w-[500px] rounded-xl border-gray-400 transition-colors"
            />
          </div>
        </div>
        <hr className="my-8 md:my-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between">
          <div className="flex justify-center xl:justify-start">
            <Image
              src={`/assets/site-assets/game-screenshot-2.png`}
              height="200"
              width="150"
              alt={"Bleach - Resource of Souls Gameplay"}
              className="border-2 w-full max-w-[500px] rounded-xl border-gray-400 transition-colors"
            />
          </div>
          <div className="text-base md:text-xl">
            <h1 className="mb-4 text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">V</span>ersus Image Generator
            </h1>
            <div className="border-r-8 border-teal-400 pr-4">
              <p className="mb-8">Create dynamic Versus Images for Tournaments and social media to help promote your epic duels!</p>
              <Link className={`px-4 py-2 font-black rounded text-white bg-gray-800 hover:bg-red-600 transition-colors`} href={"/community/versus-generator"}>
                Go to the Versus Image Generator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
