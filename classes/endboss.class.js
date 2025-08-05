class Endboss extends MoveableObject {
    width = 505;
    height = 500;
    energy = 150;

    IMAGES_INTRO = [
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "../assets/content/2.Enemy/3 Final Enemy/1.Introduce/10.png",
    ]

    IMAGES_FLOATING = [
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/1.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/2.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/3.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/4.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/5.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/6.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/7.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/8.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/9.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/10.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/11.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/12.png",
        "../assets/content/2.Enemy/3 Final Enemy/2.floating/13.png",
    ]

    IMAGES_HURT = [
        "../assets/content/2.Enemy/3 Final Enemy/Hurt/1.png",
        "../assets/content/2.Enemy/3 Final Enemy/Hurt/2.png",
        "../assets/content/2.Enemy/3 Final Enemy/Hurt/3.png",
        "../assets/content/2.Enemy/3 Final Enemy/Hurt/4.png",
    ]

    IMAGES_DEAD = [
        "../assets/content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
        "../assets/content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
        "../assets/content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
        "../assets/content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
        "../assets/content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
        "../assets/content/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    ]

    constructor() {
        super().loadImage(this.IMAGES_INTRO[0]);
        this.loadImages(this.IMAGES_FLOATING);
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

    motion(images) {
        this.animation = setInterval(() => {
            if (this.inZone) this.animate(images);
            this.checkPhase(images);
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
}