"use client";
import Link from "next/link";
import { useState } from "react";

export default function FAQ() {
  const [roadmapIsOpen, setRoadmapIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [assetRightsIsOpen, setAssetRightsIsOpen] = useState(false);
  const [donationsIsOpen, setDonationsIsOpen] = useState(false);
  const [bugReportingIsOpen, setBugReportingIsOpen] = useState(false);
  const [specsIsOpen, setSpecsIsOpen] = useState(false);

  return (
    <div className="p-4 lg:p-16 space-y-4 text-black dark:text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/FAQ" className="text-teal-600 dark:text-teal-400 hover:underline">
          Frequently Asked Questions
        </Link>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">F</span>requently Asked Questions
      </h2>
      <div className="bg-white dark:bg-black p-6 rounded-xl">
        <hr className="mb-6 border-black dark:border-white" />
        <button className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setRoadmapIsOpen((prevState) => !prevState)}>
          <span>What&apos;s next for Resource of Souls?</span>
          {roadmapIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        {!roadmapIsOpen ? null : (
          <div className="space-y-4 pl-4 pt-4">
            <p>Here at Resource of Souls, we have a ton of outstanding work and ideas that we&apos;re looking to implement. These include:</p>
            <ul className="list-disc pl-4 text-sm italic text-gray-400">
              <li>
                Redoing every MP4 file on the site to be in higher quality & framerate on the &apos;Uryu Character Trailer Las Noches Interior&apos; Stage for cleaner views of animations after the
                game launches.
              </li>
              <li>Adding detailed moveset data for every character after the game launches.</li>
              <li>Adding detailed frame data for every character after the game launches.</li>
              <li>Adding detailed damage data for every character after the game launches.</li>
              <li>Adding Trivia to each character breaking down the inspiration for their animations and art after the game launches.</li>
              <li>Expanding our Community Hub even further.</li>
              <li>Creating combo guide videos - with input display - after the game launches.</li>
              <li>Adding data for all modes in the game, and every stage, Urahara Shop item, OST entry, modding information, datamining information and more when the game launches.</li>
              <li>Improving our Tournament system to include Tournaments outside of the Rebirth of Souls Reddit Discord.</li>
            </ul>
            <p>If you have any suggestions for features, critiques about the site, or just want to give feedback, please don&apos;t hesitate to get in touch over Discord!</p>
          </div>
        )}
        <hr className="my-6 border-black dark:border-white" />
        <button className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setContactIsOpen((prevState) => !prevState)}>
          <span>How can I get in touch?</span>
          {contactIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        {!contactIsOpen ? null : (
          <div className="space-y-4 pl-4 pt-4">
            <p>If you want to get in touch, message one of us on Discord (Our Discord usernames are in the footer at the bottom of the page).</p>
            <p>Alternatively, get in touch over GitHub!</p>
            <p>
              Finally, for Bandai Namco &amp; Tamsoft, you can email <span className="text-teal-600 dark:text-teal-400 font-bold">resourceofsouls@gmail.com</span> - Any emails not from these two
              parties will be ignored and blocked.
            </p>
          </div>
        )}
        <hr className="my-6 border-black dark:border-white" />
        <button className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setAssetRightsIsOpen((prevState) => !prevState)}>
          <span>Can I use Resource of Souls&apos; information and assets for my thing?</span>
          {assetRightsIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        {!assetRightsIsOpen ? null : (
          <div className="pl-4 pt-4">
            <p>
              Yes. <span className="text-red-600 font-bold">The only thing we request you don&apos;t do is clone the whole site and reupload it somewhere</span>. All MP4s, data, images and so forth
              are free to use without express permission. We will also be looking to supply an API just for the character data once that is complete.
            </p>
          </div>
        )}
        <hr className="my-6 border-black dark:border-white" />
        <button className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setDonationsIsOpen((prevState) => !prevState)}>
          <span>How can I donate? Why ad-free? Why no paywalling?</span>
          {donationsIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        {!donationsIsOpen ? null : (
          <div className="pl-4 pt-4">
            <p>
              <span className="text-red-600 font-bold">No.</span> You <span className="text-red-600 font-bold">cannot</span> donate to us. As much as we appreciate the sentiment, BLEACH - Resource of
              Souls is - and always was - intended to be a pure passion project from a group of lifelong BLEACH fans. We do this to give back to a community that we call home, and to a franchise that
              saved some of our lives. <span className="text-teal-600 dark:text-teal-400 font-bold">We will not - and do not - take a single penny from - or for - BLEACH - Resource of Souls</span>.
              Instead of looking to donate to us, why not buy a copy of the game for a friend? Tell them it&apos;s from us!
            </p>
          </div>
        )}
        <hr className="my-6 border-black dark:border-white" />
        <button className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setBugReportingIsOpen((prevState) => !prevState)}>
          <span>I found a bug / some info is wrong / an animation is missing / I have a suggestion!</span>
          {bugReportingIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        {!bugReportingIsOpen ? null : (
          <div className="pl-4 pt-4">
            <p>If you&apos;ve found something wrong, that&apos;s great! You can report it by getting in touch via Discord, or on GitHub by raising a new Issue.</p>
          </div>
        )}
        <hr className="my-6 border-black dark:border-white" />
        <button className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setSpecsIsOpen((prevState) => !prevState)}>
          <span>What are the recommended PC requirements &amp; game specs for BLEACH - Rebirth of Souls?</span>
          {specsIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        {!specsIsOpen ? null : (
          <div className="pl-4 pt-4">
            <div>BLEACH - Resource of Souls is available on PlayStation, Xbox and Steam, and has the following System Requirements:</div>
            <div className="mt-4">
              <hr className="my-6 border-black dark:border-white" />
              <h3 className="text-xl mb-6">PC Requirements</h3>
              <table className="border-2 border-gray-400 text-sm bg-white dark:bg-black">
                <thead className="border border-gray-400">
                  <tr>
                    <th scope="col" className="border-r border-gray-400 p-1">
                      &nbsp;
                    </th>
                    <th scope="col" className="border-r bg-white text-black border-gray-400 p-1">
                      Minimum Settings (30FPS)
                    </th>
                    <th scope="col" className="border-r bg-white text-black border-gray-400 p-1">
                      Minimum Settings (60FPS)
                    </th>
                    <th scope="col" className="border-r bg-white text-black border-gray-400 p-1">
                      Recommended Settings (60FPS)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Mode
                    </th>
                    <th className="border-r border-gray-400 p-1">Performance Mode</th>
                    <th className="border-r border-gray-400 p-1">Performance Mode</th>
                    <th className="border-r border-gray-400 p-1">Balanced Mode</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      CPU
                    </th>
                    <th className="border-r border-gray-400 p-1">AMD Ryzen 3 3100, 3.40 GHz / Intel Core i3-8100, 3.60 GHz</th>
                    <th className="border-r border-gray-400 p-1">AMD Ryzen 5 3600 / Intel Core i7-9700k</th>
                    <th className="border-r border-gray-400 p-1">AMD Ryzen 7 5800K / Intel Core i7-12700KF</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      RAM
                    </th>
                    <th className="border-r border-gray-400 p-1">8GB</th>
                    <th className="border-r border-gray-400 p-1">16GB</th>
                    <th className="border-r border-gray-400 p-1">16GB</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      GPU
                    </th>
                    <th className="border-r border-gray-400 p-1">AMD Radeon RX 590 / Intel Arc A580 / Nvidia GeForce GTX 980</th>
                    <th className="border-r border-gray-400 p-1">AMD Radeon VII / Nvidia GeForce RTX 2070</th>
                    <th className="border-r border-gray-400 p-1">AMD Radeon RX 6700 XT / Nvidia GeForce RTX 2080 Ti</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Storage
                    </th>
                    <th className="border-r border-gray-400 p-1">HDD 75GB or more</th>
                    <th className="border-r border-gray-400 p-1">HDD 75GB or more</th>
                    <th className="border-r border-gray-400 p-1">SSD 75GB or more</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      DirectX
                    </th>
                    <th className="border-r border-gray-400 p-1">Version 12</th>
                    <th className="border-r border-gray-400 p-1">Version 12</th>
                    <th className="border-r border-gray-400 p-1">Version 12</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      OS
                    </th>
                    <th className="border-r border-gray-400 p-1">Windows 10 / 11</th>
                    <th className="border-r border-gray-400 p-1">Windows 10 / 11</th>
                    <th className="border-r border-gray-400 p-1">Windows 10 / 11</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Notes
                    </th>
                    <th className="border-r border-gray-400 p-1">-</th>
                    <th className="border-r border-gray-400 p-1">-</th>
                    <th className="border-r border-gray-400 p-1">
                      If you plan to play in &quot;Quality Mode&quot; at 60 fps, an AMD Ryzen 7 7700X / Intel Core i7-12700KF CPU and an AMD Radeon RX 7800 XT / Nvidia GeForce RTX 3070 Ti GPU is
                      recommended
                    </th>
                  </tr>
                </tbody>
              </table>
              <hr className="my-6 border-black dark:border-white" />
            </div>
            <div className="mt-4">
              <h3 className="text-xl mb-6">Game Specs</h3>
              <table className="border-2 border-gray-400 text-sm bg-white dark:bg-black">
                <thead className="border border-gray-400">
                  <tr>
                    <th scope="col" className="bg-white dark:bg-black text-black border-r border-gray-400 p-1">
                      &nbsp;
                    </th>
                    <th scope="col" className="border-r bg-blue-500 text-white border-gray-400 p-1">
                      PlayStation 5
                    </th>
                    <th scope="col" className="border-r bg-blue-500 text-white border-gray-400 p-1">
                      PlayStation 4
                    </th>
                    <th scope="col" className="border-r bg-lime-500 text-black border-gray-400 p-1">
                      Xbox Series X|S
                    </th>
                    <th scope="col" className="border-r bg-gray-700 text-white border-gray-400 p-1">
                      Steam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Screen Resolution
                    </th>
                    <th className="border-r border-gray-400 p-1">1920x1080</th>
                    <th className="border-r border-gray-400 p-1">1920x1080</th>
                    <th className="border-r border-gray-400 p-1">1920x1080</th>
                    <th className="border-r border-gray-400 p-1">1920x1080 up to 3840x2160</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Frame Rate
                    </th>
                    <th className="border-r border-gray-400 p-1">60fps Dynamic</th>
                    <th className="border-r border-gray-400 p-1">30fps Dynamic</th>
                    <th className="border-r border-gray-400 p-1">60fps Dynamic</th>
                    <th className="border-r border-gray-400 p-1">60fps Dynamic under Recommended Hardware</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      RAM
                    </th>
                    <th className="border-r border-gray-400 p-1">8GB</th>
                    <th className="border-r border-gray-400 p-1">16GB</th>
                    <th className="border-r border-gray-400 p-1">16GB</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Online Features &amp; Number of Online Players
                    </th>
                    <th className="border-r border-gray-400 p-1">Online Battles, up to 2 Players</th>
                    <th className="border-r border-gray-400 p-1">Online Battles, up to 2 Players</th>
                    <th className="border-r border-gray-400 p-1">Online Battles, up to 2 Players</th>
                    <th className="border-r border-gray-400 p-1">Online Battles, up to 2 Players</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Offline Features &amp; Players
                    </th>
                    <th className="border-r border-gray-400 p-1">Main Story, Single Player, Offline Battles, up to 2 players</th>
                    <th className="border-r border-gray-400 p-1">Main Story, Single Player, Offline Battles, up to 2 players</th>
                    <th className="border-r border-gray-400 p-1">Main Story, Single Player, Offline Battles, up to 2 players</th>
                    <th className="border-r border-gray-400 p-1">Main Story, Single Player, Offline Battles, up to 2 players</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th className="border-r bg-white text-black border-gray-400 p-1">Paid Service Requirements</th>
                    <th className="border-r border-gray-400 p-1">To play Online, you must sign up for PlayStation Plus (Paid). For details, visit the official Sony PlayStation Plus website</th>
                    <th className="border-r border-gray-400 p-1">To play Online, you must sign up for PlayStation Plus (Paid). For details, visit the official Sony PlayStation Plus website</th>
                    <th className="border-r border-gray-400 p-1">To play Online, you must sign up for Xbox Game Pass Core (Paid) For details, visit the official Microsoft Xbox website</th>
                    <th>-</th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Recommended Storage Capacity & Number of Available Save Slots
                    </th>
                    <th scope="row" className="border-r border-gray-400 p-1">
                      Required storage (35GB) - 1 Save Slot
                    </th>
                    <th scope="row" className="border-r border-gray-400 p-1">
                      Required storage (50GB) - 1 Save Slot
                    </th>
                    <th scope="row" className="border-r border-gray-400 p-1">
                      Required storage (46GB) - 1 Save Slot
                    </th>
                    <th scope="row" className="border-r border-gray-400 p-1">
                      Required storage (75GB) - 1 Save Slot
                    </th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Save Data Transfer
                    </th>
                    <th scope="row" className="border-r border-gray-400 p-1">
                      Compatible with PlayStation 4 to PlayStation 5 only
                    </th>
                    <th scope="row" className="border-r border-gray-400 p-1">
                      Compatible with PlayStation 4 to PlayStation 5 only
                    </th>
                    <th scope="row" className="border-r border-gray-400 p-1">
                      -
                    </th>
                    <th scope="row" className="border-r border-gray-400 p-1">
                      -
                    </th>
                  </tr>
                  <tr className="border border-gray-400">
                    <th scope="row" className="border-r bg-white text-black border-gray-400 p-1">
                      Cross-platform Compatibility (Crossplay)
                    </th>
                    <th className="border-r border-gray-400 p-1">Online battles between PlayStation 5 and Playstation 4 only</th>
                    <th className="border-r border-gray-400 p-1">Online battles between PlayStation 5 and Playstation 4 only</th>
                    <th className="border-r border-gray-400 p-1">Not supported</th>
                    <th className="border-r border-gray-400 p-1">Not supported</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        <hr className="mt-6 border-black dark:border-white" />
      </div>
    </div>
  );
}
