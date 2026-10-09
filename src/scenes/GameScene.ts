import Phaser from 'phaser';

import { GAME_HEIGHT, GAMEPLAY, GAME_WIDTH, SCENE_KEYS } from '../config/constants';
import { Bird } from '../entities/Bird';
import { AudioService } from '../services/AudioService';
import { StorageService } from '../services/StorageService';
import { ParallaxBackground } from '../systems/ParallaxBackground';
import { PipeSpawner } from '../systems/PipeSpawner';

export class GameScene extends Phaser.Scene {
  private bird!: Bird;

  private pipeGroup!: Phaser.Physics.Arcade.Group;

  private pipeSpawner!: PipeSpawner;

  private scoreText!: Phaser.GameObjects.Text;

  private background!: ParallaxBackground;

  private audio!: AudioService;

  private score = 0;

  private gameOver = false;

  private inputActive = true;

  constructor() {
    super(SCENE_KEYS.GAME);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0f172a');
    this.score = 0;
    this.gameOver = false;
    this.inputActive = true;

    this.background = new ParallaxBackground(this);
    this.audio = new AudioService(this);

    this.bird = new Bird(this, GAMEPLAY.birdStartX, GAMEPLAY.birdStartY, 'bird');
    this.pipeGroup = this.physics.add.group({ allowGravity: false, immovable: true });
    this.pipeSpawner = new PipeSpawner(this, this.pipeGroup);
    this.pipeSpawner.start();

    this.scoreText = this.add
      .text(GAME_WIDTH / 2, 32, '0', {
        color: '#ffffff',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '32px',
        fontStyle: 'bold',
        stroke: '#0f172a',
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.input.keyboard?.on('keydown-SPACE', this.handleFlap, this);
    this.input.keyboard?.on('keydown-M', this.handleMute, this);
    this.input.on(Phaser.Input.Events.POINTER_DOWN, this.handleFlap, this);
    this.physics.add.overlap(this.bird, this.pipeGroup, () => this.endGame());
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.cleanup, this);
  }

  update(_time: number, delta: number): void {
    if (this.gameOver) {
      return;
    }

    this.background.update(delta);
    this.bird.updateFlight();
    const scoreIncrease = this.pipeSpawner.update(this.bird.x, delta);
    this.score += scoreIncrease;
    this.scoreText.setText(String(this.score));

    if (scoreIncrease > 0) {
      this.pulseScore();
      this.audio.playScore();
    }

    const birdBody = this.bird.body as Phaser.Physics.Arcade.Body;
    if (birdBody.bottom <= 0 || birdBody.top >= GAME_HEIGHT) {
      this.endGame();
    }
  }

  private handleFlap(): void {
    if (this.inputActive && !this.gameOver) {
      this.bird.flap();
      this.audio.playFlap();
    }
  }

  private handleMute(): void {
    this.audio.toggleMuted();
  }

  private pulseScore(): void {
    this.tweens.killTweensOf(this.scoreText);
    this.scoreText.setScale(1);
    this.tweens.add({
      targets: this.scoreText,
      scale: 1.16,
      duration: 75,
      ease: 'Quad.Out',
      yoyo: true,
      hold: 0,
    });
  }

  private endGame(): void {
    if (this.gameOver) {
      return;
    }

    this.gameOver = true;
    this.inputActive = false;
    this.input.keyboard?.off('keydown-SPACE', this.handleFlap, this);
    this.input.keyboard?.off('keydown-M', this.handleMute, this);
    this.input.off(Phaser.Input.Events.POINTER_DOWN, this.handleFlap, this);
    this.pipeSpawner.stop();
    this.audio.playDeath();
    this.bird.setVelocity(0, 0);
    this.bird.setTint(0xffb8a3);
    StorageService.setHighScore(this.score);
    this.cameras.main.flash(120, 255, 255, 255, false);
    this.cameras.main.shake(220, 0.008);
    this.time.delayedCall(250, () => {
      this.scene.start(SCENE_KEYS.GAME_OVER, {
        score: this.score,
        highScore: StorageService.getHighScore(),
      });
    });
  }

  private cleanup(): void {
    this.input.keyboard?.off('keydown-SPACE', this.handleFlap, this);
    this.input.keyboard?.off('keydown-M', this.handleMute, this);
    this.input.off(Phaser.Input.Events.POINTER_DOWN, this.handleFlap, this);
    this.pipeSpawner.destroy();
    this.audio.destroy();
  }
}
