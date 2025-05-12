class ThrowableObject extends MoveableObject {
    constructor(x, y) {
        super().loadImage("../assets/content/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.width = 50;
        this.height = 50;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x + 175;
        this.y = y + 100;
        this.speedY = 6;
        this.applyGravity();

        setInterval(() => {
            this.x += 7;
        }, 25)
    }
}