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
  pipeGap: 135,
  pipeSpeed: 125,
  difficultyIntroductionSeconds: 7,
  difficultyMainRampSeconds: 13,
  introductionPipeSpeed: 135,
  mainRampPipeSpeed: 200,
  latePipeSpeedIncreasePerSecond: 0.72,
  maximumPipeSpeed: 250,
  pipeSpawnInterval: 1800,
  introductionSpawnInterval: 1725,
  mainRampSpawnInterval: 1325,
  lateSpawnIntervalDecreasePerSecond: 7.5,
  minimumPipeSpawnInterval: 1050,
  minimumGapCenterY: 150,
  maximumGapCenterY: 362,
} as const;
