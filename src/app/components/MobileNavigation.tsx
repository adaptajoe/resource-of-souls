"use client";
import Link from "next/link";
import { useState } from "react";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { GrGithub, GrReddit } from "react-icons/gr";
import { TbBaselineDensityMedium, TbBookFilled, TbBrandYoutubeFilled, TbHomeFilled, TbListNumbers, TbMoonFilled, TbSettingsFilled, TbUserFilled, TbWifiOff, TbX } from "react-icons/tb";

export function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainLinks = [
    { href: "/", text: "Home", icon: <TbHomeFilled className="mb-2" size={40} /> },
    { href: "/characters", text: "Characters", icon: <TbUserFilled className="mb-2" size={40} /> },
    { href: "/terminology", text: "Terms", icon: <TbBookFilled className="mb-2" size={40} /> },
    { href: "/changelog", text: "Changelog", icon: <TbListNumbers className="mb-2" size={40} /> },
    { href: "/offline", text: "Offline", icon: <TbWifiOff className="mb-2" size={40} /> },
    { href: "/community", text: "Community", icon: <TbMoonFilled className="mb-2" size={40} /> },
    { href: "/modding", text: "Modding", icon: <TbSettingsFilled className="mb-2" size={40} /> },
    { href: "/creators", text: "Creators", icon: <TbBrandYoutubeFilled className="mb-2" size={40} /> },
  ];

  const subLinks = [
    {
      href: "https://discord.gg/fA69CAE2eP",
      text: "Discord",
      icon: <BiLogoDiscordAlt className="mb-2" size={40} />,
    },
    { href: "https://github.com/adaptajoe/resource-of-souls", text: "GitHub", icon: <GrGithub className="mb-2" size={40} /> },
    { href: "https://www.reddit.com/r/RebirthOfSoulsBleach/", text: "Subreddit", icon: <GrReddit className="mb-2" size={40} /> },
  ];

  return (
    <div className="relative h-full xl:hidden">
      {/* Menu Button */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="fixed right-4 z-50 p-2 top-2 text-white hover:text-red-600 transition-colors" aria-label="Toggle Menu">
        {isMenuOpen ? <TbX size={30} /> : <TbBaselineDensityMedium size={30} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 p-16 bg-black z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="p-8 h-full border-teal-400 border rounded-xl">
          {/* Main Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:border-red-600 hover:text-red-600 p-4 text-center border rounded-xl flex flex-col items-center transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>

          {/* Sub Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {[...subLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:border-red-600 hover:text-red-600 p-4 text-center border rounded-xl flex flex-col items-center h-full justify-center transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
