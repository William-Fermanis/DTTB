import { Player } from '../objects/Player.js';

export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    makeAnimArray(List) {

        return this;
    }

    preload() {
        this.load.image('background', 'assets/Extras/background1.png');

        //Load Idle animation
        for (let i = 1; i <= 8; i++) {
            const frameNumber = i.toString().padStart(4, '0'); // e.g., 0000, 0001...
            this.load.image(`player_idle${i}`, `assets/Fightersprites/fighter_Idle_${frameNumber}.png`);
        }

        //Load jump Animation
        for (let i = 43; i <= 47; i++) {
            const frameNumber = i.toString().padStart(4, '0'); // e.g., 0043, 0047...
            this.load.image(`player_jump${i}`, `assets/Fightersprites/fighter_jump_${frameNumber}.png`);
        }

        //Load run animation
        for (let i = 17; i <= 24; i++) {
            const frameNumber = i.toString().padStart(4, '0'); // e.g., 0017, 0024...
            this.load.image(`player_run${i}`, `assets/Fightersprites/fighter_run_${frameNumber}.png`);
        }


        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const idleFrames = [];
        const jumpFrames = [];
        const runFrames = [];
        
        for (let i = 1; i <= 8; i++) {
            idleFrames.push({ key: `player_idle${i}` });
        }

        for (let i = 43; i <= 47; i++) {
            jumpFrames.push({ key: `player_jump${i}` });
        }

        for (let i = 17; i <= 24; i++) {
            runFrames.push({ key: `player_run${i}` });
        }
 


        this.anims.create({
            key: 'idle',
            frames: idleFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: jumpFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: runFrames,
            frameRate: 10,
            repeat: -1
        });

        this.player = new Player(this, 200, 300, 'idle');

    }

    update() {
        const keys = this.input.keyboard.addKeys({
            up: 'W',
            left: 'A',
            down: 'S',
            right: 'D'
        });

         if (keys.up.isDown) {
        this.player.y -= 2;
        if (this.player.anims.currentAnim.key !== 'jump') {
            this.player.play('jump', true);
        }
    } else if (keys.left.isDown || keys.right.isDown) {
        if (this.player.anims.currentAnim.key !== 'run') {
            this.player.play('run', true);
        }
        if (keys.left.isDown) this.player.x -= 4;
        if (keys.right.isDown) this.player.x += 4;
    } else {
        if (this.player.anims.currentAnim.key !== 'idle') {
            this.player.play('idle', true);
        } 
    }

    if (keys.down.isDown) {
        this.player.y += 2;
    }
    }
}





/*
class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    }
}
*/
