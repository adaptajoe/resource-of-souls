#!/bin/bash

# Find all GIF files recursively in current directory
find . -name "*.gif" | while read -r gif; do
    # Create PNG filename by replacing .gif with .png
    png="${gif%.gif}.png"
    
    # Check if PNG file doesn't exist
    if [ ! -f "$png" ]; then
        echo "Processing: $gif -> $png"
        # Extract first frame using ffmpeg
        ffmpeg -i "$gif" -vframes 1 "$png"
    else
        echo "Skipping: $png already exists"
    fi
done
