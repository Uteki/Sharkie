class MeleeZone extends MoveableObject {
    constructor(x, y) {
        super().loadImage("../assets/content/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
        this.width = 100;
        this.height = 100;
        this.slap(x, y);
    }

    slap(x, y) {
        this.x = x + 215;
        this.y = y + 15;

        this.startFading();

        this.fadeBall = setInterval(() => {
            this.x = -200;
            this.y = 200;
        }, 1000)
    }
}