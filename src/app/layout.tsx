import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { MobileNavigation } from "./components/MobileNavigation";

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
      <body>
        <div className="bg-black fixed w-full h-10 border-b border-gray-400 p-6 pb-28 z-50">
          <div className="relative">
            <Link href="/">
              <Image
                src={`/assets/site-assets/site-logo.png`}
                height="200"
                width="150"
                alt={"Bleach - Resource of Souls Logo"}
                className="fixed top-3 left-12 border-2 border-black hover:border-red-600 transition-colors"
                loading="lazy"
              />
            </Link>
            <DesktopNavigation />
            <MobileNavigation />
          </div>
        </div>
        <div className="bg-black h-full w-screen p-4 pt-32">
          <main>
            <div>{children}</div>
          </main>
        </div>
        <footer className="text-white px-12 py-6 border-t-2 border-gray-400">
          <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0">
            <div className="flex flex-col text-gray-400 text-xs text-center md:text-left">
              <p className="mb-4 md:mb-0">
                BLEACH - Resource of Souls is developed, designed, managed and updated by Discord user <span className="text-amber-400 font-black">@jojicus</span>.
              </p>
              <p>
                MP4s and other game data collection provided by Discord user <span className="text-fuchsia-400 font-black">@john30688</span>.
              </p>
            </div>
            <div className="flex flex-col text-center md:text-right text-gray-400 text-xs">
              <p className="mb-4 md:mb-0">Content is available under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0) unless otherwise noted.</p>
              <p>
                All original characters, artwork, and story elements are owned by ©[ SHUEISHA ( 株式会社集英社 ) ], ©[ VIZ Media ( VIZ Media, LLC. )], ©[ Bandai Namco (
                株式会社バンダイナムコエンターテインメント ) ], ©[ Tamsoft Corporation ( 株式会社タムソフト ) ] and ©[ Tite Kubo ( 久保 帯人 ) ]. All other characters, assets, game screenshots,
                animations, settings, game data, videos, elements, name &quot;BLEACH - Resource of Souls&quot; and edited &quot;BLEACH - Resource of Souls&quot; Logo belong to their respective
                copyright holders. This work is not intended for commercial use, does not - and will not - run advertising or donation programs, and is considered fair use under copyright law.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
