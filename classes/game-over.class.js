class GameOver extends DrawableObject {
    /**
     * @type {string[]}
     * Array of image paths for game over animation frames
     */
    GAME_OVER = [
        getAssetPath('content/6.Botones/Tittles/Game Over/Recurso 9.png'),
        getAssetPath('content/6.Botones/Tittles/Game Over/Recurso 10.png'),
        getAssetPath('content/6.Botones/Tittles/Game Over/Recurso 11.png'),
        getAssetPath('content/6.Botones/Tittles/Game Over/Recurso 12.png'),
        getAssetPath('content/6.Botones/Tittles/Game Over/Recurso 13.png')
    ]

    constructor() {
        super().loadImage(this.GAME_OVER[0]);
        this.loadImages(this.GAME_OVER);

        this.width = 330;
        this.height = 60;
        this.x = 195;
        this.y = 105;

        this.motion(this.GAME_OVER);
    }

    /**
     * Starts the animation motion loop
     * @param {string[]} images - Array of image paths for animation frames
     */
    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
        }, 500);
    }

    /**
     * Animates by cycling through the image bundle
     * @param {string[]} bundle - Array of image paths for animation frames
     */
    animate(bundle) {
        let i = this.currentImage % bundle.length;
        let path = bundle[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}