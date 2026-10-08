import Phaser from 'phaser';

import { GAMEPLAY, PHYSICS } from '../config/constants';

export class Bird extends Phaser.Physics.Arcade.Sprite {
  private flapResetEvent?: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(3);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(true);
    body.setSize(26, 18, true);
    body.setMaxVelocity(0, GAMEPLAY.maximumDownwardVelocity);
    body.setCollideWorldBounds(false);
  }

  flap(): void {
    this.setVelocityY(PHYSICS.flapVelocity);
    this.setRotation(Phaser.Math.DegToRad(-30));
    this.setTexture('bird-flap');
    this.flapResetEvent?.remove(false);
    this.flapResetEvent = this.scene.time.delayedCall(100, () => {
      if (this.active) {
        this.setTexture('bird');
      }

      this.flapResetEvent = undefined;
    });
  }

  updateFlight(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    const velocityRatio = Phaser.Math.Clamp(
      body.velocity.y / GAMEPLAY.maximumDownwardVelocity,
      -1,
      1,
    );
    const targetRotation = Phaser.Math.DegToRad(Phaser.Math.Clamp(velocityRatio * 90, -30, 90));

    this.rotation = Phaser.Math.Linear(this.rotation, targetRotation, 0.12);
  }

  override destroy(fromScene?: boolean): void {
    this.flapResetEvent?.remove(false);
    this.flapResetEvent = undefined;
    super.destroy(fromScene);
  }
}
