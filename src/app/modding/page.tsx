import Link from "next/link";

export default function Modding() {
  return (
    <div className="p-4 lg:p-16 space-y-4 text-black dark:text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/modding" className="text-teal-600 dark:text-teal-400 hover:underline">
          Modding
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">M</span>odding
      </h2>
      <p>BLEACH - Rebirth of Souls has a remarkably lively and invested modding community, creating tools, OST mods, character mods and outfit mods! Learn how to make your own today!</p>
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 italic">
        BLEACH - Resource of Souls is not responsible or liable for any mod created using information hosted here. We cannot update outdated mods. We do not take mod requests. We do not host mods. We
        are not responsible for any mods that appear on Gamebanana. We are not affiliated with Gamebanana. This information is purely for educational and archival purposes and does not - and will not
        - recommend mods, support piracy, game cracking or cheats of any form, or support copyright infringement of any sort. BLEACH - Resource of Souls retains the right to refuse modding information
        and will take down this information with immediate compliance and with no questions asked if Bandai Namco, Tamsoft, or their affiliated copyright holder/s request.
      </p>
      <p>
        To find mods, take a look over at{" "}
        <Link href="#" className="text-teal-600 dark:text-teal-400 hover:underline">
          Gamebanana
        </Link>
        !
      </p>
      <hr className="my-6 border-black dark:border-white" />
      <p>Coming soon!</p>
    </div>
  );
}
