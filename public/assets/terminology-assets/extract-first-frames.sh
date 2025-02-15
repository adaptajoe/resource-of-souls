#!/bin/bash

# Directory containing the GIFs
GIF_DIR="public/assets/terminology-assets"
# Directory to save the first-frame PNGs
PNG_DIR="public/assets/terminology-assets"

# Create the PNG directory if it doesn't exist
mkdir -p $PNG_DIR

# Loop through all GIF files in the GIF directory
for gif in $GIF_DIR/*.gif; do
  # Extract the filename without the extension
  filename=$(basename "$gif" .gif)
  # Generate the first-frame PNG
  ffmpeg -i "$gif" -vf "select=eq(n\,0)" -q:v 3 "$PNG_DIR/$filename.png"
done
