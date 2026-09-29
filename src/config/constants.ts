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
  difficultyWarmupSeconds: 25,
  warmupPipeSpeedIncreasePerSecond: 2,
  latePipeSpeedIncreasePerSecond: 1.3,
  maximumPipeSpeed: 300,
  pipeSpawnInterval: 1800,
  warmupSpawnIntervalDecreasePerSecond: 6,
  lateSpawnIntervalDecreasePerSecond: 7,
  minimumPipeSpawnInterval: 950,
  minimumGapCenterY: 150,
  maximumGapCenterY: 362,
} as const;
