# Flying Bird Game

A work-in-progress Flappy-style browser arcade game foundation built with **Phaser 3**, **TypeScript**, and **Vite**.

> Foundation milestone: project architecture, responsive Phaser canvas, scene wiring, local score service, code-quality tooling, CI, and GitHub Pages deployment are in place. Gameplay mechanics and visual assets come next.

## Tech stack

- Phaser 3.90 with Arcade Physics
- TypeScript
- Vite
- Vitest
- ESLint + Prettier
- GitHub Actions + GitHub Pages
- `localStorage` for local high scores
- Supabase leaderboard planned as an optional service integration

## Project structure

```text
flying-bird-game/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── public/
│   └── assets/
│       ├── audio/
│       ├── sprites/
│       └── ui/
├── src/
│   ├── config/
│   │   ├── constants.ts
│   │   └── game.ts
│   ├── scenes/
│   │   ├── BootScene.ts
│   │   ├── MenuScene.ts
│   │   ├── GameScene.ts
│   │   └── GameOverScene.ts
│   ├── services/
│   │   └── StorageService.ts
│   ├── main.ts
│   └── style.css
├── tests/
│   └── config.test.ts
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting started

Requirements: Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

## Quality checks

```bash
npm run check
```

This runs formatting checks, linting, TypeScript checks, tests, and a production build.

## Production build

```bash
npm run build
npm run preview
```

The Vite production base is configured for the GitHub repository path `/flying-bird-game/`.

## GitHub Pages

`main` is the deployment branch. `.github/workflows/deploy.yml` builds the project and deploys the generated `dist/` directory through GitHub Pages Actions.

After the repository is created, enable **Settings → Pages → Build and deployment → Source: GitHub Actions** if GitHub has not selected it automatically.

## Roadmap

- Bird physics and unified keyboard/pointer flap input
- Recycled pipe pairs and score gates
- Collision handling and game-state transitions
- Rotation/pitch animation
- Parallax backgrounds and particles
- Audio and mobile audio unlock
- Local high score UI
- Supabase-backed three-letter global leaderboard
- Final visual polish, gameplay GIF, and live-demo README link

## Asset policy

The foundation commit intentionally contains no third-party art or audio. Asset sources and licenses will be documented in `THIRD_PARTY_NOTICES.md` as they are added.
