#!/bin/bash

# Base directory (current directory)
base_dir="."

# Find all MP4 files in the base directory and its subdirectories
find "$base_dir" -type f -name "*.mp4" | while read -r file; do
  # Get the directory and filename without extension
  dir=$(dirname "$file")
  filename=$(basename "$file" .mp4)
  
  # Output file path
  output_file="$dir/${filename}.mp4"
  
  # Convert the file
  ffmpeg -i "$file" -c:v libx264 -c:a aac "$output_file"
done
