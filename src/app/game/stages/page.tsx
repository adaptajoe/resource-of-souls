// src/app/game/stages/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";

interface ImageData {
  name: string;
  path: string;
  videoPath: string;
}

const capitalizeWords = (name: string): string => {
  const exceptions = ["of", "the"];
  return name
    .split(" ")
    .map((word) => (exceptions.includes(word.toLowerCase()) ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join(" ");
};

async function fetchImages(): Promise<ImageData[]> {
  const directory = path.join(process.cwd(), "public/assets/stage-assets");
  const files = fs.readdirSync(directory);
  return files
    .filter((file) => file.endsWith(".png"))
    .map((file) => ({
      name: capitalizeWords(file.replace(".png", "").replace(/-/g, " ")),
      path: `/assets/stage-assets/${file}`,
      videoPath: `/assets/stage-assets/${file.replace(".png", ".mp4")}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default async function Stages() {
  const images = await fetchImages();

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
        <Link href="/game/stages" className="text-teal-600 dark:text-teal-400 hover:underline">
          Stages
        </Link>
        <p>/</p>
      </div>
      <h2 className="text-2xl md:text-3xl font-black border-l-8 border-red-600 pl-4">
        <span className="text-red-600">S</span>tages
      </h2>
      <p>View all of the {images.length} Stages in the game in one big list!</p>
      <hr className="my-6 border-black dark:border-white" />
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center space-x-4 m-4">
            <h3 className="flex-1 text-xl sm:text-2xl lg:text-3xl">{image.name}</h3>
            <Image src={image.path} alt={image.name} width={100} height={100} className="w-full border-2 border-gray-400 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
