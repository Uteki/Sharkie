class GoHome extends DrawableObject {
    /** @type {string} Path to the home button image */
    GO_HOME = getAssetPath('global/png/home.png');

    /** @type {{x: number, y: number, width: number, height: number}} */
    homeButton = {
        x: 265, y: 305, width: 180, height: 105
    }

    /** @type {object} Reference to the game world */
    world;

    constructor() {
        super().loadImage(this.GO_HOME);

        this.width = this.homeButton.width;
        this.height = this.homeButton.height;
        this.x = this.homeButton.x;
        this.y = this.homeButton.y;

        this.goHome = this.goHome.bind(this);
    }

    /**
     * Handles the click event on the home button
     * @param {MouseEvent} event - The click event
     */
    goHome(event) {
        let handler = handleClick(event, this.homeButton);
        if (handler) {
            this.world.cleanup();
            canvas.style.cursor = 'default';
            this.world.clearAllIntervals();
            goToHomeScreen();
        }
    }
}