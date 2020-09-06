class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    init(data) {
        console.log('Se ha iniciado la escena Menu');
        this.points = 0;
        if(Object.keys(data).length !== 0) {
            this.points = data.points;
        }
    }

    create() {
        // almacenamos los puntos en LocalStorage
        const pointsDB = localStorage.getItem('best_points');
        this.bestPoints = (pointsDB !== null) ? pointsDB : 0;


        this.add.image(0, 0, 'background')
            .setOrigin(0);

        this.add.image(0, 0, 'wall')
            .setOrigin(0);
        this.add.image(this.scale.width, 0, 'wall')
            .setOrigin(1, 0)
            .setFlipX(true);
        this.add.image(0, this.scale.height, 'floor')
            .setOrigin(0, 1);

        // logo
        this.logoMenu = this.add.image(
            this.scale.width/2,
            this.scale.height/2,
            'logo'
        ).setScale(2).setInteractive();

        // seteamos los puntos
        this.pointsText = this.add.bitmapText(
            this.scale.width/2,
            this.scale.height - 100,
            'pixelFont',
            'PUNTOS ' + this.points
        ).setDepth(2).setOrigin(0.5);

        // seteamos el mejor puntaje
        this.bestPointsText = this.add.bitmapText(
            this.scale.width/2,
            this.scale.height - 80,
            'pixelFont',
            'MEJOR ' + this.bestPoints
        ).setDepth(2).setOrigin(0.5);

        // al presionar el logo se inicia el juego
        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({
                targets: this.logoMenu,
                ease: 'Bounce.easeIn',
                y: -200,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('Play');
                }
            });

            this.add.tween({
                targets: [this.pointsText, this.bestPointsText],
                ease: 'Bounce.easeIn',
                y: 400,
                duration: 1000
            });
        });

        // mejor puntuacion
        if(this.points > this.bestPoints) {
            localStorage.setItem('best_points', this.points);
        }
    }
}

export default Menu;