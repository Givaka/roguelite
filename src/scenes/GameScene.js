import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene')

    this.player = undefined;
    this.cursors = undefined;

    this.directionX = 0,
    this.directionY = 0;
  }

  preload() {
    this.load.image('PH_player', 'assets/images/PH_player.png');
    
  }

  create() {
    this.player = this.createPlayer();
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cooldown = {
      timer: 0,
      isBeginning: false
    };
  }


  createPlayer() {
    const player = this.physics.add.sprite(960, 540, 'PH_player');
    player.setScale(.25)
    player.setCollideWorldBounds(true);

    return player
  }

  update() {
    this.movement()
  }

  movement() {
    const speed = 50,
          speedDeg = speed / 2 * Math.sqrt(2);

    if (this.cursors.space.isDown && !this.cooldown.isBeginning) {
      if (this.directionX == 0 || this.directionY == 0) this.player.setVelocity(this.directionX * speed * 50, this.directionY * speed * 50)
      else this.player.setVelocity(this.directionX * speedDeg * 50, this.directionY * speedDeg * 50)

      this.cooldown.isBeginning = true
      this.cooldown.timer = 0

    } else if (this.cursors.left.isDown && this.cursors.up.isDown) {
      [this.directionX, this.directionY] = [-1, -1];
      this.player.setVelocity(-speedDeg, -speedDeg)
      this.player.setRotation(degToRad(-45))
    } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
      [this.directionX, this.directionY] = [-1, 1];
      this.player.setVelocity(-speedDeg, speedDeg)
      this.player.setRotation(degToRad(-135))
    } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
      [this.directionX, this.directionY] = [1, -1];
      this.player.setVelocity(speedDeg, -speedDeg)
      this.player.setRotation(degToRad(45))
    } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
      [this.directionX, this.directionY] = [1, 1];
      this.player.setVelocity(speedDeg, speedDeg)
      this.player.setRotation(degToRad(135))
    } else if (this.cursors.left.isDown) {
      [this.directionX, this.directionY] = [-1, 0];
      this.player.setVelocity(-speed, 0)
      this.player.setRotation(degToRad(-90))
    } else if (this.cursors.right.isDown) {
      [this.directionX, this.directionY] = [1, 0];
      this.player.setVelocity(speed, 0)
      this.player.setRotation(degToRad(90))
    } else if (this.cursors.up.isDown) {
      [this.directionX, this.directionY] = [0, -1];
      this.player.setVelocity(0, -speed)
      this.player.setRotation(degToRad(0))
    } else if (this.cursors.down.isDown) {
      [this.directionX, this.directionY] = [0, 1];
      this.player.setVelocity(0, speed)
      this.player.setRotation(degToRad(180))
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }


    if (this.cooldown.isBeginning)    this.cooldown.timer += 1
    if (this.cooldown.timer >= 50)  this.cooldown.isBeginning = false
  }
}


function degToRad(deg) {
  return deg * (Math.PI / 180.0);
}