/**
 * Represents a foe enemy (Puffer fish) that can swim, transform, and die.
 * Extends MoveableObject to include movement and animation.
 */
class Foe extends MoveableObject {
    /** @type {number} */
    width = 95;

    /** @type {number} */
    height = 90;

    /** @type {number} */
    energy = 25;

    /** @type {string[]} - Paths of swimming images */
    IMAGES_SWIM;

    /** @type {string[]} - Paths of death images */
    IMAGES_DEAD;

    /** @type {string[]} - Paths of transformation images */
    IMAGES_FORM;

    /** @type {string[]} - Paths of angry swimming images */
    IMAGES_ANGY;

    /**
     * Creates an instance of Foe.
     * @param {number} spawn - X-coordinate spawn offset.
     */
    constructor(spawn) {
        let rng = Math.floor(Math.random() * 3) + 1;
        super().randomFish(rng);

        this.loadImage(getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim1.png`));
        this.loadCombination();

        this.x = spawn + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (0 - 400 + 1)) + 400;
        this.speed += Math.random();
        this.motion(this.IMAGES_SWIM);

        this.setHitBox(); this.transformed = false;
    }

    /**
     * Sets the hitbox properties based on the foe's size and offsets.
     */
    setHitBox() {
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 5;
        this.hitboxWidth = 70;
        this.hitboxHeight = 80;
    }

    /**
     * Sets the world instance for this foe.
     * @param {object} world - The game world.
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * Loads all image sets into the image cache.
     */
    loadCombination() {
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_FORM);
        this.loadImages(this.IMAGES_ANGY);
    }

    /**
     * Initializes image paths based on random fish selection.
     * @param {number} rng - Random number between 1 and 3 for fish version.
     */
    randomFish(rng) {
        this.IMAGES_SWIM = [
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim1.png`), getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim2.png`),
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim3.png`), getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim4.png`),
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim5.png`)
        ];

        this.IMAGES_DEAD = [
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/4.DIE/${rng}.dead1.png`), getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/4.DIE/${rng}.dead2.png`),
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/4.DIE/${rng}.dead3.png`)
        ];

        this.contImages(rng);
    }

    /**
     * Loads transition and angry swimming images based on fish version.
     * @param {number} rng - Random number between 1 and 3 for fish version.
     */
    contImages(rng) {
        this.IMAGES_FORM = [
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition1.png`), getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition2.png`),
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition3.png`), getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition4.png`),
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition5.png`)
        ];

        this.IMAGES_ANGY = [
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim1.png`), getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim2.png`),
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim3.png`), getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim4.png`),
            getAssetPath(`content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim5.png`)
        ];
    }

    /**
     * Checks proximity to the character and triggers transformation if close.
     */
    checkVicinity() {
        if (this.world && this.world.character && !this.transformed) {
            let incoming = this.x - this.world.character.x;
            if (incoming <= 440) {
                this.transformed = true;
                this.clearInters();
                this.animateTransition();
            }
        }
    }

    /**
     * Starts animation and movement intervals.
     * @param {string[]} images - Array of swimming image paths for animation.
     */
    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
            this.checkVicinity();
        }, 100);

        this.movement = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Animates the hurt state and triggers death if energy is depleted.
     */
    animateHurt() {
        if (this.energy <= 0) {
            this.foeDead = true;
            this.clearInters();
            this.animateDeath();
        }
    }

    /**
     * Animates the death sequence.
     */
    animateDeath() {
        this.currentImage = 0;
        this.deathAnimation = setInterval(() => {
            if (this.currentImage <= this.IMAGES_DEAD.length - 1) {
                this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
                this.currentImage++;
            } else {
                clearInterval(this.deathAnimation);
                if (this.world) {
                    this.startFading();
                }
            }
        }, 100);
    }

    /**
     * Animates the transformation transition, then switches to angry motion.
     */
    animateTransition() {
        this.currentImage = 0;
        this.formAnimation = setInterval(() => {
            if (this.currentImage <= this.IMAGES_FORM.length - 1) {
                this.img = this.imageCache[this.IMAGES_FORM[this.currentImage]];
                this.currentImage++;
            } else {
                this.motion(this.IMAGES_ANGY);
                clearInterval(this.formAnimation);
            }
        }, 75);
    }
}