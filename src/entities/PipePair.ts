import type Phaser from 'phaser';

import { GAMEPLAY, GAME_WIDTH } from '../config/constants';

export class PipePair {
  private readonly topPipe: Phaser.Physics.Arcade.Image;

  private readonly bottomPipe: Phaser.Physics.Arcade.Image;

  private passed = false;

  private active = true;

  constructor(
    scene: Phaser.Scene,
    group: Phaser.Physics.Arcade.Group,
    gapCenterY: number,
    speed: number,
  ) {
    const spawnX = GAME_WIDTH + GAMEPLAY.pipeWidth;
    const gapTop = gapCenterY - GAMEPLAY.pipeGap / 2;
    const gapBottom = gapCenterY + GAMEPLAY.pipeGap / 2;

    this.topPipe = scene.physics.add.image(spawnX, gapTop - GAMEPLAY.pipeHeight / 2, 'pipe');
    this.bottomPipe = scene.physics.add.image(spawnX, gapBottom + GAMEPLAY.pipeHeight / 2, 'pipe');

    this.topPipe.setFlipY(true);

    group.addMultiple([this.topPipe, this.bottomPipe]);
    this.topPipe.setImmovable(true);
    this.bottomPipe.setImmovable(true);
    (this.topPipe.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (this.bottomPipe.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.setSpeed(speed);
  }

  update(birdX: number): boolean {
    if (!this.active) {
      return false;
    }

    if (!this.passed && this.topPipe.x + GAMEPLAY.pipeWidth / 2 < birdX) {
      this.passed = true;
      return true;
    }

    if (this.topPipe.x + GAMEPLAY.pipeWidth / 2 < 0) {
      this.destroy();
    }

    return false;
  }

  stop(): void {
    if (!this.active || !this.topPipe.body || !this.bottomPipe.body) {
      return;
    }

    this.topPipe.setVelocityX(0);
    this.bottomPipe.setVelocityX(0);
  }

  setSpeed(speed: number): void {
    if (!this.active || !this.topPipe.body || !this.bottomPipe.body) {
      return;
    }

    this.topPipe.setVelocityX(-speed);
    this.bottomPipe.setVelocityX(-speed);
  }

  destroy(): void {
    if (!this.active) {
      return;
    }

    this.active = false;
    this.topPipe.destroy();
    this.bottomPipe.destroy();
  }

  isActive(): boolean {
    return this.active;
  }
}
