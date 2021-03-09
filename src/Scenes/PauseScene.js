import BaseScene from "./BaseScene";

class PauseScene extends BaseScene {
    constructor(config) {
        super('PauseScene', config);
        this.menu = [
            {scene: 'PlayScene', text: 'Continue'},
            {scene: 'MenuScene', text: 'Exit'},
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
            if (menuItem.scene && menuItem.text === 'Continue') {
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            }

            if(menuItem.text === 'Exit') {
                this.scene.stop('PlayScene');
                this.scene.start(menuItem.scene);
            }
        });
    }

}

export default PauseScene;