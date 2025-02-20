#!/bin/bash

# Input file (replace with your actual file path)
input_file="./toshiro-hitsugaya/victory-screen.mp4"

# Get the directory and filename without extension
dir=$(dirname "$input_file")
filename=$(basename "$input_file" .mp4)

# Output file path
output_file="$dir/${filename}_converted.mp4"

# Convert the file
ffmpeg -i "$input_file" -c:v libx264 -c:a aac "$output_file"
