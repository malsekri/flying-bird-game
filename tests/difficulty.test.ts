import { describe, expect, it } from 'vitest';

import { GAMEPLAY } from '../src/config/constants';
import { getDifficultyValues } from '../src/systems/difficulty';

describe('difficulty progression', () => {
  it('starts with a forgiving pace', () => {
    expect(getDifficultyValues(0)).toEqual({
      pipeSpeed: GAMEPLAY.pipeSpeed,
      spawnInterval: GAMEPLAY.pipeSpawnInterval,
    });
  });

  it('begins ramping by the end of the introduction', () => {
    const values = getDifficultyValues(7);

    expect(values.pipeSpeed).toBe(GAMEPLAY.introductionPipeSpeed);
    expect(values.spawnInterval).toBe(GAMEPLAY.introductionSpawnInterval);
  });

  it('makes the main ramp meaningfully faster before 25 seconds', () => {
    const atSevenSeconds = getDifficultyValues(7);
    const atTenSeconds = getDifficultyValues(10);
    const atFifteenSeconds = getDifficultyValues(15);
    const atTwentySeconds = getDifficultyValues(20);
    const mainRampEnd = GAMEPLAY.difficultyIntroductionSeconds + GAMEPLAY.difficultyMainRampSeconds;
    const atMainRampEnd = getDifficultyValues(mainRampEnd);

    expect(atTenSeconds.pipeSpeed).toBeGreaterThan(atSevenSeconds.pipeSpeed);
    expect(atTenSeconds.spawnInterval).toBeLessThan(atSevenSeconds.spawnInterval);
    expect(atFifteenSeconds.pipeSpeed).toBeGreaterThan(atSevenSeconds.pipeSpeed);
    expect(atFifteenSeconds.spawnInterval).toBeLessThan(atSevenSeconds.spawnInterval);
    expect(atTwentySeconds.pipeSpeed).toBeGreaterThan(atFifteenSeconds.pipeSpeed);
    expect(atTwentySeconds.spawnInterval).toBeLessThan(atFifteenSeconds.spawnInterval);
    expect(atMainRampEnd.pipeSpeed).toBe(GAMEPLAY.mainRampPipeSpeed);
    expect(atMainRampEnd.spawnInterval).toBe(GAMEPLAY.mainRampSpawnInterval);
  });

  it('continues progressing through the first minute', () => {
    const mainRampEnd = GAMEPLAY.difficultyIntroductionSeconds + GAMEPLAY.difficultyMainRampSeconds;
    const atMainRampEnd = getDifficultyValues(mainRampEnd);
    const atFortySeconds = getDifficultyValues(40);
    const atSixtySeconds = getDifficultyValues(60);
    const atNinetySeconds = getDifficultyValues(90);

    expect(atFortySeconds.pipeSpeed).toBeGreaterThan(atMainRampEnd.pipeSpeed);
    expect(atSixtySeconds.pipeSpeed).toBeGreaterThan(atFortySeconds.pipeSpeed);
    expect(atSixtySeconds.pipeSpeed).toBeLessThan(GAMEPLAY.maximumPipeSpeed);
    expect(atNinetySeconds.pipeSpeed).toBe(GAMEPLAY.maximumPipeSpeed);
    expect(atFortySeconds.spawnInterval).toBeLessThan(atMainRampEnd.spawnInterval);
    expect(atSixtySeconds.spawnInterval).toBeLessThan(atFortySeconds.spawnInterval);
  });

  it('never exceeds the configured late-game caps', () => {
    const values = getDifficultyValues(10_000);

    expect(values.pipeSpeed).toBe(GAMEPLAY.maximumPipeSpeed);
    expect(values.spawnInterval).toBe(GAMEPLAY.minimumPipeSpawnInterval);
  });

  it('treats negative elapsed time as the start of the game', () => {
    expect(getDifficultyValues(-1)).toEqual(getDifficultyValues(0));
  });
});
