class TryAgain extends DrawableObject {
    TRY_AGAIN = getAssetPath('content/6.Botones/Try again/Recurso 17.png');

    /**
     * Button dimensions and position for "Try Again".
     * @type {{x: number, y: number, width: number, height: number}}
     */
    againButton = {
        x: 260, y: 205, width: 180, height: 40
    }

    /** Reference to the game world */
    world;

    /**
     * Creates a TryAgain button drawable object.
     */
    constructor() {
        super().loadImage(this.TRY_AGAIN);

        this.width = this.againButton.width;
        this.height = this.againButton.height;
        this.x = this.againButton.x;
        this.y = this.againButton.y;

        this.tryAgain = this.tryAgain.bind(this);
    }

    /**
     * Handles the "try again" button click event.
     * @param {MouseEvent} event - The mouse click event.
     */
    tryAgain(event) {
        let handler = handleClick(event, this.againButton);
        if (handler) {
            this.world.cleanup();
            canvas.style.cursor = 'default';
            startGame();
        }
    }
}