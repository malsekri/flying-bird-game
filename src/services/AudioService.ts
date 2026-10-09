import type Phaser from 'phaser';

import { StorageService } from './StorageService';

const FLAP_VOLUME = 0.22;
const SCORE_VOLUME = 0.5;
const DEATH_VOLUME = 0.45;

export class AudioService {
  private flapSound?: Phaser.Sound.BaseSound;

  private muted: boolean;

  constructor(private readonly scene: Phaser.Scene) {
    this.muted = StorageService.getAudioMuted();
    this.scene.sound.setMute(this.muted);
  }

  isMuted(): boolean {
    return this.muted;
  }

  toggleMuted(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  playFlap(): void {
    if (this.muted) {
      return;
    }

    this.flapSound ??= this.scene.sound.add('flap', { volume: FLAP_VOLUME });
    if (this.flapSound.isPlaying) {
      this.flapSound.stop();
    }

    this.flapSound.play();
  }

  playScore(): void {
    if (!this.muted) {
      this.scene.sound.play('score', { volume: SCORE_VOLUME });
    }
  }

  playDeath(): void {
    this.scene.sound.stopAll();
    if (!this.muted) {
      this.scene.sound.play('death', { volume: DEATH_VOLUME });
    }
  }

  destroy(): void {
    this.flapSound?.stop();
    this.flapSound?.destroy();
    this.flapSound = undefined;
  }

  private setMuted(muted: boolean): void {
    this.muted = muted;
    StorageService.setAudioMuted(muted);
    this.scene.sound.setMute(muted);
  }
}
