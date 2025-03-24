import { promises as fs } from "fs";
import path from "path";
import { ICharacterData } from "@/types/characterDataTypes";

async function fetchCharacterData() {
  try {
    // Get the directory containing individual character JSON files
    const charactersDir = path.join(process.cwd(), "src/data/characters");

    // Read all files in the directory
    const files = await fs.readdir(charactersDir);

    // Initialize an object to store all character data
    const characterData: Record<string, ICharacterData> = {};

    // Process each JSON file
    for (const file of files) {
      if (file.endsWith(".json")) {
        // Read and parse each character file
        const filePath = path.join(charactersDir, file);
        const fileContent = await fs.readFile(filePath, "utf8");
        const characterInfo = JSON.parse(fileContent) as ICharacterData;

        // Use the filename (without .json) as the character key
        const characterId = file.replace(".json", "");
        characterData[characterId] = characterInfo;
      }
    }

    // Save the character data to a static JSON file
    const outputPath = path.join(process.cwd(), "public", "characterData.json");
    await fs.writeFile(outputPath, JSON.stringify(characterData, null, 2), "utf8");

    console.log("Character data fetched and saved successfully.");
  } catch (error) {
    console.error("Error fetching character data:", error);
    process.exit(1);
  }
}

fetchCharacterData();
