import Link from "next/link";

export default function Modding() {
  return (
    <div className="p-4 lg:p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/modding" className="text-teal-400 hover:underline">
          Modding
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">M</span>odding
      </h2>
      <p>
        Modding information will be added here. BLEACH - Resource of Souls is not responsible for any mod created using information hosted here. This information is purely for educational and archival
        purposes and does not - and will not - recommend mods, support piracy, game cracking or cheats of any form, or support copyright infringement of any sort.
      </p>
    </div>
  );
}
