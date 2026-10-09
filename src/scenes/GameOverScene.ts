import Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from '../config/constants';
import { AudioService } from '../services/AudioService';
import { ParallaxBackground } from '../systems/ParallaxBackground';

interface GameOverData {
  score?: number;
  highScore?: number;
}

export class GameOverScene extends Phaser.Scene {
  private score = 0;

  private highScore = 0;

  private background!: ParallaxBackground;

  private audio!: AudioService;

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
    this.background = new ParallaxBackground(this);
    this.audio = new AudioService(this);

    this.add
      .rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.52, 190, 118, 0x0f172a, 0.5)
      .setStrokeStyle(2, 0xe2e8f0, 0.7)
      .setDepth(5);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.3, 'GAME OVER', {
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '28px',
        fontStyle: 'bold',
        stroke: '#0f172a',
        strokeThickness: 6,
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.48, `Score: ${this.score}\nBest: ${this.highScore}`, {
        align: 'center',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '18px',
        lineSpacing: 8,
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.7, 'Press Space / Tap to Retry\nEscape → Menu', {
        align: 'center',
        color: '#0f172a',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        fontStyle: 'bold',
        backgroundColor: '#f8fafcAA',
        padding: { x: 12, y: 8 },
      })
      .setOrigin(0.5)
      .setDepth(10);

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
    this.input.keyboard?.on('keydown-M', this.handleMute, this);
    this.input.once(Phaser.Input.Events.POINTER_DOWN, restart);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.cleanup, this);
  }

  private handleMute(): void {
    this.audio.toggleMuted();
  }

  update(_time: number, delta: number): void {
    this.background.update(delta);
  }

  private cleanup(): void {
    this.input.keyboard?.off('keydown-M', this.handleMute, this);
    this.audio.destroy();
  }
}
