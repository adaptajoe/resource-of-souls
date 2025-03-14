// app/api/characters/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ICharacterData } from "@/types/characterDataTypes";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get the directory containing individual character JSON files
    const charactersDir = path.join(process.cwd(), 'src/data/characters');
    
    // Read all files in the directory
    const files = await fs.readdir(charactersDir);
    
    // Initialize an object to store all character data
    const characterData: Record<string, ICharacterData> = {};
    
    // Process each JSON file
    for (const file of files) {
      if (file.endsWith('.json')) {
        // Read and parse each character file
        const filePath = path.join(charactersDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const characterInfo = JSON.parse(fileContent) as ICharacterData;
        
        // Use the filename (without .json) as the character key
        const characterId = file.replace('.json', '');
        characterData[characterId] = characterInfo;
      }
    }
    
    // Return all character data
    return NextResponse.json(characterData);
    
  } catch (error) {
    console.error("Error loading character data:", error);
    return NextResponse.json(
      { error: "Failed to load character data" }, 
      { status: 500 }
    );
  }
}
