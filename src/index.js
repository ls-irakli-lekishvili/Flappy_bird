import Phaser from 'phaser';
import PlayScene from "./Scenes/PlayScene";
import MenuScene from "./Scenes/MenuScene";
import PreloadScene from "./Scenes/PreloadScene";
import ScoreScene from "./Scenes/ScoreScene";
import PauseScene from "./Scenes/PauseScene";
import DifficultyScene from "./Scenes/DifficultyScene";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH * .1, y: HEIGHT / 2}
const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    startPosition: BIRD_POSITION
}

const createScene = scene => new scene(SHARED_CONFIG);
const scenes = [PreloadScene, MenuScene, PlayScene, ScoreScene,DifficultyScene, PauseScene]
    .map(createScene);

const config = {
    type: Phaser.AUTO,
    ...SHARED_CONFIG,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        },
    },

    scene: scenes
}

new Phaser.Game(config);
