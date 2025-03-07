import AnimatedHeroWrapper from "@/components/AnimatedHeroWrapper";
import Image from "next/image";
import Link from "next/link";

export default function Community() {
  return (
    <div className="text-white">
      <div className="flex flex-col items-center w-full py-2 text-base bg-black justify-center px-4 md:text-xl border-b-2 border-b-gray-400 font-bebasFont">
        <p className="border-l-8 border-l-red-600 border-r-8 border-r-teal-400 text-center px-4 mb-2">
          GAME LAUNCH TOURNAMENTS - We have multiple Tournaments being ran on the 28th / 29th March for both
          <span className="text-red-600"> PS4 / PS5</span> and <span className="text-red-600">PC</span>..!
        </p>
        <hr className="p-1 my-1 w-full" />
        <p className="border-l-8 border-l-red-600 border-r-8 border-r-teal-400 text-center px-4">
          SIGN UP ON THE{" "}
          <Link className="text-teal-400 hover:underline" href="/community/community-leaderboard">
            COMMUNITY LEADERBOARD PAGE
          </Link>
          ..!
        </p>
      </div>
      <div className="border-b-2 border-gray-400">
        <AnimatedHeroWrapper src={"/assets/site-assets/community-hero.mp4"} alt={""} />
      </div>
      <div className="p-4 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
              <span className="text-red-600">C</span>ommunity Leaderboard
            </h2>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4 px-6">
              <p>Test your mettle and earn a unique Badge in our Community Leaderboard; wager your Badge against others to raise the stakes, or discover previous Tournament results and victors.</p>
              <p className="flex flex-col">You alone shall stand at the top. Claim that intolerable vacuum, and stand upon the heavens!</p>
              <p>
                <Link className="px-4 py-2 w-fit font-bebasFont text-xl rounded bg-gray-700 hover:bg-red-600 hover:text-black transition-colors" href={"/community/community-leaderboard"}>
                  View the Community Leaderboard
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-self-end pr-6">
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
          <div className="flex justify-self-start pr-6">
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
              <span className="text-red-600">R</span>anked Leaderboard
            </h2>
            <div className="border-r-8 border-teal-400 pr-4 space-y-4 px-6">
              <p className="mb-4">Participate in our ELO-based Leaderboard, built for the most competitive players! Arise to your heavenly position of Reiō!</p>
              <p className="px-4 py-2 w-fit font-bebasFont text-xl rounded bg-gray-700 hover:bg-red-600 hover:text-black transition-colors">Coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
