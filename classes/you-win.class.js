class YouWin extends DrawableObject {
    WIN = "../assets/content/6.Botones/Tittles/You win/Mesa de trabajo 1.png";

    constructor() {
        super().loadImage(this.WIN);

        this.width = canvas.width;
        this.height = canvas.height;
        this.x = canvas.x;
        this.y = canvas.y;

        this.motion(this.GAME_OVER);
    }
}