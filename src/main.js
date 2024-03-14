import Phaser from 'phaser'

import GameScene from './scenes/GameScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: '100%',
	height: '100%',
	physics: {
		default: 'arcade',
	},
	scene: [GameScene],
}

export default new Phaser.Game(config)
