class MoveableObject extends DrawableObject {
    /** @type {number} Horizontal movement speed */
    speed = 0.15;

    /** @type {number} Vertical speed (used for jumping/falling) */
    speedY = -1;

    /** @type {number} Acceleration applied to vertical speed */
    acceleration = -0.05;

    /** @type {boolean} If true, object is facing the opposite direction */
    otherWay = false;

    /** @type {boolean} Indicates if foe is dead */
    foeDead = false;

    /** @type {number} Current energy or health */
    energy = 100;

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MoveableObject} mo - The other movable object to check collision against.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x && this.y + this.height
            > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
    }

    /**
     * Animates the object by cycling through images in the bundle.
     * @param {string[]} bundle - Array of image paths.
     */
    animate(bundle) {
        let i = this.currentImage % bundle.length;
        let path = bundle[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Moves the object up by its speed */
    moveUp() {
        this.y -= this.speed;
    }

    /** Moves the object down by its speed */
    moveDown() {
        this.y += this.speed;
    }

    /** Moves the object right by its speed */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves the object left by its speed */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Starts fading the object by decreasing opacity until it disappears.
     * Removes from foe list if instance of Foe or Foe2.
     */
    startFading() {
        this.fadeInterval = setInterval(() => {
            if (this.opacity > 0) {
                this.opacity -= 0.05;
            } else {
                this.opacity = 0;
                clearInterval(this.fadeInterval);
                if (this instanceof Foe || this instanceof Foe2)
                    this.world.level.foes = this.world.level.foes.filter(f => f !== this);
            }
        }, 50);
    }

    /**
     * Applies gravity effect on the object, making it float upwards with acceleration.
     */
    applyGravity() {
        this.clearInters();

        this.movement = setInterval(() => {
            if (!world?.character) return;

            const incoming = this.x - world.character.x;

            if (this.floatsUp() && incoming <= 660) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Determines if the object should float up.
     * @returns {number} The current y position.
     */
    floatsUp() {
        return this.y;
    }

    /** Clears active intervals for animation and movement */
    clearInters() {
        clearInterval(this.animation);
        clearInterval(this.movement);
        this.animation = null;
        this.movement = null;
    }

    /**
     * Pauses movement and animation intervals.
     * Clears fadeBall interval if active.
     */
    pauseMove() {
        if (this.fadeBall) {
            clearInterval(this.fadeBall);
        }

        clearInterval(this.movement);
        setTimeout(() => clearInterval(this.animation), 700);
    }

    /**
     * Draws the hitbox rectangle around the foe on the given canvas context.
     * Primarily used for debugging collision detection.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    drawHitBox(ctx) {
        super.draw(ctx);

        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.strokeRect(
            this.hitBoxX(), this.hitBoxY(),
            this.hitboxWidth, this.hitboxHeight
        );
        ctx.restore();
    }

    /**
     * Gets the absolute X position of this foe's hitBox.
     * @returns {number} The X coordinate of the hitBox.
     */
    hitBoxX() { return this.x + this.hitboxOffsetX; }

    /**
     * Gets the absolute Y position of this foe's hitBox.
     * @returns {number} The Y coordinate of the hitBox.
     */
    hitBoxY() { return this.y + this.hitboxOffsetY; }
}