import Phaser from 'phaser';
import MapScene from '../../static/js/MapScene';

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {MapScene} scene 
     * @param {*} spriteConfig 
     * @param {*} x 
     * @param {*} y 
     */
    constructor (scene, x, y, number){
        super(scene, x, y);
        this.name = 'dude';
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
    }
}