class TryAgain extends DrawableObject {
    TRY_AGAIN = getAssetPath('content/6.Botones/Try again/Recurso 17.png');

    againButton = {
        x: 260, y: 240, width: 180, height: 40
    }

    world;

    constructor() {
        super().loadImage(this.TRY_AGAIN);

        this.width = this.againButton.width;
        this.height = this.againButton.height;
        this.x = this.againButton.x;
        this.y = this.againButton.y;

        this.tryAgain = this.tryAgain.bind(this);
    }

    tryAgain(event) {
        let handler = handleClick(event, this.againButton);
        if (handler) {
            this.world.cleanup();
            canvas.style.cursor = 'default';
            startGame();
        }
    }
}