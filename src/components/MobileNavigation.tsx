"use client";
import Link from "next/link";
import { useState, useMemo, useCallback } from "react";

export function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainLinks = useMemo(
    () => [
      { href: "/", text: "Home" },
      { href: "/characters", text: "Characters" },
      { href: "/terminology", text: "Terms" },
      { href: "/changelog", text: "Changelog" },
      { href: "/offline", text: "Offline" },
      { href: "/community", text: "Community" },
      { href: "/modding", text: "Modding" },
      { href: "/creators", text: "Creators" },
    ],
    []
  );

  const subLinks = useMemo(
    () => [
      {
        href: "https://discord.gg/fA69CAE2eP",
        text: "Discord",
      },
      { href: "https://github.com/adaptajoe/resource-of-souls", text: "GitHub" },
      { href: "https://www.reddit.com/r/RebirthOfSoulsBleach/", text: "Subreddit" },
    ],
    []
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="relative h-full lg:hidden">
      {/* Menu Button */}
      <button onClick={toggleMenu} className="fixed right-4 z-50 p-2 top-2 text-white text-6xl hover:text-red-600 transition-colors" aria-label="Toggle Menu">
        {isMenuOpen ? <span>&#88;</span> : <span>&equiv;</span>}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 p-16 bg-black z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="p-8 h-full border-teal-400 border-2 rounded-xl">
          {/* Main Links Grid */}
          {isMenuOpen && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:border-red-600 hover:bg-red-600 hover:text-black p-4 text-center border-2 rounded-xl flex flex-col items-center transition-colors text-2xl"
                  onClick={closeMenu}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}

          {/* Sub Links Grid */}
          {isMenuOpen && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
              {subLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:border-red-600 hover:bg-red-600 hover:text-black p-4 text-center border-2 rounded-xl flex flex-col items-center h-full justify-center transition-colors text-2xl"
                  onClick={closeMenu}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
