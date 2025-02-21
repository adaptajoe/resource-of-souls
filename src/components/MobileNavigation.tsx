"use client";
import Link from "next/link";
import { useState, memo } from "react";

const MAIN_LINKS = [
  { href: "/", text: "Home" },
  { href: "/characters", text: "Characters" },
  { href: "/terms", text: "Terms" },
  { href: "/changelog", text: "Changelog" },
  { href: "/offline", text: "Offline" },
  { href: "/community", text: "Community" },
  { href: "/modding", text: "Modding" },
  { href: "/creators", text: "Creators" },
] as const;

const SUB_LINKS = [
  { href: "https://discord.gg/fA69CAE2eP", text: "Discord" },
  { href: "https://github.com/adaptajoe/resource-of-souls", text: "GitHub" },
  { href: "https://www.reddit.com/r/RebirthOfSoulsBleach/", text: "Subreddit" },
] as const;

const NavLink = memo(({ href, text, onClick }: { href: string; text: string; onClick: () => void }) => (
  <Link
    href={href}
    className="text-white hover:border-red-600 hover:bg-red-600 hover:text-black p-4 text-center border-2 rounded-xl flex flex-col items-center transition-colors text-2xl"
    onClick={onClick}
  >
    {text}
  </Link>
));

NavLink.displayName = "NavLink";

const MenuButton = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button onClick={onClick} className="fixed right-4 z-50 p-2 top-2 text-white text-6xl hover:text-red-600 transition-colors" aria-label="Toggle Menu">
    {isOpen ? <span>&#88;</span> : <span>&equiv;</span>}
  </button>
));

MenuButton.displayName = "MenuButton";

export const MobileNavigation = memo(function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="relative h-full lg:hidden">
      <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />

      <div className={`fixed inset-0 p-16 bg-black z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="p-8 h-full border-teal-400 border-2 rounded-xl">
          {isMenuOpen && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {MAIN_LINKS.map((link) => (
                  <NavLink key={link.href} href={link.href} text={link.text} onClick={closeMenu} />
                ))}
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
                {SUB_LINKS.map((link) => (
                  <NavLink key={link.href} href={link.href} text={link.text} onClick={closeMenu} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default MobileNavigation;
