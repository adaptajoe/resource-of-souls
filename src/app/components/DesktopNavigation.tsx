"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link className={`px-4 py-4 font-black rounded-xl ${isActive ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-red-600"} transition-colors`} href={href}>
      {children}
    </Link>
  );
}

export function DesktopNavigation() {
  return (
    <div className="absolute text-teal-400 font-black left-48 top-7 hidden xl:flex items-center">
      <div className="pr-2">
        <NavLink href="/">Home</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/characters">Characters</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/terminology">Terminology</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/changelog">Changelog</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/community">Community Hub</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/github">GitHub</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="https://www.reddit.com/r/RebirthOfSoulsBleach/">Reddit</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="https://discord.gg/fA69CAE2eP">Discord</NavLink>
      </div>
    </div>
  );
}
