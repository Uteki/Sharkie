class Coin extends MoveableObject {
    width = 50;
    height = 50;

    COINING = [
        getAssetPath('content/4. Marcadores/1. Coins/1.png'),
        getAssetPath('content/4. Marcadores/1. Coins/2.png'),
        getAssetPath('content/4. Marcadores/1. Coins/3.png'),
        getAssetPath('content/4. Marcadores/1. Coins/4.png'),
    ]

    constructor(x, y) {
        super().loadImage(this.COINING[0]);
        this.loadImages(this.COINING);

        this.x = x;
        this.y = y;

        this.motion(this.COINING);
    }

    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
        }, 1000/10);
    }
}