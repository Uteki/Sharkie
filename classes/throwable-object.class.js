class ThrowableObject extends MoveableObject {
    constructor(x, y) {
        super().loadImage("../assets/content/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.width = 50;
        this.height = 50;
        this.x = x + 125;
        this.y = y + 75;

        this.speedX = 5;
        this.floatSpeed = 2.4;
        this.floatDecay = 0.012;
        this.wobbleAngle = 0;
        this.startFloating();
    }

    startFloating() {
        this.movement = setInterval(() => {
            if (typeof world !== 'undefined' && world.character) {
                let incoming = this.x - world.character.x;

                if (this.floatsUp() && incoming <= 660) {
                    this.x += this.speedX + Math.sin(this.wobbleAngle) * 0.8;
                    this.y -= this.floatSpeed;
                    this.floatSpeed = Math.max(this.floatSpeed - this.floatDecay, 0.2);
                    this.wobbleAngle += 0.1;
                }
            }
        }, 1000 / 30);
    }
}
