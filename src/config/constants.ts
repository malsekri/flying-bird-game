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

export const GAMEPLAY = {
  birdStartX: GAME_WIDTH * 0.25,
  birdStartY: GAME_HEIGHT * 0.45,
  maximumDownwardVelocity: 500,
  pipeWidth: 52,
  pipeHeight: 320,
  pipeGap: 148,
  pipeSpeed: 125,
  pipeSpawnInterval: 1800,
  minimumGapCenterY: 150,
  maximumGapCenterY: 362,
} as const;
