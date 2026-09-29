import Phaser from 'phaser';

import { GAMEPLAY } from '../config/constants';
import { PipePair } from '../entities/PipePair';

export class PipeSpawner {
  private readonly scene: Phaser.Scene;

  private readonly pipeGroup: Phaser.Physics.Arcade.Group;

  private readonly pairs: PipePair[] = [];

  private spawnTimer?: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, pipeGroup: Phaser.Physics.Arcade.Group) {
    this.scene = scene;
    this.pipeGroup = pipeGroup;
  }

  start(): void {
    this.spawnPair();
    this.spawnTimer = this.scene.time.addEvent({
      delay: GAMEPLAY.pipeSpawnInterval,
      callback: this.spawnPair,
      callbackScope: this,
      loop: true,
    });
  }

  update(birdX: number): number {
    let scoreIncrease = 0;

    for (const pair of this.pairs) {
      if (pair.update(birdX)) {
        scoreIncrease += 1;
      }
    }

    for (let index = this.pairs.length - 1; index >= 0; index -= 1) {
      if (!this.pairs[index]?.isActive()) {
        this.pairs.splice(index, 1);
      }
    }

    return scoreIncrease;
  }

  stop(): void {
    this.spawnTimer?.remove(false);
    this.spawnTimer = undefined;

    for (const pair of this.pairs) {
      pair.stop();
    }
  }

  destroy(): void {
    this.stop();

    for (const pair of this.pairs) {
      pair.destroy();
    }

    this.pairs.length = 0;
  }

  private spawnPair(): void {
    const gapCenterY = Phaser.Math.Between(GAMEPLAY.minimumGapCenterY, GAMEPLAY.maximumGapCenterY);

    this.pairs.push(new PipePair(this.scene, this.pipeGroup, gapCenterY));
  }
}
