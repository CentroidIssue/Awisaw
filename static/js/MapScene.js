import Phaser from 'phaser'
import Sprite from './Sprite.js';
import Animation from '../json/animation.json'
import Preload from '../json/preload.json'
import GameEvent from './GameEvent.js';

export default class MapScene extends Phaser.Scene{
    cursors;
    player;
    map;
    tileset;
    terrain_layer;
    debug_text;
    event;
    background;
    constructor(){
        super({
            key: 'MapScene',
            backgroundColor: '#ffffff'
        });
        this.tileScale = 16;
    };

    /**
     * Return a random integer between min (included) and max (included)
     * @param {*} min - Minimum value
     * @param {*} max - Maximum value
     * @returns 
     */
    randInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //up right down left
    dx = [0, 1, 0, -1];
    dy = [-1, 0, 1, 0];

    preload(){
        // Load map tileset 
        this.load.tilemapTiledJSON('map', 'static/json/map.json');
    }

    create(){
        this.map = this.make.tilemap({key : 'map' });
        
        // Create background
        this.background = {
            number: this.randInt(0, Preload.image.Background.length),
            anim: {
                "type": "move",
                //-1 = no moving, 0 = up, 1 = right, 2 = down, 3 = left
                "direction": this.randInt(0, 3),
                //speed in pixel per second
                "speed": 2,
            }
        }
        this.background.key = Preload.image.Background[this.background.number].key;
        this.background.image = this.add.tileSprite(0, 0, this.map.widthInPixels * this.tileScale, this.map.heightInPixels * this.tileScale, this.background.key);
        this.background.image.setOrigin(0, 0);
        this.background.image.setDepth(-1);
        
        this.tileset = this.map.addTilesetImage('Terrain', 'Terrain');
        this.terrain_layer = this.map.createLayer('Terrain', this.tileset, 0, 0);
                
        //create new player

        let player_config = {
            name: 'PinkMan',
            x: 144,
            y: 360,
            Bounce: 0.2,
            CollideWorldBounds: true,
            Scale: 1,
        }
        this.player = new Sprite(this, player_config);
        // Set collision condition for layer with custom properties
        this.terrain_layer.setCollisionByProperty({collision_type: 1});
        this.terrain_layer.setCollisionByProperty({collision_type: 2});

        // Add collision between player and terrain. The player will collide with the custom set properties determined above
        this.physics.collide(this.player, this.terrain_layer, this);
        this.physics.collide(this.player, this.hanging_platform, this);

        //Create animations
        this.createAnimation();
        //create cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        //Setup camera
        
        console.log(this.tileScale);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setZoom(this.cameraScale);
        this.cameras.main.startFollow(this.player);
        
        //create Debugging Text
        this.debug_text = this.add.text(100, 100, '', { fontSize: '20px', fill: '#fff' });
        
        //Create GameEvent object
        this.event = new GameEvent(this);

    }

    createAnimation(){
        // // Create animation of a player
        Animation.PLAYERS.PinkMan.forEach((anim) => {
            this.player.createAnimation(anim.key, anim.spriteKey, anim.frameStart, anim.frameEnd, anim.frameRate, anim.repeat);
        });
    }

    update(time, delta){
        this.event.update(time, delta);
    };
}