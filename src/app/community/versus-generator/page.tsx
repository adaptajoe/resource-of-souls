"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Character {
  id: string;
  name: string;
}

export default function VersusGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [mirrorPlayer1, setMirrorPlayer1] = useState(false);
  const [mirrorPlayer2, setMirrorPlayer2] = useState(false);
  const [player1Silhouette, setPlayer1Silhouette] = useState(false);
  const [player2Silhouette, setPlayer2Silhouette] = useState(false);

  const [player1, setPlayer1] = useState({
    character: "",
    outfit: "base-outfit-1",
    name: "Player 1",
    quote: "Custom Quote",
    color: "#ffffff",
  });

  const [player2, setPlayer2] = useState({
    character: "",
    outfit: "base-outfit-1",
    name: "Player 2",
    quote: "Custom Quote",
    color: "#ff0000",
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
        console.log("Fetched characters:", data);
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
          console.log(`Found base outfit ${i} for ${characterId}`);
          outfits.push(`base-outfit-${i}`);
        }
      } catch (error) {
        ("error");
      }
    }

    try {
      const url = `/assets/character-fullbody/${characterId}-dlc-outfit-1.png`;
      console.log(`Checking ${url}...`);
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) {
        console.log(`Found DLC outfit for ${characterId}`);
        outfits.push("dlc-outfit-1");
      }
    } catch (error) {
      ("error");
    }

    return outfits;
  }

  useEffect(() => {
    const loadOutfits = async () => {
      const outfits: { [key: string]: string[] } = {};
      for (const char of characters) {
        console.log(`Checking outfits for ${char.id}...`);
        const charOutfits = await checkAvailableOutfits(char.id);
        console.log(`Found outfits for ${char.id}:`, charOutfits);
        outfits[char.id] = charOutfits;
      }
      console.log("All available outfits:", outfits);
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

      const drawCharacterWithGlow = (image: HTMLImageElement, x: number, y: number, width: number, height: number, color: string, isSilhouette: boolean, mirror: boolean) => {
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
        drawCharacterWithGlow(char1Image, 350, 100, char1Width, characterHeight, player1.color, player1Silhouette, mirrorPlayer1);

        // Draw Player 2
        drawCharacterWithGlow(char2Image, canvas.width - char2Width - 350, 100, char2Width, characterHeight, player2.color, player2Silhouette, mirrorPlayer2);
      }

      // Draw VS text
      if (!whiteVS) {
        // Draw V in player1's color
        ctx.font = "bold 300px 'Bebas Neue'";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = player1.color;
        ctx.fillText("V", canvas.width / 2 - 10, canvas.height / 1.95);

        // Draw S in player2's color
        ctx.textAlign = "left";
        ctx.fillStyle = player2.color;
        ctx.fillText("S", canvas.width / 2 + 10, canvas.height / 1.95);
      } else {
        // Draw full VS in white if whiteVS is true
        ctx.font = "bold 300px 'Bebas Neue'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("VS", canvas.width / 2, canvas.height / 1.95);
      }

      // Draw player names and quotes
      ctx.font = "bold 200px 'Bebas Neue'";

      // Player 1 name and quote
      ctx.textAlign = "left";
      ctx.fillStyle = player1.color;
      ctx.fillText(player1.name, 350, canvas.height - 500);
      ctx.font = "100px 'Bebas Neue'";
      ctx.fillText(`"${player1.quote}"`, 350, canvas.height - 350);

      // Player 2 name and quote
      ctx.textAlign = "right";
      ctx.font = "bold 200px 'Bebas Neue'";
      ctx.fillStyle = player2.color;
      ctx.fillText(player2.name, canvas.width - 350, canvas.height - 500);
      ctx.font = "100px 'Bebas Neue'";
      ctx.fillText(`"${player2.quote}"`, canvas.width - 350, canvas.height - 350);

      // Source Text
      ctx.textAlign = "right";
      ctx.font = "bold 50px 'Bebas Neue'";
      ctx.fillStyle = "#4b4b4b";
      ctx.fillText("Created with the BLEACH - Resource of Souls Versus Image Generator", canvas.width - 200, canvas.height - 90);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }, [player1, player2, mirrorPlayer1, mirrorPlayer2, whiteVS, player1Silhouette, player2Silhouette]);

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
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Player 1 Controls */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Player 1</h3>
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
              <input
                type="text"
                value={player1.name}
                onChange={(e) => setPlayer1((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Player 1 Name"
                className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
              />

              <input
                type="text"
                value={player1.quote}
                onChange={(e) => setPlayer1((prev) => ({ ...prev, quote: e.target.value }))}
                placeholder="Player 1 Quote"
                className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
              />

              <input
                type="color"
                value={player1.color}
                onChange={(e) => setPlayer1((prev) => ({ ...prev, color: e.target.value }))}
                className="w-full bg-black text-xs p-0.5 border border-gray-400 text-gray-400 rounded"
              />
            </div>

            {/* Player 2 Controls */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Player 2</h3>
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

              <input
                type="text"
                value={player2.name}
                onChange={(e) => setPlayer2((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Player 2 Name"
                className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
              />

              <input
                type="text"
                value={player2.quote}
                onChange={(e) => setPlayer2((prev) => ({ ...prev, quote: e.target.value }))}
                placeholder="Player 2 Quote"
                className="w-full bg-black text-xs p-2 border border-gray-400 text-gray-400 rounded"
              />

              <input
                type="color"
                value={player2.color}
                onChange={(e) => setPlayer2((prev) => ({ ...prev, color: e.target.value }))}
                className="w-full bg-black text-xs p-0.5 border border-gray-400 text-gray-400 rounded"
              />
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={mirrorPlayer1} onChange={(e) => setMirrorPlayer1(e.target.checked)} id="mirror1" />
              <label htmlFor="mirror1">Mirror Player 1</label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={mirrorPlayer2} onChange={(e) => setMirrorPlayer2(e.target.checked)} id="mirror2" />
              <label htmlFor="mirror2">Mirror Player 2</label>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <input type="checkbox" checked={whiteVS} onChange={(e) => setWhiteVS(e.target.checked)} id="whiteVS" />
              <label htmlFor="whiteVS">White VS Text</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={player1Silhouette} onChange={(e) => setPlayer1Silhouette(e.target.checked)} id="silhouette1" />
              <label htmlFor="silhouette1">Player 1 Character Silhouette</label>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={player2Silhouette} onChange={(e) => setPlayer2Silhouette(e.target.checked)} id="silhouette2" />
              <label htmlFor="silhouette2">Player 2 Character Silhouette</label>
            </div>
          </div>
        </div>

        <div className="flex-1">
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
            <button onClick={exportImage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Export Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
