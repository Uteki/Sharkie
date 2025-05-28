class Fullscreen extends DrawableObject {
    constructor() {
        super().loadImage("../assets/content/6.Botones/Full Screen/Mesa de trabajo 7.png");

        this.width = 180;
        this.height = 40;
        this.x = 480;
        this.y = 400;
    }

    setFullscreen(canvas) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
        }
    }
}