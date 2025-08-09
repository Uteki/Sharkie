class ThrowableObject extends MoveableObject {
    /**
     * Reference to the game world.
     * @type {World}
     */
    world;

    /**
     * Creates a throwable object (bubble).
     * @param {number} x - Initial x position.
     * @param {number} y - Initial y position.
     */
    constructor(x, y) {
        super().loadImage(getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/Bubble.png'));
        this.width = 50;
        this.height = 50;
        this.x = x + 125;
        this.y = y + 75;

        this.speedX = 5;
        this.floatSpeed = 2.4;
        this.floatCompo = 0.012;
        this.angle = 0;
        this.startFloating();
        this.disappear();
    }

    /**
     * Starts the floating movement of the throwable object.
     */
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

    /**
     * Starts the disappearance process with fading effect.
     */
    disappear() {
        this.elapsed = 0;
        this.fadeBall = setInterval(() => {
            this.elapsed += 100;

            if (this.elapsed >= 2000 && !this.fadingStarted) {
                this.startFading();
                this.fadingStarted = true;
            }
            if (this.elapsed >= 3000) {
                clearInterval(this.fadeBall);
                this.cancel();
            }
        }, 100);
    }

    /**
     * Cancels movement and removes the object from the world's throwable objects.
     */
    cancel() {
        clearInterval(this.movement);

        if (this.world) {
            this.world.throwableObject = this.world.throwableObject.filter(obj => obj !== this);
        }
    }
}