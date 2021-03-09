import BaseScene from "./BaseScene";


class DifficultyScene extends BaseScene {
    constructor(config) {
        super('DifficultyScene', {...config, canGoBack: true});
        this.menu = [{text: 'Easy'}, {text: 'Medium'}, {text: 'Hard'}, {text: 'Jupiter'}];

    }


    create() {
        super.create();
        this.level = localStorage.getItem('difficulty');
        this.arrow = null;
        this.createMenu(this.menu, menuItem => this.setupMenuEvents(menuItem));
    }

    setupMenuEvents(menuItem) {
        const textContainer = menuItem.textObject;
        this.arrowToCurrentDifficulty(menuItem)
        textContainer.setInteractive();
        textContainer.on('pointerover', () => {
            textContainer.setStyle({fill: '#ff0'})
        });

        textContainer.on('pointerout', () => {
            textContainer.setStyle({fill: '#fff'})
        });

        textContainer.on('pointerup', () => {
            localStorage.setItem('difficulty', menuItem.text);
            this.scene.start('MenuScene');
        });
    }

    arrowToCurrentDifficulty(object) {
        if(object.text === this.level) {
            const arrowX = object.textObject.getBounds().left - 15;
            const arrowY = object.textObject.y;
            this.add.sprite(arrowX, arrowY, 'arrow')
                .setScale(.05)
                .setOrigin(.5, 1);
        }
    }
}

export default DifficultyScene;