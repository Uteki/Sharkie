/**
 * Represents the main character in the game, extending MoveableObject.
 * Handles movement, animations, and attack mechanics.
 */
class Character extends MoveableObject {
    /** @type {number} Character height in pixels */
    height = 125;
    /** @type {number} Character width in pixels */
    width = 175;
    /** @type {number} Movement speed */
    speed = 5;
    /** @type {number} Timestamp of the last doze */
    doze = 0;
    /** @type {number} Timestamp of the last attack */
    lastAttack = 0;
    /** @type {number} Index to track the current end animation frame */
    currentImgEnd = 0;

    /** @type {boolean} Flag indicating if spacebar attack is pressed */
    spacePressed = false;
    /** @type {boolean} True when we've already entered idle state (so doze isn't repeatedly reset) */
    wasIdle = false;

    /** @type {boolean} True if sleep frame is enlarged */
    sleepFrameEnlarged = false;
    /** @type {boolean} True if sleep animation has started */
    sleepStarted = false;
    /** @type {boolean} True if sleep loop animation is active */
    sleepLooping = false;
    /** @type {number|null} ID of interval timer for sleep loop */
    sleepInterval = null;
    /** @type {number|null} ID of timeout timer for sleep start animation */
    sleepStartTimeout = null;

    /** @type {string[]} Idle animation image paths */
    IMAGES_IDLE = [
        getAssetPath('content/1.Sharkie/1.IDLE/1.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/2.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/3.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/4.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/5.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/6.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/7.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/8.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/9.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/10.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/11.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/12.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/13.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/14.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/15.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/16.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/17.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/18.png')
    ];

    /** @type {string[]} Sleep start animation image paths */
    IMAGES_SLEEP = [
        getAssetPath('content/1.Sharkie/2.Long_IDLE/i1.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I2.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I3.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I4.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I5.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I6.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I7.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I8.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I9.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I10.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I11.png')
    ]

    /** @type {string[]} Sleep animation image paths */
    IMAGES_SLEEP_Z = [
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I12.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I13.png'),
        getAssetPath('content/1.Sharkie/2.Long_IDLE/I14.png')
    ]

    /** @type {string[]} Swim animation image paths */
    IMAGES_SWIM = [
        getAssetPath('content/1.Sharkie/3.Swim/1.png'),
        getAssetPath('content/1.Sharkie/3.Swim/2.png'),
        getAssetPath('content/1.Sharkie/3.Swim/3.png'),
        getAssetPath('content/1.Sharkie/3.Swim/4.png'),
        getAssetPath('content/1.Sharkie/3.Swim/5.png'),
        getAssetPath('content/1.Sharkie/3.Swim/6.png')
    ];

    /** @type {string[]} Range attack animation image paths */
    IMAGES_RANGE = [
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png')
    ];

    /** @type {string[]} Melee attack animation image paths */
    IMAGES_MELEE = [
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/1.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/2.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/3.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/4.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/5.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/6.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/7.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/8.png')
    ];

    /** @type {string[]} Hurt animation image paths */
    IMAGES_HURT = [
        getAssetPath('content/1.Sharkie/5.Hurt/1.Poisoned/2.png'),
        getAssetPath('content/1.Sharkie/5.Hurt/1.Poisoned/3.png'),
        getAssetPath('content/1.Sharkie/5.Hurt/1.Poisoned/4.png'),
        getAssetPath('content/1.Sharkie/5.Hurt/1.Poisoned/5.png')
    ];

    /** @type {string[]} Dead animation image paths */
    IMAGES_DEAD = [
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/1.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/2.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/3.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/4.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/5.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/6.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/7.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/8.png')
    ];

    /** @type {Object} Reference to the game world */
    world;

    /**
     * Creates a new Character instance and initializes it.
     */
    constructor() {
        super().loadImage('./assets/content/1.Sharkie/1.IDLE/1.png');
        this.currentFrame = "idle";
        this.y = 250;

        this.doze = Date.now();
        this.wasIdle = false;

        this.loadImages(this.IMAGES_SLEEP);this.loadImages(this.IMAGES_SLEEP_Z);
        this.loadImages(this.IMAGES_IDLE);this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_MELEE);this.loadImages(this.IMAGES_RANGE);
        this.loadImages(this.IMAGES_HURT);this.loadImages(this.IMAGES_DEAD);

