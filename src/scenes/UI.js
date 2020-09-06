class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'});
    }

    init() {
        console.log('Se ha iniciado la escena UI');
        // se posiciona la escena UI delante de la escena Play
        this.scene.moveUp();
        
        // seteamos el inicio de la puntuacion a 0
        this.actual_points = 0;
    }

    create() {
        // corazones
        this.groupLife = this.add.group({
            key: 'life',
            repeat: 2,
            setXY: {
                x: 50,
                y: 20,
                stepX: 25
            }
        });

        // mostramos puntuación
        this.points = this.add.bitmapText(
            this.scale.width -40,
            10,
            'pixelFont',
            Phaser.Utils.String.Pad('0', 6, '0', 1) // permite mostrar muchos ceros y llenarlos
        ).setOrigin(1, 0).setTint(0x000000);

        // eventos
        this.registry.events.on('remove_life', () => {
            this.groupLife.getChildren()[this.groupLife.getChildren().length -1].destroy();
        });
        this.registry.events.on('game_over', () => {
            this.registry.events.removeAllListeners();
            this.scene.start('Menu', {points: this.actual_points});
        });

        this.registry.events.on('update_points', () => {
            this.actual_points += 10;
            this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 6, '0', 1));
        });
    }
}

export default UI;