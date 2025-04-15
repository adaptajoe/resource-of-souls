"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CoinVertical, Info, ListNumbers, X, User } from "@phosphor-icons/react/dist/ssr";
import badgesData from "@/data/badgesData.json";

interface ShopItem {
  name: string;
  description: string;
  price: number;
  stock?: number;
  image?: string;
  unlockRequirement?: string;
  showName?: boolean;
}

interface ShopCategory {
  name: string;
  path: string;
  items: ShopItem[];
  showStats?: boolean;
  showCrystalDisclaimer?: boolean;
}

interface GamerTags {
  xbox?: string;
  playstation?: string;
  steam?: string;
}

interface CertificateData {
  name: string;
  plate: string | null;
  plateHueRotate: number;
  iconHueRotate: number;
  title: string | null;
  titleName: string | null;
  icon: string | null;
  stickers: (string | null)[];
  gamerTags: GamerTags;
  discord?: string;
  timezone: string;
  level: number | null;
  exp: number | null;
}

// Add this helper function to find badges for a Discord user
const findUserBadges = (discordUsername: string) => {
  const badges: { name: string; platform: string }[] = [];

  // Helper function to check each badge category
  const checkCategory = (category: any[]) => {
    category.forEach((badge) => {
      if (badge.pcOwner === discordUsername) {
        badges.push({ name: badge.name, platform: "PC" });
      }
      if (badge.psOwner === discordUsername) {
        badges.push({ name: badge.name, platform: "PlayStation" });
      }
      if (badge.xboxOwner === discordUsername) {
        badges.push({ name: badge.name, platform: "Xbox" });
      }
    });
  };

  // Check all badge categories
  checkCategory(badgesData.worldOfLivingLeagueBadges);
  checkCategory(badgesData.soulSocietyLeagueBadges);
  checkCategory(badgesData.huecoMundoLeagueBadges);
  checkCategory(badgesData.schattenBereichLeagueBadges);
  checkCategory(badgesData.specialLeagueBadges);
  checkCategory(badgesData.masterLeagueBadges);

  return badges;
};

