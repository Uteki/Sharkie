class YouWin extends DrawableObject {
    /**
     * Image path for the "You Win" screen.
     * @type {string}
     */
    WIN = getAssetPath('content/6.Botones/Tittles/You win/Mesa de trabajo 1.png');

    /**
     * Creates a YouWin screen drawable object.
     */
    constructor() {
        super().loadImage(this.WIN);

        this.width = canvas.width;
        this.height = canvas.height;
        this.x = 0;
        this.y = -135;
    }
}