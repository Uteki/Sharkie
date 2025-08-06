class Fullscreen extends DrawableObject {
    constructor() {
        super().loadImage(getAssetPath('content/6.Botones/Full Screen/Mesa de trabajo 7.png'));

        this.width = 180;
        this.height = 40;
        this.x = 480;
        this.y = 400;
    }

    btnVisibility() {
        if (document.fullscreen === true) {
            this.width = 0;
            this.height = 0;
            this.x = 0;
            this.y = 0;
        } else if (document.fullscreen === false) {
            this.width = 180;
            this.height = 40;
            this.x = 480;
            this.y = 400;
        }
    }
}