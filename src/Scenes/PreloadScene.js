import Phaser from 'phaser'

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('bird', 'assets/birdSprite.png', {
            frameWidth: 16, frameHeight: 16
        });
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pause', 'assets/pause.png');
        this.load.image('back', 'assets/back.png');
        this.load.image('arrow', 'assets/arrow.png');
    }

    create() {
        this.scene.start('MenuScene');
        this.disableCtxMenu();
    }

    disableCtxMenu() {
        const canvas = document.querySelector('canvas');
        canvas.addEventListener('contextmenu', ev => ev.preventDefault());
    }
}

export default PreloadScene;