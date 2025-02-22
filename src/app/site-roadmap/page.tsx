import Link from "next/link";

export default function SiteRoadmap() {
  return (
    <div className="p-4 lg:p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/site-roadmap" className="text-teal-400 hover:underline">
          Roadmap
        </Link>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">R</span>esource of Souls Roadmap
      </h2>
      <p>Here at Resource of Souls, we have a ton of outstanding work and ideas that we&apos;re looking to implement. These include:</p>
      <ul className="list-disc pl-4 text-xs italic text-gray-400">
        <li>
          Redoing every MP4 file on the site to be in higher quality & framerate on the &apos;Uryu Character Trailer Las Noches Interior&apos; Stage for cleaner views of animations after the game
          launches.
        </li>
        <li>Adding detailed moveset data for every character after the game launches.</li>
        <li>Adding detailed frame data for every character after the game launches.</li>
        <li>Adding detailed damage data for every character after the game launches.</li>
        <li>Adding TLDR guides to each character after the game launches.</li>
        <li>Adding Trivia to each character breaking down the inspiration for their animations and art after the game launches.</li>
        <li>Expanding our Community Hub even further.</li>
        <li>Creating combo guide videos - with input display - after the game launches.</li>
        <li>Adding data for all modes in the game, and every stage, Urahara Shop item, OST entry, modding information, datamining information and more when the game launches.</li>
        <li>Improving our Tournament system to include Tournaments outside of the Rebirth of Souls Reddit Discord.</li>
      </ul>
      <p>If you have any suggestions for features, critiques about the site, or just want to give feedback, please don&apos;t hesitate to get in touch over Discord!</p>
    </div>
  );
}
