class Endboss extends MoveableObject {
    width = 505;
    height = 500;
    energy = 150;

    lastAttack;
    speedIncrease = 0;
    retreatingStep = true;

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

    IMAGES_ATTACK = [
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/1.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/2.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/3.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/4.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/5.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Attack/6.png')
    ];

    IMAGES_HURT = [
        getAssetPath('content/2.Enemy/3 Final Enemy/Hurt/1.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Hurt/2.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Hurt/3.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Hurt/4.png')
    ];

    IMAGES_DEAD = [
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png'),
        getAssetPath('content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png')
    ];

    constructor() {
        super().loadImage(this.IMAGES_INTRO[0]);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3050;
        this.y = -75;
        this.speed = 0.5;
        this.motion(this.IMAGES_FLOATING);
    }

    setWorld(world) {
        this.world = world;
    }

    lastAttacked() {
        return (new Date().getTime() - this.lastAttack) / 1000 < 1.7;
    }

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

    animateHurt() {
        if (this.energy <= 0) {
            this.foeDead = true;
            this.clearInters();
            this.animateDeath();
        }

        this.animatePain();
    }

    animatePain() {
        this.currentImage = 0;
        const maxPain = 6; let painCount = 0

        this.pain = setInterval(() => {
            painCount++;
            this.animate(this.IMAGES_HURT)
            if (painCount <= maxPain) { clearInterval(this.pain) }
        }, 100);
    }

    animateDeath() {
        this.currentImage = 0;
        this.deathAnimation = setInterval(() => {
            if (this.currentImage <= this.IMAGES_DEAD.length - 1) {
                this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
                this.currentImage++;
            } else { clearInterval(this.deathAnimation) }
        }, 100);
    }

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

    animateAttack() {
        if (!this.world || !this.world.character) return;
        let distance = this.x - this.world.character.x;

        this.farFromShark(distance);
        this.nearShark(distance);
    }

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

    nearShark(distance) {
        if (distance <= 200  && !this.lastAttacked()) {
            this.currentImage = 0;
            this.speed = 2.5 + this.speedIncrease;
            this.lastAttack = new Date().getTime();
            if (this.attackAnimation) { clearInterval(this.attackAnimation) }
            biteAtkMusic.play();
            this.attackAnimation = setInterval(() => {
                if (this.currentImage <= this.IMAGES_ATTACK.length - 1) {
                    this.img = this.imageCache[this.IMAGES_ATTACK[this.currentImage]];
                    this.currentImage++;
                } else { clearInterval(this.attackAnimation) }
            }, 100);
        }
    }
}