class TryAgain extends DrawableObject {
    TRY_AGAIN = getAssetPath('content/6.Botones/Try again/Recurso 17.png');

    screenButton = {
        x: 260, y: 240, width: 180, height: 40
    }

    world;

    constructor() {
        super().loadImage(this.TRY_AGAIN);

        this.width = this.screenButton.width;
        this.height = this.screenButton.height;
        this.x = this.screenButton.x;
        this.y = this.screenButton.y;

        this.tryAgain = this.tryAgain.bind(this);
        this.hoverHandlerAgain = this.handleHoverAgain.bind(this);
    }

    handleHoverAgain(event) {
        handleHover(event, this.screenButton);
    }

    tryAgain(event) {
        let handler = handleClick(event, this.screenButton);
        if (handler) {
            this.world.cleanup();
            canvas.style.cursor = 'default';
            startGame();
        }
    }
}