        this.frameLoader();
        this.motion();
    }

    /**
     * Initializes frame data for animation cropping.
     */
    frameLoader() {
        this.frameData = {
            'melee': { sx: 90, sy: 420, sw: 655, sh: 420 },
            'range': { sx: 90, sy: 355, sw: 655, sh: 500 },
            'idle': { sx: 90, sy: 420, sw: 590, sh: 420 },
            'doze': { sx: 90, sy: 420, sw: 590, sh: 500 },
        };
    }

    /**
     * Starts movement and animation loops.
     */
    motion() {
        this.motionMovement();
        this.motionAnimation();
    }

    /**
     * Handles character movement based on keyboard input.
     * Moves the character and adjusts the camera position.
     */
    motionMovement() {
        this.movement = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level1_end) { this.moveRight(); this.otherWay = false; sharkieMusic.play() }
            if (this.world.keyboard.LEFT && this.x > 0) { this.moveLeft(); this.otherWay = true; sharkieMusic.play() }
            if (this.world.keyboard.DOWN && this.y < 350) { this.moveDown(); sharkieMusic.play() }
            if (this.world.keyboard.UP && this.y > 5) { this.moveUp(); sharkieMusic.play() }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60 )
    }

    /**
     * Runs the animation loop that switches between idle, sleep, swim, attack, hurt, and dead states.
     */
    motionAnimation() {
        this.animation = setInterval(() => {
            const key = this.world.keyboard;
            if ((key.SPACE && !this.spacePressed && !this.lastAttacked()) || key.RIGHT || key.LEFT || key.UP || key.DOWN || this.world.isDead() || this.world.isHurt()) {
                this.resetSleep();
                if (key.SPACE && !this.spacePressed && !this.lastAttacked()) {
                    if (this.world.isDead()) return;
                    this.doze = Date.now(); this.wasIdle = false; this.atkPattern(); return;
                }
                if (!key.SPACE) this.spacePressed = false;
                if (this.world.isDead()) { this.doze = Date.now(); this.wasIdle = false; return this.animateEnd(this.IMAGES_DEAD); }
                if (this.world.isHurt()) { this.doze = Date.now(); this.wasIdle = false; sharkieMusic.stop(); return this.animate(this.IMAGES_HURT); }
                if (key.RIGHT || key.LEFT || key.DOWN || key.UP) { this.doze = Date.now(); this.wasIdle = false; return this.animate(this.IMAGES_SWIM); }
            } this.motionExtender();
        }, 100);
    }

    /**
     * Runs the animation loop (extender of motionAnimation) that switches between idle, sleep, swim, attack, hurt, and dead states.
     */
    motionExtender() {
        if ((Date.now() - this.doze) / 1000 >= 5) {
            if (!this.sleepStarted) {
                this.sleepStarted = true; this.wasIdle = false;

                this.adjustFrame('sleep', true);
                this.currentFrame = "doze";

                this.animateDoze(this.IMAGES_SLEEP, () => {
                    this.sleepLooping = true;
                    this.sleepInterval = setInterval(() => this.sleepLoop(this.IMAGES_SLEEP_Z), 150);
                });
            }
            return;
        }
        if (!this.wasIdle) { this.wasIdle = true; this.doze = Date.now() }
        this.animate(this.IMAGES_IDLE);
        sharkieMusic.pause();
    }

    /**
     * Resets sleep state flags and clears related timers.
     */
    resetSleep() {
        this.sleepStarted = false; this.sleepLooping = false;
        if (this.sleepInterval) clearInterval(this.sleepInterval); this.sleepInterval = null;
        if (this.sleepStartTimeout) clearTimeout(this.sleepStartTimeout); this.sleepStartTimeout = null;
        this.adjustFrame('sleep', false);
        this.currentFrame = "idle";
    }

    /**
     * Animates a sequence of images once, then calls a callback.
     * @param {string[]} bundle - Array of image paths to animate.
     * @param {Function} [callback] - Optional callback invoked after animation finishes.
     */
    animateDoze(bundle, callback) {
        let i = 0;
        if (this.sleepInterval) clearInterval(this.sleepInterval); this.sleepInterval = null
        if (this.sleepStartTimeout) clearTimeout(this.sleepStartTimeout);

        const next = () => {
            if (i < bundle.length) {
                this.img = this.imageCache[bundle[i++]];
                this.sleepStartTimeout = setTimeout(next, 100);
            } else {
                if (callback) callback();
            }
        };
        next();
    }

    /**
     * Animates images in a loop at a fixed interval.
     * @param {string[]} bundle - Array of image paths to loop through.
     */
    sleepLoop(bundle) {
        if (!bundle.length) return;
        if (this.sleepInterval) clearInterval(this.sleepInterval);
        let i = 0;
        this.sleepInterval = setInterval(() => this.img = this.imageCache[bundle[i++ % bundle.length]], 500);
    }

    /**
     * Chooses the attack pattern based on poison status.
     * Plays the corresponding attack animation and sound.
     */
    atkPattern() {
        this.otherWay = false; this.spacePressed = true
        if (this.world.poison !== 0) {
            this.animateMelee(this.IMAGES_MELEE); slapAtkMusic.play();
        } else {
            this.animateRange(this.IMAGES_RANGE); bubbleAtkMusic.play();
        }
    }

    /**
     * Checks if the character has attacked recently to prevent attack spamming.
     * @returns {boolean} True if the last attack was within 0.85 seconds.
     */
    lastAttacked() {
        return (new Date().getTime() - this.lastAttack) / 1000 < 0.85;
    }

    /**
     * Creates a bubble throwable object and adds it to the world.
     */
    throwBubble() {
        let bubble = new ThrowableObject(this.world.character.x, this.world.character.y);
        bubble.world = this.world;
        this.world.throwableObject.push(bubble);
    }

    /**
     * Applies poison buff effect, decreases poison count, updates poison bar,
     * and creates a melee zone after a short delay.
     */
    poisonBuff() {
        this.world.poison--;
        this.world.poisonBar.setPercentage((this.world.poison / this.world.maxPoison) * 100, "POISON");

        setTimeout(() => {
            this.world.throwableObject.push(new MeleeZone(this.world.character.x, this.world.character.y));
        }, 150);
    }

    /**
     * Resets attack state after finishing an attack animation.
     */
    resetAttack() {
        this.currentImage = 0;
        this.world.keyboard.SPACE = false;
        this.spacePressed = false;
        this.lastAttack = new Date().getTime();
    }

    /**
     * Plays the range attack animation, adjusts the character frame,
     * and throws a bubble projectile.
     * @param {string[]} bundle - Array of image paths for range attack animation.
     */
    animateRange(bundle) {
        if (this.lastAttacked()) return this.world.keyboard.SPACE = false;

        this.resetAttack();
        this.adjustFrame("range", true);
        this.throwBubble();

        this.currentFrame = "range"
        this.frameInt = setInterval(() => { this.animate(bundle) },100)
        setTimeout(() => { clearInterval(this.frameInt); this.adjustFrame("range", false); this.currentFrame = "idle" }, 450)
    }

    /**
     * Plays the melee attack animation, adjusts the character frame,
     * and applies poison buff.
     * @param {string[]} bundle - Array of image paths for melee attack animation.
     */
    animateMelee(bundle) {
        if (this.lastAttacked()) return this.world.keyboard.SPACE = false;

        this.resetAttack();
        this.adjustFrame("melee", true);
        this.poisonBuff();

        this.currentFrame = "melee"
        this.frameInt = setInterval(() => { this.animate(bundle) },100)
        setTimeout(() => { clearInterval(this.frameInt); this.adjustFrame("melee",false); this.currentFrame = "idle" }, 450)
    }

    /**
     * Adjusts character size and position during attack animations to create visual impact.
     * @param {'range'|'melee'} type - The type of attack frame to adjust.
     * @param {boolean} enlarge - Whether to enlarge (true) or reset (false) the frame.
     */
    adjustFrame(type = 'range', enlarge = true) {
        const amount = 20;

        if (type === 'range') {
            this.height += enlarge ? amount : -amount;
            this.width  += enlarge ? amount : -amount;
            this.y      += enlarge ? -amount : amount;
        } else if (type === 'melee') {
            this.width += enlarge ? amount : -amount;
        } else if (type === 'sleep') {
            this.height += (enlarge && !this.sleepFrameEnlarged) ? amount : (!enlarge && this.sleepFrameEnlarged) ? -amount : 0;
            this.sleepFrameEnlarged = enlarge ? true : (!enlarge ? false : this.sleepFrameEnlarged);
        }
    }

    /**
     * Plays the dead animation sequence looping through the provided image bundle.
     * @param {string[]} bundle - Array of image paths for dead animation.
     */
    animateEnd(bundle) {
        let i = this.currentImgEnd % bundle.length;
        let path = bundle[i];
        this.img = this.imageCache[path];
        this.currentImgEnd++;
    }
}