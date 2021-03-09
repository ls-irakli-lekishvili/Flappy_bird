import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene', config);
        this.menu = [
            {scene: 'PlayScene', text: 'Play'},
            {scene: 'ScoreScene', text: 'Score'},
            {scene: 'DifficultyScene', text: 'Difficulty'}
        ]
    }

    create() {
        super.create();
        this.createMenu(this.menu, menuItem => this.setupMenuEvents(menuItem));
    }

    setupMenuEvents(menuItem) {
        const object = menuItem.textObject;
        object.setInteractive();
        object.on('pointerover', () => {
            object.setStyle({fill: '#ff0'})
        });

        object.on('pointerout', () => {
            object.setStyle({fill: '#fff'})
        });

        object.on('pointerup', () => {
            menuItem.scene && this.scene.start(menuItem.scene);
            if(menuItem.text === "Exit") {
                this.game.destroy(true);
            }
        });
    }

}

export default MenuScene;