class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.path = './assets/';

        this.load.on('complete', () => {
            this.scene.start('');
        });
    }
}
export default Bootloader;