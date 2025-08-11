/**
 * Represents the final boss enemy with multiple animations and attack phases.
 * Extends MoveableObject for movement and animation capabilities.
 */
class Endboss extends MoveableObject {
    /** @type {number} */
    width = 905;

    /** @type {number} */
    height = 900;

    /** @type {number} */
    energy = 150;

    /** @type {number|undefined} - Timestamp of last attack */
    lastAttack;

    /** @type {number} - Speed increment during retreat */
    speedIncrease = 0;

    /** @type {boolean} - Flag for retreating step state */
    retreatingStep = true;

    /** @type {string[]} - Paths to intro animation images */
    IMAGES_INTRO = [
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/1.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/2.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/3.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/4.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/5.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/6.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/7.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/8.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/9.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/1.Introduce/10.png')
    ];

    /** @type {string[]} - Paths to floating animation images */
    IMAGES_FLOATING = [
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/1.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/2.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/3.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/4.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/5.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/6.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/7.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/8.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/9.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/10.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/11.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/12.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/2.floating/13.png')
    ];

    /** @type {string[]} - Paths to attack animation images */
    IMAGES_ATTACK = [
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/1.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/2.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/3.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/4.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/5.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/6.png')
    ];

    /** @type {string[]} - Paths to hurt animation images */
    IMAGES_HURT = [
        getAssetPath('content/2.Enemy/3 Final Enemy/Hurt/1.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Hurt/2.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Hurt/3.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Hurt/4.png')
    ];

    /** @type {string[]} - Paths to death animation images */
    IMAGES_DEAD = [
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png')
    ];

    /**
     * Creates an Endboss instance and initializes images and position.
     */
    constructor() {
        super().loadImage(this.IMAGES_INTRO[0]);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3050;
        this.y = -290;
        this.speed = 0.5;
        this.setHitBox('idle');
        this.motion(this.IMAGES_FLOATING);
    }

    /**
     * Sets the hitbox properties based on the foe's size and offsets. Enboss has 2 pattern.
     */
    setHitBox(pattern) {
        if (pattern === 'idle') {
            this.hitboxOffsetX = 55;
            this.hitboxOffsetY = 450;
            this.hitboxWidth = 500;
            this.hitboxHeight = 255;
        } else {
            this.hitboxOffsetX = 10;
            this.hitboxOffsetY = 330;
            this.hitboxWidth = 500;
            this.hitboxHeight = 390;
        }
    }

    /**
     * Sets the world instance for this endboss.
     * @param {object} world - The game world.
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * Checks if the last attack happened less than 1.7 seconds ago.
     * @returns {boolean} True if last attack was within 1.7 seconds.
     */
    lastAttacked() {
        return (new Date().getTime() - this.lastAttack) / 1000 < 1.7;
    }

    /**
     * Starts animation and movement intervals for the boss.
     * @param {string[]} images - Array of image paths for animation.
     */
    motion(images) {
        this.animation = setInterval(() => {
            if (this.inZone) this.animate(images);
            this.checkPhase();
            this.animateAttack();
        }, 100);

        this.movement = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Checks if the boss should enter the battle phase.
     */
    checkPhase() {
        if (this.world && this.world.character && !this.introduced) {
            let incoming = this.x - this.world.character.x;
            if (incoming <= this.width) {
                backgroundMusic.pause(); whaleMusic.play()
                this.introduced = true;
                this.clearInters();
                this.animateIntro();
            }
        }
    }

    /**
     * Handles hurt animation and death triggering.
     */
    animateHurt() {
        if (this.energy <= 0) {
            this.foeDead = true;
            this.clearInters();
            this.animateDeath();
        }

        this.animatePain();
    }

    /**
     * Animates the pain sequence.
     */
    animatePain() {
        this.currentImage = 0;
        const maxPain = 6; let painCount = 0

        this.pain = setInterval(() => {
            painCount++;
            this.animate(this.IMAGES_HURT)
            if (painCount <= maxPain) { clearInterval(this.pain) }
        }, 100);
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
            } else { clearInterval(this.deathAnimation) }
        }, 100);
    }

    /**
     * Plays the intro animation sequence.
     */
    animateIntro() {
        this.currentImage = 0;
        this.introAnimation = setInterval(() => {
            if (this.currentImage <= this.IMAGES_INTRO.length - 1) {
                this.img = this.imageCache[this.IMAGES_INTRO[this.currentImage]];
                this.currentImage++;
            } else {
                this.inZone = true;
                this.motion(this.IMAGES_FLOATING);
                clearInterval(this.introAnimation);
            }
        }, 75);
    }

    /**
     * Controls attack animations based on character distance.
     */
    animateAttack() {
        if (!this.world || !this.world.character) return;
        let distance = this.x - this.world.character.x;

        this.farFromShark(distance);
        this.nearShark(distance);
    }

    /**
     * Adjusts speed when far from the character.
     * @param {number} distance - Distance to the character.
     */
    farFromShark(distance) {
        if (distance > 300) {
            if (!this.retreatingStep) {
                this.speedIncrease += 0.5;
                this.retreatingStep = true;
            }
            this.speed = 0.5 + this.speedIncrease;
        } else {
            this.speed = 1.5 + this.speedIncrease;
            this.retreatingStep = false;
        }
    }

    /**
     * Handles attack logic when near the character.
     * @param {number} distance - Distance to the character.
     */
    nearShark(distance) {
        if (distance <= 200 && !this.lastAttacked()) {
            this.setHitBox("attack");
            this.currentImage = 0;
            this.speed = 2.5 + this.speedIncrease;
            this.lastAttack = new Date().getTime();
            if (this.attackAnimation) { clearInterval(this.attackAnimation) }
            biteAtkMusic.play();
            this.attackAnimation = setInterval(() => {
                if (this.currentImage <= this.IMAGES_ATTACK.length - 1) {
                    this.img = this.imageCache[this.IMAGES_ATTACK[this.currentImage]];
                    this.currentImage++;
                } else { clearInterval(this.attackAnimation); this.setHitBox("idle") }
            }, 100);
        } else if (distance <= -275) { world.character.energy = 0; this.world.energyBar.setPercentage(this.world.character.energy, "HEALTH" ) }
    }
}