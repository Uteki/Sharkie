/**
 * Represents a collectible coin object with spinning animation.
 * Extends MoveableObject for animation and positioning.
 */
class Coin extends MoveableObject {
    /** @type {number} */
    width = 50;

    /** @type {number} */
    height = 50;

    /** @type {string[]} - Paths to coin spinning animation images */
    COINING = [
        getAssetPath('content/4. Marcadores/1. Coins/1.png'),
        getAssetPath('content/4. Marcadores/1. Coins/2.png'),
        getAssetPath('content/4. Marcadores/1. Coins/3.png'),
        getAssetPath('content/4. Marcadores/1. Coins/4.png'),
    ]

    /**
     * Creates a coin at specified coordinates.
     * @param {number} x - The x position of the coin.
     * @param {number} y - The y position of the coin.
     */
    constructor(x, y) {
        super().loadImage(this.COINING[0]);
        this.loadImages(this.COINING);

        this.x = x;
        this.y = y;

        this.motion(this.COINING);
    }

    /**
     * Starts the coin spinning animation.
     * @param {string[]} images - Array of images to animate.
     */
    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
        }, 1000/10);
    }
}