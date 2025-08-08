class GoHome extends DrawableObject {
    GO_HOME = getAssetPath('global/png/home.png');

    homeButton = {
        x: 265, y: 305, width: 180, height: 105
    }

    world;

    constructor() {
        super().loadImage(this.GO_HOME);

        this.width = this.homeButton.width;
        this.height = this.homeButton.height;
        this.x = this.homeButton.x;
        this.y = this.homeButton.y;

        this.goHome = this.goHome.bind(this);
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