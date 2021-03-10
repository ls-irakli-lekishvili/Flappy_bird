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
        let bestScoreText = `No best score :(`;
        let lineHeight = 100;
        const bestScoreEasy = localStorage.getItem('bestScore_Easy');
        const bestScoreMedium = localStorage.getItem('bestScore_Medium');
        const bestScoreHard = localStorage.getItem('bestScore_Hard');
        if (bestScoreEasy || bestScoreMedium || bestScoreHard) {
            this.add.text(this.screenCenter[0], this.screenCenter[1] - lineHeight, `Your best scores`, this.fontStyle)
                .setOrigin(.5)
            lineHeight -= 50;

            if (bestScoreEasy) {
                this.add.text(this.screenCenter[0], this.screenCenter[1] - lineHeight, `Easy: ${bestScoreEasy}`, this.fontStyle)
                    .setOrigin(.5);
                lineHeight -= 50;
            }
            if(bestScoreMedium) {
                this.add.text(this.screenCenter[0], this.screenCenter[1] - lineHeight, `Medium: ${bestScoreMedium}`, this.fontStyle)
                    .setOrigin(.5);
                lineHeight -= 50;
            }
            if(bestScoreHard) {
                this.add.text(this.screenCenter[0], this.screenCenter[1] - lineHeight, `Hard: ${bestScoreHard}`, this.fontStyle)
                    .setOrigin(.5);
            }
        } else {
            this.add.text(this.screenCenter[0], this.screenCenter[1], bestScoreText, this.fontStyle)
                .setOrigin(.5)
        }


        // this.add.text(...this.screenCenter, bestScoreText, this.fontStyle)
        //     .setOrigin(.5);
    }
}

export default ScoreScene;