#!/bin/bash

# Base directory (absolute path)
base_dir="$(pwd)"

# Find all files with _converted.mp4 in the base directory and its subdirectories
find "$base_dir" -type f -name "*_converted.mp4" | while read -r file; do
  echo "Processing file: $file"
  
  # Get the directory and filename without _converted
  dir=$(dirname "$file")
  filename=$(basename "$file".mp4)
  
  # Original file path
  original_file="$dir/$filename.mp4"
  
  echo "Original file path: $original_file"
  
  # If the original file exists, remove it
  if [ -f "$original_file" ]; then
    echo "Removing original file: $original_file"
    rm "$original_file"
  fi
  
  # Rename the _converted.mp4 file to .mp4
  echo "Renaming $file to $original_file"
  mv "$file" "$original_file"
done
