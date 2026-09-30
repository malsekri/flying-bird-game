import Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from '../config/constants';
import { StorageService } from '../services/StorageService';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.MENU);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0b1426');
    this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'background')
      .setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.3, 'FLYING\nBIRD', {
        align: 'center',
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '36px',
        fontStyle: 'bold',
        stroke: '#0f172a',
        strokeThickness: 6,
        shadow: {
          color: '#0f172a',
          fill: true,
          offsetX: 0,
          offsetY: 4,
          blur: 0,
        },
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.57, `Best: ${StorageService.getHighScore()}`, {
        color: '#0f172a',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '16px',
        fontStyle: 'bold',
        backgroundColor: '#f8fafcAA',
        padding: { x: 10, y: 6 },
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.67, 'Press Space / Tap to Play', {
        color: '#0f172a',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        fontStyle: 'bold',
        backgroundColor: '#f8fafcAA',
        padding: { x: 12, y: 8 },
      })
      .setOrigin(0.5);

    let started = false;
    const startGame = (): void => {
      if (started) {
        return;
      }

      started = true;
      this.scene.start(SCENE_KEYS.GAME);
    };

    this.input.keyboard?.once('keydown-SPACE', startGame);
    this.input.once(Phaser.Input.Events.POINTER_DOWN, startGame);
  }
}
