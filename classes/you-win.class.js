class YouWin extends DrawableObject {
    WIN = getAssetPath('content/6.Botones/Tittles/You win/Mesa de trabajo 1.png');

    constructor() {
        super().loadImage(this.WIN);

        this.width = canvas.width;
        this.height = canvas.height;
        this.x = 0;
        this.y = -100;
    }
}