"use client";
import Link from "next/link";
import { useState } from "react";

export default function FAQ() {
  const [roadmapIsOpen, setRoadmapIsOpen] = useState(false);
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [assetRightsIsOpen, setAssetRightsIsOpen] = useState(false);
  const [donationsIsOpen, setDonationsIsOpen] = useState(false);
  const [bugReportingIsOpen, setBugReportingIsOpen] = useState(false);

  return (
    <div className="p-4 lg:p-16 space-y-4 text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/FAQ" className="text-teal-400 hover:underline">
          Frequently Asked Questions
        </Link>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">F</span>requently Asked Questions
      </h2>
      <hr />
      <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setRoadmapIsOpen((prevState) => !prevState)}>
        <span>What&apos;s next for Resource of Souls?</span>
        {roadmapIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
      </button>
      {!roadmapIsOpen ? null : (
        <div>
          <p>Here at Resource of Souls, we have a ton of outstanding work and ideas that we&apos;re looking to implement. These include:</p>
          <ul className="list-disc pl-4 text-sm italic text-gray-400">
            <li>
              Redoing every MP4 file on the site to be in higher quality & framerate on the &apos;Uryu Character Trailer Las Noches Interior&apos; Stage for cleaner views of animations after the game
              launches.
            </li>
            <li>Adding detailed moveset data for every character after the game launches.</li>
            <li>Adding detailed frame data for every character after the game launches.</li>
            <li>Adding detailed damage data for every character after the game launches.</li>
            <li>Adding TLDR guides to each character after the game launches.</li>
            <li>Adding Trivia to each character breaking down the inspiration for their animations and art after the game launches.</li>
            <li>Expanding our Community Hub even further.</li>
            <li>Creating combo guide videos - with input display - after the game launches.</li>
            <li>Adding data for all modes in the game, and every stage, Urahara Shop item, OST entry, modding information, datamining information and more when the game launches.</li>
            <li>Improving our Tournament system to include Tournaments outside of the Rebirth of Souls Reddit Discord.</li>
          </ul>
          <p>If you have any suggestions for features, critiques about the site, or just want to give feedback, please don&apos;t hesitate to get in touch over Discord!</p>
        </div>
      )}
      <hr />
      <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setContactIsOpen((prevState) => !prevState)}>
        <span>How can I get in touch?</span>
        {contactIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
      </button>
      {!contactIsOpen ? null : (
        <div>
          <p>If you want to get in touch, message me on Discord, @Jojicus.</p>
          <p>Alternatively, get in touch over GitHub!</p>
        </div>
      )}
      <hr />
      <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setAssetRightsIsOpen((prevState) => !prevState)}>
        <span>Can I use Resource of Souls&apos; information and assets for my thing?</span>
        {assetRightsIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
      </button>
      {!assetRightsIsOpen ? null : (
        <div>
          <p>Yes. The only thing I request you don&apos;t do is clone the whole site and reupload it somewhere. All MP4s, data, images and so forth are free to use.</p>
        </div>
      )}
      <hr />
      <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setDonationsIsOpen((prevState) => !prevState)}>
        <span>How can I donate? Why ad-free? Why no paywalling?</span>
        {donationsIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
      </button>
      {!donationsIsOpen ? null : (
        <div>
          <p>
            No. You cannot donate to me. As much as I appreciate the sentiment, BLEACH - Resource of Souls is - and always was - intended to be a pure passion project from a lifelong BLEACH fan. I do
            this to give back to a community that I call home, and to a franchise that saved my life.
          </p>
        </div>
      )}
      <hr />
      <button className="font-bold text-teal-400 flex items-center gap-2 hover:underline" onClick={() => setBugReportingIsOpen((prevState) => !prevState)}>
        <span>I found a bug / some info is wrong / an animation is missing / I have a suggestion!</span>
        {bugReportingIsOpen ? <span>&uarr;</span> : <span>&darr;</span>}
      </button>
      {!bugReportingIsOpen ? null : (
        <div>
          <p>If you&apos;ve found something wrong, that&apos;s great! You can report it by getting in touch via Discord, or on GitHub by raising a new Issue.</p>
        </div>
      )}
      <hr />
    </div>
  );
}