function KonpakuCertificateCreator() {
  const [isOpen, setIsOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [certificateData, setCertificateData] = useState<CertificateData>({
    name: "",
    plate: null,
    plateHueRotate: 0,
    iconHueRotate: 0,
    title: null,
    titleName: null,
    icon: null,
    stickers: [null, null, null, null],
    gamerTags: {},
    discord: "",
    timezone: "",
    exp: null,
    level: null,
  });

  const waitForImagesToLoad = async (container: HTMLElement) => {
    const images = Array.from(container.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete && img.naturalHeight !== 0) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      )
    );
  };

  const handleSave = () => {
    console.log("Saving certificate:", certificateData);
    setIsOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <p>
          Want to show off your earned Badges? Want to share easy links to your Discord, Xbox, PlayStation or Steam usernames, and share your Timezone? Generate your Konpaku Certificate just as you
          would in-game by clicking the red button to the right!
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="w-fit mx-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors flex items-center justify-center space-x-2"
        >
          <User size={24} />
          <span>Create Konpaku Certificate</span>
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Konpaku Certificate Generator</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  <X size={24} />
                </button>
              </div>

              <hr className="my-6 border-gray-600 border" />
              <p>Simply fill in the information below, choose your Plate, Icon, Stickers, and Title and then screenshot your Certificate!</p>
              <hr className="my-6 border-gray-600 border" />

              <div className="space-y-6">
                <div className="grid grid-cols-2 space-x-8">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={certificateData.name}
                        onChange={(e) => setCertificateData({ ...certificateData, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  {/* Discord Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discord Username</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Enter your Discord Username (No @)"
                        value={certificateData.discord || ""}
                        onChange={(e) => setCertificateData({ ...certificateData, discord: e.target.value })}
                        className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 space-x-8">
                  {/* Gamer Tags */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gaming Profiles (Fill at least one)</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="If you have one, enter your Xbox Gamertag"
                          value={certificateData.gamerTags.xbox || ""}
                          onChange={(e) => setCertificateData({ ...certificateData, gamerTags: { ...certificateData.gamerTags, xbox: e.target.value } })}
                          className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="If you have one, enter your PlayStation Network ID"
                          value={certificateData.gamerTags.playstation || ""}
                          onChange={(e) => setCertificateData({ ...certificateData, gamerTags: { ...certificateData.gamerTags, playstation: e.target.value } })}
                          className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="If you have one, enter your Steam Username"
                          value={certificateData.gamerTags.steam || ""}
                          onChange={(e) => setCertificateData({ ...certificateData, gamerTags: { ...certificateData.gamerTags, steam: e.target.value } })}
                          className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                    <div className="flex items-center space-x-2">
                      <select
                        value={certificateData.timezone}
                        onChange={(e) => setCertificateData({ ...certificateData, timezone: e.target.value })}
                        className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Select your Timezone</option>
                        {Intl.supportedValuesOf("timeZone").map((tz) => (
                          <option key={tz} value={tz}>
                            {tz}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 space-x-8">
                  {/* Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={certificateData.level || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            setCertificateData({
                              ...certificateData,
                              level: Math.min(Math.max(value, 1), 100),
                            });
                          }
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter level (1-100)"
                      />
                    </div>
                  </div>
                  {/* EXP */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">EXP</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min={0}
                        max={999999999}
                        value={certificateData.exp || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setCertificateData({
                              ...certificateData,
                              exp: value,
                            });
                          }
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter EXP (0 minimum, 999999999 maximum)"
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-gray-600" />

                {/* Plate Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select a Plate (Background)</label>
                  <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2 border border-gray-300 rounded-md dark:border-gray-600">
                    {shopData.plates.items.map((plate, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setCertificateData({
                            ...certificateData,
                            plate: plate.image || null, // Ensure null if image is undefined
                          })
                        }
                        className={`relative aspect-video cursor-pointer rounded-md overflow-hidden border-2 ${certificateData.plate === plate.image ? "border-red-600" : "border-transparent"}`}
                      >
                        <Image src={plate.image || ""} alt={plate.name} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-gray-600" />

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select an Icon (Profile Picture)</label>
                  <div className="grid grid-cols-6 gap-4 max-h-96 overflow-y-auto p-2 border border-gray-300 rounded-md dark:border-gray-600">
                    {shopData.icons.items.map((icon, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setCertificateData({
                            ...certificateData,
                            icon: icon.image || null, // Ensure null if image is undefined
                          })
                        }
                        className={`relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${certificateData.icon === icon.image ? "border-red-600" : "border-transparent"}`}
                      >
                        <Image src={icon.image || ""} alt={icon.name} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-gray-600" />

                {/* Sticker Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select your Stickers (Optional)</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index}>
                        <p className="text-xs text-gray-500 mb-1">Corner {index + 1} (Starting at top-left corner, clockwise)</p>
                        <div className="grid grid-cols-4 gap-2 max-h-52 overflow-y-auto p-2 border border-gray-300 rounded-md dark:border-gray-600">
                          {shopData.stickers.items.map((sticker, stickerIndex) => (
                            <div
                              key={stickerIndex}
                              onClick={() => {
                                const newStickers = [...certificateData.stickers];
                                newStickers[index] = sticker.image || null; // Ensure null if image is undefined
                                setCertificateData({ ...certificateData, stickers: newStickers });
                              }}
                              className={`relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                                certificateData.stickers[index] === sticker.image ? "border-red-600" : "border-transparent"
                              }`}
                            >
                              <Image src={sticker.image || ""} alt={sticker.name} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-gray-600" />

                {/* Title Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select a Title (Optional)</label>
                  <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2 border border-gray-300 rounded-md dark:border-gray-600">
                    {shopData.titles.items.map((title, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setCertificateData({
                            ...certificateData,
                            title: title.image || null,
                            titleName: title.name || null,
                          })
                        }
                        className={`relative aspect-square h-28 w-48 cursor-pointer rounded-md overflow-hidden border-2 ${
                          certificateData.title === title.image && certificateData.titleName === title.name ? "border-red-600" : "border-transparent"
                        }`}
                      >
                        <Image src={title.image || ""} alt={title.name} fill className="object-contain" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1">
                          <p className="text-white text-xs text-center truncate">{title.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 space-x-8">
                  {/* Icon Hue Rotation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon Hue Rotation ({certificateData.iconHueRotate}°) (0° is default)</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={certificateData.iconHueRotate}
                      onChange={(e) => setCertificateData({ ...certificateData, iconHueRotate: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  {/* Plate Hue Rotation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Plate Hue Rotation ({certificateData.plateHueRotate}°) (0° is default)</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={certificateData.plateHueRotate}
                      onChange={(e) => setCertificateData({ ...certificateData, plateHueRotate: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <hr className="my-6 border-gray-600" />

              {/* Preview */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Konpaku Certificate</h3>
                <div className="relative w-full h-[500px] bg-red-600 overflow-hidden">
                  {certificateData.plate && (
                    <Image
                      src={certificateData.plate}
                      alt="Certificate Background"
                      fill
                      style={{
                        filter: `hue-rotate(${certificateData.plateHueRotate}deg)`,
                      }}
                    />
                  )}{" "}
                  {certificateData.icon && (
                    <div className="absolute top-44 left-44 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72">
                      <Image
                        src={certificateData.icon}
                        alt="Profile Icon"
                        fill
                        className="object-cover"
                        style={{
                          filter: `hue-rotate(${certificateData.iconHueRotate}deg)`,
                        }}
                      />
                      {certificateData.stickers.map((sticker, index) => {
                        if (!sticker) return null;
                        const positions = ["top-0 -left-4", "top-0 -right-4", "bottom-0 -left-4", "bottom-0 -right-4"];
                        return (
                          <div key={index} className={`absolute ${positions[index]} w-16 h-16`}>
                            <Image src={sticker} alt={`Sticker ${index + 1}`} fill className="object-contain" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {certificateData.name && <div className="absolute bg-black top-[20rem] left-12 w-64 text-center font-bold border-gray-600 border">{certificateData.name}</div>}
                  {certificateData.title && (
                    <div className="absolute top-[23rem] left-4 w-80 h-[5.25rem] text-center font-bold">
                      <Image src={certificateData.title} alt="Title" fill className="object-contain" />
                      {certificateData.titleName && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-sm font-serif font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{certificateData.titleName}</span>
                        </div>
                      )}
                    </div>
                  )}
                  {Object.entries(certificateData.gamerTags).map(([platform, tag]) => {
                    if (!tag) return null;

                    return (
                      <div
                        key={platform}
                        className="absolute opacity-75 right-6 text-xs text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] w-auto h-auto z-20"
                        style={{
                          top: platform === "xbox" ? "9.5rem" : platform === "playstation" ? "12rem" : "14.5rem",
                        }}
                      >
                        <div className="flex flex-row items-center bg-black p-2 border-gray-600 border">
                          <span className="capitalize mr-1">{platform}</span> - {tag}
                        </div>
                      </div>
                    );
                  })}
                  {certificateData.timezone && (
                    <div className="absolute opacity-75 top-[17rem] right-6 text-xs text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] w-auto h-auto z-20">
                      <div className="flex flex-row items-center bg-black p-2 border-gray-600 border">Timezone - {certificateData.timezone}</div>
                    </div>
                  )}
                  {certificateData.level && (
                    <div className="absolute top-4 right-6 text-5xl text-white font-bold w-auto h-auto z-20">
                      <div className="flex flex-row items-end font-outfitFont">
                        <span className="text-xl">Lv.</span> <span className="font-black">{certificateData.level}</span>
                      </div>
                    </div>
                  )}
                  {certificateData.exp && (
                    <div className="absolute top-16 right-6 text-sm text-white font-bold w-auto h-auto z-20 border-b-4 border-white">
                      <div className="flex flex-row items-end font-outfitFont">
                        <span>{certificateData.exp} / 999999999</span>
                      </div>
                    </div>
                  )}
                  {certificateData.discord && (
                    <div className="absolute top-[7rem] opacity-75 right-6 text-xs text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] w-auto h-auto z-20">
                      <div className="flex flex-row items-center bg-black p-2 border-gray-600 border">Discord - @{certificateData.discord}</div>
                    </div>
                  )}
                  {certificateData.discord && (
                    <div className="absolute w-96 bottom-12 right-6 bg-black bg-opacity-50 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] border border-gray-600 p-1">
                      <div className="text-white text-xs text-center flex flex-col justify-center p-1 font-bold">
                        <div className="font-bebasFont text-lg tracking-wider">Badges</div>
                        <div className="flex flex-row justify-center">
                          {findUserBadges(`@${certificateData.discord}`).length > 0 ? (
                            findUserBadges(`@${certificateData.discord}`).map((badge, index, array) => (
                              <p key={index} className="truncate first:ml-0 ml-1">
                                {badge.name} ({badge.platform}){index < array.length - 1 ? `,` : ""}
                              </p>
                            ))
                          ) : (
                            <p>None</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-4">
                <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const shopData: Record<string, ShopCategory> = {
  soulCrystals: {
    name: "Soul Crystals",
    path: "soul-crystals",
    showStats: true,
    showCrystalDisclaimer: true,
    items: [
      {
        name: "Attack Soul Crystal - Rage",
        description: "Condition: 2 of fewer Konpaku. Increases all damage dealt by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Equilibrium",
        description: "Condition: Reishi over 30%, but under 70%. Increases all damage dealt by 50%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Flawless",
        description: "Condition: Max Konpaku. Increases all damage dealt by 60%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Renunciation",
        description: "Condition: None. Increases all damage dealt by 65%. Lose 2% of Reishi per second.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Strong Strike",
        description: "Condition: None. Increases damage dealt with Flash Attack Follow-Ups by 60%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Spiritual Pressure",
        description: "Condition: None. Increases damage dealt with Spiritual Pressure Moves by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Power Move",
        description: "Condition: None. Increases Spiritual Pressure Move damage by 100%, and 10% less Reiatsu gained.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Whole Soul",
        description: "Condition: Reishi over 70%. Increases damage dealt with Spiritual Pressure Moves by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Whole Body",
        description: "Condition: 4 or fewer Konpaku. Increases damage dealt with Spiritual Pressure Moves by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Trump Card",
        description: "Condition: When initiating a Reverse Action. Increases damage dealt with Spiritual Pressure Moves by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Destroy",
        description: "Condition: Opponent has 5 or more Konpaku. Increases damage dealt with Quick Attacks, Flash Attacks, Signature Moves and Breakers by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Speed Strike",
        description: "Condition: Battle begins. Increases damage dealt with Quick Attacks, Flash Attacks, Signature Moves and Breaakers by 50% for 60 seconds.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Light Scratch",
        description: "Condition: Reishi over 70%. Increases damage dealt with Quick Attacks, Flash Attacks, Signature Moves and Breakers by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Break Apart",
        description: "Condition: Landed a Breaker. Increases damage dealt with Quick Attacks, Flash Attacks, Signature Moves and Breakers by 0% for 10 seconds.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Lean In",
        description: "Condition: None. Increases Follow-up Hohō damage dealt by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Fight to the Death",
        description: "Condition: None. Increases damage dealt with Quick Attacks, Flash Attacks, Signature Moves and Breakers by 80%. Increases damage from all attacks by 20%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Vigor",
        description: "Condition: 6 or more Konpaku. Increases damage dealt to Guard Gauge by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Resist",
        description: "Condition: Reishi under 40%. Increases damage dealt to Guard Gauge by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Brace",
        description: "Condition: None. Increases damage to Guard Gauge by 0%. Increases damage from Quick Attacks, Flash Attacks, Signature Moves and Breakers by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Pierce",
        description: "Condition: None. Increases pierce damage (Chip damage) by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Intercept",
        description: "Condition: None. Increases counter damage by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Pursuit",
        description: "Condition: Reishi under 50%. Increases combo damage by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Attack Soul Crystal - Merciless",
        description: "Condition: When initiating a Reverse Action. Increases combo damage by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-red-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Endure",
        description: "Condition: Reishi under 50%. Reduces Guard Gauge depletion by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Protect",
        description: "Condition: None. Reduces Guard Gauge depletion by 0%. 5% less Reiatsu gained when defending.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Adapt",
        description: "Condition: Reishi over 50%. Guard Gauge recovers 0% faster.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Quick Start",
        description: "Condition: 5 or more Konpaku. Guard Gauge recovers 0% faster.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Tenacious",
        description: "Condition: None. Increases total Guard Gauge by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Persist",
        description: "Condition: None. Increases total Guard Gauge by 0%. Guard Gauge recovers 10% slower.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Battle Cry",
        description: "Condition: Reishi under 40%. Reduces damage taken from all attacks by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Perfection",
        description: "Condition: Max Konpaku. Reduces damage taken from all attacks by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Harden",
        description: "Condition: None. Reduces damage taken from all attacks by 0%. Reduces damage by Quick Attacks / Flash Attacks by 3%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Defensive Roll",
        description: "Condition: When initiating a Reverse Action. Reduces damage taken from all attacks by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Insulator",
        description: "Condition: None. Reduces damage from Quick Attacks, Flash Attacks, Signature Moves and Breakers by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Strain",
        description: "Condition: Reishi under 50%. Reduces damage taken from Quick Attacks, Flash Attacks, Signature Moves and Breakers by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Swell",
        description: "Condition: 3 or fewer Konpaku. Reduces damage from Quick Attacks, Flash Attacks, Signature Moves and Breakers by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Guardian",
        description: "Condition: None. Reduces damage taken from Spiritual Pressure Moves by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Spirit Creation",
        description: "Condition: None. 0% less Spiritual Pressure Move damage taken. 20% less Spiritual Pressure Move damage dealt.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - False Request",
        description: "Condition: None. Reduces damage taken from mid-sized and large foes by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - False Opposition",
        description: "Condition: Reishi under 50%. Reduces damage taken from mid-sized and large foes by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Sturdy Defense",
        description: "Condition: None. Reduces damage taken while guarding by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Emergency Aid",
        description: "Condition: When initiating a Reverse Action. Gain 0% of max Reishi.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Soul Absorb",
        description: "Condition: When landing a Kikon Move. Gain 0% of max Reishi.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Master",
        description: "Condition: Upon successful counter. Gain 0% of max Reishi.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Convert",
        description: "Condition: When a Spiritual Pressure Move is used. Gain 20% of max Reishi.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Thorough",
        description: "Condition: Reduce the opponent's Reishi to 0. Gain 0% of max Reishi.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Vitality",
        description: "Condition: Max Reiatsu. Gain 1% Reishi per second (Cannot enhance).",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Defense Soul Crystal - Activity",
        description: "Condition: When initiating a Reverse Action. Gain 2% Reishi per second (Cannot enhance).",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-yellow-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Ardor",
        description: "Condition: None. Increases Reiatsu gained from attacks by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Belligerence",
        description: "Condition: Landed a Breaker. Gain 55% more Reiatsu when attacking for 10 seconds.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Focus",
        description: "Condition: None. Gain 0% more Reiatsu from attacks. Reduces all damage dealt by 5%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Eagle Eye",
        description: "Condition: Reishi under 50%. 0% more Reiatsu gained when guarding.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Eighteen",
        description: "Condition: None. 0% more Reiatsu gained when guarding. Increases damage from all attacks by 10%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Ambition",
        description: "Condition: 6 or more Konpaku. Gain 10% more Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Coercion",
        description: "Condition: Reishi over 70%. Gain 0% more Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Informal",
        description: "Condition: None. Gain 50% Reiatsu and increases Spiritual Pressure Move damage by 20%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Harmonious",
        description: "Condition: 6 or more Konpaku. Decreases Reiatsu consumption by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Opportunity",
        description: "Condition: When initiating a Reverse Action. Decreases Reiatsu consumption by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Efficiency",
        description: "Condition: None. Decreases Reiatsu consumption by 0%. Gain 5% Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Independent",
        description: "Condition: When using Signature Move. Gain 50% Reiatsu for 5 seconds.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Urgent",
        description: "Condition: Reishi under 30%. Gain 0 Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Redirect",
        description: "Condition: Upon successful counter. Gain 0 Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Brink of Battle",
        description: "Condition: When initiating a Reverse Action. Gain 0 Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Speciality",
        description: "Condition: 5 or fewer Konpaku. Gain 0 Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Second Shot",
        description: "Condition: When landing a Kikon Move. Gain 0 Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Pioneering",
        description: "Condition: When battle begins. Gain 150 Reiatsu.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Well of Power",
        description: "Condition: Max Reishi. Gain 2% Reiatsu per second (Cannot enhance).",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Armaments",
        description: "Condition: When initiating a Reverse Action. Gain 2% Reiatsu per second (Cannot enhance).",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-blue-crystal.png",
      },
      {
        name: "Spiritual Pressure Soul Crystal - Self-Destructive",
        description: "Condition: None. Gain 4% Reiatsu per second. Lose 2% Reishi per second (Cannot enhance).",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-blue-crystal.png",
      },
      {
        name: "Special Soul Crystal - Lightweight",
        description: "Condition: None. Reduces Hohō Gauge consumption by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Sudden Shift",
        description: "Condition: When initiating a Reverse Action. Reduces Hohō Gauge consumption by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Flash Master",
        description: "Condition: None. Reduces Hohō Gauge consumption by 80%. Reduces total Reverse Gauge by 50% (Cannot enhance).",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Inversion",
        description: "Condition: None. Increases Reverse Gauge charge by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Unyielding",
        description: "Condition: Max Reiatsu. Increases Reverse Gauge charge amount by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Fast and Loose",
        description: "Condition: Landed a Breaker. Increases Reverse Gauge charge by 0% for 10 seconds.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Loaded",
        description: "Condition: Reverse Gauge under 50%. Increases Reverse Gauge charge by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Ongoing",
        description: "Condition: None. Reverse Action effects last 0 seconds longer.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Implacable",
        description: "Condition: Opponent has 6 or fewer Konpaku. Reverse Action effects last 0 seconds longer.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Concentrated",
        description: "Condition: None. Reverse Action effects last 15 seconds longer. Decreases Reverse Gauge charge by 25%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/cracked-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Rousing",
        description: "Condition: Reishi under 50%. Reverse Action effects last 0 seconds longer.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - White Shift",
        description: "Condition: None. Increases auto-refill amount of Reishi / Reiatsu during Soul Reverse by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Blue Shift",
        description: "Condition: None. Gain 0% more Reiatsu when Burst Reverse is initiated.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Yellow Shift",
        description: "Condition: None. Increases Chain Reverse Reiatsu charge by 0.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Will to Fight",
        description: "Condition: None. Increases Fighting Spirit Gauge charge amount by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/normal-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Extra Hit",
        description: "Condition: Spiritual Pressure Move is used. Increase Reverse Gauge by 25%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Indomitable",
        description: "Condition: Reishi under 30%. Increase Reverse Gauge by 0%..",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Tailwind",
        description: "Condition: Land a Kikon Move. Increase Reverse Gauge by 0%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
      {
        name: "Special Soul Crystal - Fighting Spirit",
        description: "Condition: When initiating a Reverse Action. Fills Fighting Spirit Gauge by 15%.",
        price: 0,
        stock: 1,
        image: "/assets/urahara-shop/soul-crystals/shiny-green-crystal.png",
      },
    ],
  },
  spiritTalismans: {
    name: "Spirit Talismans",
    path: "spirit-talismans",
    showStats: false,
    items: [
      {
        name: "Basic Attack Talisman - Start",
        description: "Condition: When battle begins. Increases damage with Quick Attacks, Flash Attacks, Signature Moves and Breakers by 20% for 60 sec.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/basic-attack-talisman.png",
      },
      {
        name: "Spirit Attack Talisman - Start",
        description: "Condition: When battle begins. Increases damage with Pressure Moves by 20% for 60 sec.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/spirit-attack-talisman.png",
      },
      {
        name: "Basic Defense Talisman - Konpaku",
        description: "Condition: 4 or fewer Konpaku. Decreases damage from Quick Attacks, Flash Attacks, Signature Moves and Breakers by 15% for 60s.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/basic-defense-talisman.png",
      },
      {
        name: "Spirit Defense Talisman - Konpaku",
        description: "Condition: 4 or fewer Konpaku. Decreases damage from Spiritual Pressure Moves by 15% for 60s.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/spirit-defense-talisman.png",
      },
      {
        name: "Spiritual Pressure Talisman - Start",
        description: "Condition: When battle begins. Gain 25 Reiatsu.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/spiritual-pressure-talisman-start.png",
      },
      {
        name: "Spiritual Pressure Talisman - Konpaku",
        description: "Condition: 4 or fewer Konpaku. Gain 50 Reiatsu.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/spiritual-pressure-talisman-konpaku.png",
      },
      {
        name: "Spiritual Pressure Talisman - Awakened",
        description: "Condition: When initiating an Awakening. Gain 50 Reiatsu.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/spiritual-pressure-talisman-awakening.png",
      },
      {
        name: "Spirit Buildup Talisman - Start",
        description: "Condition: When battle begins. Get 2% Reiatsu per second for 60 seconds (Max 120 Reiatsu gained).",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/spirit-buildup-talisman.png",
      },
      {
        name: "Curative Great Talisman",
        description: "Condition: Reishi under 40%. Gain 20% Reishi.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/curative-great-talisman.png",
      },
      {
        name: "Determination Great Talisman",
        description: "Condition: Reishi under 40%. Gain 1% Reishi per second for 60 seconds (Max 60% Reishi gained).",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/determination-great-talisman.png",
      },
      {
        name: "Reverse Great Talisman - Konpaku",
        description: "Condition: 4 or fewer Konpaku. Gain 100% Reverse Gauge.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/reverse-great-talisman.png",
      },
      {
        name: "Fighting Spirit Great Talisman - Start",
        description: "Condition: When battle begins. Gain 20% Fighting Spirit gauge.",
        price: 250,
        stock: 0,
        image: "/assets/urahara-shop/talismans/fighting-spirit-great-talisman.png",
      },
    ],
  },
  icons: {
    name: "Icons (Konpaku Certificate)",
    path: "icons",
    showStats: true,
    items: [
      {
        name: "Ichigo Kurosaki (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of an Ichigo Kurosaki doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/ichigo-kurosaki-doll.png",
        stock: 1,
      },
      {
        name: "Uryu Ishida (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of an Uryu Ishida doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/uryu-ishida-doll.png",
        stock: 1,
      },
      {
        name: "Yasutora Sado (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Yasutora Sado doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/yasutora-sado-doll.png",
        stock: 1,
      },
      {
        name: "Kisuke Urahara (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Kisuke Urahara doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/kisuke-urahara-doll.png",
        stock: 1,
      },
      {
        name: "Yoruichi (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Yoruichi Shihoin doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/yoruichi-shihoin-doll.png",
        stock: 1,
      },
      {
        name: "Renji Abarai (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Renji Abarai doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/renji-abarai-doll.png",
        stock: 1,
      },
      {
        name: "Rukia Kuchiki (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Rukia Kuchiki doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/rukia-kuchiki-doll.png",
        stock: 1,
      },
      {
        name: "Shuhei Hisagi (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Shuhei Hisagi doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/shuhei-hisagi-doll.png",
        stock: 1,
      },
      {
        name: "Rangiku Matsumoto (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Rangiku Matsumoto doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/rangiku-matsumoto-doll.png",
        stock: 1,
      },
      {
        name: "Izuru Kira (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of an Izuru Kira doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/izuru-kira-doll.png",
        stock: 1,
      },
      {
        name: "Ikkaku Madarame (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of an Ikkaku Madarame doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/ikkaku-madarame-doll.png",
        stock: 1,
      },
      {
        name: "Shigekuni Genryusai Yamamoto (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Shigekuni Genryusai Yamamoto doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/shigekuni-genryusai-yamamoto-doll.png",
        stock: 1,
      },
      {
        name: "Soi Fon (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Soi Fon doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/soi-fon-doll.png",
        stock: 1,
      },
      {
        name: "Gin Ichimaru (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Gin Ichimaru doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/gin-ichimaru-doll.png",
        stock: 1,
      },
      {
        name: "Sosuke Aizen (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Sosuke Aizen doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/sosuke-aizen-doll.png",
        stock: 1,
      },
      {
        name: "Byakuya Kuchiki (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Byakuya Kuchiki doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/byakuya-kuchiki-doll.png",
        stock: 1,
      },
      {
        name: "Sajin Komamura (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Sajin Komamura doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/sajin-komamura-doll.png",
        stock: 1,
      },
      {
        name: "Shunsui Kyoraku (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Shunsui Kyoraku doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/shunsui-kyoraku-doll.png",
        stock: 1,
      },
      {
        name: "Kaname Tōsen (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Kaname Tōsen doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/kaname-tosen-doll.png",
        stock: 1,
      },
      {
        name: "Kenpachi Zaraki (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Kenpachi Zaraki doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/kenpachi-zaraki-doll.png",
        stock: 1,
      },
      {
        name: "Mayuri Kurotsuchi (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Mayuri Kurotsuchi doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/mayuri-kurotsuchi-doll.png",
        stock: 1,
      },
      {
        name: "Kaien Shiba (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Kaien Shiba doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/kaien-shiba-doll.png",
        stock: 1,
      },
      {
        name: "Shinji Hirako (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Shinji Hirako doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/shinji-hirako-doll.png",
        stock: 1,
      },
      {
        name: "Coyote Stark (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Coyote Stark doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/coyote-stark-doll.png",
        stock: 1,
      },
      {
        name: "Tier Halibel (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Tier Halibel doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/tier-halibel-doll.png",
        stock: 1,
      },
      {
        name: "Kenpachi Zaraki (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Ulquiorra Shifar doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/ulquiorra-shifar-doll.png",
        stock: 1,
      },
      {
        name: "Grimmjow Jaegerjaquez (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Grimmjow Jaegerjaquez doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/grimmjow-jaegerjaquez-doll.png",
        stock: 1,
      },
      {
        name: "Nnoitora Gilga (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Nnoitora Gilga doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/nnoitora-gilga-doll.png",
        stock: 1,
      },
      {
        name: "Szayelaporro Granz (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Szayelaporro Granz doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/szayelaporro-granz-doll.png",
        stock: 1,
      },
      {
        name: "Nelliel Tu Odelschwanck (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of a Nelliel Tu Odelschwanck doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/nelliel-tu-odelschwanck-doll.png",
        stock: 1,
      },
      {
        name: "Orihime Inoue (Doll)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of an Orihime Inoue doll.",
        price: 5000,
        image: "/assets/urahara-shop/icons/orihime-inoue-doll.png",
        stock: 1,
      },
      {
        name: "Ichigo Kurosaki",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Ichigo Kurosaki.",
        price: 3000,
        image: "/assets/urahara-shop/icons/ichigo-kurosaki.png",
        stock: 1,
      },
      {
        name: "Ichigo Kurosaki (Bankai)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Ichigo Kurosaki (Bankai).",
        price: 3000,
        image: "/assets/urahara-shop/icons/ichigo-kurosaki-bankai.png",
        stock: 1,
      },
      {
        name: "Ichigo Kurosaki (Final Getsugatensho)",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Ichigo Kurosaki (Final Getsugatenso).",
        price: 3000,
        image: "/assets/urahara-shop/icons/ichigo-kurosaki-final-getsugatensho.png",
        stock: 1,
      },
      {
        name: "Uryu Ishida",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Uryu Ishida.",
        price: 3000,
        image: "/assets/urahara-shop/icons/uryu-ishida.png",
        stock: 1,
      },
      {
        name: "Yasutora Sado",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Yasutora Sado.",
        price: 3000,
        image: "/assets/urahara-shop/icons/yasutora-sado.png",
        stock: 1,
      },
      {
        name: "Kisuke Urahara",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Kisuke Urahara.",
        price: 3000,
        image: "/assets/urahara-shop/icons/kisuke-urahara.png",
        stock: 1,
      },
      {
        name: "Yoruichi Shihoin",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Yoruichi Shihoin.",
        price: 3000,
        image: "/assets/urahara-shop/icons/yoruichi-shihoin.png",
        stock: 1,
      },
      {
        name: "Renji Abarai",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Renji Abarai.",
        price: 3000,
        image: "/assets/urahara-shop/icons/renji-abarai.png",
        stock: 1,
      },
      {
        name: "Rukia Kuchiki",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Rukia Kuchiki.",
        price: 3000,
        image: "/assets/urahara-shop/icons/rukia-kuchiki.png",
        stock: 1,
      },
      {
        name: "Shuhei Hisagi",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Shuhei Hisagi.",
        price: 3000,
        image: "/assets/urahara-shop/icons/shuhei-hisagi.png",
        stock: 1,
      },
      {
        name: "Rangiku Matsumoto",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Rangiku Matsumoto.",
        price: 3000,
        image: "/assets/urahara-shop/icons/rangiku-matsumoto.png",
        stock: 1,
      },
      {
        name: "Izuru Kira",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Izuru Kira.",
        price: 3000,
        image: "/assets/urahara-shop/icons/izuru-kira.png",
        stock: 1,
      },
      {
        name: "Ikkaku Madarame",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Ikkaku Madarame.",
        price: 3000,
        image: "/assets/urahara-shop/icons/ikkaku-madarame.png",
        stock: 1,
      },
      {
        name: "Shigekuni Genryusai Yamamoto",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Shigekuni Genryusai Yamamoto.",
        price: 3000,
        image: "/assets/urahara-shop/icons/shigekuni-genryusai-yamamoto.png",
        stock: 1,
      },
      {
        name: "Soi Fon",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Soi Fon.",
        price: 3000,
        image: "/assets/urahara-shop/icons/soi-fon.png",
        stock: 1,
      },
      {
        name: "Gin Ichimaru",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Gin Ichimaru.",
        price: 3000,
        image: "/assets/urahara-shop/icons/gin-ichimaru.png",
        stock: 1,
      },
      {
        name: "Sosuke Aizen",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Sosuke Aizen.",
        price: 3000,
        image: "/assets/urahara-shop/icons/sosuke-aizen.png",
        stock: 1,
      },
      {
        name: "Byakuya Kuchiki",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Byakuya Kuchiki.",
        price: 3000,
        image: "/assets/urahara-shop/icons/byakuya-kuchiki.png",
        stock: 1,
      },
      {
        name: "Sajin Komamura",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Sajin Komamura.",
        price: 3000,
        image: "/assets/urahara-shop/icons/sajin-komamura.png",
        stock: 1,
      },
      {
        name: "Shunsui Kyoraku",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Shunsui Kyoraku.",
        price: 3000,
        image: "/assets/urahara-shop/icons/shunsui-kyoraku.png",
        stock: 1,
      },
      {
        name: "Kaname Tōsen",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Kaname Tōsen.",
        price: 3000,
        image: "/assets/urahara-shop/icons/kaname-tosen.png",
        stock: 1,
      },
      {
        name: "Kenpachi Zaraki",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Kenpachi Zaraki.",
        price: 3000,
        image: "/assets/urahara-shop/icons/kenpachi-zaraki.png",
        stock: 1,
      },
      {
        name: "Mayuri Kurotsuchi",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Mayuri Kurotsuchi.",
        price: 3000,
        image: "/assets/urahara-shop/icons/mayuri-kurotsuchi.png",
        stock: 1,
      },
      {
        name: "Kaien Shiba",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Kaien Shiba.",
        price: 3000,
        image: "/assets/urahara-shop/icons/kaien-shiba.png",
        stock: 1,
      },
      {
        name: "Shinji Hirako",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Shinji Hirako.",
        price: 3000,
        image: "/assets/urahara-shop/icons/shinji-hirako.png",
        stock: 1,
      },
      {
        name: "Coyote Stark",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Coyote Stark.",
        price: 3000,
        image: "/assets/urahara-shop/icons/coyote-stark.png",
        stock: 1,
      },
      {
        name: "Tier Halibel",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Tier Halibel.",
        price: 3000,
        image: "/assets/urahara-shop/icons/tier-halibel.png",
        stock: 1,
      },
      {
        name: "Kenpachi Zaraki",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Ulquiorra Shifar.",
        price: 3000,
        image: "/assets/urahara-shop/icons/ulquiorra-shifar.png",
        stock: 1,
      },
      {
        name: "Grimmjow Jaegerjaquez",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Grimmjow Jaegerjaquez.",
        price: 3000,
        image: "/assets/urahara-shop/icons/grimmjow-jaegerjaquez.png",
        stock: 1,
      },
      {
        name: "Nnoitora Gilga",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Nnoitora Gilga.",
        price: 3000,
        image: "/assets/urahara-shop/icons/nnoitora-gilga.png",
        stock: 1,
      },
      {
        name: "Szayelaporro Granz",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Szayelaporro Granz.",
        price: 3000,
        image: "/assets/urahara-shop/icons/szayelaporro-granz.png",
        stock: 1,
      },
      {
        name: "Nelliel Tu Odelschwanck",
        description: "Icon that can be added to Konpaku Certificates. Features an image of Nelliel Tu Odelschwanck.",
        price: 3000,
        image: "/assets/urahara-shop/icons/nelliel-tu-odelschwanck.png",
        stock: 1,
      },
      {
        name: "Uryu Ishida (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Uryu Ishida.",
        price: 4000,
        image: "/assets/urahara-shop/icons/uryu-ishida-secret-story.png",
        stock: 1,
      },
      {
        name: "Yasutora Sado (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Yasutora Sado.",
        price: 4000,
        image: "/assets/urahara-shop/icons/yasutora-sado-secret-story.png",
        stock: 1,
      },
      {
        name: "Kisuke Urahara (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Kisuke Urahara.",
        price: 4000,
        image: "/assets/urahara-shop/icons/kisuke-urahara-secret-story.png",
        stock: 1,
      },
      {
        name: "Yoruichi Shihoin (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Yoruichi Shihoin.",
        price: 4000,
        image: "/assets/urahara-shop/icons/yoruichi-shihoin-secret-story.png",
        stock: 1,
      },
      {
        name: "Renji Abarai (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Renji Abarai.",
        price: 4000,
        image: "/assets/urahara-shop/icons/renji-abarai-secret-story.png",
        stock: 1,
      },
      {
        name: "Rukia Kuchiki (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Rukia Kuchiki.",
        price: 4000,
        image: "/assets/urahara-shop/icons/rukia-kuchiki-secret-story.png",
        stock: 1,
      },
      {
        name: "Shuhei Hisagi (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Shuhei Hisagi.",
        price: 4000,
        image: "/assets/urahara-shop/icons/shuhei-hisagi-secret-story.png",
        stock: 1,
      },
      {
        name: "Rangiku Matsumoto (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Rangiku Matsumoto.",
        price: 4000,
        image: "/assets/urahara-shop/icons/rangiku-matsumoto-secret-story.png",
        stock: 1,
      },
      {
        name: "Izuru Kira (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Izuru Kira.",
        price: 4000,
        image: "/assets/urahara-shop/icons/izuru-kira-secret-story.png",
        stock: 1,
      },
      {
        name: "Ikkaku Madarame (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Ikkaku Madarame.",
        price: 4000,
        image: "/assets/urahara-shop/icons/ikkaku-madarame-secret-story.png",
        stock: 1,
      },
      {
        name: "Shigekuni Genryusai Yamamoto (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Shigekuni Genryusai Yamamoto.",
        price: 4000,
        image: "/assets/urahara-shop/icons/shigekuni-genryusai-yamamoto-secret-story.png",
        stock: 1,
      },
      {
        name: "Soi Fon (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Soi Fon.",
        price: 4000,
        image: "/assets/urahara-shop/icons/soi-fon-secret-story.png",
        stock: 1,
      },
      {
        name: "Gin Ichimaru (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Gin Ichimaru.",
        price: 4000,
        image: "/assets/urahara-shop/icons/gin-ichimaru-secret-story.png",
        stock: 1,
      },
      {
        name: "Sosuke Aizen (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Sosuke Aizen.",
        price: 4000,
        image: "/assets/urahara-shop/icons/sosuke-aizen-secret-story.png",
        stock: 1,
      },
      {
        name: "Byakuya Kuchiki (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Byakuya Kuchiki.",
        price: 4000,
        image: "/assets/urahara-shop/icons/byakuya-kuchiki-secret-story.png",
        stock: 1,
      },
      {
        name: "Sajin Komamura (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Sajin Komamura.",
        price: 4000,
        image: "/assets/urahara-shop/icons/sajin-komamura-secret-story.png",
        stock: 1,
      },
      {
        name: "Shunsui Kyoraku (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Shunsui Kyoraku.",
        price: 4000,
        image: "/assets/urahara-shop/icons/shunsui-kyoraku-secret-story.png",
        stock: 1,
      },
      {
        name: "Kaname Tōsen (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Kaname Tōsen.",
        price: 4000,
        image: "/assets/urahara-shop/icons/kaname-tosen-secret-story.png",
        stock: 1,
      },
      {
        name: "Kenpachi Zaraki (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Kenpachi Zaraki.",
        price: 4000,
        image: "/assets/urahara-shop/icons/kenpachi-zaraki-secret-story.png",
        stock: 1,
      },
      {
        name: "Mayuri Kurotsuchi (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Mayuri Kurotsuchi.",
        price: 4000,
        image: "/assets/urahara-shop/icons/mayuri-kurotsuchi-secret-story.png",
        stock: 1,
      },
      {
        name: "Kaien Shiba (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Kaien Shiba.",
        price: 4000,
        image: "/assets/urahara-shop/icons/kaien-shiba-secret-story.png",
        stock: 1,
      },
      {
        name: "Shinji Hirako (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Shinji Hirako.",
        price: 4000,
        image: "/assets/urahara-shop/icons/shinji-hirako-secret-story.png",
        stock: 1,
      },
      {
        name: "Coyote Stark (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Coyote Stark.",
        price: 4000,
        image: "/assets/urahara-shop/icons/coyote-stark-secret-story.png",
        stock: 1,
      },
      {
        name: "Tier Halibel (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Tier Halibel.",
        price: 4000,
        image: "/assets/urahara-shop/icons/tier-halibel-secret-story.png",
        stock: 1,
      },
      {
        name: "Ulquiorra Shifar (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Ulquiorra Shifar.",
        price: 4000,
        image: "/assets/urahara-shop/icons/ulquiorra-shifar-secret-story.png",
        stock: 1,
      },
      {
        name: "Grimmjow Jaegerjaquez (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Grimmjow Jaegerjaquez.",
        price: 4000,
        image: "/assets/urahara-shop/icons/grimmjow-jaegerjaquez-secret-story.png",
        stock: 1,
      },
      {
        name: "Nnoitora Gilga (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Nnoitora Gilga.",
        price: 4000,
        image: "/assets/urahara-shop/icons/nnoitora-gilga-secret-story.png",
        stock: 1,
      },
      {
        name: "Szayelaporro Granz (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Szayelaporro Granz.",
        price: 4000,
        image: "/assets/urahara-shop/icons/szayelaporro-granz-secret-story.png",
        stock: 1,
      },
      {
        name: "Nelliel Tu Odelschwanck (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Nelliel Tu Odelschwanck.",
        price: 4000,
        image: "/assets/urahara-shop/icons/nelliel-tu-odelschwanck-secret-story.png",
        stock: 1,
      },
      {
        name: "Orihime Inoue (Secret Story)",
        description: "Icon that can be added to Konpaku Certificates. Features a vibrant image of Orihime Inoue.",
        price: 4000,
        image: "/assets/urahara-shop/icons/orihime-inoue-secret-story.png",
        stock: 1,
      },
    ],
  },
  titles: {
    name: "Titles (Konpaku Certificate)",
    path: "titles",
    showStats: true,
    items: [
      {
        name: "Zangetsu",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shikai-green.png",
        showName: true,
      },
      {
        name: "Bankai: Tensa Zangetsu",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shikai-pink.png",
        showName: true,
      },
      {
        name: "The Black Getsugatensho",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki (Bankai).",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/bankai-green.png",
        showName: true,
      },
      {
        name: "Hollowfication",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki (Bankai).",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/bankai-green.png",
        showName: true,
      },
      {
        name: "Full Hollowfication",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki (Bankai).",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/bankai-pink.png",
        showName: true,
      },
      {
        name: "The Final Getsugatensho",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki (The Final Getsugatensho).",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/final-green.png",
        showName: true,
      },
      {
        name: "It'll be Over Real Quick",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki (The Final Getsugatensho).",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/final-green.png",
        showName: true,
      },
      {
        name: "Mugetsu",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki (The Final Getsugatensho).",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/final-pink.png",
        showName: true,
      },
      {
        name: "The Reishi Glove",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Uryu Ishida.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/uryu-green.png",
        showName: true,
      },
      {
        name: "Seeleschneider",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Uryu Ishida.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/uryu-green.png",
        showName: true,
      },
      {
        name: "Quincy Letz Stile",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Uryu Ishida.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/uryu-pink.png",
        showName: true,
      },
      {
        name: "Brazo Derecho del Gigante",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Yasutora Sado.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/chad-green.png",
        showName: true,
      },
      {
        name: "Brazo Izquierdo del Diablo",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Yasutora Sado.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/chad-green.png",
        showName: true,
      },
      {
        name: "La Muerte",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Yasutora Sado.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/chad-pink.png",
        showName: true,
      },
      {
        name: "Wake Up, Benihime",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kisuke Urahara.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kisuke-green.png",
        showName: true,
      },
      {
        name: "Blood Shield",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kisuke Urahara.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kisuke-green.png",
        showName: true,
      },
      {
        name: "Futatsu Kakei",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kisuke Urahara.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kisuke-pink.png",
        showName: true,
      },
      {
        name: "Utsusemi",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Yoruichi Shihoin.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/yoruichi-green.png",
        showName: true,
      },
      {
        name: "Flash Master",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Yoruichi Shihoin.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/yoruichi-green.png",
        showName: true,
      },
      {
        name: "Shunko",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Yoruichi Shihoin.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/yoruichi-pink.png",
        showName: true,
      },
      {
        name: "Roar, Zabimaru",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Renji Abarai.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/renji-green.png",
        showName: true,
      },
      {
        name: "Bankai: Hihio Zabimaru",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Renji Abarai.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/renji-pink.png",
        showName: true,
      },
      {
        name: "Dance, Sodenoshirayuki",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Rukia Kuchiki.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/rukia-green.png",
        showName: true,
      },
      {
        name: "Tsugi no Mai, Hakuren",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Rukia Kuchiki.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/rukia-pink.png",
        showName: true,
      },
      {
        name: "Reap, Kazeshini",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shuhei Hisagi.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/hisagi-green.png",
        showName: true,
      },
      {
        name: "It's obviously made to reap souls.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shuhei Hisagi.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/hisagi-pink.png",
        showName: true,
      },
      {
        name: "Growl, Haineko",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Rangiku Matsumoto.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/rangiku-green.png",
        showName: true,
      },
      {
        name: "Gentei Kaijo",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Rangiku Matsumoto.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/rangiku-pink.png",
        showName: true,
      },
      {
        name: "Raise your head, Wabisuke",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Izuru Kira.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/izuru-green.png",
        showName: true,
      },
      {
        name: "Never forgive me.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Izuru Kira.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/izuru-pink.png",
        showName: true,
      },
      {
        name: "Extend, Hozukimaru",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ikkaku Madarame.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/ikkaku-green.png",
        showName: true,
      },
      {
        name: "Bankai: Ryumon Hozukimaru",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ikkaku Madarame.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/ikkaku-pink.png",
        showName: true,
      },
      {
        name: "Turn to Ashes, Ryujinjakka",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shigekuni Genryusai Yamamoto.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/yama-green.png",
        showName: true,
      },
      {
        name: "Ennetsu Jikogu",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shigekuni Genryusai Yamamoto.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/yama-pink.png",
        showName: true,
      },
      {
        name: "Sting all Enemies to Death, Suzumebachi",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Soi Fon.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/soi-fon-green.png",
        showName: true,
      },
      {
        name: "Bankai: Jakuho Raikoben",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Soi Fon.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/soi-fon-pink.png",
        showName: true,
      },
      {
        name: "Shoot 'Em Dead, Shinso",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Gin Ichimaru.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/gin-green.png",
        showName: true,
      },
      {
        name: "Kamishininoyari Butorenjin",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Gin Ichimaru.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/gin-green.png",
        showName: true,
      },
      {
        name: "Bankai: Kamishininoyari",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Gin Ichimaru.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/gin-pink.png",
        showName: true,
      },
      {
        name: "Shatter, Kyōka Suigetsu",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Sosuke Aizen.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/aizen-green.png",
        showName: true,
      },
      {
        name: "Hado Number 90: Kurohitsugi",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Sosuke Aizen.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/aizen-green.png",
        showName: true,
      },
      {
        name: "Stand at the Top",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Sosuke Aizen.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/aizen-pink.png",
        showName: true,
      },
      {
        name: "Scatter, Senbonzakura",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Byakuya Kuchiki.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/byakuya-green.png",
        showName: true,
      },
      {
        name: "Bankai: Senbonzakura Kageyoshi",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Byakuya Kuchiki.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/byakuya-pink.png",
        showName: true,
      },
      {
        name: "Rumble, Ten Ken",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Sajin Komamura.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/sajin-green.png",
        showName: true,
      },
      {
        name: "Bankai: Kokujo Tengen Myo-oh",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Sajin Komamura.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/sajin-pink.png",
        showName: true,
      },
      {
        name: "Flower Wind Rage and Flower God Roar",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shunsui Kyoraku.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shunsui-green.png",
        showName: true,
      },
      {
        name: "Katen Kyōkotsu",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shunsui Kyoraku.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shunsui-pink.png",
        showName: true,
      },
      {
        name: "Cry, Suzumushi",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kaname Tōsen.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kaname-green.png",
        showName: true,
      },
      {
        name: "Suzumushi Hyakushiki, Grillado Grillo",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kaname Tōsen.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kaname-green.png",
        showName: true,
      },
      {
        name: "Bankai: Suzumushi Tsuishiki, Enma Korogi",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kaname Tōsen.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kaname-pink.png",
        showName: true,
      },
      {
        name: "Reign Over the Frosted Heavens, Hyōrinmaru",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Toshiro Hitsugaya.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/toshiro-green.png",
        showName: true,
      },
      {
        name: "Bankai: Daiguren Hyōrinmaru",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Toshiro Hitsugaya.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/toshiro-pink.png",
        showName: true,
      },
      {
        name: "North Rukon, Eightieth District - Zaraki",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kenpachi Zaraki.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kenpachi-green.png",
        showName: true,
      },
      {
        name: "Kenpachi",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kenpachi Zaraki.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kenpachi-pink.png",
        showName: true,
      },
      {
        name: "Tear Him Up, Ashisogi Jizo",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Mayuri Kurotsuchi.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/mayuri-green.png",
        showName: true,
      },
      {
        name: "Bankai: Konjiki Ashisogi Jizo",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Mayuri Kurotsuchi.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/mayuri-pink.png",
        showName: true,
      },
      {
        name: "Rage Through the Seas and Heavens, Nejibana",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kaien Shiba.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kaien-green.png",
        showName: true,
      },
      {
        name: "I Can Leave My Heart Behind",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kaien Shiba.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kaien-pink.png",
        showName: true,
      },
      {
        name: "Collapse, Sakanade",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shinji Hirako.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shinji-green.png",
        showName: true,
      },
      {
        name: "Let's End This",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shinji Hirako.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shinji-green.png",
        showName: true,
      },
      {
        name: "The Upside Down World",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shinji Hirako.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shinji-pink.png",
        showName: true,
      },
      {
        name: "Give Chase, Los Lobos",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Coyote Stark.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/stark-green.png",
        showName: true,
      },
      {
        name: "Cero Metralleta",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Coyote Stark.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/stark-green.png",
        showName: true,
      },
      {
        name: "The Reign of Death in Lonliness",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Coyote Stark.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/stark-pink.png",
        showName: true,
      },
      {
        name: "Hunt, Tiburon",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Tier Halibel.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/halibel-green.png",
        showName: true,
      },
      {
        name: "Cascada",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Tier Halibel.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/halibel-green.png",
        showName: true,
      },
      {
        name: "The Reign of Death in Sacrifice",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Tier Halibel.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/halibel-pink.png",
        showName: true,
      },
      {
        name: "Imprison, Murcielago",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ulquiorra Shifar.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/ulquiorra-green.png",
        showName: true,
      },
      {
        name: "Resurrección Segunda Etapa",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ulquiorra Shifar.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/ulquiorra-green.png",
        showName: true,
      },
      {
        name: "The Reign of Death in Nothingness",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ulquiorra Shifar.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/ulquiorra-pink.png",
        showName: true,
      },
      {
        name: "Pray, Santa Teresa",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Nnoitora Gilga.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/nnoitora-green.png",
        showName: true,
      },
      {
        name: "I'm the Strongest Espada!",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Nnoitora Gilga.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/nnoitora-green.png",
        showName: true,
      },
      {
        name: "The Reign of Death in Despair",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Nnoitora Gilga.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/nnoitora-pink.png",
        showName: true,
      },
      {
        name: "Grind, Pantera",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Grimmjow Jaegerjaquez.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/grimmjow-green.png",
        showName: true,
      },
      {
        name: "Desgarrón",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Grimmjow Jaegerjaquez.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/grimmjow-green.png",
        showName: true,
      },
      {
        name: "The Reign of Death in Destruction",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Grimmjow Jaegerjaquez.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/grimmjow-pink.png",
        showName: true,
      },
      {
        name: "Sip, La Lujuriosa",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Szayelaporro Granz.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/szayelaporro-green.png",
        showName: true,
      },
      {
        name: "Gabriel",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Szayelaporro Granz.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/szayelaporro-green.png",
        showName: true,
      },
      {
        name: "The Reign of Death in Madness",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Szayelaporro Granz.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/szayelaporro-pink.png",
        showName: true,
      },
      {
        name: "Praise, Gamuza",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Nelliel tu Odelschwanck.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/nelliel-green.png",
        showName: true,
      },
      {
        name: "Cero Doble",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Nelliel tu Odelschwanck.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/nelliel-green.png",
        showName: true,
      },
      {
        name: "Lanzador Verde",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Nelliel tu Odelschwanck.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/nelliel-pink.png",
        showName: true,
      },
      {
        name: "I seek the strongest.",
        description: "Title that can be added to Konpaku Certificates. Features a message on seeking mighty foes.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/gahaha-gold.png",
        showName: true,
      },
      {
        name: "Looking forward to battle.",
        description: "Title that can be added to Konpaku Certificates. Features a message on seeking friendly foes.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/zanpakuto-gray.png",
        showName: true,
      },
      {
        name: "Gah ha ha ha ha!",
        description: "Title that can be added to Konpaku Certificates. Features a message with an iconic laugh.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/gahaha-pink.png",
        showName: true,
      },
      {
        name: "A Huge Zanpakuto.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shikai-green.png",
        showName: true,
      },

      {
        name: "I want to protect as many people as I can.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/shikai-pink.png",
        showName: true,
      },
      {
        name: "I'll kill you.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ichigo Kurosaki.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/bankai-pink-alt.png",
        showName: true,
      },
      {
        name: "I reject!",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Orihime Inoue.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/orihime-pink.png",
        showName: true,
      },
      {
        name: "Lend me your strength.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Yasutora Sado.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/chad-pink.png",
        showName: true,
      },
      {
        name: "Now it's our turn.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Uryu Ishida.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/uryu-pink.png",
        showName: true,
      },
      {
        name: "You aimed your blade at my pride.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Byakuya Kuchiki.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/byakuya-pink-alt.png",
        showName: true,
      },
      {
        name: "I abhor perfection.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Mayuri Kurotsuchi.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/mayuri-pink.png",
        showName: true,
      },
      {
        name: "I can finally fight all out!",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Kenpachi Zaraki.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/kenpachi-pink.png",
        showName: true,
      },
      {
        name: "Die to eliminate great evil",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Shigekuni Genryusai Yamamoto.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/yama-pink.png",
        showName: true,
      },
      {
        name: "This is what true despair looks like.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Ulquiorra Shifar.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/ulquiorra-pink.png",
        showName: true,
      },
      {
        name: "I...am the king!",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Grimmjow Jaegerjaquez.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/grimmjow-pink-alt.png",
        showName: true,
      },
      {
        name: "I've already analyzed your abilities!",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Szayelaporro Granz.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/szayelaporro-pink-alt.png",
        showName: true,
      },
      {
        name: "I want to repay you.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Nelliel tu Odelschwanck.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/nelliel-pink-alt.png",
        showName: true,
      },
      {
        name: "I'm a snake.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Gin Ichimaru.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/gin-pink.png",
        showName: true,
      },
      {
        name: "Adoration is the state furthest from understanding.",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Sosuke Aizen.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/aizen-pink-alt.png",
        showName: true,
      },
      {
        name: "Retreat and you'll age, be afraid and you'll die!",
        description: "Title that can be added to Konpaku Certificates. Features text pertaining to Zangetsu.",
        price: 4000,
        stock: 1,
        image: "/assets/urahara-shop/titles/zangetsu-pink.png",
        showName: true,
      },
      {
        name: "Substitute Soul Reaper",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 0,
        unlockRequirement: "Unlocked upon first starting BLEACH - Rebirth of Souls.",
        image: "/assets/urahara-shop/titles/hollow-mask-gray.png",
        showName: true,
      },
      {
        name: "Combinator",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear ???",
        image: "/assets/urahara-shop/titles/hollow-mask-gray.png",
        showName: true,
      },
      {
        name: "Step by Step",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear ???",
        image: "/assets/urahara-shop/titles/hollow-mask-gray.png",
        showName: true,
      },
      {
        name: "What I Want to Protect",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear ???",
        image: "/assets/urahara-shop/titles/hollow-mask-gray.png",
        showName: true,
      },
      {
        name: "The Last Quincy",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear ???",
        image: "/assets/urahara-shop/titles/hollow-mask-gray.png",
        showName: true,
      },
      {
        name: "Unfinished July Rain",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Chapter 1 - The Substitute Arc.",
        image: "/assets/urahara-shop/titles/soul-reaper-badge-red.png",
        showName: true,
      },
      {
        name: "AND THE RAIN LEFT OFF",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Chapter 2 - The Soul Society Arc.",
        image: "/assets/urahara-shop/titles/soul-reaper-badge-red.png",
        showName: true,
      },
      {
        name: "goodbye, halcyon days.",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Chapter 3 - The Visored Arc.",
        image: "/assets/urahara-shop/titles/soul-reaper-badge-red.png",
        showName: true,
      },
      {
        name: "Leaving the Heart Behind",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Chapter 4 - The Hueco Mundo Arc.",
        image: "/assets/urahara-shop/titles/soul-reaper-badge-red.png",
        showName: true,
      },
      {
        name: "the silent victory",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Chapter 5 - The Battle for Karakura Arc",
        image: "/assets/urahara-shop/titles/soul-reaper-badge-red.png",
        showName: true,
      },
      {
        name: "BRAVE: Change the World",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Sosuke Aizen",
        image: "/assets/urahara-shop/titles/soul-reaper-badge-pink.png",
        showName: true,
      },
      {
        name: "Decem",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear 25% of the Secret Stories across World of the Living, Soul Society and Hueco Mundo.",
        image: "/assets/urahara-shop/titles/tensa-teal.png",
        showName: true,
      },
      {
        name: "Viginti",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear 50% of the Secret Stories across World of the Living, Soul Society and Hueco Mundo.",
        image: "/assets/urahara-shop/titles/tensa-teal.png",
        showName: true,
      },
      {
        name: "Triginta",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear 75% of the Secret Stories across World of the Living, Soul Society and Hueco Mundo.",
        image: "/assets/urahara-shop/titles/tensa-teal.png",
        showName: true,
      },
      {
        name: "Complementum",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear 100% of the Secret Stories across World of the Living, Soul Society and Hueco Mundo.",
        image: "/assets/urahara-shop/titles/tensa-pink.png",
        showName: true,
      },
      {
        name: "Ichigo the Brave",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Sosuke Aizen.",
        image: "/assets/urahara-shop/titles/shikai-teal.png",
        showName: true,
      },
      {
        name: "Uryu the Shooting Star",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Uryu Ishida.",
        image: "/assets/urahara-shop/titles/uryu-teal.png",
        showName: true,
      },
      {
        name: "Chad the Giant",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Yasutora Sado.",
        image: "/assets/urahara-shop/titles/chad-teal.png",
        showName: true,
      },
      {
        name: "Orihime the Flower",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Orihime Inoue.",
        image: "/assets/urahara-shop/titles/orihime-teal.png",
        showName: true,
      },
      {
        name: "Kisuke the Cautious",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Kisuke Urahara.",
        image: "/assets/urahara-shop/titles/kisuke-teal.png",
        showName: true,
      },
      {
        name: "Yoruichi the Flash",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Yoruichi Shihoin.",
        image: "/assets/urahara-shop/titles/yoruichi-teal.png",
        showName: true,
      },
      {
        name: "Renji the Fang",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Renji Abarai.",
        image: "/assets/urahara-shop/titles/renji-teal.png",
        showName: true,
      },
      {
        name: "Rukia the Snow",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Rukia Kuchiki.",
        image: "/assets/urahara-shop/titles/rukia-teal.png",
        showName: true,
      },
      {
        name: "Shuhei the Reaper",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Shuhei Hisagi.",
        image: "/assets/urahara-shop/titles/hisagi-teal.png",
        showName: true,
      },
      {
        name: "Rangiku the Ash",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Rangiku Matsumoto.",
        image: "/assets/urahara-shop/titles/rangiku-teal.png",
        showName: true,
      },
      {
        name: "Izuru the Despair",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Izuru Kira.",
        image: "/assets/urahara-shop/titles/izuru-teal.png",
        showName: true,
      },
      {
        name: "Ikkaku the Lucky",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Ikkaku Madarame.",
        image: "/assets/urahara-shop/titles/ikkaku-teal.png",
        showName: true,
      },
      {
        name: "Shigekuni the Inferno",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Shigekuni Genryusai Yamamoto.",
        image: "/assets/urahara-shop/titles/yama-teal.png",
        showName: true,
      },
      {
        name: "Soi Fon the Hornet",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Soi Fon.",
        image: "/assets/urahara-shop/titles/soi-fon-teal.png",
        showName: true,
      },
      {
        name: "Ichimaru the Snake",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Gin Ichimaru.",
        image: "/assets/urahara-shop/titles/gin-teal.png",
        showName: true,
      },
      {
        name: "Aizen the Hypnotist",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Sosuke Aizen.",
        image: "/assets/urahara-shop/titles/aizen-teal.png",
        showName: true,
      },
      {
        name: "Byakuya the Bloom",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Byakuya Kuchiki.",
        image: "/assets/urahara-shop/titles/byakuya-teal.png",
        showName: true,
      },
      {
        name: "Sajin the Wolf",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Sajin Komamura.",
        image: "/assets/urahara-shop/titles/sajin-teal.png",
        showName: true,
      },
      {
        name: "Shunsui the Spring",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Shunsui Kyoraku.",
        image: "/assets/urahara-shop/titles/shunsui-teal.png",
        showName: true,
      },
      {
        name: "Kaname the Void",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Kaname Tosen.",
        image: "/assets/urahara-shop/titles/kaname-teal.png",
        showName: true,
      },
      {
        name: "Toshiro the Glacier",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Toshiro Hitsugaya.",
        image: "/assets/urahara-shop/titles/toshiro-teal.png",
        showName: true,
      },
      {
        name: "Kenpachi the Undying",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Kenpachi Zaraki.",
        image: "/assets/urahara-shop/titles/kenpachi-teal.png",
        showName: true,
      },
      {
        name: "Mayuri the Mad",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Mayuri Kurotsuchi.",
        image: "/assets/urahara-shop/titles/mayuri-teal.png",
        showName: true,
      },
      {
        name: "Kaien the Proud",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Kaien Shiba.",
        image: "/assets/urahara-shop/titles/kaien-teal.png",
        showName: true,
      },
      {
        name: "Shinji the Pendulum",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Shinji Hirako.",
        image: "/assets/urahara-shop/titles/shinji-teal.png",
        showName: true,
      },
      {
        name: "Stark the Lonesome",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Coyote Stark.",
        image: "/assets/urahara-shop/titles/stark-teal.png",
        showName: true,
      },
      {
        name: "Halibel the Sacrifice",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Tier Halibel.",
        image: "/assets/urahara-shop/titles/halibel-teal.png",
        showName: true,
      },
      {
        name: "Ulquiorra the Empty",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Ulquiorra Shifar.",
        image: "/assets/urahara-shop/titles/ulquiorra-teal.png",
        showName: true,
      },
      {
        name: "Nnoitora the Despair",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Nnoitora Gilga.",
        image: "/assets/urahara-shop/titles/nnoitora-teal.png",
        showName: true,
      },
      {
        name: "Grimmjow the Destroyer",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Grimmjow Jaegerjaquez.",
        image: "/assets/urahara-shop/titles/grimmjow-teal.png",
        showName: true,
      },
      {
        name: "Szayelaporro the Aberrant",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Szayelaporro Granz.",
        image: "/assets/urahara-shop/titles/szayelaporro-teal.png",
        showName: true,
      },
      {
        name: "Nelliel the Beast",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Clear Secret Story: Nelliel tu Odelschwanck.",
        image: "/assets/urahara-shop/titles/nelliel-teal.png",
        showName: true,
      },
      {
        name: "Soul Reaper Academy Novice",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Reach Konpaku Certificate Level 10.",
        image: "/assets/urahara-shop/titles/kon-gray.png",
        showName: true,
      },
      {
        name: "Soul Reaper Academy Graduate",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Reach Konpaku Certificate Level 50.",
        image: "/assets/urahara-shop/titles/kon-gold.png",
        showName: true,
      },
      {
        name: "Soul Reaper Academy President",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Reach Konpaku Certificate Level 100.",
        image: "/assets/urahara-shop/titles/kon-pink.png",
        showName: true,
      },
      {
        name: "Soul Crystal Collector",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Gather over 30 types of Soul Crystals.",
        image: "/assets/urahara-shop/titles/crystals-gray.png",
        showName: true,
      },
      {
        name: "Wings of the Phoenix",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Gather over 10 types of Offense Soul Crystals.",
        image: "/assets/urahara-shop/titles/crystals-gray.png",
        showName: true,
      },
      {
        name: "Shell of the Tortoise",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Gather over 10 types of Defense Soul Crystals.",
        image: "/assets/urahara-shop/titles/crystals-gray.png",
        showName: true,
      },
      {
        name: "Tail of the Dragon",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Gather over 10 types of Spiritual Pressure Soul Crystals.",
        image: "/assets/urahara-shop/titles/crystals-gray.png",
        showName: true,
      },
      {
        name: "Fangs of the Tiger",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Gather over 10 types of Special Soul Crystals.",
        image: "/assets/urahara-shop/titles/crystals-gray.png",
        showName: true,
      },
      {
        name: "Shiju Saimon",
        description: "Title that can be added to Konpaku Certificates.",
        price: 0,
        stock: 1,
        unlockRequirement: "Gather over 80 types of Soul Crystals.",
        image: "/assets/urahara-shop/titles/crystals-pink.png",
        showName: true,
      },
    ],
  },
  plates: {
    name: "Plates (Konpaku Certificate)",
    path: "plates",
    showStats: true,
    items: [
      {
        name: "Ichigo Kurosaki - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/ichigo-shikai-normal-kikon-1.png",
      },
      {
        name: "Ichigo Kurosaki (Bankai) - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/ichigo-bankai-normal-kikon-1.png",
      },
      {
        name: "Ichigo Kurosaki (Final) - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/ichigo-final-normal-kikon-1.png",
      },
      {
        name: "Uryu Ishida - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/uryu-normal-kikon-1.png",
      },
      {
        name: "Yasutora Sado - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/chad-normal-kikon-1.png",
      },
      {
        name: "Kisuke Urahara - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/kisuke-normal-kikon-1.png",
      },
      {
        name: "Yoruichi Shihoin - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/yoruichi-normal-kikon-1.png",
      },
      {
        name: "Renji Abarai - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/renji-normal-kikon-1.png",
      },
      {
        name: "Rukia Kuchiki - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/rukia-normal-kikon-1.png",
      },
      {
        name: "Shuhei Hisagi - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/hisagi-normal-kikon-1.png",
      },
      {
        name: "Rangiku Matsumoto - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/rangiku-normal-kikon-1.png",
      },
      {
        name: "Izuru Kira - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/izuru-normal-kikon-1.png",
      },
      {
        name: "Shigekuni Genryusai Yamamoto - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/yama-normal-kikon-1.png",
      },
      {
        name: "Soi-Fon - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/soi-fon-normal-kikon-1.png",
      },
      {
        name: "Gin Ichimaru - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/gin-normal-kikon-1.png",
      },
      {
        name: "Sosuke Aizen - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/aizen-normal-kikon-1.png",
      },
      {
        name: "Byakuya Kuchiki - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/byakuya-normal-kikon-1.png",
      },
      {
        name: "Sajin Komamura - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/sajin-normal-kikon-1.png",
      },
      {
        name: "Kaien Shiba - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/kaien-normal-kikon-1.png",
      },
      {
        name: "Shinji Hirako - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/shinji-normal-kikon-1.png",
      },
      {
        name: "Coyote Stark - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/stark-normal-kikon-1.png",
      },
      {
        name: "Tier Halibel - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/halibel-normal-kikon-1.png",
      },
      {
        name: "Ulquiorra Shifar - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/ulquiorra-normal-kikon-1.png",
      },
      {
        name: "Grimmjow Jaegerjaquez - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/grimmjow-normal-kikon-1.png",
      },
      {
        name: "Nnoitora Gilga - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/nnoitora-normal-kikon-1.png",
      },
      {
        name: "Szayelaporro Granz - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/szayelaporro-normal-kikon-1.png",
      },
      {
        name: "Nelliel Tu Odelschwanck - Normal State - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 3000,
        stock: 1,
        image: "/assets/urahara-shop/plates/normal-state-kikon/nelliel-normal-kikon-1.png",
      },
      {
        name: "Ichigo Kurosaki - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/ichigo-shikai-awakening.png",
      },
      {
        name: "Ichigo Kurosaki (Bankai) - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/ichigo-bankai-awakening.png",
      },
      {
        name: "Uryu Ishida - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/uryu-awakening.png",
      },
      {
        name: "Yasutora Sado - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/chad-awakening.png",
      },
      {
        name: "Kisuke Urahara - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/kisuke-awakening.png",
      },
      {
        name: "Yoruichi Shihoin - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/yoruichi-awakening.png",
      },
      {
        name: "Renji Abarai - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/renji-awakening.png",
      },
      {
        name: "Rukia Kuchiki - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/rukia-awakening.png",
      },
      {
        name: "Shuhei Hisagi - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/hisagi-awakening.png",
      },
      {
        name: "Rangiku Matsumoto - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/rangiku-awakening.png",
      },
      {
        name: "Izuru Kira - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/izuru-awakening.png",
      },
      {
        name: "Shigekuni Genryusai Yamamoto - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/yama-awakening.png",
      },
      {
        name: "Soi-Fon - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/soi-fon-awakening.png",
      },
      {
        name: "Gin Ichimaru - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/gin-awakening.png",
      },
      {
        name: "Sosuke Aizen - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/aizen-awakening.png",
      },
      {
        name: "Byakuya Kuchiki - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/byakuya-awakening.png",
      },
      {
        name: "Sajin Komamura - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/sajin-awakening.png",
      },
      {
        name: "Kaien Shiba - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/kaien-awakening.png",
      },
      {
        name: "Shinji Hirako - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/shinji-awakening.png",
      },
      {
        name: "Coyote Stark - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/stark-awakening.png",
      },
      {
        name: "Tier Halibel - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/halibel-awakening.png",
      },
      {
        name: "Ulquiorra Shifar - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/ulquiorra-awakening.png",
      },
      {
        name: "Grimmjow Jaegerjaquez - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/grimmjow-awakening.png",
      },
      {
        name: "Nnoitora Gilga - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/nnoitora-awakening.png",
      },
      {
        name: "Szayelaporro Granz - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/szayelaporro-awakening.png",
      },
      {
        name: "Nelliel Tu Odelschwanck - Awakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened/nelliel-awakening.png",
      },
      {
        name: "Ichigo Kurosaki - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/ichigo-shikai-awakened-kikon-1.png",
      },
      {
        name: "Ichigo Kurosaki (Bankai) - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/ichigo-bankai-awakened-kikon-1.png",
      },
      {
        name: "Uryu Ishida - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/uryu-awakened-kikon-1.png",
      },
      {
        name: "Yasutora Sado - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/chad-awakened-kikon-1.png",
      },
      {
        name: "Kisuke Urahara - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/kisuke-awakened-kikon-1.png",
      },
      {
        name: "Yoruichi Shihoin - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/yoruichi-awakened-kikon-1.png",
      },
      {
        name: "Renji Abarai - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/renji-awakened-kikon-1.png",
      },
      {
        name: "Rukia Kuchiki - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/rukia-awakened-kikon-1.png",
      },
      {
        name: "Shuhei Hisagi - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/hisagi-awakened-kikon-1.png",
      },
      {
        name: "Rangiku Matsumoto - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/rangiku-awakened-kikon-1.png",
      },
      {
        name: "Izuru Kira - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/izuru-awakened-kikon-1.png",
      },
      {
        name: "Shigekuni Genryusai Yamamoto - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/yama-awakened-kikon-1.png",
      },
      {
        name: "Soi-Fon - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/soi-fon-awakened-kikon-1.png",
      },
      {
        name: "Gin Ichimaru - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/gin-awakened-kikon-1.png",
      },
      {
        name: "Sosuke Aizen - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/aizen-awakened-kikon-1.png",
      },
      {
        name: "Byakuya Kuchiki - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/byakuya-awakened-kikon-1.png",
      },
      {
        name: "Sajin Komamura - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/sajin-awakened-kikon-1.png",
      },
      {
        name: "Kaien Shiba - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/kaien-awakened-kikon-1.png",
      },
      {
        name: "Shinji Hirako - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/shinji-awakened-kikon-1.png",
      },
      {
        name: "Coyote Stark - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/stark-awakened-kikon-1.png",
      },
      {
        name: "Tier Halibel - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/halibel-awakened-kikon-1.png",
      },
      {
        name: "Ulquiorra Shifar - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/ulquiorra-awakened-kikon-1.png",
      },
      {
        name: "Grimmjow Jaegerjaquez - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/grimmjow-awakened-kikon-1.png",
      },
      {
        name: "Nnoitora Gilga - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/nnoitora-awakened-kikon-1.png",
      },
      {
        name: "Szayelaporro Granz - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/szayelaporro-awakened-kikon-1.png",
      },
      {
        name: "Nelliel Tu Odelschwanck - Awakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 5000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-1/nelliel-awakened-kikon-1.png",
      },
      {
        name: "Ichigo Kurosaki - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/ichigo-shikai-awakened-kikon-2.png",
      },
      {
        name: "Ichigo Kurosaki (Bankai) - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/ichigo-bankai-awakened-kikon-2.png",
      },
      {
        name: "Uryu Ishida - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/uryu-awakened-kikon-2.png",
      },
      {
        name: "Yasutora Sado - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/chad-awakened-kikon-2.png",
      },
      {
        name: "Kisuke Urahara - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/kisuke-awakened-kikon-2.png",
      },
      {
        name: "Yoruichi Shihoin - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/yoruichi-awakened-kikon-2.png",
      },
      {
        name: "Renji Abarai - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/renji-awakened-kikon-2.png",
      },
      {
        name: "Rukia Kuchiki - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/rukia-awakened-kikon-2.png",
      },
      {
        name: "Shuhei Hisagi - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/hisagi-awakened-kikon-2.png",
      },
      {
        name: "Rangiku Matsumoto - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/rangiku-awakened-kikon-2.png",
      },
      {
        name: "Izuru Kira - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/izuru-awakened-kikon-2.png",
      },
      {
        name: "Shigekuni Genryusai Yamamoto - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/yama-awakened-kikon-2.png",
      },
      {
        name: "Soi-Fon - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/soi-fon-awakened-kikon-2.png",
      },
      {
        name: "Gin Ichimaru - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/gin-awakened-kikon-2.png",
      },
      {
        name: "Sosuke Aizen - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/aizen-awakened-kikon-2.png",
      },
      {
        name: "Byakuya Kuchiki - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/byakuya-awakened-kikon-2.png",
      },
      {
        name: "Sajin Komamura - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/sajin-awakened-kikon-2.png",
      },
      {
        name: "Kaien Shiba - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/kaien-awakened-kikon-2.png",
      },
      {
        name: "Shinji Hirako - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/shinji-awakened-kikon-2.png",
      },
      {
        name: "Coyote Stark - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/stark-awakened-kikon-2.png",
      },
      {
        name: "Tier Halibel - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/halibel-awakened-kikon-2.png",
      },
      {
        name: "Ulquiorra Shifar - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/ulquiorra-awakened-kikon-2.png",
      },
      {
        name: "Grimmjow Jaegerjaquez - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/grimmjow-awakened-kikon-2.png",
      },
      {
        name: "Nnoitora Gilga - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/nnoitora-awakened-kikon-2.png",
      },
      {
        name: "Szayelaporro Granz - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/szayelaporro-awakened-kikon-2.png",
      },
      {
        name: "Nelliel Tu Odelschwanck - Awakened - Kikon Move 2",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/awakened-kikon-2/nelliel-awakened-kikon-2.png",
      },
      {
        name: "Ichigo Kurosaki (Bankai) - Reawakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/reawakened/ichigo-bankai-reawakening.png",
      },
      {
        name: "Sosuke Aizen - Reawakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/reawakened/aizen-reawakening.png",
      },
      {
        name: "Ulquiorra Shifar - Reawakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/reawakened/ulquiorra-reawakening.png",
      },
      {
        name: "Uryu Ishida - Reawakening",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/reawakened/uryu-reawakening.png",
      },
      {
        name: "Ichigo Kurosaki (Bankai) - Reawakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/reawakened-kikon-move/ichigo-bankai-reawakened-kikon-move-1.png",
      },
      {
        name: "Sosuke Aizen - Reawakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/reawakened-kikon-move/aizen-reawakened-kikon-move-1.png",
      },
      {
        name: "Ulquiorra Shifar - Reawakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/reawakened-kikon-move/ulquiorra-reawakened-kikon-move-1.png",
      },
      {
        name: "Uryu Ishida - Reawakened - Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/reawakened-kikon-move/uryu-reawakened-kikon-move-1.png",
      },
      {
        name: "Ichigo Kurosaki (Bankai) - Reawakened - Special Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/special/ichigo-bankai-reawakened-special-kikon-1.png",
      },
      {
        name: "Soi-Fon - Special Victory",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/special/soi-fon-special-victory.png",
      },
      {
        name: "Ichigo Kurosaki - Awakened - Special Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/special/ichigo-shikai-awakened-special-kikon-1.png",
      },
      {
        name: "Ulquiorra Shifar - Reawakened - Special Kikon Move 1",
        description: "Plate that can be added to Konpaku Certificates.",
        price: 7000,
        stock: 1,
        image: "/assets/urahara-shop/plates/special/ulquiorra-reawakened-special-kikon-1.png",
      },
    ],
  },
  stickers: {
    name: "Stickers",
    path: "stickers",
    showStats: true,
    items: [
      {
        name: "Ichigo Kurosaki (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of an Ichigo Kurosaki doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/ichigo-kurosaki-doll.png",
        stock: 1,
      },
      {
        name: "Uryu Ishida (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of an Uryu Ishida doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/uryu-ishida-doll.png",
        stock: 1,
      },
      {
        name: "Yasutora Sado (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Yasutora Sado doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/yasutora-sado-doll.png",
        stock: 1,
      },
      {
        name: "Kisuke Urahara (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Kisuke Urahara doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/kisuke-urahara-doll.png",
        stock: 1,
      },
      {
        name: "Yoruichi (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Yoruichi Shihoin doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/yoruichi-shihoin-doll.png",
        stock: 1,
      },
      {
        name: "Renji Abarai (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Renji Abarai doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/renji-abarai-doll.png",
        stock: 1,
      },
      {
        name: "Rukia Kuchiki (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Rukia Kuchiki doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/rukia-kuchiki-doll.png",
        stock: 1,
      },
      {
        name: "Shuhei Hisagi (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Shuhei Hisagi doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/shuhei-hisagi-doll.png",
        stock: 1,
      },
      {
        name: "Rangiku Matsumoto (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Rangiku Matsumoto doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/rangiku-matsumoto-doll.png",
        stock: 1,
      },
      {
        name: "Izuru Kira (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of an Izuru Kira doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/izuru-kira-doll.png",
        stock: 1,
      },
      {
        name: "Ikkaku Madarame (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of an Ikkaku Madarame doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/ikkaku-madarame-doll.png",
        stock: 1,
      },
      {
        name: "Shigekuni Genryusai Yamamoto (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Shigekuni Genryusai Yamamoto doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/shigekuni-genryusai-yamamoto-doll.png",
        stock: 1,
      },
      {
        name: "Soi Fon (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Soi Fon doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/soi-fon-doll.png",
        stock: 1,
      },
      {
        name: "Gin Ichimaru (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Gin Ichimaru doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/gin-ichimaru-doll.png",
        stock: 1,
      },
      {
        name: "Sosuke Aizen (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Sosuke Aizen doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/sosuke-aizen-doll.png",
        stock: 1,
      },
      {
        name: "Byakuya Kuchiki (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Byakuya Kuchiki doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/byakuya-kuchiki-doll.png",
        stock: 1,
      },
      {
        name: "Sajin Komamura (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Sajin Komamura doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/sajin-komamura-doll.png",
        stock: 1,
      },
      {
        name: "Shunsui Kyoraku (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Shunsui Kyoraku doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/shunsui-kyoraku-doll.png",
        stock: 1,
      },
      {
        name: "Kaname Tōsen (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Kaname Tōsen doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/kaname-tosen-doll.png",
        stock: 1,
      },
      {
        name: "Kenpachi Zaraki (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Kenpachi Zaraki doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/kenpachi-zaraki-doll.png",
        stock: 1,
      },
      {
        name: "Mayuri Kurotsuchi (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Mayuri Kurotsuchi doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/mayuri-kurotsuchi-doll.png",
        stock: 1,
      },
      {
        name: "Kaien Shiba (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Kaien Shiba doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/kaien-shiba-doll.png",
        stock: 1,
      },
      {
        name: "Shinji Hirako (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Shinji Hirako doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/shinji-hirako-doll.png",
        stock: 1,
      },
      {
        name: "Coyote Stark (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Coyote Stark doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/coyote-stark-doll.png",
        stock: 1,
      },
      {
        name: "Tier Halibel (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Tier Halibel doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/tier-halibel-doll.png",
        stock: 1,
      },
      {
        name: "Ulquiorra Shifar (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Ulquiorra Shifar doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/ulquiorra-shifar-doll.png",
        stock: 1,
      },
      {
        name: "Grimmjow Jaegerjaquez (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Grimmjow Jaegerjaquez doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/grimmjow-jaegerjaquez-doll.png",
        stock: 1,
      },
      {
        name: "Nnoitora Gilga (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Nnoitora Gilga doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/nnoitora-gilga-doll.png",
        stock: 1,
      },
      {
        name: "Szayelaporro Granz (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Szayelaporro Granz doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/szayelaporro-granz-doll.png",
        stock: 1,
      },
      {
        name: "Nelliel Tu Odelschwanck (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of a Nelliel Tu Odelschwanck doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/nelliel-tu-odelschwanck-doll.png",
        stock: 1,
      },
      {
        name: "Orihime Inoue (Doll)",
        description: "Sticker to add to Konpaku Certificates. Features an image of an Orihime Inoue doll.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/orihime-inoue-doll.png",
        stock: 1,
      },
      {
        name: "Cero Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Cero Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/cero-espada.png",
        stock: 1,
      },
      {
        name: "Primera Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Primera Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/primera-espada.png",
        stock: 1,
      },
      {
        name: "Segunda Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Segunda Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/segunda-espada.png",
        stock: 1,
      },
      {
        name: "Tres Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Tres Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/tres-espada.png",
        stock: 1,
      },
      {
        name: "Cuatro Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Cuatro Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/cuatro-espada.png",
        stock: 1,
      },
      {
        name: "Quinto Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Quinto Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/quinto-espada.png",
        stock: 1,
      },
      {
        name: "Sexta Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Sexta Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/sexta-espada.png",
        stock: 1,
      },
      {
        name: "Séptima Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Séptima Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/septima-espada.png",
        stock: 1,
      },
      {
        name: "Octava Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Octava Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/octava-espada.png",
        stock: 1,
      },
      {
        name: "Noveno Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Noveno Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/noveno-espada.png",
        stock: 1,
      },
      {
        name: "Diez Espada",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of the Diez Espada.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/diez-espada.png",
        stock: 1,
      },
      {
        name: "Barragan's Crown",
        description: "Sticker to add to Konpaku Certificates. Bears Barragan's Crown.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/barragans-crown.png",
        stock: 1,
      },
      {
        name: "Squad 0",
        description: "Sticker to add to Konpaku Certificates. Bears the mark of Squad 0.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-0.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 0)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 0: Winter Daphne.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-0.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 1)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 1: Chrysanthemum.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-1.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 2)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 2: Pasque Flower.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-2.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 3)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 3: Pot Marigold.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-3.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 4)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 4: Japanese Gentian.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-4.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 5)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 5: Japanese Andromeda.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-5.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 6)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 6: Camellia.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-6.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 7)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 7: Sweet Flag.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-7.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 8)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 8: Bird of Paradise.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-8.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 9)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 9: White Poppy.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-9.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 10)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 10: Daffodil.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-10.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 11)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 11: Alpine Yarrow.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-11.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 12)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 12: Thistle.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-12.png",
        stock: 1,
      },
      {
        name: "Squad Flower (Squad 13)",
        description: "Sticker to add to Konpaku Certificates. Depicts the squad flower of Squad 13: Snowdrop.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/squad-flower-squad-13.png",
        stock: 1,
      },
      {
        name: "Substitute Soul Reaper Badge",
        description: "Sticker to add to Konpaku Certificates. Depicts the Substitute Soul Reaper Badge.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/substitute-soul-reaper-badge.png",
        stock: 1,
      },
      {
        name: "Rukia's Explanation (Whole)",
        description: "Sticker to add to Konpaku Certificates. Has something written by Rukia on it: 'Whole'.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/whole.png",
        stock: 1,
      },
      {
        name: "Rukia's Explanation (Arrancar)",
        description: "Sticker to add to Konpaku Certificates. Has something written by Rukia on it: 'Arrancar'.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/arrancar.png",
        stock: 1,
      },
      {
        name: "Rukia's Explanation (Zanpakuto)",
        description: "Sticker to add to Konpaku Certificates. Has something written by Rukia on it: 'Zanpakuto'.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/zanpakuto.png",
        stock: 1,
      },
      {
        name: "Rukia's Explanation (I Offer My Thanks)",
        description: "Sticker to add to Konpaku Certificates. Has something written by Rukia on it: 'I offer my thanks'.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/i-offer-my-thanks.png",
        stock: 1,
      },
      {
        name: "Rukia's Explanation (Wholes and Hollows)",
        description: "Sticker to add to Konpaku Certificates. Has something written by Rukia on it: 'Wholes and Hollows'.",
        price: 3000,
        image: "/assets/urahara-shop/stickers/wholes-and-hollows.png",
        stock: 1,
      },
    ],
  },
  bargains: {
    name: "Bargains",
    path: "bargains",
    showStats: false,
    items: [
      {
        name: "Attack Fragment",
        description: "Fragment used to strengthen Soul Crystals. Strengthens the effects of Attack Soul Crystals",
        price: 2000,
        stock: 0,
        image: "/assets/urahara-shop/soul-crystals/attack-fragment.png",
      },
      {
        name: "Defense Fragment",
        description: "Fragment used to strengthen Soul Crystals. Strengthens the effects of Defense Soul Crystals",
        price: 2000,
        stock: 0,
        image: "/assets/urahara-shop/soul-crystals/defense-fragment.png",
      },
      {
        name: "Spiritual Fragment",
        description: "Fragment used to strengthen Soul Crystals. Strengthens the effects of Spiritual Soul Crystals",
        price: 2000,
        stock: 0,
        image: "/assets/urahara-shop/soul-crystals/spiritual-fragment.png",
      },
      {
        name: "Special Fragment",
        description: "Fragment used to strengthen Soul Crystals. Strengthens the effects of Special Soul Crystals",
        price: 2000,
        stock: 0,
        image: "/assets/urahara-shop/soul-crystals/special-fragment.png",
      },
    ],
  },
};

function CategoryStats({ category }: { category: ShopCategory }) {
  if (!category.showStats) return null;

  const itemCount = category.items.length;
  const totalPrice = category.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col w-full items-start text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
      <div className="flex flex-col space-y-2">
        <span className="flex items-center">
          <ListNumbers size={20} className="mr-2" />
          Number of Items: {itemCount} {itemCount === 1 ? "Item" : "Items"}
        </span>
        <span className="flex items-center">
          <CoinVertical size={20} className="mr-2" />
          Total Cost for all Items: {totalPrice.toLocaleString()} Coins
        </span>
      </div>
      {category.showCrystalDisclaimer && (
        <div className="w-full">
          <hr className="w-full my-3 border-black dark:border-gray-400" />
          <span className="flex items-center">
            <Info size={20} className="mr-2" />
            All Soul Crystal descriptions assume Soul Crystals are at their maximum Level.
          </span>
        </div>
      )}
    </div>
  );
}

function ShopItem({ item }: { item: ShopItem }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div className="border-2 border-gray-600 hover:border-gray-400 rounded-lg p-4 flex flex-col space-y-2 transition-all">
        {item.image && (
          <div className="relative aspect-video mb-2 bg-white dark:bg-gray-800 rounded overflow-hidden cursor-pointer" onClick={() => setIsFullscreen(true)}>
            <Image src={item.image} alt={item.name} fill className="object-contain" />
          </div>
        )}
        <h3 className="text-lg font-semibold first-letter:text-red-600 pl-2 border-l-4 border-l-red-600 tracking-widest">{item.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-red-600 text-xs font-bold dark:text-yellow-500 flex flex-row items-center">
            <CoinVertical size={20} className="mr-1" />
            {item.price.toLocaleString()} Coins
          </span>
          {item.stock !== undefined && item.stock !== 0 && <span className="text-sm text-gray-500">Stock: {item.stock}</span>}
          {item.stock !== undefined && item.stock === 0 && <span className="text-sm text-gray-500">Stock: Infinite</span>}
        </div>
        <hr className="my-6 border-black dark:border-gray-600" />
        {item.unlockRequirement && <div className="text-xs text-gray-500 mt-1">Unlock: {item.unlockRequirement}</div>}
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
          <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={() => setIsFullscreen(false)}>
            <X size={24} />
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] m-4">
            <Image src={item.image || ""} alt={item.name} fill className="object-contain" priority />
          </div>
        </div>
      )}
    </>
  );
}

export default function UraharaShop() {
  const [activeTab, setActiveTab] = useState<keyof typeof shopData>("soulCrystals");

  return (
    <div className="p-4 lg:p-16 space-y-4 text-black dark:text-white">
      <div className="flex flex-row space-x-2">
        <Link href="/" className="text-teal-600 dark:text-teal-400 hover:underline">
          Home
        </Link>
        <p>/</p>
        <Link href="/game" className="text-teal-600 dark:text-teal-400 hover:underline">
          Game
        </Link>
        <p>/</p>
        <Link href="/game/urahara-shop" className="text-teal-600 dark:text-teal-400 hover:underline">
          Urahara Shop
        </Link>
      </div>

      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">U</span>rahara Shop
      </h2>

      <p>Spend your hard-earned coins on various items and upgrades!</p>
      <hr className="my-6 border-black dark:border-white" />
      <div className="flex flex-row justify-start justify-self-start">
        <KonpakuCertificateCreator />
      </div>
      <hr className="my-6 border-black dark:border-white" />
      {(() => {
        let totalPrice = 0;
        let itemCount = 0;

        Object.values(shopData).forEach((category) => {
          category.items.forEach((item) => {
            if (item.stock && item.stock >= 1) {
              totalPrice += item.price;
              itemCount++;
            }
          });
        });

        return (
          <div>
            <p className="flex flex-row items-center">
              <ListNumbers size={20} className="mr-1" />
              Total Items: <span className="mx-1">{itemCount}</span> (Non-infinite)
            </p>
            <p className="flex flex-row items-center text-red-600 font-bold dark:text-yellow-500 ">
              <CoinVertical size={20} className="mr-1" /> Total Price: <span className="ml-1">{totalPrice.toLocaleString()}</span>
            </p>
          </div>
        );
      })()}
      <hr className="my-6 border-black dark:border-white" />

      <div className="border-2 bg-white dark:bg-black border-gray-400 rounded-xl mt-6 p-4">
        <div className="flex border-b border-gray-600 mb-4 overflow-x-auto">
          {Object.entries(shopData).map(([key, category]) => (
            <button
              key={key}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === key ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-400" : "text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
              }`}
              onClick={() => setActiveTab(key as keyof typeof shopData)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <CategoryStats category={shopData[activeTab]} />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {shopData[activeTab].items.map((item, index) => (
            <ShopItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
