import Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from '../config/constants';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.MENU);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#38bdf8');

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.3, 'FLYING\nBIRD', {
        align: 'center',
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '36px',
        fontStyle: 'bold',
        stroke: '#0f172a',
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.62, 'Press Space / Tap to Play', {
        color: '#0f172a',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const startGame = (): void => {
      this.scene.start(SCENE_KEYS.GAME);
    };

    this.input.keyboard?.once('keydown-SPACE', startGame);
    this.input.once(Phaser.Input.Events.POINTER_DOWN, startGame);
  }
}
