# Flying Bird

Flying Bird is a small browser arcade game built with **Phaser 3**, **TypeScript**, and **Vite**.

Flap- I mean, Flying Bird is a game where you flap through an endless set of pipes, build up your score, and try to stay alive as the game gradually speeds up.

I built this as a simple arcade project with the assistance of AI, but I wanted the code around it to be clean too. So the game has proper scene separation, testable systems, CI, automated deployment, responsive scaling, and a structure that should be easy to keep building on.

**Play it here:**  
https://malsekri.github.io/flying-bird-game/

## Gameplay

The controls are intentionally simple.

The first few seconds are fairly forgiving, so you can get used to the bird's movement. After that, the game starts picking up speed and pipes begin appearing more often.

Your best score is saved locally in the browser, so you can come back and try to beat it later.

## Controls

| Input       | Action                            |
| ----------- | --------------------------------- |
| `Space`     | Start, flap, or retry             |
| Click / Tap | Start, flap, or retry             |
| `Escape`    | Return to the menu from Game Over |

The same basic controls work across desktop and touch devices.

## Features

- Responsive browser gameplay
- Keyboard, mouse, and touch controls
- Bird physics and flight rotation
- Randomised pipe gaps
- Progressive difficulty
- Score tracking
- Local high score saving
- Restart and menu flow
- Original SVG artwork
- Moonlit night-sky visual style
- Automated tests and code quality checks
- GitHub Actions CI
- Automatic GitHub Pages deployment

## Visual Style

The current artwork was made specifically for the project.

The game uses a dark moonlit background, cool blue-grey pipes, and a brighter bird so the player is easy to see during gameplay.

The art is still fairly simple on purpose. There is room to build on it later with animation, particles, parallax, and other small effects without having to redesign the whole game.

## Tech Stack

- **Phaser 3** for the game engine
- **TypeScript** for the game code
- **Vite** for local development and production builds
- **Phaser Arcade Physics** for movement and collisions
- **Vitest** for tests
- **ESLint** for linting
- **Prettier** for formatting
- **GitHub Actions** for CI and deployment
- **GitHub Pages** for hosting
- **localStorage** for saving the local high score

There is no React, Vue, or other frontend framework here. It is just a small Phaser app.

## Running Locally

You'll need **Node.js 22.12 or newer**.

Clone the repo and install the dependencies:

```bash
git clone https://github.com/malsekri/flying-bird-game.git
cd flying-bird-game
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal.

## Useful Commands

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the local Vite dev server          |
| `npm run build`        | Type-check and create a production build |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Run ESLint                               |
| `npm run lint:fix`     | Fix supported lint issues                |
| `npm run format`       | Format the project with Prettier         |
| `npm run format:check` | Check formatting without changing files  |
| `npm run typecheck`    | Run TypeScript checks                    |
| `npm run test`         | Run the test suite                       |
| `npm run test:watch`   | Run tests in watch mode                  |
| `npm run check`        | Run the full quality check               |

To run everything in one go:

```bash
npm run check
```

## Project Structure

The game is split up by responsibility instead of putting everything into one big Phaser scene.

```text
src/
├── config/
│   ├── constants.ts
│   └── game.ts
│
├── entities/
│   ├── Bird.ts
│   └── PipePair.ts
│
├── scenes/
│   ├── BootScene.ts
│   ├── MenuScene.ts
│   ├── GameScene.ts
│   └── GameOverScene.ts
│
├── services/
│   └── StorageService.ts
│
├── systems/
│   ├── PipeSpawner.ts
│   └── difficulty.ts
│
├── main.ts
└── style.css

public/
└── assets/
    └── visual/
        ├── background.svg
        ├── bird.svg
        └── pipe.svg

tests/

.github/
└── workflows/
    ├── ci.yml
    └── deploy.yml
```

### Scenes

The game flow is simple:

```text
BootScene
    ↓
MenuScene
    ↓
GameScene
    ↓
GameOverScene
```

Each scene handles one part of the game rather than trying to do everything at once.

### Entities

`Bird` handles the player's physics, flapping, movement limits, hitbox, and flight rotation.

`PipePair` represents one obstacle and keeps track of its movement, lifetime, and whether it has already awarded a point.

### Systems

`PipeSpawner` handles spawning, timing, active pipe pairs, and current pipe speed.

The difficulty calculation lives in a separate helper so it can be tested without needing to spin up a full Phaser scene.

### Services

`StorageService` handles the local high score using browser `localStorage`.

The game works without any backend or external service.

## Game Resolution

The game uses a logical resolution of:

```text
288 × 512
```

Phaser scales that canvas to fit different browser sizes while keeping the actual game coordinates consistent.

That makes the gameplay predictable without locking the game to one screen size.

## Difficulty

Difficulty is based on how long the current run has lasted.

The beginning is kept fairly relaxed. After around the first ten seconds, pipe speed starts increasing more noticeably and the time between new pipes starts getting shorter.

The game keeps getting harder from there, but both values have limits so the pacing does not spiral into something completely ridiculous.

The difficulty logic is kept separate from the spawner itself, which also makes it easier to test and tune.

## CI and Deployment

The project uses GitHub Actions for both CI and deployment.

Pull requests into `main`, and pushes to `main`, run checks for:

```text
Formatting
    ↓
Linting
    ↓
TypeScript
    ↓
Tests
    ↓
Production build
```

The deployment workflow then builds the Vite app and publishes it to GitHub Pages.

The live version is here:

https://malsekri.github.io/flying-bird-game/

## Planned Improvements

There is still plenty I want to add:

- Bird flap animation
- Better game feel and feedback
- Particles
- Parallax background movement
- Sound effects
- Mute controls
- More mobile and browser polish
- Three-letter arcade leaderboard using Supabase
- Gameplay screenshots and GIFs for the README

The leaderboard is planned as an extra feature. The core game will still work without it.

## Assets

The current bird, pipe, and background artwork was created specifically for this project.

If third-party assets are added later, they will be documented in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## About the Project

This is a small game, but I wanted to treat it like a proper software project instead of just throwing everything into one file and calling it done.

The main goal is to keep it fun to play, easy to understand, and straightforward to keep improving.
