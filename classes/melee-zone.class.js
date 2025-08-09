class MeleeZone extends MoveableObject {
    /**
     * Creates a MeleeZone instance with a poisoned bubble image and starts the slap effect.
     * @param {number} x - The initial x position.
     * @param {number} y - The initial y position.
     */
    constructor(x, y) {
        super().loadImage(getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'));
        this.width = 100;
        this.height = 100;
        this.slap(x, y);
    }

    /**
     * Sets the position of the melee zone relative to given coordinates,
     * starts fading effect, and periodically moves it offscreen.
     * @param {number} x - The x position to base the melee zone on.
     * @param {number} y - The y position to base the melee zone on.
     */
    slap(x, y) {
        this.x = x + 175;
        this.y = y + 15;

        this.startFading();

        this.fadeBall = setInterval(() => {
            this.x = -200;
            this.y = 200;
        }, 1000);
    }
}