"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { GrGithub, GrReddit } from "react-icons/gr";

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
    <div className="absolute text-teal-400 font-black left-48 top-4 hidden xl:flex items-center">
      <div className="px-2">
        <NavLink href="/characters">Characters</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/terminology">Terms</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/changelog">Changelog</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/offline">Offline</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/community">Community</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/modding">Modding</NavLink>
      </div>
      <div className="px-2">
        <NavLink href="/creators">Creators</NavLink>
      </div>
      <div className="px-2">
        <Link className="text-white" href="https://github.com/adaptajoe/resource-of-souls">
          <div className="bg-gray-800 p-2.5 hover:bg-red-600 rounded-xl">
            <GrGithub size={30} />
          </div>
        </Link>
      </div>
      <div className="px-2">
        <Link className="text-white" href="https://www.reddit.com/r/RebirthOfSoulsBleach/">
          <div className="bg-gray-800 p-2.5 hover:bg-red-600 rounded-xl">
            <GrReddit size={30} />
          </div>
        </Link>
      </div>
      <div className="px-2">
        <Link className="text-white" href="https://discord.gg/fA69CAE2eP">
          <div className="bg-gray-800 p-2.5 hover:bg-red-600 rounded-xl">
            <BiLogoDiscordAlt size={30} />
          </div>
        </Link>
      </div>
    </div>
  );
}
