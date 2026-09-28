import { describe, expect, it } from 'vitest';

import { GAME_HEIGHT, GAME_WIDTH, PHYSICS } from '../src/config/constants';

describe('game configuration constants', () => {
  it('keeps the intended 288 × 512 logical canvas', () => {
    expect(GAME_WIDTH).toBe(288);
    expect(GAME_HEIGHT).toBe(512);
  });

  it('uses upward velocity for a flap', () => {
    expect(PHYSICS.flapVelocity).toBeLessThan(0);
  });
});
