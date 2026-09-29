import Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from '../config/constants';

interface GameOverData {
  score?: number;
  highScore?: number;
}

export class GameOverScene extends Phaser.Scene {
  private score = 0;

  private highScore = 0;

  constructor() {
    super(SCENE_KEYS.GAME_OVER);
  }

  init(data: unknown): void {
    const gameOverData = data as GameOverData;
    this.score = typeof gameOverData.score === 'number' ? gameOverData.score : 0;
    this.highScore = typeof gameOverData.highScore === 'number' ? gameOverData.highScore : 0;
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0f172a');

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.3, 'GAME OVER', {
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '28px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.48, `Score: ${this.score}\nBest: ${this.highScore}`, {
        align: 'center',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '18px',
        lineSpacing: 8,
      })
      .setOrigin(0.5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.7, 'Press Space / Tap to Retry', {
        color: '#38bdf8',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    let handled = false;
    const restart = (): void => {
      if (handled) {
        return;
      }

      handled = true;
      this.scene.start(SCENE_KEYS.GAME);
    };
    const returnToMenu = (): void => {
      if (handled) {
        return;
      }

      handled = true;
      this.scene.start(SCENE_KEYS.MENU);
    };

    this.input.keyboard?.once('keydown-SPACE', restart);
    this.input.keyboard?.once('keydown-ESC', returnToMenu);
    this.input.once(Phaser.Input.Events.POINTER_DOWN, restart);
  }
}
