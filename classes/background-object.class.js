/**
 * Represents a background object in the game world.
 * Extends MoveableObject to support movement and rendering.
 */
class BackgroundObject extends MoveableObject {
    /** @type {number} Width of the background object in pixels */
    width = 720;
    /** @type {number} Height of the background object in pixels */
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * Loads the specified image and sets the horizontal position.
     * Vertical position is fixed at 0 (top of the canvas).
     *
     * @param {string} imagePath - The path to the image asset.
     * @param {number} x - The horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}