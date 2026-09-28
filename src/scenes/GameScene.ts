import Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from '../config/constants';

export class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.GAME);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#7dd3fc');

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 18, 'GameScene is wired up.', {
        color: '#0f172a',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '16px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 16, 'Gameplay comes next →', {
        color: '#334155',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '12px',
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-ESC', () => {
      this.scene.start(SCENE_KEYS.MENU);
    });
  }
}
