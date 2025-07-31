class Endboss extends MoveableObject {
    width = 505;
    height = 500;
    energy = 150;

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
        super().loadImage(this.IMAGES_FLOATING[0]);
        this.loadImages(this.IMAGES_FLOATING);
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
            this.animate(images);
        }, 100);

        this.movement = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    animateHurt() {
        this.animate(this.IMAGES_HURT);

        setTimeout(() => {
            if (this.energy <= 0) {
                clearInterval(this.animation);
                clearInterval(this.movement);
                this.animateDeath();
            }
        }, 500);
    }

    animateDeath() {
        this.animate(this.IMAGES_DEAD);
    }
}