import { GAMEPLAY } from '../config/constants';

export interface DifficultyValues {
  pipeSpeed: number;
  spawnInterval: number;
}

export function getDifficultyValues(elapsedSeconds: number): DifficultyValues {
  const elapsed = Math.max(elapsedSeconds, 0);
  const introductionEnd = GAMEPLAY.difficultyIntroductionSeconds;
  const mainRampEnd = introductionEnd + GAMEPLAY.difficultyMainRampSeconds;

  if (elapsed <= introductionEnd) {
    const progress = smoothStep(elapsed / introductionEnd);
    return {
      pipeSpeed: interpolate(GAMEPLAY.pipeSpeed, GAMEPLAY.introductionPipeSpeed, progress),
      spawnInterval: interpolate(
        GAMEPLAY.pipeSpawnInterval,
        GAMEPLAY.introductionSpawnInterval,
        progress,
      ),
    };
  }

  if (elapsed <= mainRampEnd) {
    const progress = smoothStep((elapsed - introductionEnd) / GAMEPLAY.difficultyMainRampSeconds);
    return {
      pipeSpeed: interpolate(GAMEPLAY.introductionPipeSpeed, GAMEPLAY.mainRampPipeSpeed, progress),
      spawnInterval: interpolate(
        GAMEPLAY.introductionSpawnInterval,
        GAMEPLAY.mainRampSpawnInterval,
        progress,
      ),
    };
  }

  return {
    pipeSpeed: Math.min(
      GAMEPLAY.mainRampPipeSpeed +
        (elapsed - mainRampEnd) * GAMEPLAY.latePipeSpeedIncreasePerSecond,
      GAMEPLAY.maximumPipeSpeed,
    ),
    spawnInterval: Math.max(
      GAMEPLAY.mainRampSpawnInterval -
        (elapsed - mainRampEnd) * GAMEPLAY.lateSpawnIntervalDecreasePerSecond,
      GAMEPLAY.minimumPipeSpawnInterval,
    ),
  };
}

function interpolate(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function smoothStep(progress: number): number {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  return clampedProgress * clampedProgress * (3 - 2 * clampedProgress);
}
