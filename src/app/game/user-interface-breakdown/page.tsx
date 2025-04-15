import Image from "next/image";
import Link from "next/link";

export default function UserInterfaceBreakdown() {
  return (
    <div className="p-4 lg:p-16 space-y-4 text-black dark:text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/game" className="text-teal-600 dark:text-teal-400 hover:underline">
          Game
        </Link>
        <p>/</p>
        <Link href="/game/user-interface-breakdown" className="text-teal-600 dark:text-teal-400 hover:underline">
          User Interface Breakdown
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">U</span>ser Interface Breakdown
      </h2>
      <p>
        Below, you can see the breakdown of every aspect of the User Interface. We have replicated this as best we can, but do be aware some areas may look slightly different in-game. For Mobile
        devices, you may want to pinch &amp; zoom to see each part!
      </p>
      <hr className="my-6 border-black dark:border-white" />
      <Image src={`/assets/site-assets/user-interface-guide.png`} alt="" height={300} width={300} className="w-full rounded-xl" />
    </div>
  );
}
