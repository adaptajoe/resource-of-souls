import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { MobileNavigation } from "@/components/MobileNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resource of Souls",
  description: "The definitive, fan-made Wiki for BLEACH Rebirth of Souls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="bg-black w-full h-[125px] border-b-2 border-gray-400 py-2 px-12 z-50 hidden lg:flex flex-row items-center space-x-2 text-xs lg:text-sm xl:text-xl font-bebasFont text-white">
          {/* At below LG, change to mobile nav. */}
          <Link href="/">
            <Image
              src={`/assets/site-assets/site-logo.png`}
              height="200"
              width="150"
              alt={"Bleach - Resource of Souls Logo"}
              className="border-2 border-black hover:border-red-600 transition-colors mr-4 min-w-[150px]"
              priority
            />
          </Link>
          <Link href="/characters" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Characters
          </Link>
          <Link href="/game" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Game
          </Link>
          <Link href="/glossary" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Glossary
          </Link>
          <Link href="/community" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Community
          </Link>
          <Link href="/modding" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Modding
          </Link>
          <Link href="/creators" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Creators
          </Link>
          <Link href="/changelog" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Changelog
          </Link>
          <Link href="https://github.com/adaptajoe/resource-of-souls" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            GitHub
          </Link>
          <Link href="https://www.reddit.com/r/RebirthOfSoulsBleach/" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Reddit
          </Link>
          <Link href="https://discord.gg/fA69CAE2eP" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            Discord
          </Link>
        </div>
        <div className="bg-black w-full h-[125px] border-b-2 border-gray-400 py-2 px-4 md:px-12 z-50 flex lg:hidden flex-row items-center space-x-2 text-xs lg:text-sm xl:text-xl font-bebasFont text-white justify-between md:justify-normal">
          <Link href="/">
            <Image
              src={`/assets/site-assets/site-logo.png`}
              height="200"
              width="150"
              alt={"Bleach - Resource of Souls Logo"}
              className="border-2 border-black hover:border-red-600 transition-colors mr-4 min-w-[150px]"
              priority
            />
          </Link>
          <div>
            <MobileNavigation />
          </div>
        </div>
        <div>{children}</div>
        <footer className="px-12 py-3 border-t-2 border-gray-400 grid grid-cols-1 lg:grid-cols-2 text-gray-500 italic text-xs justify-center lg:justify-between">
          <div>
            <p className="text-xl text-gray-400">Site Version: v1.0.1.</p>
            <p className="mb-4 md:mb-0">
              BLEACH - Resource of Souls is developed, designed, managed and updated by Discord user <span className="text-amber-400 font-black">@jojicus</span>.
            </p>
            <p>
              MP4s and other game data collection provided by Discord user <span className="text-fuchsia-400 font-black">@john30688</span>.
            </p>
          </div>
          <div>
            <p className="my-4 md:mt-0">Content is available under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) unless otherwise noted.</p>
            <p>
              All original characters, artwork, and story elements are owned by ©[ SHUEISHA ( 株式会社集英社 ) ], ©[ VIZ Media ( VIZ Media, LLC. )], ©[ Bandai Namco (
              株式会社バンダイナムコエンターテインメント ) ], ©[ Tamsoft Corporation ( 株式会社タムソフト ) ] and ©[ Tite Kubo ( 久保 帯人 ) ]. All other characters, assets, game screenshots,
              animations, settings, game data, videos, elements, name &quot;BLEACH - Resource of Souls&quot; and edited &quot;BLEACH - Resource of Souls&quot; Logo belong to their respective copyright
              holders. This work is not intended for commercial use, does not - and will not - run advertising or donation programs, and is considered fair use under copyright law.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
