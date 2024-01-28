import Phaser from 'phaser'
import map from '../../../public/data/map.json'
//import PlayerSprite from '../sprites/PlayerSprite';
class MapScene extends Phaser.Scene{
    constructor(){
        super({
            key: 'MapScene',
            // backgroundColor: '#000000'
        });
    };
    cursors;
    player;
    map;
    tileset;
    terrain_layer;
    hanging_platform;
    debug_text;
    collision_arr;
    preload(){
        //load images
        map.tilesets.forEach(element => {
            // if it's a collection of tilesets
            if ('tiles' in element){
                element.tiles.forEach(tile => {
                    this.load.image(element.name + tile.id, tile.image);
                });
            }
            else{
                this.load.image(element.name, element.image);
            }
        });
        //load spritesheets
        this.load.spritesheet('PinkManIdle', 'assets/Free/Characters/Pink Man/Idle (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('PinkManRun', 'assets/Free/Characters/Pink Man/Run (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('PinkManJump', 'assets/Free/Characters/Pink Man/Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('PinkManDoubleJump', 'assets/Free/Characters/Pink Man/Double Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('PinkManFall', 'assets/Free/Characters/Pink Man/Fall (32x32).png', {frameWidth: 32, frameHeight: 32});
        //load json tileset
        this.load.tilemapTiledJSON('map', 'data/map.json');
    }

    create(){
        this.map = this.make.tilemap({key : 'map' });
        this.tileset = this.map.addTilesetImage('Terrain', 'Terrain');
        this.terrain_layer = this.map.createLayer('Terrain', this.tileset, 0, 0);
        this.hanging_platform = this.map.createLayer('Hanging Platform', this.tileset, 0, 0);
        this.player = this.physics.add.sprite(144, 96, 'PinkManIdle');
        this.player.setBounce(0.2);

        // Set Collision
        //List of tile ids that set collision
        this.collision_arr = []
        for (let i = 0; i <= 1000; ++i){
            this.collision_arr.push(i);
        }
        this.terrain_layer.setCollision(this.collision_arr);
        this.hanging_platform.setCollision(this.collision_arr);
        this.player.setCollideWorldBounds(true);
        this.physics.collide(this.player, this.terrain_layer, this);
        this.physics.collide(this.player, this.hanging_platform, this);
        this.player.setOrigin(0, 0);
        this.player.setScale(1);
        this.player.body.setGravityY(300);

        //Create animations
        this.createAnimation();
        //create cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        //create Debugging Text
        this.debug_text = this.add.text(100, 100, '', { fontSize: '20px', fill: '#fff' });
    }
    /**
     * @param {Array} arr 
     */
    exception(arr){
        return 
    }

    createAnimation(){
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('PinkManIdle', {start: 0, end: 10}),
            frameRate: 11,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('PinkManRun', {start: 0, end: 11}),
            frameRate: 11,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('PinkManJump', {start: 0, end: 0}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'double_jump',
            frames: this.anims.generateFrameNumbers('PinkManDoubleJump', {start: 0, end: 5}),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('PinkManFall', {start: 0, end: 0}),
            frameRate: 1,
            repeat: -1
        });
    }
    double_jump = 0;
    jump = 0;
    update(){
        this.physics.collide(this.player, this.terrain_layer);
        this.physics.collide(this.player, this.hanging_platform);
        if (this.cursors.left.isDown){
            if (!this.cursors.up.isDown && !this.double_jump) this.player.anims.play('run', true);
            this.player.flipX = true;
            this.player.body.setVelocityX(-100);
        }
        else if (this.cursors.right.isDown){
            if (!this.cursors.up.isDown && !this.double_jump) this.player.anims.play('run', true);
            this.player.flipX = false;
            this.player.body.setVelocityX(100);
        }
        else{
            if (!this.double_jump) this.player.anims.play('idle', true);
            this.player.body.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down){
            this.jump = 1;
            this.double_jump = 0;
            this.player.anims.play('jump');
            this.player.body.setVelocityY(-300);
        }
        else if (this.player.body.blocked.down){
            this.jump = 0;
            this.double_jump = 0;
        }

        this.cursors.up.on('down', () => {
            if (!this.player.body.blocked.down && !this.double_jump && this.jump){
                this.double_jump = 1;
                console.log("Double Jumped")
                this.player.anims.play('double_jump');
                this.player.body.setVelocityY(-300);
            }
        }, this);

        this.debug_text.setText(this.jump + " " + this.double_jump + this.player.body.blocked.down.toString());
    };
}

export default MapScene;