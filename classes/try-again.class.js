class TryAgain extends DrawableObject {
    TRY_AGAIN = "../assets/content/6.Botones/Try again/Recurso 17.png";

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
        this.hoverHandler = this.handleHover.bind(this);
    }

    handleHover(event) {
        handleHover(event, this.screenButton);
    }

    tryAgain(event) {
        let handler = handleClick(event, this.screenButton);
        if (handler) {
            gameonMusic.stop();
            gameoverMusic.stop();
            document.removeEventListener("click", this.tryAgain);
            document.removeEventListener("keydown", this.world.restart);
            canvas.removeEventListener("mousemove", this.hoverHandler);
            canvas.style.cursor = 'default';
            startGame();
        }
    }
}