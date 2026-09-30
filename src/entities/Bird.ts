import Phaser from 'phaser';

import { GAMEPLAY, PHYSICS } from '../config/constants';

export class Bird extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(true);
    body.setSize(26, 18, true);
    body.setMaxVelocity(0, GAMEPLAY.maximumDownwardVelocity);
    body.setCollideWorldBounds(false);
  }

  flap(): void {
    this.setVelocityY(PHYSICS.flapVelocity);
    this.setRotation(Phaser.Math.DegToRad(-30));
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
}
