class Foe2 extends MoveableObject {
    width = 125;
    height = 220;
    chosen;
    energy;

    IMAGES_SWIM_LILA = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png')
    ];

    IMAGES_DEAD_LILA = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Lila/L1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Lila/L2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Lila/L3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Lila/L4.png')
    ];

    IMAGES_SWIM_YELLOW = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png')
    ];

    IMAGES_DEAD_YELLOW = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png')
    ];

    IMAGES_SWIM_GREEN = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png')
    ];

    IMAGES_DEAD_GREEN = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/green/g1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/green/g2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/green/g3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/green/g4.png')
    ];

    IMAGES_SWIM_PINK = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png')
    ];

    IMAGES_DEAD_PINK = [
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Pink/P1.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Pink/P2.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Pink/P3.png'),
        getAssetPath('content/2.Enemy/2 Jelly fish/Dead/Pink/P4.png')
    ];

    constructor(version, spawn) {
        super();
        const v = version.toLowerCase();

        this.chosen = this.getVersionImages(v);
        this.loadImage(this.chosen.swim[0]); this.loadImages(this.chosen.swim); this.loadImages(this.chosen.dead)
        this.energy = (v === 'green' || v === 'pink') ? 75 : 50;
        this.x = spawn + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (0 - 300 + 1)) + 300;
        this.speed += Math.random();

        this.motion(this.chosen.swim);
    }

    setWorld(world) {
        this.world = world;
    }

    getVersionImages(v) {
        return {
            lila: { swim: this.IMAGES_SWIM_LILA, dead: this.IMAGES_DEAD_LILA, type: "weak" },
            yellow: { swim: this.IMAGES_SWIM_YELLOW, dead: this.IMAGES_DEAD_YELLOW, type: "weak" },
            green: { swim: this.IMAGES_SWIM_GREEN, dead: this.IMAGES_DEAD_GREEN, type: "strong" },
            pink: { swim: this.IMAGES_SWIM_PINK, dead: this.IMAGES_DEAD_PINK, type: "strong" },
        }[v] || { swim: this.IMAGES_SWIM_LILA, dead: this.IMAGES_DEAD_LILA, type: "weak" };
    }

    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
        }, 100);

        this.movement = setInterval(() => {
            this.moveLeft()
        },1000 / 60);
    }

    animateHurt() {
        if (this.energy <= 0) {
            this.foeDead = true;
            this.clearInters();
            this.animateDeath();
            return;
        }

        this.animateBlinking()
    }

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
        }, 100);
    }

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