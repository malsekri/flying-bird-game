import type Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH } from '../config/constants';

export class ParallaxBackground {
  private readonly stars: Phaser.GameObjects.TileSprite;

  constructor(scene: Phaser.Scene) {
    scene.add.image(0, 0, 'background').setOrigin(0).setDepth(0);

    this.stars = scene.add
      .tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'background-stars')
      .setOrigin(0)
      .setDepth(1);
  }

  update(delta: number): void {
    this.stars.tilePositionX += delta * 0.0015;
  }
}
