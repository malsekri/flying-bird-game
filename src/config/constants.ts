export const GAME_WIDTH = 288;
export const GAME_HEIGHT = 512;

export const SCENE_KEYS = {
  BOOT: 'BootScene',
  MENU: 'MenuScene',
  GAME: 'GameScene',
  GAME_OVER: 'GameOverScene',
} as const;

export const PHYSICS = {
  gravityY: 900,
  flapVelocity: -300,
} as const;
