import Phaser from 'phaser'

class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
        this.fontSize = 32;
        this.lineHeight = 42;
        this.fontStyle = {fontSize: `${this.fontSize}px`, fill: '#fff'};
        this.screenCenter = [config.width / 2, config.height / 2];
        localStorage.setItem('difficulty', 'Easy');
    }

    create() {
        this.createBG();
        if(this.config.canGoBack) {
            this.createBackButton()
        }
    }

    createBG() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
    }

    createBackButton() {
        const backButton = this.physics.add.sprite(this.config.width - 10, this.config.height - 10, 'back')
            .setOrigin(1)
            .setInteractive()
            .setScale(2);

        backButton.on('pointerup', () => {
            this.scene.start('MenuScene');
        })
    }

    createMenu(menu, setupMenuEvents) {
        const menuItemPosition = [...this.screenCenter];
        menu.forEach(menuItem => {
            menuItem.textObject = this.add.text(menuItemPosition[0], menuItemPosition[1], menuItem.text, this.fontStyle)
                .setOrigin(.5, 1);
            menuItemPosition[1] += this.lineHeight;
            setupMenuEvents(menuItem);
        })

    }
}

export default BaseScene;