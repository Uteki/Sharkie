class GameOver extends DrawableObject {
    GAME_OVER = [
        '../assets/content/6.Botones/Tittles/Game Over/Recurso 9.png',
        '../assets/content/6.Botones/Tittles/Game Over/Recurso 10.png',
        '../assets/content/6.Botones/Tittles/Game Over/Recurso 11.png',
        '../assets/content/6.Botones/Tittles/Game Over/Recurso 12.png',
        '../assets/content/6.Botones/Tittles/Game Over/Recurso 13.png'
    ]

    constructor() {
        super().loadImage(this.GAME_OVER[0]);
        this.loadImages(this.GAME_OVER);

        this.width = 330;
        this.height = 60;
        this.x = 195;
        this.y = 140;

        this.motion(this.GAME_OVER);
    }

    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
        }, 500);
    }

    animate(bundle) {
        let i = this.currentImage % bundle.length;
        let path = bundle[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}