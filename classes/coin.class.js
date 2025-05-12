class Coin extends MoveableObject {
    width = 50;
    height = 50;

    COINING = [
        '../assets/content/4. Marcadores/1. Coins/1.png',
        '../assets/content/4. Marcadores/1. Coins/2.png',
        '../assets/content/4. Marcadores/1. Coins/3.png',
        '../assets/content/4. Marcadores/1. Coins/4.png',
    ]

    constructor(x, y) {
        super().loadImage(this.COINING[0]);
        this.loadImages(this.COINING);

        this.x = x;
        this.y = y;

        this.motion(this.COINING);
    }

    motion(images) {
        setInterval(() => {
            this.animate(images);
        }, 1000/10);
    }
}