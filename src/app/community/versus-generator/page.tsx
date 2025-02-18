"use client";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

interface Character {
  id: string;
  name: string;
}

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export default function VersusGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [mirrorPlayer1, setMirrorPlayer1] = useState(false);
  const [mirrorPlayer2, setMirrorPlayer2] = useState(false);
  const [player1Silhouette, setPlayer1Silhouette] = useState(false);
  const [player2Silhouette, setPlayer2Silhouette] = useState(false);
  const [borderPlayer1, setBorderPlayer1] = useState(false);
  const [borderPlayer2, setBorderPlayer2] = useState(false);
  const [glowPlayer1, setGlowPlayer1] = useState(false);
  const [glowPlayer2, setGlowPlayer2] = useState(false);
  const [glowVS, setGlowVS] = useState(false);
  const [borderCharacter1, setBorderCharacter1] = useState(false);
  const [borderCharacter2, setBorderCharacter2] = useState(false);
  const [quoteColorPlayer1, setQuoteColorPlayer1] = useState("#ffffff");
  const [quoteColorPlayer2, setQuoteColorPlayer2] = useState("#ff0000");

  const [player1, setPlayer1] = useState({
    character: "",
    outfit: "base-outfit-1",
    name: "Player 1",
    quote: "Custom Quote A",
    color: "#ffffff",
    alignment: "left",
    size: "md" as Size,
  });

  const [player2, setPlayer2] = useState({
    character: "",
    outfit: "base-outfit-1",
    name: "Player 2",
    quote: "Custom Quote B",
    color: "#ff0000",
    alignment: "right",
    size: "md" as Size,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [whiteVS, setWhiteVS] = useState(false);
  const [availableOutfits, setAvailableOutfits] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/characters");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharacters(data);

        if (data.length >= 2) {
          setPlayer1((prev) => ({ ...prev, character: data[0].id }));
          setPlayer2((prev) => ({ ...prev, character: data[1].id }));
        }
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  async function checkAvailableOutfits(characterId: string) {
    const outfits = [];

    for (let i = 1; i <= 2; i++) {
      try {
        const url = `/assets/character-fullbody/${characterId}-base-outfit-${i}.png`;
        const response = await fetch(url, { method: "HEAD" });
        if (response.ok) {
          outfits.push(`base-outfit-${i}`);
        }
      } catch {
        // Silently handle the error
      }
    }

    try {
      const url = `/assets/character-fullbody/${characterId}-dlc-outfit-1.png`;
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) {
        outfits.push("dlc-outfit-1");
      }
    } catch {
      // Silently handle the error
    }

    return outfits;
  }

  useEffect(() => {
    const loadOutfits = async () => {
      const outfits: { [key: string]: string[] } = {};
      for (const char of characters) {
        const charOutfits = await checkAvailableOutfits(char.id);
        outfits[char.id] = charOutfits;
      }
      setAvailableOutfits(outfits);
    };

    if (characters.length > 0) {
      loadOutfits();
    }
  }, [characters]);

  const drawCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Enable high quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Clear and set background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const padding = 200; // Adjust this value to change padding
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.lineWidth = 10;
    ctx.strokeRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2);

    // Draw multiple diamonds with different sizes and opacities
    const drawDiamond = (size: number, opacity: number) => {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 15;
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const drawSquare = (size: number, opacity: number) => {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.lineWidth = 15;
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };

    // Draw multiple diamonds with different sizes and opacities
    const baseObjectSize = Math.min(canvas.width, canvas.height) * 0.25;
    drawSquare(baseObjectSize * 1.3, 1); // Largest square
    drawSquare(baseObjectSize * 1.1, 1); // Smaller square
    drawDiamond(baseObjectSize * 1.3, 1); // Larger diamond
    drawDiamond(baseObjectSize * 1.1, 1); // Smallest diamond (will appear on top)

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    try {
      // Load logo
      const logo = await loadImage("/assets/site-assets/bleach-rebirth-of-souls-logo.png");

      // Draw logo at the top center
      const logoWidth = 400;
      const logoHeight = (logo.naturalHeight / logo.naturalWidth) * logoWidth;
      ctx.drawImage(logo, (canvas.width - logoWidth) / 2, 240, logoWidth, logoHeight);

      const drawCharacterWithGlow = (image: HTMLImageElement, x: number, y: number, width: number, height: number, color: string, isSilhouette: boolean, mirror: boolean, border: boolean) => {
        ctx.save();

        if (mirror) {
          ctx.translate(x + width, y);
          ctx.scale(-1, 1);
        } else {
          ctx.translate(x, y);
        }

        if (isSilhouette) {
          // Create a temporary canvas for the glow effect
          const glowCanvas = document.createElement("canvas");
          const glowCtx = glowCanvas.getContext("2d");

          if (glowCtx) {
            glowCanvas.width = width;
            glowCanvas.height = height;

            // Fill with the player's color
            glowCtx.fillStyle = color;
            glowCtx.fillRect(0, 0, width, height);

            // Use the image as a mask
            glowCtx.globalCompositeOperation = "destination-in";
            glowCtx.drawImage(image, 0, 0, width, height);

            // Draw the colored glow
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.filter = "blur(20px)";
            ctx.drawImage(glowCanvas, 0, 0);
            ctx.drawImage(glowCanvas, 0, 0);
            ctx.restore();

            // Draw black silhouette
            ctx.save();
            const tempCanvas = document.createElement("canvas");
            const tempCtx = tempCanvas.getContext("2d");

            if (tempCtx) {
              tempCanvas.width = width;
              tempCanvas.height = height;

              // Fill with black
              tempCtx.fillStyle = "#000000";
              tempCtx.fillRect(0, 0, width, height);

              // Use the image as a mask
              tempCtx.globalCompositeOperation = "destination-in";
              tempCtx.drawImage(image, 0, 0, width, height);

              // Draw the black silhouette
              ctx.drawImage(tempCanvas, 0, 0);
            }
            ctx.restore();
          }
        } else {
          // Draw normal character
          ctx.drawImage(image, 0, 0, width, height);
        }

        if (border) {
          // Create a shadow effect to act as a border
          ctx.save();
          ctx.shadowColor = color;
          ctx.shadowBlur = 50;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.drawImage(image, 0, 0, width, height);
          ctx.restore();
        }

        ctx.restore();
      };

      // Draw the characters using the new function
      if (player1.character && player2.character) {
        const [char1Image, char2Image] = await Promise.all([
          loadImage(`/assets/character-fullbody/${player1.character}-${player1.outfit}.png`),
          loadImage(`/assets/character-fullbody/${player2.character}-${player2.outfit}.png`),
        ]);

        const characterHeight = canvas.height * 0.7;
        const char1Width = (char1Image.naturalWidth / char1Image.naturalHeight) * characterHeight;
        const char2Width = (char2Image.naturalWidth / char2Image.naturalHeight) * characterHeight;

        // Draw Player 1
        drawCharacterWithGlow(char1Image, 350, 100, char1Width, characterHeight, player1.color, player1Silhouette, mirrorPlayer1, borderCharacter1);

        // Draw Player 2
        drawCharacterWithGlow(char2Image, canvas.width - char2Width - 350, 100, char2Width, characterHeight, player2.color, player2Silhouette, mirrorPlayer2, borderCharacter2);
      }

      // Draw VS text
      const drawVSText = (text: string, x: number, y: number, color: string, glow: boolean) => {
        ctx.font = "bold 300px 'Bebas Neue'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = color;
        if (glow) {
          ctx.save();
          ctx.fillStyle = "#000000";
          ctx.strokeStyle = color;
          ctx.lineWidth = 14;
          ctx.strokeText(text, x, y);
          ctx.shadowColor = color;
          ctx.shadowBlur = 200;
          ctx.fillText(text, x, y);
          ctx.restore();
        } else {
          ctx.fillText(text, x, y);
        }
      };

      if (!whiteVS) {
        // Draw V in player1's color
        drawVSText("V", canvas.width / 2 - 56, canvas.height / 1.95, player1.color, glowVS);

        // Draw S in player2's color
        drawVSText("S", canvas.width / 2 + 57, canvas.height / 1.95, player2.color, glowVS);
      } else {
        // Draw full VS in white if whiteVS is true
        drawVSText("VS", canvas.width / 2, canvas.height / 1.95, "#FFFFFF", glowVS);
      }

      // Draw player names and quotes
      const sizeMap: { [key in Size]: number } = {
        xs: 125,
        sm: 150,
        md: 175,
        lg: 200,
        xl: 250,
        xxl: 275,
      };

      const drawText = (text: string, x: number, y: number, textAlign: CanvasTextAlign, size: number, color: string, border: boolean, glow: boolean) => {
        ctx.textAlign = textAlign;
        ctx.fillStyle = color;
        ctx.font = `bold ${size}px 'Bebas Neue'`;
        if (border) {
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 8;
          ctx.strokeText(text, x, y);
        }
        if (glow) {
          ctx.save();
          ctx.fillStyle = "#000000";
          ctx.strokeStyle = color;
          ctx.lineWidth = 14;
          ctx.strokeText(text, x, y);
          ctx.shadowColor = color;
          ctx.shadowBlur = 200;
          ctx.fillText(text, x, y);
          ctx.restore();
        } else {
          ctx.fillText(text, x, y);
        }
      };

      const drawPlayer1Text = (text: string, y: number, size: number, color: string, border: boolean, glow: boolean) => {
        let x: number;
        let textAlign: CanvasTextAlign;

        switch (player1.alignment) {
          case "left":
            x = 350;
            textAlign = "left";
            break;
          case "center":
            x = 900;
            textAlign = "center";
            break;
          case "right":
            x = 1450;
            textAlign = "right";
            break;
          default:
            x = 350;
            textAlign = "left";
        }

        drawText(text, x, y, textAlign, size, color, border, glow);
      };

      const drawPlayer2Text = (text: string, y: number, size: number, color: string, border: boolean, glow: boolean) => {
        let x: number;
        let textAlign: CanvasTextAlign;

        switch (player2.alignment) {
          case "left":
            x = canvas.width - 1450;
            textAlign = "left";
            break;
          case "center":
            x = canvas.width - 900;
            textAlign = "center";
            break;
          case "right":
            x = canvas.width - 350;
            textAlign = "right";
            break;
          default:
            x = canvas.width - 350;
            textAlign = "right";
        }

        drawText(text, x, y, textAlign, size, color, border, glow);
      };

      // Player 1 name and quote
      drawPlayer1Text(player1.name, canvas.height - 500, sizeMap[player1.size], player1.color, borderPlayer1, glowPlayer1);
      drawPlayer1Text(`"${player1.quote}"`, canvas.height - 350, sizeMap[player1.size] / 2, quoteColorPlayer1, borderPlayer1, glowPlayer1);

      // Player 2 name and quote
      drawPlayer2Text(player2.name, canvas.height - 500, sizeMap[player2.size], player2.color, borderPlayer2, glowPlayer2);
      drawPlayer2Text(`"${player2.quote}"`, canvas.height - 350, sizeMap[player2.size] / 2, quoteColorPlayer2, borderPlayer2, glowPlayer2);

      // Source Text
      ctx.textAlign = "right";
      ctx.font = "bold 50px 'Bebas Neue'";
      ctx.fillStyle = "#4b4b4b";
      ctx.fillText("Created with the BLEACH - Resource of Souls Versus Image Generator", canvas.width - 200, canvas.height - 90);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }, [
    player1,
    player2,
    mirrorPlayer1,
    mirrorPlayer2,
    whiteVS,
    player1Silhouette,
    player2Silhouette,
    borderPlayer1,
    borderPlayer2,
    glowPlayer1,
    glowPlayer2,
    glowVS,
    borderCharacter1,
    borderCharacter2,
    quoteColorPlayer1,
    quoteColorPlayer2,
  ]);

  // Set up high DPI canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set fixed dimensions
    canvas.width = 3840;
    canvas.height = 2160;

    drawCanvas();
  }, [drawCanvas]);

  const exportImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement("a");
    link.download = "versus-screen.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between">
      <div className="container ml-8 w-full mt-8">
        <nav className="flex flex-row">
          <Link href="/" className="text-teal-400 hover:underline">
            Home
          </Link>
          <p className="px-2">/</p>
          <Link href="/community" className="text-teal-400 hover:underline">
            Community
          </Link>
          <p className="px-2">/</p>
          <Link href={`/community/versus-generator`} className="text-teal-400 hover:underline">
            Versus Image Generator
          </Link>
        </nav>

        <h1 className="text-3xl font-bold">Versus Image Generator</h1>
        <div className="grid grid-cols-2">
          <p className="mt-4 mb-6">
            Generate versus images to build up hype for your upcoming duel! Whether it be a personal bout, Tournament match, or just for fun, simply select a character and an outfit, add your names
            and a quote, and generate!
          </p>
        </div>
        <hr />
        <div className="grid grid-col-2 xl:grid-cols-4 mt-4 pr-4 xl:pr-0">
          <div className="flex flex-row col-span-2 h-fit pb-4 border-b-2 border-gray-400">
            {/* Player 1 Controls */}
            <div className="border-r-1 border-gray-400 h-fit pr-4 space-y-2">
              <h3 className="text-lg font-bold">Player 1</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 italic mb-1">Player 1 Character</p>
                  <select
                    value={player1.character}
                    onChange={(e) =>
                      setPlayer1((prev) => ({
                        ...prev,
                        character: e.target.value,
                        outfit: availableOutfits[e.target.value]?.[0] || "base-outfit-1",
                      }))
                    }
                    className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                  >
                    {characters.map((char) => (
                      <option key={char.id} value={char.id}>
                        {char.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-xs text-gray-400 italic mb-1">Player 1 Character Outfit</p>
                  <select
                    value={player1.outfit}
                    onChange={(e) => setPlayer1((prev) => ({ ...prev, outfit: e.target.value }))}
                    className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                  >
                    {availableOutfits[player1.character]?.map((outfit) => (
                      <option key={outfit} value={outfit}>
                        {outfit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 1 Name</p>
                    <input
                      type="text"
                      value={player1.name}
                      onChange={(e) => setPlayer1((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Player 1 Name"
                      className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 1 Quote</p>
                    <input
                      type="text"
                      value={player1.quote}
                      onChange={(e) => setPlayer1((prev) => ({ ...prev, quote: e.target.value }))}
                      placeholder="Player 1 Quote"
                      className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 1 Name Color</p>
                    <input
                      type="color"
                      value={player1.color}
                      onChange={(e) => setPlayer1((prev) => ({ ...prev, color: e.target.value }))}
                      className="w-full bg-black text-xs p-0.5 border border-gray-400 text-gray-400 rounded"
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 1 Quote Color</p>
                    <input
                      type="color"
                      value={quoteColorPlayer1}
                      onChange={(e) => setQuoteColorPlayer1(e.target.value)}
                      className="w-full bg-black text-xs p-0.5 border border-gray-400 text-gray-400 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 1 Text Position</p>
                    <select
                      value={player1.alignment}
                      onChange={(e) => setPlayer1((prev) => ({ ...prev, alignment: e.target.value }))}
                      className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 1 Text Sizes</p>
                    <select
                      value={player1.size}
                      onChange={(e) => setPlayer1((prev) => ({ ...prev, size: e.target.value as Size }))}
                      className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                    >
                      <option value="xs">XS</option>
                      <option value="sm">SM</option>
                      <option value="md">MD</option>
                      <option value="lg">LG</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Player 2 Controls */}
            <div className="border-l-2 border-gray-400 h-fit px-4 space-y-2">
              <h3 className="text-lg font-bold">Player 2</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 italic mb-1">Player 2 Character</p>
                  <select
                    value={player2.character}
                    onChange={(e) =>
                      setPlayer2((prev) => ({
                        ...prev,
                        character: e.target.value,
                        outfit: availableOutfits[e.target.value]?.[0] || "base-outfit-1",
                      }))
                    }
                    className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                  >
                    {characters.map((char) => (
                      <option key={char.id} value={char.id}>
                        {char.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-xs text-gray-400 italic mb-1">Player 2 Character Outfit</p>
                  <select
                    value={player2.outfit}
                    onChange={(e) => setPlayer2((prev) => ({ ...prev, outfit: e.target.value }))}
                    className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                  >
                    {availableOutfits[player2.character]?.map((outfit) => (
                      <option key={outfit} value={outfit}>
                        {outfit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 2 Name</p>
                    <input
                      type="text"
                      value={player2.name}
                      onChange={(e) => setPlayer2((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Player 2 Name"
                      className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 2 Quote</p>
                    <input
                      type="text"
                      value={player2.quote}
                      onChange={(e) => setPlayer2((prev) => ({ ...prev, quote: e.target.value }))}
                      placeholder="Player 2 Quote"
                      className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 2 Name Color</p>
                    <input
                      type="color"
                      value={player2.color}
                      onChange={(e) => setPlayer2((prev) => ({ ...prev, color: e.target.value }))}
                      className="w-full bg-black text-xs p-0.5 border border-gray-400 text-gray-400 rounded"
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 2 Quote Color</p>
                    <input
                      type="color"
                      value={quoteColorPlayer2}
                      onChange={(e) => setQuoteColorPlayer2(e.target.value)}
                      className="w-full bg-black text-xs p-0.5 border border-gray-400 text-gray-400 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-row space-x-4">
                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 2 Text Position</p>
                    <select
                      value={player2.alignment}
                      onChange={(e) => setPlayer2((prev) => ({ ...prev, alignment: e.target.value }))}
                      className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <p className="text-xs text-gray-400 italic mb-1">Player 2 Text Sizes</p>
                    <select
                      value={player2.size}
                      onChange={(e) => setPlayer2((prev) => ({ ...prev, size: e.target.value as Size }))}
                      className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
                    >
                      <option value="xs">XS</option>
                      <option value="sm">SM</option>
                      <option value="md">MD</option>
                      <option value="lg">LG</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full col-span-2 ml-0 xl:ml-12">
            <canvas
              ref={canvasRef}
              width="3840"
              height="2160"
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "#000000",
              }}
            />
            <div className="mt-4 flex justify-center">
              <button onClick={exportImage} className="px-4 py-4 font-black rounded-xl bg-gray-800 text-gray-300 hover:bg-red-600 transition-colors">
                Export Image
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 mt-8 space-x-4 xl:space-x-0 xl:-mt-12">
          <div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={borderPlayer1} onChange={(e) => setBorderPlayer1(e.target.checked)} id="border1" />
              <label htmlFor="border1">Border Player 1 Text</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={mirrorPlayer1} onChange={(e) => setMirrorPlayer1(e.target.checked)} id="mirror1" />
              <label htmlFor="mirror1">Mirror Player 1</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={glowPlayer1} onChange={(e) => setGlowPlayer1(e.target.checked)} id="glow1" />
              <label htmlFor="glow1">Glow Player 1 Text</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={borderCharacter1} onChange={(e) => setBorderCharacter1(e.target.checked)} id="borderCharacter1" />
              <label htmlFor="borderCharacter1">Border Player 1 Character</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={player1Silhouette} onChange={(e) => setPlayer1Silhouette(e.target.checked)} id="silhouette1" />
              <label htmlFor="silhouette1">Player 1 Character Silhouette</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={glowVS} onChange={(e) => setGlowVS(e.target.checked)} id="glowVS" />
              <label htmlFor="glowVS">Glow VS Text</label>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={borderPlayer2} onChange={(e) => setBorderPlayer2(e.target.checked)} id="border2" />
              <label htmlFor="border2">Border Player 2 Text</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={mirrorPlayer2} onChange={(e) => setMirrorPlayer2(e.target.checked)} id="mirror2" />
              <label htmlFor="mirror2">Mirror Player 2</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={glowPlayer2} onChange={(e) => setGlowPlayer2(e.target.checked)} id="glow2" />
              <label htmlFor="glow2">Glow Player 2 Text</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={borderCharacter2} onChange={(e) => setBorderCharacter2(e.target.checked)} id="borderCharacter2" />
              <label htmlFor="borderCharacter2">Border Player 2 Character</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={player2Silhouette} onChange={(e) => setPlayer2Silhouette(e.target.checked)} id="silhouette2" />
              <label htmlFor="silhouette2">Player 2 Character Silhouette</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={whiteVS} onChange={(e) => setWhiteVS(e.target.checked)} id="whiteVS" />
              <label htmlFor="whiteVS">White VS Text</label>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <hr />
        </div>
      </div>
    </div>
  );
}
