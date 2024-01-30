import Phaser, { Tilemaps } from 'phaser';
import MapScene from './MapScene';

export default class Sprite extends Phaser.Physics.Arcade.Sprite {
    /**
     * Pass 2 parameters: scene and player config
     * @param {MapScene} scene 
     * @param {json} config
     * @param {*} x
     * @param {*} y
     */
    constructor (scene, config){
        //initialze with scene and position
        super(scene, config.x, config.y);
        //set intermmediate position to be calculated from top left
        this.setOrigin(0, 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.name = config.name;
        this.setBounce(config.Bounce);
        this.setCollideWorldBounds(config.CollideWorldBounds);
        this.setScale(config.Scale);
        this.body.setGravityY(300);
    };

    /**
     * Create a new animation into map scene
     * @param {String} key the key of the animation
     * @param {String} spriteKey the key for the spritesheet
     * @param {int} frameStart Consecutive frames starting index
     * @param {int} frameEnd Consecutive frames ending index
     * @param {int} frameRate frames per second
     * @param {int} repeat number of repetition, default -1 = always loop
     */
    createAnimation(key, spriteKey, frameStart, frameEnd, frameRate, repeat = -1){
        if (!this.scene.anims.exists(key)){
            this.scene.anims.create({
                key: key,
                frames: this.scene.anims.generateFrameNumbers(spriteKey, {start: frameStart, end: frameEnd}),
                frameRate: frameRate,
                repeat: repeat
            });
        }
    }
}