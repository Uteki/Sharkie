/**
 * Represents a Bubble throwable object in the game.
 * Extends MoveableObject to inherit movement and rendering capabilities.
 */
class Bubble extends MoveableObject {
    /** @type {number} Width of the bubble in pixels */
    width = 70;
    /** @type {number} Height of the bubble in pixels */
    height = 90;

    /**
     * Creates a new Bubble instance.
     * Loads the bubble image and sets a random horizontal starting position.
     */
    constructor() {
        super().loadImage(getAssetPath(`content/4. Marcadores/Posión/Dark - Right.png`));
        this.x = 200 + Math.floor(Math.random() * 2000);
        this.y = 350;
        this.setHitBoxObj();
    }
}