#!/bin/bash

# Directory containing the MP4s
MP4_DIR="public/assets/terminology-assets"
# Directory to save the first-frame PNGs
PNG_DIR="public/assets/terminology-assets"

# Create the PNG directory if it doesn't exist
mkdir -p $PNG_DIR

# Loop through all mp4 files in the mp4 directory
for mp4 in $MP4/*.mp4; do
  # Extract the filename without the extension
  filename=$(basename "$mp4" .mp4)
  # Generate the first-frame PNG
  ffmpeg -i "$mp4" -vf "select=eq(n\,0)" -q:v 3 "$PNG_DIR/$filename.png"
done
