## Getting Started

First, clone the repository by clicking "Download ZIP" or by cloning via CLI, navigate to it in your Terminal, and run `npm i`. Afterwards, navigate to the cloned folder (For instance, `cd downloads/resource-of-souls/`) and run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Before Editing and Contributing

To contribute, first, make sure you have Git installed ([https://github.com/git-guides/install-git](https://github.com/git-guides/install-git)). Then, when you're ready, navigate to the cloned `/resource-of-souls/` folder and you should see `git(main)` in your Terminal.

Run `git pull`, and then run `git checkout -b "CHANGESNAME"`, replacing `CHANGESNAME` with a summary of what you are changing.

This is called a `branch`, and is like your own private version of the site to make copies with.

When you are done making your changes, run `git status`; you should see all the files you've edited in `red`. Make sure there's nothing you don't want to push up accidentally. A good way to see this is to download the `GitHub Desktop` App ([https://desktop.github.com/download/](https://desktop.github.com/download/)), which will show you all the files; your deletions will be in `red`, and your additions will be in `green`. If you have mistaken changes, just undo them.

When you are sure you have only the changes that you want to make live, run `git add --all`, and then run `git status`. All of those files that were `red` should now be `green`. Now run `git commit -m "DESCRIPTION"`, changing `DESCRIPTION` to be a short description of your changes.

Then, once that finishes running, use the command `git push`. Now when that command completes, navigate to `[https://github.com/adaptajoe/resource-of-souls/pulls](https://github.com/adaptajoe/resource-of-souls/pulls)` and you should see a big yellow banner saying `Create Pull Request`. Do that, and add `@adaptajoe` as a `reviewer`. Add a description of what you changed, and then wait for `@adaptajoe` to review your changes.

Once I am happy with your changes, I will merge them into the main branch.

PLEASE NOTE: ANY CHANGES PUSHED STRAIGHT TO THE MAIN BRANCH WILL BE AUTOMATICALLY REVERTED. ONLY CHANGES MADE IN A `PULL REQUEST` WILL BE CONSIDERED.

## Editing and Contributing Character Data

To edit Character Data, find the `resource-of-souls/src/data/characters` folder, and find the Character that you want to edit. Character data is held in `JSON` format, and has the following structure:

- name (The character's name)
- id (The character's name separated by `-`, and in lowercase)
- race (The character's race/s)
- quote (A quote used by the character from the Manga)
- description (A description of how the character plays)
- tags
  - affiliations (What factions is this character affiliated with)
  - relationships (What's this character's relationship to Ichigo?)
  - abilities (What can this character do?)
  - characteristics (What other tags are there for the character, like appearance, rank, role, etc)
- characterEaseOfUse (The character's Control Level)
- characterArchetype (Templates of how the character plays and what they can do)
- characterJpTrailer (URL from the YouTube Embed)
- characterEngTrailer (URL from the YouTube Embed)
- characterNumber (The character's order in which they were announced)
- isEcho (Is the character a sort of Skin? This may be removed later)
- tldr (A super-short guide on how to play the character)
- characterOutfits (What outfits does the character have? `1` means Base Outfit 1, and `DLC1` means their first DLC outfit)
- abilities
  - abilityName (The character's ability name)
  - abilityQuote (The character's ability release quote)
  - abilityQuoteTemplate (The pattern that the two fields above should follow for formatting)
- moves (Very complex; I advise you just look at the data and try learn from there)
  - base
  - etc
- stats (The character's stats)
- trivia (Any interesting facts about the character should go here)
- show (Toggle wether or not the character should be shown or not)

After editing a character's data, go back to the root directory (`/resource-of-souls`) and run `chmod +x combineCharacters.js` whilst inside of `/resource-of-souls/`. Then run `node combineCharacters.js`. This will take every character's JSON file and compile it into `characterData.json`.

PLEASE NOTE: DO NOT EDIT `characterData.json` AS ANY EDITS WILL BE REWRITTEN, AND YOUR CHANGES WILL BE LOST.

## Editing and Contributing Character Animations

To contribute Character Animations, find the `/resource-of-souls/public/assets/character-animations/` folder - There you'll find every character split into separate folders.

To add a new animation, simply drop it into the target character's folder.

To edit an existing animation, like renaming it, just rename the animation's `.mp4` and `.png` files.

Animations follow a specific naming convention; specifically:

- Animations are in lowercase.
- Animations can have special characters, such as `á, é, ō, ū, etc`, but CANNOT have `:`.
- Intro Animations must be simply called `intro`.
- Victory Animations must have the state of the character at the start. So for instance:
  - Base Form Victory Animations would simply be `victory-screen`.
  - Awakened Form Victory Animations would be `awakened-victory-screen`.
  - Reawakened Victory Animations would be `reawakened-victory-screen`.
- Kikon Moves can include the `Hakugeki` dash animation, and should have `-kikon-move` at the end of the file name. So for instance, `slash-kikon-move`.
- Guard Break animations should be called `guard-broken`.
- Perfect Hoho Counter animations should be called `being-countered`.

The rest of the names should be self-explanatory.

After adding new animations, navigate to `/resource-of-souls/public/assets/character-animations/` and run `extractFirstFrames.js`. To do this, in your Terminal, run `chmod +x extractFirstFrames.js` whilst inside of `/resource-of-souls/public/assets/character-animations/`. Then run `node extractFirstFrames.js`.

Animations should adhere to the following rules:

- MP4 Format: MPEG-4 AAC, H.264
- Platform - Any
- User Interface - None (If toggleable)
- Framerate - 60fps
- Resolution - 1080p (1920x1080) to allow for Xbox / PlayStation contributons
- Default color profile
- Stage - Training Map
- Character being fought does not matter
- Character outfits should be their `default` outfits
- Audio should be muted
- No popups like invitations, Steam notifications, etc
- No text on screen
