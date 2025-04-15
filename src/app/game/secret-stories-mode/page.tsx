import Link from "next/link";

export default function SecretStoriesMode() {
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
        <Link href="/game/secret-stories-mode" className="text-teal-600 dark:text-teal-400 hover:underline">
          Secret Stories
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">S</span>ecret Stories
      </h2>
      <p>
        Secret Stories delve further into the established lore of BLEACH, with flashbacks and scenes that were missing from Main Story, but also with entirely new, canon scenes exclusive to BLEACH -
        Rebirth of Souls that were co-authored by Tite Kubo! You can learn about all of them, and their unlock requirements, here.
      </p>
      <p className="text-xs italic text-gray-600 dark:text-gray-400">
        Note that certain Secret Stories spoil some events of the Thousand Year Blood War arc, Can&apos;t Fear . There will be appropriate warnings beforehand.
      </p>
      <p className="text-xs italic text-gray-600 dark:text-gray-400">The only Secret Story that has questionable canonicity is Sosuke Aizen&apos;s Secret Story Episode 4.</p>
      <hr className="my-6 border-black dark:border-white" />
      <p>Coming soon!</p>
    </div>
  );
}
