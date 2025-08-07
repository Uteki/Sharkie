class GoHome extends DrawableObject {
    GO_HOME = getAssetPath('global/png/home.png');

    homeButton = {
        x: 265, y: 340, width: 180, height: 105
    }

    world;

    constructor() {
        super().loadImage(this.GO_HOME);

        this.width = this.homeButton.width;
        this.height = this.homeButton.height;
        this.x = this.homeButton.x;
        this.y = this.homeButton.y;

        this.goHome = this.goHome.bind(this);
        this.hoverHandlerHome = this.handleHoverHome.bind(this);
    }

    handleHoverHome(event) {
        handleHover(event, this.homeButton);
    }

    goHome(event) {
        let handler = handleClick(event, this.homeButton);
        if (handler) {
            this.world.cleanup();
            canvas.style.cursor = 'default';
            goToHomeScreen();
        }
    }
}