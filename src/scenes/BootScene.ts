import Phaser from 'phaser';

import { GAME_HEIGHT, GAME_WIDTH, SCENE_KEYS } from '../config/constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.BOOT);
  }

  preload(): void {
    const barWidth = 176;
    const barHeight = 8;
    const x = (GAME_WIDTH - barWidth) / 2;
    const y = GAME_HEIGHT / 2;

    const background = this.add.rectangle(x, y, barWidth, barHeight, 0x0f172a, 0.25).setOrigin(0);
    const progress = this.add.rectangle(x, y, 0, barHeight, 0xffffff).setOrigin(0);

    this.load.image('background', 'assets/visual/background.svg');
    this.load.image('background-stars', 'assets/visual/background-stars.svg');
    this.load.image('bird', 'assets/visual/bird.svg');
    this.load.image('bird-flap', 'assets/visual/bird-flap.svg');
    this.load.image('pipe', 'assets/visual/pipe.svg');
    this.load.audio('flap', 'assets/audio/flap.wav');
    this.load.audio('score', 'assets/audio/score.wav');
    this.load.audio('death', 'assets/audio/death.wav');

    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number) => {
      progress.width = barWidth * value;
    });

    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      background.destroy();
      progress.destroy();
    });
  }

  create(): void {
    this.scene.start(SCENE_KEYS.MENU);
  }
}
