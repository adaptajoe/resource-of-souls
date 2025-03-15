#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Function to find all MP4 files recursively
function findMP4Files(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findMP4Files(filePath, fileList);
    } else if (path.extname(file).toLowerCase() === ".mp4") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Process each MP4 file
function processMP4Files() {
  const mp4Files = findMP4Files(".");

  mp4Files.forEach((mp4) => {
    const png = mp4.replace(/\.mp4$/i, ".png");

    if (!fs.existsSync(png)) {
      console.log(`Processing: ${mp4} -> ${png}`);
      try {
        execSync(`ffmpeg -i "${mp4}" -vframes 1 "${png}"`, { stdio: "inherit" });
      } catch (error) {
        console.error(`Error processing ${mp4}: ${error.message}`);
      }
    } else {
      console.log(`Skipping: ${png} already exists`);
    }
  });
}

// Check if ffmpeg is installed
try {
  execSync("ffmpeg -version", { stdio: "ignore" });
  processMP4Files();
} catch (error) {
  console.error("Error: ffmpeg is not installed or not in PATH");
  console.error("Please install ffmpeg to use this script:");
  console.error("- Windows: https://ffmpeg.org/download.html");
  console.error("- Mac: brew install ffmpeg");
  console.error("- Linux: apt-get install ffmpeg or equivalent");
  process.exit(1);
}
