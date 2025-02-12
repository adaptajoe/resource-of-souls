import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-static"; // Ensure the route is configured for static export

export async function GET() {
  try {
    const fullbodyPath = path.join(process.cwd(), "public/assets/character-fullbody");
    const files = await fs.readdir(fullbodyPath);

    // Get unique character IDs from filenames
    const characters = [
      ...new Set(
        files
          .map((file) => {
            const match = file.match(/^(.*?)-(?:base|dlc)-outfit/);
            return match ? match[1] : null;
          })
          .filter(Boolean)
      ),
    ].map((id) => ({
      id,
      name: id!
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));

    return NextResponse.json(characters);
  } catch (error) {
    console.error("Error reading character directory:", error);
    return NextResponse.json({ error: "Failed to fetch characters" }, { status: 500 });
  }
}
