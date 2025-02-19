"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, memo } from "react";

const NavLink = memo(({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link className={`px-4 py-4 font-black rounded-xl ${isActive ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-red-600"} transition-colors`} href={href}>
      {children}
    </Link>
  );
});

NavLink.displayName = "NavLink";

export function DesktopNavigation() {
  const renderNavLink = useCallback(
    (href: string, label: string) => (
      <div className="px-2">
        <NavLink href={href}>{label}</NavLink>
      </div>
    ),
    []
  );

  return (
    <div className="absolute text-teal-400 font-black left-48 top-4 hidden xl:flex items-center">
      {renderNavLink("/characters", "Characters")}
      {renderNavLink("/terminology", "Terms")}
      {renderNavLink("/changelog", "Changelog")}
      {renderNavLink("/offline", "Offline")}
      {renderNavLink("/community", "Community")}
      {renderNavLink("/modding", "Modding")}
      {renderNavLink("/creators", "Creators")}
      <div className="px-2">
        <Link className="text-white" href="https://github.com/adaptajoe/resource-of-souls">
          <div className="bg-gray-800 p-2.5 hover:bg-red-600 rounded-xl">GitHub</div>
        </Link>
      </div>
      <div className="px-2">
        <Link className="text-white" href="https://www.reddit.com/r/RebirthOfSoulsBleach/">
          <div className="bg-gray-800 p-2.5 hover:bg-red-600 rounded-xl">Reddit</div>
        </Link>
      </div>
      <div className="px-2">
        <Link className="text-white" href="https://discord.gg/fA69CAE2eP">
          <div className="bg-gray-800 p-2.5 hover:bg-red-600 rounded-xl">Discord</div>
        </Link>
      </div>
    </div>
  );
}
