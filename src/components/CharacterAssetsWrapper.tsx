"use client";
import { useState, useEffect } from "react";
import { ICharacter } from "@/types/characterDataTypes";
import CharacterAnimationsWrapper from "./CharacterAnimationsWrapper";
import CharacterOutfitsWrapper from "./CharacterOutfitsWrapper";
import YouTubeEmbedWrapper from "./EmbedYoutubeVideoWrapper";
import Image from "next/image";
import JSZip from "jszip";
import { saveAs } from "file-saver";

type CharacterAssetsWrapperProps = {
  character: ICharacter;
  slug: string;
  animations: string[];
  hasAnimations: boolean;
};

type AssetCategory = {
  name: string;
  path: string;
  files: string[];
};

export default function CharacterAssetsWrapper({ character, slug, animations, hasAnimations }: CharacterAssetsWrapperProps) {
  const [activeTab, setActiveTab] = useState<"animations" | "outfits" | "trailers" | "imagery">("animations");
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set());
  const [assetCategories, setAssetCategories] = useState<AssetCategory[]>([
    { name: "Character Banner", path: "character-banner", files: [] },
    { name: "Character Full Body", path: "character-fullbody", files: [] },
    { name: "Character Hero", path: "character-hero", files: [] },
  ]);
  const [loadedAssets, setLoadedAssets] = useState<Set<string>>(new Set());
  const [failedAssets, setFailedAssets] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingAnimations, setIsDownloadingAnimations] = useState(false);

  // Simulate fetching asset files
  useEffect(() => {
    // Reset asset tracking when character changes
    setLoadedAssets(new Set());
    setFailedAssets(new Set());
    setSelectedAssets(new Set());

    // In a real implementation, you would fetch this data from your server
    // For now, we'll simulate it with hardcoded values based on the slug
    setAssetCategories([
      {
        name: "Character Banner (Mobile Wallpaper)",
        path: "character-banner",
        files: [`${slug}-banner.png`],
      },
      {
        name: "Character Fullbody Base Outfit 1",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-base-outfit-1.png`],
      },
      {
        name: "Character Fullbody Base Outfit 2",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-base-outfit-2.png`],
      },
      {
        name: "Character Fullbody Base Outfit 3",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-base-outfit-3.png`],
      },
      {
        name: "Character Fullbody Base Outfit 4",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-base-outfit-4.png`],
      },
      {
        name: "Character Fullbody DLC Outfit 1",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-dlc-outfit-1.png`],
      },
      {
        name: "Character Fullbody DLC Outfit 2",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-dlc-outfit-2.png`],
      },
      {
        name: "Character Fullbody DLC Outfit 3",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-dlc-outfit-3.png`],
      },
      {
        name: "Character Fullbody DLC Outfit 4",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-dlc-outfit-4.png`],
      },
      {
        name: "Character Fullbody Render",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-asset-outfit-1.png`],
      },
      {
        name: "Character Unused Fullbody Render",
        path: `character-fullbody/${slug}`,
        files: [`${slug}-unused-outfit-1.png`],
      },
      {
        name: "Character Hero (Desktop Wallpaper)",
        path: "character-hero",
        files: [`${slug}-hero.png`],
      },
    ]);
  }, [slug]);

  const handleImageLoad = (assetPath: string) => {
    setLoadedAssets((prev) => {
      const newSet = new Set(prev);
      newSet.add(assetPath);
      return newSet;
    });
  };

  const handleImageError = (assetPath: string) => {
    setFailedAssets((prev) => {
      const newSet = new Set(prev);
      newSet.add(assetPath);
      return newSet;
    });

    // If this asset was selected, remove it from selection
    if (selectedAssets.has(assetPath)) {
      const newSelectedAssets = new Set(selectedAssets);
      newSelectedAssets.delete(assetPath);
      setSelectedAssets(newSelectedAssets);
    }
  };

  const toggleAsset = (assetPath: string) => {
    // Only allow toggling assets that have loaded
    if (loadedAssets.has(assetPath)) {
      const newSelectedAssets = new Set(selectedAssets);
      if (newSelectedAssets.has(assetPath)) {
        newSelectedAssets.delete(assetPath);
      } else {
        newSelectedAssets.add(assetPath);
      }
      setSelectedAssets(newSelectedAssets);
    }
  };

  const selectAllAssets = () => {
    setSelectedAssets(new Set(loadedAssets));
  };

  const deselectAllAssets = () => {
    setSelectedAssets(new Set());
  };

  const downloadSelectedAssets = async () => {
    if (selectedAssets.size === 0) return;

    setIsLoading(true);

    try {
      const zip = new JSZip();
      const promises = Array.from(selectedAssets).map(async (assetPath) => {
        try {
          const response = await fetch(assetPath);
          if (!response.ok) throw new Error(`Failed to fetch ${assetPath}`);

          const blob = await response.blob();
          // Get just the filename without the path
          const filename = assetPath.split("/").pop() || "";
          zip.file(filename, blob);
        } catch (error) {
          console.error(`Error downloading ${assetPath}:`, error);
          // Continue with other files even if one fails
        }
      });

      await Promise.all(promises);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${slug}-assets.zip`);
    } catch (error) {
      console.error("Error downloading assets:", error);
      alert("Failed to download assets. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAllAnimations = async () => {
    if (!hasAnimations || animations.length === 0) {
      alert("No animations available for this character.");
      return;
    }

    setIsDownloadingAnimations(true);

    try {
      const zip = new JSZip();
      const animationsFolder = zip.folder("animations");

      const promises = animations.map(async (animationName) => {
        try {
          // Construct the animation file path
          const animationPath = `/assets/character-animations/${slug}/${animationName}.mp4`;

          const response = await fetch(animationPath);
          if (!response.ok) throw new Error(`Failed to fetch ${animationPath}`);

          const blob = await response.blob();
          animationsFolder?.file(`${animationName}.mp4`, blob);
        } catch (error) {
          console.error(`Error downloading animation ${animationName}:`, error);
          // Continue with other animations even if one fails
        }
      });

      await Promise.all(promises);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${slug}-animations.zip`);
    } catch (error) {
      console.error("Error downloading animations:", error);
      alert("Failed to download animations. Please try again.");
    } finally {
      setIsDownloadingAnimations(false);
    }
  };

  // Helper function to get a display name from a file path
  const getDisplayName = (filePath: string): string => {
    const fileName = filePath.split("/").pop() || "";

    // Replace hyphens with spaces and remove file extension
    let displayName = fileName.replace(".png", "").replace(/-/g, " ");

    // If it's an outfit file with the character slug prefix, remove it
    const slugWithSpace = `${slug.replace(/-/g, " ")} `;
    if (displayName.toLowerCase().startsWith(slugWithSpace.toLowerCase())) {
      displayName = displayName.substring(slugWithSpace.length);
    }

    // Capitalize each word
    displayName = displayName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return displayName;
  };

  return (
    <div className="border-2 bg-white dark:bg-black border-gray-400 rounded-xl mt-6 p-4">
      <div className="flex border-b border-gray-600 mb-4 overflow-x-auto">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "animations" ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-400" : "text-black dark:text-gray-400  hover:text-red-600 transition-colors"
          }`}
          onClick={() => setActiveTab("animations")}
        >
          Animations
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "outfits" ? "text-teal-400 border-b-2 border-teal-600 dark:border-teal-400" : "text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
          }`}
          onClick={() => setActiveTab("outfits")}
        >
          Outfits
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "trailers" ? "text-teal-400 border-b-2 border-teal-600 dark:border-teal-400" : "text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
          }`}
          onClick={() => setActiveTab("trailers")}
        >
          Trailers
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "imagery" ? "text-teal-400 border-b-2 border-teal-600 dark:border-teal-400" : "text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors"
          }`}
          onClick={() => setActiveTab("imagery")}
        >
          Imagery
        </button>
      </div>

      <div>
        {activeTab === "animations" &&
          (hasAnimations ? (
            <CharacterAnimationsWrapper animations={animations} slug={slug} />
          ) : (
            <div className="w-full p-4">
              <p className="text-gray-600 dark:text-gray-400">No animations available for this character.</p>
            </div>
          ))}

        {activeTab === "outfits" && <CharacterOutfitsWrapper character={character} slug={slug} />}

        {activeTab === "trailers" && <YouTubeEmbedWrapper character={character} />}

        {activeTab === "imagery" && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="space-x-2">
                <button
                  onClick={selectAllAssets}
                  className="bg-gray-700 hover:bg-red-600 text-white hover:text-black p-2 rounded-xl transition-colors font-bebasFont text-xl"
                  disabled={loadedAssets.size === 0}
                >
                  Select All Assets ({loadedAssets.size})
                </button>
                <button
                  onClick={deselectAllAssets}
                  className="bg-gray-700 hover:bg-red-600 hover:text-black p-2 rounded-xl text-white transition-colors font-bebasFont text-xl disabled:bg-gray-400 disabled:hover:text-white disabled:cursor-not-allowed"
                  disabled={selectedAssets.size === 0}
                >
                  Deselect All Assets
                </button>
              </div>

              <div className="flex gap-2">
                {hasAnimations && animations.length > 0 && (
                  <button
                    onClick={downloadAllAnimations}
                    disabled={isDownloadingAnimations}
                    className={`px-4 py-2 rounded-md text-white ${
                      isDownloadingAnimations ? "bg-gray-700 cursor-not-allowed" : "bg-gray-700 hover:bg-red-600 hover:text-black"
                    } transition-colors font-bebasFont text-xl`}
                  >
                    {isDownloadingAnimations ? "Downloading..." : `Download All Animations (${animations.length})`}
                  </button>
                )}

                <button
                  onClick={downloadSelectedAssets}
                  disabled={selectedAssets.size === 0 || isLoading}
                  className={`px-4 py-2 rounded-md text-white ${
                    selectedAssets.size === 0 || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 hover:bg-red-600 hover:text-black"
                  } transition-colors font-bebasFont text-xl`}
                >
                  {isLoading ? "Preparing Download..." : `Download Selected Assets (${selectedAssets.size})`}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assetCategories.map((category) =>
                category.files.map((file) => {
                  const assetPath = `/assets/${category.path}/${file}`;

                  // Skip rendering assets that have already failed to load
                  if (failedAssets.has(assetPath)) {
                    return null;
                  }

                  return (
                    <div
                      key={assetPath}
                      className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${selectedAssets.has(assetPath) ? "border-teal-400 bg-teal-900/20" : "border-gray-600 hover:border-gray-400"}`}
                      onClick={() => toggleAsset(assetPath)}
                    >
                      <div className="relative aspect-video mb-2 bg-gray-800 rounded overflow-hidden">
                        <Image src={assetPath} alt={getDisplayName(file)} fill className="object-contain" onLoad={() => handleImageLoad(assetPath)} onError={() => handleImageError(assetPath)} />
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" checked={selectedAssets.has(assetPath)} onChange={() => toggleAsset(assetPath)} className="mr-2 h-4 w-4 accent-teal-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate">{category.name}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {loadedAssets.size === 0 && failedAssets.size > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No assets found for this character.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
