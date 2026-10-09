import Phaser from 'phaser';

import { GAME_WIDTH } from '../config/constants';
import type { AudioService } from '../services/AudioService';

export class MuteControl {
  private readonly label: Phaser.GameObjects.Text;

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly audio: AudioService,
  ) {
    this.label = scene.add
      .text(GAME_WIDTH - 8, 8, '', {
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '10px',
        fontStyle: 'bold',
        backgroundColor: '#0f172acc',
        padding: { x: 5, y: 4 },
      })
      .setOrigin(1, 0)
      .setDepth(20)
      .setInteractive({ useHandCursor: true });

    this.updateLabel();
    this.label.on('pointerdown', this.handlePointerDown, this);
    this.scene.input.keyboard?.on('keydown-M', this.toggle, this);
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
  }

  private toggle(): void {
    this.audio.toggleMuted();
    this.updateLabel();
  }

  private handlePointerDown(
    _pointer: Phaser.Input.Pointer,
    _localX: number,
    _localY: number,
    event: Phaser.Types.Input.EventData,
  ): void {
    event.stopPropagation();
    this.toggle();
  }

  private updateLabel(): void {
    this.label.setText(this.audio.isMuted() ? 'Sound: Off' : 'Sound: On');
  }

  private destroy(): void {
    this.label.off('pointerdown', this.handlePointerDown, this);
    this.scene.input.keyboard?.off('keydown-M', this.toggle, this);
    this.label.destroy();
  }
}
