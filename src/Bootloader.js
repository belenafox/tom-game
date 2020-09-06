class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.path = './assets/';

        // se cargan las imágenes
        this.load.image([
            'background',
            'floor',
            'wall',
            'bomb',
            'tomato_item',
            'life',
            'logo'
        ]);

        // Se cargan los audios
        this.load.audio('bongo', 'bongojam_f.mp3');
        this.load.audio('pop', 'pop.mp3');
        this.load.audio('draw', 'draw.mp3');

        // se cargan las fuentes
        this.load.image('font', 'font/font.png');
        this.load.json('fontData', 'font/font.json');

        // se carga el personaje
        this.load.atlas('tomato', 'tomato/tomato.png', 'tomato/tomato_atlas.json');
        // Se carga animación
        this.load.animation('tomatoAnim', 'tomato/tomato_anim.json');

        this.load.on('complete', () => {
            // se inicia audio del juego
            this.sound.play('bongo', {loop: true});

            // se carga fuente en memoria
            const fontData = this.cache.json.get('fontData');
            // se carga fuente en el cache de Phaser
            this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, fontData));

            this.scene.start('Menu');
        });
    }
}
export default Bootloader;