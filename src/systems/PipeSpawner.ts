import Phaser from 'phaser';

import { GAMEPLAY } from '../config/constants';
import { PipePair } from '../entities/PipePair';

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
    const speed = this.getCurrentSpeed();
    let scoreIncrease = 0;

    for (const pair of this.pairs) {
      pair.setSpeed(speed);
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

    this.pairs.push(new PipePair(this.scene, this.pipeGroup, gapCenterY, this.getCurrentSpeed()));
    this.scheduleNextSpawn();
  }

  private getCurrentSpeed(): number {
    const warmupSeconds = Math.min(this.elapsedSeconds, GAMEPLAY.difficultyWarmupSeconds);
    const lateGameSeconds = Math.max(this.elapsedSeconds - GAMEPLAY.difficultyWarmupSeconds, 0);

    return Math.min(
      GAMEPLAY.pipeSpeed +
        warmupSeconds * GAMEPLAY.warmupPipeSpeedIncreasePerSecond +
        lateGameSeconds * GAMEPLAY.latePipeSpeedIncreasePerSecond,
      GAMEPLAY.maximumPipeSpeed,
    );
  }

  private getSpawnInterval(): number {
    const warmupSeconds = Math.min(this.elapsedSeconds, GAMEPLAY.difficultyWarmupSeconds);
    const lateGameSeconds = Math.max(this.elapsedSeconds - GAMEPLAY.difficultyWarmupSeconds, 0);

    return Math.max(
      GAMEPLAY.pipeSpawnInterval -
        warmupSeconds * GAMEPLAY.warmupSpawnIntervalDecreasePerSecond -
        lateGameSeconds * GAMEPLAY.lateSpawnIntervalDecreasePerSecond,
      GAMEPLAY.minimumPipeSpawnInterval,
    );
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
