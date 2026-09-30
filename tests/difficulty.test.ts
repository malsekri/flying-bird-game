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
    const values = getDifficultyValues(10);

    expect(values.pipeSpeed).toBe(GAMEPLAY.introductionPipeSpeed);
    expect(values.spawnInterval).toBe(GAMEPLAY.introductionSpawnInterval);
  });

  it('makes the main ramp meaningfully faster than the introduction', () => {
    const atTenSeconds = getDifficultyValues(10);
    const atTwentySeconds = getDifficultyValues(20);
    const atThirtySeconds = getDifficultyValues(30);

    expect(atTwentySeconds.pipeSpeed).toBeGreaterThan(atTenSeconds.pipeSpeed);
    expect(atTwentySeconds.spawnInterval).toBeLessThan(atTenSeconds.spawnInterval);
    expect(atThirtySeconds.pipeSpeed).toBeGreaterThan(atTwentySeconds.pipeSpeed);
    expect(atThirtySeconds.spawnInterval).toBeLessThan(atTwentySeconds.spawnInterval);
  });

  it('continues progressing through the first minute', () => {
    const atThirtySeconds = getDifficultyValues(30);
    const atFortyFiveSeconds = getDifficultyValues(45);
    const atSixtySeconds = getDifficultyValues(60);

    expect(atFortyFiveSeconds.pipeSpeed).toBeGreaterThan(atThirtySeconds.pipeSpeed);
    expect(atSixtySeconds.pipeSpeed).toBeGreaterThan(atFortyFiveSeconds.pipeSpeed);
    expect(atFortyFiveSeconds.spawnInterval).toBeLessThan(atThirtySeconds.spawnInterval);
    expect(atSixtySeconds.spawnInterval).toBeLessThan(atFortyFiveSeconds.spawnInterval);
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
