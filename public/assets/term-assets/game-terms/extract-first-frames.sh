#!/bin/bash

# Directory containing the MP4s and to save the first-frame PNGs
DIR="."

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
  echo "ffmpeg could not be found. Please install ffmpeg to use this script."
  exit 1
fi

echo "ffmpeg is installed."

# Create the directory if it doesn't exist (though it should exist as it's the current directory)
mkdir -p "$DIR"
echo "Directory is set to $DIR"

# Check if there are any MP4 files in the directory
shopt -s nullglob
mp4_files=("$DIR"/*.mp4)
shopt -u nullglob

if [ ${#mp4_files[@]} -eq 0 ]; then
  echo "No MP4 files found in the directory $DIR."
  exit 1
fi

echo "Found ${#mp4_files[@]} MP4 files in the directory $DIR."

# Loop through all mp4 files in the directory
for mp4 in "${mp4_files[@]}"; do
  echo "Processing file: $mp4"
  # Extract the filename without the extension
  filename=$(basename "$mp4" .mp4)
  png_file="$DIR/$filename.png"
  
  # Check if the PNG file already exists
  if [ -f "$png_file" ]; then
    echo "PNG file $png_file already exists. Skipping."
    continue
  fi
  
  # Generate the first-frame PNG
  if ffmpeg -i "$mp4" -vf "select=eq(n\,0)" -q:v 3 "$png_file"; then
    echo "Successfully created $png_file"
  else
    echo "Failed to create PNG for $mp4"
  fi
done
