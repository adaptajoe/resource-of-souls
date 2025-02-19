#!/bin/bash

# Find all MP4 files recursively in current directory
find . -name "*.mp4" | while read -r mp4; do
    # Create PNG filename by replacing .mp4 with .png
    png="${mp4%.mp4}.png"
    
    # Check if PNG file doesn't exist
    if [ ! -f "$png" ]; then
        echo "Processing: $mp4 -> $png"
        # Extract first frame using ffmpeg
        ffmpeg -i "$mp4" -vframes 1 "$png"
    else
        echo "Skipping: $png already exists"
    fi
done
