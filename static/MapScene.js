import Phaser from 'phaser'

class MapScene extends Phaser.Scene{
    constructor(){
        super({
            key: 'MapScene',
            // backgroundColor: '#000000'
        });
    }
    preload(){
        console.log("here");
        // load the PNG file
        this.load.image('terrain_tiles', 'assets/terrain_tiles.png')

        //load the JSON file
        this.load.tilemapTiledJSON('terrain', 'assets/terrain.json')
    };

    create(){
        // check by displaying the entire tileset image
        this.add.image(0, 0, 'terrain')
        this.createMap();
    };

    update(){

    };
}

export default MapScene;