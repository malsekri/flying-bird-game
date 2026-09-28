import Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from '../config/constants';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.GAME_OVER);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0f172a');

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Game Over', {
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '28px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
  }
}
