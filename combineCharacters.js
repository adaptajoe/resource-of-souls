const fs = require("fs");
const path = require("path");

// Directory containing character JSON files
const charactersDir = path.join(__dirname, "src", "data", "characters");

// Output file path
const outputFile = path.join(__dirname, "src", "data", "characterData.json");

// Function to read and combine all character JSON files
async function combineCharacterData() {
  try {
    // Get all JSON files in the characters directory
    const files = fs.readdirSync(charactersDir).filter((file) => file.endsWith(".json"));

    // Object to store all character data
    const combinedData = {};

    // Process each file
    for (const file of files) {
      const filePath = path.join(charactersDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");

      try {
        // Parse the JSON content
        const characterData = JSON.parse(fileContent);

        // Add character data to the combined object
        // Each file has a single key (character ID) with the character data as its value
        Object.assign(combinedData, characterData);
      } catch (parseError) {
        console.error(`Error parsing ${file}: ${parseError.message}`);
      }
    }

    // Write the combined data to the output file
    fs.writeFileSync(outputFile, JSON.stringify(combinedData, null, 2), "utf8");

    console.log(`Successfully combined ${Object.keys(combinedData).length} character files into ${outputFile}`);
  } catch (error) {
    console.error(`Error combining character data: ${error.message}`);
  }
}

// Run the function
combineCharacterData();
