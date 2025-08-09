class StatusBar extends DrawableObject {
    /**
     * Paths for poison status bar images.
     * @type {string[]}
     */
    POISON = [
        './assets/content/4. Marcadores/Purple/0_.png',
        './assets/content/4. Marcadores/Purple/20_.png',
        './assets/content/4. Marcadores/Purple/40_.png',
        './assets/content/4. Marcadores/Purple/60_.png',
        './assets/content/4. Marcadores/Purple/80_.png',
        './assets/content/4. Marcadores/Purple/100_.png',
    ];

    /**
     * Paths for health status bar images.
     * @type {string[]}
     */
    HEALTH = [
        './assets/content/4. Marcadores/green/Life/0.png',
        './assets/content/4. Marcadores/green/Life/20.png',
        './assets/content/4. Marcadores/green/Life/40.png',
        './assets/content/4. Marcadores/green/Life/60.png',
        './assets/content/4. Marcadores/green/Life/80.png',
        './assets/content/4. Marcadores/green/Life/100.png'
    ];

    /**
     * Paths for coin status bar images.
     * @type {string[]}
     */
    COIN = [
        './assets/content/4. Marcadores/orange/0.png',
        './assets/content/4. Marcadores/orange/20.png',
        './assets/content/4. Marcadores/orange/40.png',
        './assets/content/4. Marcadores/orange/60.png',
        './assets/content/4. Marcadores/orange/80.png',
        './assets/content/4. Marcadores/orange/100.png',
    ];

    /**
     * Current percentage to display on the status bar.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates a status bar.
     * @param {number} x - The x position of the bar.
     * @param {number} y - The y position of the bar.
     * @param {string} type - Type of the bar (e.g., "POISON", "HEALTH", "COIN").
     * @param {number} start - Starting percentage value.
     */
    constructor(x, y, type, start) {
        super().loadImage(this[type][5]);
        this.loadImages(this[type]);
        this.setPercentage(start, type);

        this.width = 200;
        this.height = 55;
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the percentage and updates the image accordingly.
     * @param {number} percentage - The new percentage.
     * @param {string} type - The status bar type.
     */
    setPercentage(percentage, type) {
        this.percentage = percentage;
        this.img = this.imageCache[this[type][this.percentageNumber()]];
    }

    /**
     * Calculates the index of the image based on the current percentage.
     * @returns {number} Index of the image to use.
     */
    percentageNumber() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80 || this.percentage > 60) {
            return 4;
        } else if (this.percentage > 60 || this.percentage > 40) {
            return 3;
        } else if (this.percentage > 40 || this.percentage > 20) {
            return 2;
        } else if (this.percentage > 20 || this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}