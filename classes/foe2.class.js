/**
 * Represents a jellyfish enemy with different versions and animations.
 * @extends MoveableObject
 */
class Foe2 extends MoveableObject {
    /** @type {number} */
    width = 125;

    /** @type {number} */
    height = 220;

    /** @type {Object} - Currently chosen version images and type */
    chosen;

    /** @type {number} - Current energy of the foe */
    energy;

    /** @type {string[]} - Swimming images for Lila version */
    IMAGES_SWIM_LILA = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png')
    ];

    /** @type {string[]} - Dead images for Lila version */
    IMAGES_DEAD_LILA = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Lila/L1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Lila/L2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Lila/L3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Lila/L4.png')
    ];

    /** @type {string[]} - Swimming images for Yellow version */
    IMAGES_SWIM_YELLOW = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png')
    ];

    /** @type {string[]} - Dead images for Yellow version */
    IMAGES_DEAD_YELLOW = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png')
    ];

    /** @type {string[]} - Swimming images for Green version */
    IMAGES_SWIM_GREEN = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png')
    ];

    /** @type {string[]} - Dead images for Green version */
    IMAGES_DEAD_GREEN = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/green/g1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/green/g2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/green/g3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/green/g4.png')
    ];

    /** @type {string[]} - Swimming images for Pink version */
    IMAGES_SWIM_PINK = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png')
    ];

    /** @type {string[]} - Dead images for Pink version */
    IMAGES_DEAD_PINK = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Pink/P1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Pink/P2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Pink/P3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Pink/P4.png')
    ];

    /**
     * Creates an instance of Foe2.
     * @param {string} version - Version/color of the foe (e.g., 'green', 'pink').
     * @param {number} spawn - Initial spawn x-position offset.
     */
    constructor(version, spawn) {
        super(); const v = version.toLowerCase()

        this.chosen = this.getVersionImages(v);
        this.loadImage(this.chosen.swim[0]);
        this.loadImages(this.chosen.swim);
        this.loadImages(this.chosen.dead);

        this.energy = (v === 'green' || v === 'pink') ? 75 : 50;
        this.x = spawn + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (0 - 300 + 1)) + 300;
        this.speed += Math.random();

        this.setHitBox(); this.motion(this.chosen.swim)
    }

    /**
     * Sets the hitbox properties based on the foe's size and offsets.
     */
    setHitBox() {
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 15;
        this.hitboxWidth = this.width - 20;
        this.hitboxHeight = 175;
    }

    /**
     * Sets the world object reference.
     * @param {Object} world - The game world.
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * Gets image sets and type for the given version.
     * @param {string} v - Version string.
     * @returns {{swim: string[], dead: string[], type: string}} Image arrays and foe type.
     */
    getVersionImages(v) {
        return {
            lila: { swim: this.IMAGES_SWIM_LILA, dead: this.IMAGES_DEAD_LILA, type: "weak" },
            yellow: { swim: this.IMAGES_SWIM_YELLOW, dead: this.IMAGES_DEAD_YELLOW, type: "weak" },
            green: { swim: this.IMAGES_SWIM_GREEN, dead: this.IMAGES_DEAD_GREEN, type: "strong" },
            pink: { swim: this.IMAGES_SWIM_PINK, dead: this.IMAGES_DEAD_PINK, type: "strong" },
        }[v] || { swim: this.IMAGES_SWIM_LILA, dead: this.IMAGES_DEAD_LILA, type: "weak" };
    }

    /**
     * Starts animation and movement intervals.
     * @param {string[]} images - Array of swimming image paths.
     */
    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
        }, 100);

        this.movement = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Handles animation when hurt, triggers death if energy depleted.
     */
    animateHurt() {
        if (this.energy <= 0) {
            this.foeDead = true;
            this.clearInters();
            this.animateDeath();
            return;
        }
        this.animateBlinking();
    }

    /**
     * Plays blinking animation to indicate hurt state.
     */
    animateBlinking() {
        let blinkCount = 0;
        const maxBlinks = 6;

        this.blink = setInterval(() => {
            this.opacity = this.opacity === 1 ? 0.3 : 1;
            blinkCount++;
            if (blinkCount >= maxBlinks) {
                clearInterval(this.blink);
                this.opacity = 1;
            }
        }, 75);
    }

    /**
     * Plays death animation and starts fading out after completion.
     */
    animateDeath() {
        this.currentImage = 0;
        this.deathAnimation = setInterval(() => {
            if (this.currentImage <= this.chosen.dead.length - 1) {
                this.img = this.imageCache[this.chosen.dead[this.currentImage]];
                this.currentImage++;
            } else {
                clearInterval(this.deathAnimation);
                if (this.world) {
                    this.startFading();
                }
            }
        }, 100);
    }
}