class MeleeZone extends MoveableObject {
    constructor(x, y) {
        super().loadImage("../assets/content/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
        this.width = 100;
        this.height = 100;
        this.opacity = 1;
        this.fading = false;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x + 215;
        this.y = y + 15;

        this.fading = true;
        this.startFading();

        setInterval(() => {
            this.x = -200;
            this.y = 200;
        }, 500)
    }

    startFading() {
        const fadeInterval = setInterval(() => {
            if (this.opacity > 0) {
                this.opacity -= 0.05;
            } else {
                this.opacity = 0;
                clearInterval(fadeInterval);
            }
        }, 50);

        //correctit
    }
}