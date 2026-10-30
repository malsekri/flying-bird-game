# Flying Bird

Flying Bird is a small browser arcade game built with **Phaser 3**, **TypeScript**, and **Vite**.

Flap- I mean, Flying Bird is a game where you flap through an endless set of pipes, build up your score, and try to stay alive as the game gradually speeds up.

I built this as a simple arcade project with the assistance of AI, but I wanted the code around it to be clean too. The game has separate scenes and systems, automated tests, CI, responsive scaling, and automatic deployment.

**Play it here:**  
https://malsekri.github.io/flying-bird-game/

## Gameplay

The controls are simple:

| Input       | Action                            |
| ----------- | --------------------------------- |
| `Space`     | Start, flap, or retry             |
| Click / Tap | Start, flap, or retry             |
| `Escape`    | Return to the menu from Game Over |
| `M`         | Toggle sound                      |

The opening is fairly forgiving, but the game starts getting faster after the first several seconds.

Your best score is saved locally in the browser.

## Features

- Keyboard, mouse, and touch controls
- Responsive browser gameplay
- Bird physics and flap animation
- Randomised pipe gaps
- Progressive difficulty
- Score and local high-score tracking
- Score, flap, and death feedback
- Original SVG artwork
- Moonlit visual style with subtle background movement
- Flap, score, and death sound effects
- Sound controls
- Mobile and browser polish
- Automated tests and code quality checks
- GitHub Actions CI
- Automatic GitHub Pages deployment

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

There is no React, Vue, or other frontend framework. It is just a small Phaser app.

## Running Locally

You'll need **Node.js 22.12 or newer**.

```bash
git clone https://github.com/malsekri/flying-bird-game.git
cd flying-bird-game
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run lint
npm run typecheck
npm run test
npm run format:check
npm run check
```

## Project Structure

```text
src/
├── config/
├── entities/
│   ├── Bird.ts
│   └── PipePair.ts
├── scenes/
│   ├── BootScene.ts
│   ├── MenuScene.ts
│   ├── GameScene.ts
│   └── GameOverScene.ts
├── services/
│   ├── AudioService.ts
│   └── StorageService.ts
├── systems/
│   ├── ParallaxBackground.ts
│   ├── PipeSpawner.ts
│   └── difficulty.ts
├── ui/
│   └── MuteControl.ts
├── main.ts
└── style.css

public/assets/
├── audio/
└── visual/

tests/

.github/workflows/
├── ci.yml
└── deploy.yml
```

The game flow is:

```text
BootScene
    ↓
MenuScene
    ↓
GameScene
    ↓
GameOverScene
```

`Bird` handles the player's movement and flap state.

`PipePair` handles individual obstacles and scoring.

`PipeSpawner` handles pipe timing, spawning, and speed.

The difficulty calculation is kept separate so it can be tested and tuned without running a full Phaser scene.

## Difficulty

Difficulty is based on how long the current run has lasted.

The game starts relatively slowly, then increases pipe speed and reduces the time between new pipes. Both values have limits so the difficulty keeps increasing without becoming completely uncontrolled.

## CI and Deployment

Pull requests and pushes to `main` run:

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

Successful changes to `main` are automatically deployed to GitHub Pages.

## Planned Improvements

- Three-letter arcade leaderboard using Supabase
- More automated test coverage
- Gameplay screenshots and GIFs for the README
- Further visual polish

## Assets

The current visual and audio assets were created specifically for this project.

If third-party assets are added later, they will be documented in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## About the Project

This is a small game, but I wanted to treat it like a proper software project instead of putting everything into one file and calling it done.

The goal is to keep it fun to play, easy to understand, and straightforward to keep improving.
