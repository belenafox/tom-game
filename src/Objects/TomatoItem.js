class TomatoItem extends Phaser.Physics.Arcade.StaticGroup {
    constructor(config) {
        super(config.physicsWorld, config.scene);
        // creamos el objeto
        this.addTomatoItem();
    }

    addTomatoItem() {
        this.create(
            Phaser.Math.Between(50, this.scene.scale.width -50),
            Phaser.Math.Between(150, this.scene.scale.height -70),
            'tomato_item'
        );
    }

    // funcion que destruye el item
    destroyItem() {
        this.children.entries[0].destroy();
        this.addTomatoItem();
    }
}

export default TomatoItem;