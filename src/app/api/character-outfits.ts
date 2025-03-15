import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-static";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Invalid character slug" }, { status: 400 });
  }

  try {
    const fullbodyPath = path.join(process.cwd(), "public/assets/character-fullbody", slug);
    const files = await fs.readdir(fullbodyPath);

    const outfits = files
      .filter((file) => file.endsWith(".png"))
      .map((file) => file.replace(".png", ""));

    return NextResponse.json({ outfits });
  } catch (error) {
    console.error("Error reading character directory:", error);
    return NextResponse.json({ error: "Failed to fetch outfits" }, { status: 500 });
  }
}
