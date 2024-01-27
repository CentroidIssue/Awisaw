import MapScene from "./static/js/MapScene.js";
import Phaser from "phaser";

export default class MyGame extends Phaser.Game {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 512,
            height: 512,
            backgroundColor: '#111',
            pixelArt: true,
            scene: [
                MapScene
            ]
        };
        
        super(config);
    }
}
new MyGame();