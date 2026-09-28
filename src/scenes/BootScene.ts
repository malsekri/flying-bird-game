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

    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number) => {
      progress.width = barWidth * value;
    });

    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      background.destroy();
      progress.destroy();
    });

    // Asset loading will be added in the gameplay/polish phase.
  }

  create(): void {
    this.scene.start(SCENE_KEYS.MENU);
  }
}
