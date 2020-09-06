import Tomato from "../Player/Tomato.js";
import Bombs from "../Objects/Bombs.js";
import TomatoItem from "../Objects/TomatoItem.js";

class Play extends Phaser.Scene {
    constructor() {
        super({key: 'Play'});
    }

    init() {
        console.log('Se ha iniciado la escena Play');

        // se llama a escena UI
        this.scene.launch('UI');
    }

    create() {
        // test para ver que se vea el texto
        // this.add.bitmapText(100, 100, 'pixelFont', 'PRUEBA');

        // agregamos fondo
        this.add.image(0, 0, 'background').setOrigin(0);

        // se agrega variable que contiene los muros y el suelo
        this.wall_floor  = this.physics.add.staticGroup();

        // pared izquierda
        this.wall_floor.create(0, 0, 'wall').setOrigin(0);

        // pared derecha
        this.wall_floor.create(this.scale.width, 0, 'wall').setOrigin(1, 0).setFlipX(true);

        // suelo
        this.wall_floor.create(0, this.scale.height, 'floor').setOrigin(0, 1);

        // actualizamos colisiones estaticas(cuadro azul)
        this.wall_floor.refresh();

        // bajamos la colision del suelo
        // posicion 2 porque fue creado despues de las paredes(pared izq, der, suelo)
        this.wall_floor.getChildren()[2].setOffset(0, 15);

        // BOMBS
        this.bombsGroup = new Bombs({
            physicsWorld: this.physics.world,
            scene: this
        });

        // ITEMS
        this.itemsGroup = new TomatoItem({
            physicsWorld: this.physics.world,
            scene: this
        });

        // PERSONAJE
        // this.tomato = this.physics.add.sprite(100, 100, 'tomato');
        // // escalamos al personaje
        // this.tomato.setScale(2);
        this.tomato = new Tomato({
            scene: this,
            x: 100,
            y: 100,
        });

        // se agrega colision con el grupo wall_floor
        this.physics.add.collider([this.tomato, this.bombsGroup], this.wall_floor);

        // colision de bombas con tomato
        this.physics.add.overlap([this.tomato], this.bombsGroup, () => {
            this.tomato.bombCollision();
        });

        // colision de item con tomato
        this.physics.add.overlap(this.itemsGroup, this.tomato, () => {
            this.sound.play('pop');
            this.registry.events.emit('update_points');
            this.itemsGroup.destroyItem();
            this.bombsGroup.addBomb();
        });


    }

    update() {
        // actualizamos update de tomato
        this.tomato.update();
        this.bombsGroup.update();
    }
}

export default Play;