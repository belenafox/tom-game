import Bootloader from './Bootloader.js';

const config = {
    title: "TOM",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 640,
        height: 360,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 2000
            }
        }
    },
    scene: [
        Bootloader
    ]
};

new Phaser.Game(config);