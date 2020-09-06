class Tomato extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'tomato');

        // guardamos la escena en el objeto
        this.scene = config.scene;
        // el objeto tomato existe
        this.scene.add.existing(this);
        // le agregamos gravedad a tomato
        this.scene.physics.world.enable(this);

        // escalamos a tomato
        this.setScale(2);
        // cambiamos tamaño del cuadro de colision de tomato
        this.body.setSize(14, 20);
        // lo ajustamos al cuerpo de tomato
        this.body.setOffset(2, 5);
        // rebote de tomato
        this.body.setBounce(0.2);

        // salto
        this.jumping = false;

        // cargamos las animaciones de tomato
        this.anims.play('tomato_idle');
        this.prevMov = 'tomato_idle';

        // si choca con espinas
        this.hitDelay = false;

        // variables de control (movimiento)
        this.cursor = this.scene.input.keyboard.createCursorKeys();

        // vidas de tomato
        this.life = 3;

    }

    // con update podemos manipular al personaje
    update() {
        if(this.cursor.left.isDown) {
            this.body.setVelocityX(-200);
            this.flipX = true;

            if(this.prevMov !== 'left' && !this.jumping) {
                this.prevMov = 'left';
                this.anims.play('tomato_walk');
            }

        } else if(this.cursor.right.isDown) {
            this.body.setVelocityX(200);
            this.flipX = false;

            if(this.prevMov !== 'right' && !this.jumping) {
                this.prevMov = 'right';
                this.anims.play('tomato_walk');
            }

        } else if(this.cursor.down.isDown && !this.jumping) {
            this.body.setVelocityX(0);
            this.body.setSize(14, 15);
            this.body.setOffset(2, 10);

            if(this.prevMov !== 'down' && !this.jumping) {
                this.prevMov = 'down';
                this.anims.play('tomato_down');
            }
        }  
        else {
            this.body.setVelocityX(0);
            this.body.setSize(14, 20);
            this.body.setOffset(2, 5);
            if(this.prevMov !== 'tomato_idle' && !this.jumping) {
                this.prevMov = 'tomato_idle';
                this.anims.play('tomato_idle');
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursor.up) && !this.jumping) {
            this.jumping = true;
            this.body.setVelocityY(-800);
            if(this.prevMov !== 'jump') {
                this.prevMov = 'jump';
                this.anims.play('tomato_jump');
            }

        } else if(this.body.blocked.down) {
            this.jumping = false;
        }
    }

    // colision de bombas
    bombCollision() {
        if(!this.hitDelay) {
            this.hitDelay = true;

            // sonido colision
            this.scene.sound.play('draw');

            this.life--;
            this.scene.registry.events.emit('remove_life');

            if(this.life === 0){
                this.scene.registry.events.emit('game_over');
            }

            // cambia de color el personaje cuando choca con bomba
            this.setTint(0x1abc9c);

            this.scene.time.addEvent({
                delay: 600,
                callback: () => {
                    this.hitDelay = false;
                    this.clearTint();
                }
            });
        }
    }
}

export default Tomato;