import BaseScene from "./BaseScene";
import difficulties from "../difficulties";

const PIPES_TO_RENDER = 4;

class PlayScene extends BaseScene {

    constructor(config) {
        super('PlayScene', config);
        this.difficulties = {...difficulties};

        this.bird = null;
        this.pipes = null;
        this.isPaused = false;

        this.pipeVerticalDistanceRange = [200, 250];
        this.pipeHorizontalDistanceRange = [500, 550];
        this.flapVelocity = 400;
        this.birdGravity = 1100;

        this.score = 0;
        this.scoreText = '';
    }

    create() {
        super.create();
        this.setLevel();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.createScore();
        this.createPauseButton();
        this.handleInput();
        this.listenToEvents();
        this.tapToStart();
        this.createAnimation();
    }


    update(time, delta) {
        this.checkGameStatus();
        this.recyclePipes()
        this.detectPipePassing()
    }

    listenToEvents() {
        if(this.pauseEvent) {return;}
        this.pauseEvent = this.events.on('resume', () => {
            this.isPaused = false;
            this.initialTime = 3;
            this.countDownText = this.add.text(...this.screenCenter, `Continue in: ${this.initialTime}`, this.fontStyle)
                .setOrigin(.5);
            this.interval = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true
            });
        })
    }

    countDown() {
        this.countDownText.setText(`Continue in: ${--this.initialTime}`);
        if (!this.initialTime) {
            this.countDownText.setText('');
            this.physics.resume();
            this.interval.remove();
        }
    }

    createBird() {
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
            .setFlipX(true)
            .setScale(3)
            .setOrigin(0);

        this.bird.setBodySize(this.bird.width, this.bird.height - 8);
        this.bird.body.gravity.y = this.birdGravity;
        this.bird.setCollideWorldBounds(true);
    }

    createPipes() {
        this.pipes = this.physics.add.group();
        for (let i = 0; i < PIPES_TO_RENDER; i++) {
            const upperPipe = this.pipes
                .create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 1);
            const lowerPipe = this.pipes
                .create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0);
            this.drawPipes(upperPipe, lowerPipe);
        }
        this.pipes.setVelocityX(-200);
    }

    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    createScore() {
        this.score = 0;
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {fontSize: '32px', fill: '#000'});
        const bestScore = localStorage.getItem('bestScore') || 0;
        this.add.text(16, 52, `Best score: ${bestScore}`, {fontSize: '18px', fill: '#000'})
    }

    createPauseButton() {
        this.isPaused = false;
        const pauseButton = this.add.sprite(this.config.width - 10, this.config.height - 10, 'pause')
            .setInteractive()
            .setScale(3)
            .setOrigin(1);
        const pauseFn = () => {
            this.isPaused = true;
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene');
        }

        pauseButton.on('pointerdown', pauseFn, this)
        this.input.keyboard.on('keydown_ESC', pauseFn, this);
    }

    createAnimation() {
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', {start: 8, end: 15}),
            frameRate: 8,
            repeat: -1
        });
        this.bird.play('fly');
    }


    handleInput() {
        this.input.on('pointerdown', this.flap, this)
        this.input.keyboard.on('keydown_SPACE', this.flap, this)
    }

    checkGameStatus() {
        if (this.bird.y <= 0 || this.bird.getBounds().bottom >= this.config.height) {
            this.gameOver();
        }
    }

    drawPipes(uPipe, lPipe) {
        const rightMostX = this.getRightMostPipe();
        const flyingSpace = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
        const pipeVerticalPosition = Phaser.Math.Between(20, this.config.height - 20 - flyingSpace);
        const pipeHorizontalPosition = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);

        uPipe.x = pipeHorizontalPosition + rightMostX;
        uPipe.y = pipeVerticalPosition;
        lPipe.x = uPipe.x;
        lPipe.y = uPipe.y + flyingSpace;
        uPipe.name = lPipe.name = '';
    }

    flap() {
        if(this.isPaused) return;
        this.bird.body.velocity.y = -this.flapVelocity;
    }

    gameOver() {
        this.physics.pause();
        this.bird.setTint(0xff0000);

        this.saveBestScore();

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart();
            },
            loop: false
        })
    }

    saveBestScore() {
        const bestScoreText = localStorage.getItem('bestScore');
        const bestScore = bestScoreText && parseInt(bestScoreText);

        if (!bestScore || this.score > bestScore) {
            localStorage.setItem('bestScore', this.score.toString());
        }
    }

    recyclePipes() {
        const tempPipes = []
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right <= 0) {
                tempPipes.push(pipe);
                if (tempPipes.length === 2) {
                    this.drawPipes(...tempPipes);
                }
            }
        })
    }

    detectPipePassing() {
        const tempPipes = [];
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right <= this.bird.getBounds().left && !pipe.name) {
                tempPipes.push(pipe);
                pipe.setName('used');
                if (tempPipes.length === 2) {
                    this.increaseScore();
                    this.saveBestScore();
                }
            }
        })
    }

    getRightMostPipe() {
        return Math.max(...this.pipes.getChildren().map(pipe => pipe.x));
    }

    increaseScore() {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    setLevel() {
        const difficulty = localStorage.getItem('difficulty');
        const level = this.difficulties[difficulty];
        this.pipeVerticalDistanceRange = level.pipeVerticalDistanceRange;
        this.pipeHorizontalDistanceRange = level.pipeHorizontalDistanceRange;
        this.flapVelocity = level.flapVelocity;
        this.birdGravity = level.birdGravity;
    }

    tapToStart() {
        this.physics.pause();
        const startFn = () => {
            this.startingText.setText('');
            this.physics.resume();
        }
        this.startingText = this.add.text(...this.screenCenter, 'Click mouse to start', this.fontStyle)
            .setOrigin(.5);
        this.input.once('pointerdown', startFn, this)
        this.input.keyboard.once('keydown_SPACE', startFn, this)
    }
}

export default PlayScene;