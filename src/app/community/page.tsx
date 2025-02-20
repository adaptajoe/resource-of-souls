import AnimatedHeroWrapper from "@/components/AnimatedHeroWrapper";
import Image from "next/image";
import Link from "next/link";

export default function Community() {
  return (
    <div className="text-white">
      <div className="flex flex-row items-center w-full py-1 text-base justify-center px-4 md:text-2xl border-b-2 border-b-gray-400 font-bebasFont">
        <p className="border-l-8 border-l-red-600 border-r-8 border-r-teal-400 px-4">NEW TOURNAMENT ANNOUNCEMENT - The &quot;Warfare of Souls&quot; Tournament will begin on 29/03/2025!</p>
      </div>
      <div className="border-b-2 border-gray-400">
        <AnimatedHeroWrapper src={"/assets/site-assets/community-hero.mp4"} alt={""} filename={""} />
      </div>
      <div className="p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">C</span>ommunity Ranked Leaderboard
            </h2>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4 px-6">
              <p>
                Test your mettle and earn a unique Badge in our Community Ranked Leaderboard; wager your Badge against others to raise the stakes, or discover previous Tournament results and victors.
              </p>
              <p className="flex flex-col">You alone shall stand at the top. Claim that intolerable vacuum, and stand upon the heavens!</p>
              <p className="text-sm text-gray-400 italic mb-8">(Badges expire after 6 months with no Challenges).</p>
              <p>
                <Link className="px-4 py-2 w-fit font-bebasFont text-xl rounded bg-gray-700 hover:bg-red-600 hover:text-black transition-colors" href={"/community/ranked-leaderboard"}>
                  View the Community Ranked Leaderboard
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-self-end">
            <Image
              src={`/assets/character-banner/aizen-sosuke-banner.png`}
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
          <div className="flex justify-self-start">
            <Image
              src={`/assets/site-assets/game-screenshot-1.png`}
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
              <span className="text-red-600">G</span>enerate Thrilling Versus Images
            </h2>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4 px-6">
              <p>Create dynamic Versus Images for Tournaments and social media to help promote your epic duels!</p>
              <p className="px-4 py-2 w-fit font-bebasFont text-xl rounded bg-gray-700">Coming Soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
