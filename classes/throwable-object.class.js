class ThrowableObject extends MoveableObject {
    world;

    constructor(x, y) {
        super().loadImage("../assets/content/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.width = 50;
        this.height = 50;
        this.x = x + 125;
        this.y = y + 75;

        this.speedX = 5;
        this.floatSpeed = 2.4;
        this.floatCompo = 0.012;
        this.angle = 0;
        this.startFloating(); this.disappear();
    }

    startFloating() {
        this.movement = setInterval(() => {
            if (typeof world !== 'undefined' && world.character) {
                let incoming = this.x - world.character.x;

                if (this.floatsUp() && incoming <= 660) {
                    this.x += this.speedX + Math.sin(this.angle) * 0.8;
                    this.y -= this.floatSpeed;
                    this.floatSpeed = Math.max(this.floatSpeed - this.floatCompo, 0.2);
                    this.angle += 0.1;
                }
            }
        }, 1000 / 30);
    }

    disappear() {
        this.elapsed = 0;

        this.fadeBall = setInterval(() => {
            this.elapsed += 100;

            if (this.elapsed >= 2000 && !this.fadingStarted) {
                this.startFading(); this.fadingStarted = true
            }
            if (this.elapsed >= 3000) {
                clearInterval(this.fadeBall); this.cancel()
            }
        }, 100);
    }

    cancel() {
        clearInterval(this.movement);

        if (this.world) {
            this.world.throwableObject = this.world.throwableObject.filter(obj => obj !== this);
        }
    }
}
