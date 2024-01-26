import MapScene from "./static/MapScene.js";
import Phaser from "phaser";

export default class MyGame extends Phaser.Game {
    constructor() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
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