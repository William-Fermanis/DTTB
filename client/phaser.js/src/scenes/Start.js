export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    makeAnimArray(List){

        return this;
    }

    preload() {
        this.load.image('background', 'assets/Extras/background1.png');
        //this.load.image('logo', 'assets/phaser.png');
        var idleFrames = [];
        for (let i = 1; i <= 8; i++) {
            const frameNumber = i.toString().padStart(4, '0'); // e.g., 0000, 0001...
            this.load.image(`player_idle${i}`, `assets/Fightersprites/fighter_Idle_${frameNumber}.png`);
            idleFrames.push({ key: `player_idle${i}` });
        }



        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const logo = this.add.image(640, 200, 'logo');
        const player = this.add.sprite(300, 200, 'player_idle1');

        const ship = this.add.sprite(640, 360, 'ship');

        player.anims.create({
           key: 'idle',
           frames: idleFrames,
            frameRate: 10,
            repeat: -1
        });

        ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });

        ship.play('fly');
        player.play('idle');
        
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}
