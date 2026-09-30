import Phaser from 'phaser';

import { GAME_HEIGHT, GAMEPLAY, GAME_WIDTH, SCENE_KEYS } from '../config/constants';
import { Bird } from '../entities/Bird';
import { StorageService } from '../services/StorageService';
import { PipeSpawner } from '../systems/PipeSpawner';

export class GameScene extends Phaser.Scene {
  private bird!: Bird;

  private pipeGroup!: Phaser.Physics.Arcade.Group;

  private pipeSpawner!: PipeSpawner;

  private scoreText!: Phaser.GameObjects.Text;

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

    this.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'background')
      .setDisplaySize(GAME_WIDTH, GAME_HEIGHT);

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
      .setOrigin(0.5);

    this.input.keyboard?.on('keydown-SPACE', this.handleFlap, this);
    this.input.on(Phaser.Input.Events.POINTER_DOWN, this.handleFlap, this);
    this.physics.add.overlap(this.bird, this.pipeGroup, () => this.endGame());
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.cleanup, this);
  }

  update(_time: number, delta: number): void {
    if (this.gameOver) {
      return;
    }

    this.bird.updateFlight();
    this.score += this.pipeSpawner.update(this.bird.x, delta);
    this.scoreText.setText(String(this.score));

    const birdBody = this.bird.body as Phaser.Physics.Arcade.Body;
    if (birdBody.bottom <= 0 || birdBody.top >= GAME_HEIGHT) {
      this.endGame();
    }
  }

  private handleFlap(): void {
    if (this.inputActive && !this.gameOver) {
      this.bird.flap();
    }
  }

  private endGame(): void {
    if (this.gameOver) {
      return;
    }

    this.gameOver = true;
    this.inputActive = false;
    this.input.keyboard?.off('keydown-SPACE', this.handleFlap, this);
    this.input.off(Phaser.Input.Events.POINTER_DOWN, this.handleFlap, this);
    this.pipeSpawner.stop();
    this.bird.setVelocity(0, 0);
    StorageService.setHighScore(this.score);
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
    this.input.off(Phaser.Input.Events.POINTER_DOWN, this.handleFlap, this);
    this.pipeSpawner.destroy();
  }
}
