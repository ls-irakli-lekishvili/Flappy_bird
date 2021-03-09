import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene {

    constructor(config) {
        super('ScoreScene', {...config, canGoBack: true});
    }

    create() {
        super.create();
        this.displayScore();
    }

    displayScore() {
        const bestScore = localStorage.getItem('bestScore');
        const bestScoreText = bestScore ? `Your best score: ${bestScore}` : `No best score :(`;
        this.add.text(...this.screenCenter, bestScoreText, this.fontStyle)
            .setOrigin(.5);
    }

}

export default ScoreScene;