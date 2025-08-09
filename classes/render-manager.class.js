class RenderManager {
    /**
     * Manages rendering of game objects and UI on the canvas.
     * @param {World} world - The game world instance.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    constructor(world, ctx, canvas) {
        this.world = world;
        this.ctx = ctx;
        this.canvas = canvas;
    }

    /**
     * Main draw loop, clears canvas, renders all game objects and UI.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.world.camera_x, 0);
        this.addObjectsToMap(this.world.level.backgroundObjects);
        this.addObjectsToMap(this.world.level.gatherObjects);
        this.addObjectsToMap(this.world.level.foes);
        this.addObjectsToMap(this.world.throwableObject);
        this.addToMap(this.world.character);
        this.ctx.translate(-this.world.camera_x, 0);

        this.drawUi();
        this.frameId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds multiple objects to the map for drawing.
     * @param {Array} objects - Array of drawable objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Adds a single object to the map, handling flipping if needed.
     * @param {Object} mo - The drawable object.
     */
    addToMap(mo) {
        if (mo.otherWay) this.switchDirection(mo);
        mo.draw(this.ctx);
        if (mo.otherWay) this.restoreDirection(mo);
    }

    /**
     * Flips the context horizontally to draw mirrored objects.
     * @param {Object} mo - The drawable object.
     */
    switchDirection(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores context state after drawing a mirrored object.
     * @param {Object} mo - The drawable object.
     */
    restoreDirection(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Draws the UI elements and game over/win screens if active.
     */
    drawUi() {
        this.addToMap(this.world.energyBar);
        this.addToMap(this.world.poisonBar);
        this.addToMap(this.world.coinBar);

        if (this.world.isGameOver) this.gameOverScreen();
        else if (this.world.isGameOn) this.gameOnScreen();

        this.addToMap(this.world.soundSetter);

        if (!isMobileDevice()) this.addToMap(this.world.fullscreen);
    }

    /**
     * Renders the game over screen overlay.
     */
    gameOverScreen() {
        this.screenFill();
        this.addToMap(this.world.youLose);
        this.tryMore();
    }

    /**
     * Renders the game win screen overlay.
     */
    gameOnScreen() {
        this.screenFill();
        this.addToMap(this.world.youWin);
        this.tryMore();
    }

    /**
     * Fills the screen with a semi-transparent black overlay.
     */
    screenFill() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Displays a message prompting the player to try again.
     */
    tryMore() {
        this.addToMap(this.world.tryAgain);
        this.addToMap(this.world.goHome);

        this.ctx.fillStyle = "#fff";
        this.ctx.font = "24px Lucky";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            isMobileDevice() ? "TOUCH to try again" : "Press ENTER to try again",
            this.canvas.width / 2 - 4,
            this.canvas.height / 2 + 65
        );
    }

    /**
     * Cancels the current animation frame request.
     */
    cancelFrame() {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
    }
}