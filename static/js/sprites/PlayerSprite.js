import Phaser from 'phaser';
import MapScene from '../scenes/MapScene';

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {MapScene} scene 
     * @param {*} spriteConfig
     * @param {*} x 
     * @param {*} y 
     */
    constructor (scene, config, x, y){
        super(scene, x, y);
        this.name = 'dude';
        this.player.name = config.name;
        this.spriteConfig = config.spriteConfig;
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.setOrigin(0, 0);
        this.setScale(1);
        this.body.setGravityY(300);
        this.createAnimation();
    };
    createAnimation(){
        this.scene.anims.create({

        });
    }

}