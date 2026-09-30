import Phaser from 'phaser';

import { GAMEPLAY } from '../config/constants';
import { PipePair } from '../entities/PipePair';
import { getDifficultyValues } from './difficulty';

export class PipeSpawner {
  private readonly scene: Phaser.Scene;

  private readonly pipeGroup: Phaser.Physics.Arcade.Group;

  private readonly pairs: PipePair[] = [];

  private spawnTimer?: Phaser.Time.TimerEvent;

  private elapsedSeconds = 0;

  constructor(scene: Phaser.Scene, pipeGroup: Phaser.Physics.Arcade.Group) {
    this.scene = scene;
    this.pipeGroup = pipeGroup;
  }

  start(): void {
    this.elapsedSeconds = 0;
    this.spawnPair();
    this.scheduleNextSpawn();
  }

  update(birdX: number, delta: number): number {
    this.elapsedSeconds += delta / 1000;
    const { pipeSpeed } = getDifficultyValues(this.elapsedSeconds);
    let scoreIncrease = 0;

    for (const pair of this.pairs) {
      pair.setSpeed(pipeSpeed);
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

    const { pipeSpeed } = getDifficultyValues(this.elapsedSeconds);
    this.pairs.push(new PipePair(this.scene, this.pipeGroup, gapCenterY, pipeSpeed));
    this.scheduleNextSpawn();
  }

  private getSpawnInterval(): number {
    return getDifficultyValues(this.elapsedSeconds).spawnInterval;
  }

  private scheduleNextSpawn(): void {
    this.spawnTimer?.remove(false);
    this.spawnTimer = this.scene.time.delayedCall(
      this.getSpawnInterval(),
      this.spawnPair,
      [],
      this,
    );
  }
}
