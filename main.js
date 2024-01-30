import MapScene from "./static/js/MapScene.js";
import BootScene from "./static/js/BootScene.js";
import Phaser from "phaser";

export default class MyGame extends Phaser.Game {
    constructor() {
        const config = {
            //configurations
            type: Phaser.AUTO,
            width: 512,
            height: 512,
            backgroundColor: '#111',
            pixelArt: true,
            scene: [
                BootScene,
                MapScene,
            ],
            //Add physics
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    gravity: {
                        y: 300
                    },
                }
            }
        };
        //Config for Phaser.Game
        super(config);
    }
}

//Create new game
new MyGame();