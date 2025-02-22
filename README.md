## Getting Started

First, clone the repository by clicking "Download ZIP" or by cloning via CLI, navigate to it in your Terminal, and run `npm i`. Afterwards, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3001) with your browser to see the result.

## Contributing

To contribute, simply open a Pull Request and tag @adaptajoe as the reviewer. Pushing commits to `main` and forcing PRs in via `no-verify` (So with no reviews) will lead to your changes being reversed, and you being immediately banned permanently.

### Adding or Editing Character Information

To edit Character information, edit `src/data/characterData.json`. It should be clear enough to understand which field does what just by reading the file.

### Adding new Animation MP4s

To add MP4s to a Character's page, add them to `public/assets/character-animations/CHARACTER`. Please note that MP4s should follow the following naming convention:

- Special characters are required for ability glossary (I.E. Kidō, Murciélago) in all cases.
- Each character's 'Intro' animation is called `intro.mp4`.
- Each character's 'Surprised' animation is called `being-countered.mp4`.
- Character moves should just be their technique name, so `TECHNIQUE-NAME.mp4`.
- Each character's 'Awakening' animation is called `TECHNIQUE-NAME-awakening.mp4`. For instance, `reiryoku-sealing-eyepatch-removal-awakening.mp4`.
- Each character's 'Reawakening' animation is called `TECHNIQUE-NAME-reawakening.mp4`. For instance, `full-hollowfication-reawakening.mp4`.
- For Bankai and Ressureccions, we should have that term be at the start, so `UPGRADE-TECHNIQUE-NAME-awakening.mp4`. For instance, `bankai-senbonzakura-kageyoshi-awakening.mp4`
- Each character's 'Kikon Move' animation is called `TECHNIQUE-NAME-kikon-move.mp4`. For instance, `
- Each character's basic 'Victory' animation is called `victory-screen.mp4`.
- For different 'Victory' animations like Awakened or Reawakened, files should be called `STATE-victory-screen.mp4`.

A good example character to see this convention in action is `Ulquiorra Shifar`.

After adding new MP4s, please run `extract-first-frames.sh`.
