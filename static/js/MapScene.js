import Phaser from 'phaser'
import map from '../../public/data/map.json'
import PlayerSprite from '../../public/sprites/PlayerSprite';

class MapScene extends Phaser.Scene{
    constructor(){
        super({
            key: 'MapScene',
            // backgroundColor: '#000000'
        });
    };
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
        this.load.spritesheet('dude', 'assets/Free/Characters/Dude/dude.png')
        //load json tileset
        this.load.tilemapTiledJSON('map', 'data/map.json');
    };

    create(){
        const map = this.make.tilemap({key : 'map' });
        const tileset = map.addTilesetImage('Terrain', 'Terrain');
        // const background_tileset = map.addTilesetImage('Background0', 'Background0');
        // const background_layer = map.createLayer('Background0', background_tileset, 0, 0);
        const terrain_layer = map.createLayer('Terrain', tileset, 0, 0);
        const hanging_platform = map.createLayer('Hanging Platform', tileset, 0, 0);
        //const player = new PlayerSprite(this, 144, 96);
    };
    update(){

    };
}

export default MapScene;