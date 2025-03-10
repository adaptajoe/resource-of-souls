import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { MobileNavigation } from "@/components/MobileNavigation";
import { DiscordLogo, GithubLogo, RedditLogo, SteamLogo, XCircle, GameController, GlobeHemisphereEast, GlobeHemisphereWest } from "@phosphor-icons/react/dist/ssr";

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
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}>
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
          <Link href="/faq" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 py-3 rounded-xl">
            FAQ
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
        <footer className="px-4 md:px-12 py-3 bg-black border-t-2 border-gray-400 grid grid-cols-1 lg:grid-cols-2 text-gray-500 italic text-xs justify-center lg:justify-between">
          <div>
            <Link href="/changelog" className="text-xl text-teal-400 hover:underline">
              Site Version: v1.0.13.
            </Link>
            <div className="flex flex-row mt-4">
              <Link href="https://github.com/adaptajoe/resource-of-souls" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 mr-4 rounded-xl">
                <GithubLogo size={30} color="white" />
              </Link>
              <Link href="https://discord.gg/fA69CAE2eP" className="bg-gray-700 hover:bg-purple-800 hover:text-black transition-colors p-4 mr-4 rounded-xl">
                <DiscordLogo size={30} color="white" />
              </Link>
              <Link href="https://www.reddit.com/r/RebirthOfSoulsBleach/" className="bg-gray-700 hover:bg-orange-700 hover:text-black transition-colors p-4 mr-4 rounded-xl">
                <RedditLogo size={30} color="white" />
              </Link>
              <Link href="https://bleach-ros.bn-ent.net/" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 mr-4 rounded-xl">
                <GlobeHemisphereEast size={30} color="white" />
              </Link>
              <Link href="https://en.bandainamcoent.eu/bleach/bleach-rebirth-of-souls" className="bg-gray-700 hover:bg-red-600 hover:text-black transition-colors p-4 mr-4 rounded-xl">
                <GlobeHemisphereWest size={30} color="white" />
              </Link>
            </div>{" "}
            <div className="flex flex-row">
              <Link href="https://store.steampowered.com/app/1689620/BLEACH_Rebirth_of_Souls/" className="bg-gray-700 hover:bg-gray-500  hover:text-black transition-colors p-4 my-4 mr-4 rounded-xl">
                <SteamLogo size={30} color="white" />
              </Link>
              <Link
                href="https://www.xbox.com/en-GB/games/store/bleach-rebirth-of-souls/9PJK7WPHWM8L"
                className="bg-gray-700 hover:bg-lime-600  hover:text-black transition-colors p-4 my-4 mr-4 rounded-xl"
              >
                <XCircle size={30} color="white" />
              </Link>
              <Link href="https://store.playstation.com/en-us/concept/10001710/" className="bg-gray-700 hover:bg-blue-800  hover:text-black transition-colors p-4 my-4 mr-4 rounded-xl">
                <GameController size={30} color="white" />
              </Link>
            </div>
            <p className="mb-4 md:mb-0">The above storefront links for Steam, PlayStation and Xbox are NOT affiliate links.</p>
            <p className="mb-4 md:mb-0">
              BLEACH - Resource of Souls is developed, designed, managed and updated by Discord user <span className="text-red-400 font-black">@jojicus</span>.
            </p>
            <p>
              MP4s and other game data collection provided by Discord user <span className="text-fuchsia-400 font-black">@john30688</span>.
            </p>
            <p>
              Support and team management assistance by Discord user <span className="text-amber-400 font-black">@schoolofmyth</span>.
            </p>
          </div>
          <div>
            <p className="my-4 md:mt-0">Content is available under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) unless otherwise noted.</p>
            <p>
              All original characters, artwork, and story elements are owned by ©SHUEISHA ( 株式会社集英社 ), ©VIZ Media ( VIZ Media, LLC. ), ©Bandai Namco ( 株式会社バンダイナムコエンターテインメント
              ), ©Tamsoft Corporation ( 株式会社タムソフト ), ©TV Tokyo ( 株式会社テレビ東京 ), ©Dentsu Group Inc. ( 株式会社電通グループ ), ©Pierrot Co., Ltd. ( 株式会社ぴえろ ) and ©Tite Kubo ( 久保
              帯人 ).
            </p>
            <p className="mt-4">
              All other characters, assets, game screenshots, animations, settings, game data, videos, elements, name &quot;BLEACH - Resource of Souls&quot; and edited &quot;BLEACH - Resource of
              Souls&quot; Logo, and all content producted for &quot;BLEACH - Resource of Souls&quot; belong to their respective copyright holders as listed above. This work is not intended for
              commercial use, does not - and will not - run advertising or donation programs, and is considered fair use under copyright law. &quot;BLEACH - Resource of Souls&quot; is NOT affiliated
              with ANY of the above copyright holders.
            </p>
            <p className="mt-4">
              ©2024 Sony Interactive Entertainment Inc. &quot;PlayStation Family Mark&quot;, &quot;PlayStation&quot;, &quot;PlayStation&quot;, &quot;PlayStation Plus&quot;, &quot;PS5 logo&quot;,
              &quot;PS5&quot;, &quot;PS4 logo&quot;, &quot;PS4&quot;, &quot;PlayStation Circle&quot;, &quot;PlayStation Square&quot;, &quot;PlayStation Triangle&quot;, &quot;PlayStation Cross&quot;,
              &quot;DualShock 4&quot; and &quot;DualSense 5&quot; are trademarks and/or registered trademarks of Sony Interactive Entertainment Inc in the United States and/or other countries.
            </p>
            <p className="mt-4">
              ©2024 Microsoft Corporation &quot;Xbox&quot;, &quot;Xbox Series&quot;, &quot;Xbox Series X|S&quot;, &quot;Xbox A&quot;, &quot;Xbox B&quot;, &quot;Xbox Y&quot;, &quot;Xbox X&quot;,
              &quot;Xbox Controller&quot; and &quot;Xbox Game Pass&quot; are trademarks and/or registered trademarks of Microsoft Corporation in the United States and/or other countries.
            </p>
            <p className="mt-4">
              ©2024 Valve Corporation. &quot;Steam&quot;, &quot;Steam Deck&quot; and &quot;Steam Logo&quot; are trademarks and/or registered trademarks of Valve Corporation in the United States and/or
              other countries.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
