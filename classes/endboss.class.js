class Endboss extends MoveableObject {
    width = 505;
    height = 500;

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

    constructor() {
        super().loadImage(this.IMAGES_FLOATING[0]);
        this.loadImages(this.IMAGES_FLOATING);
        this.x = 1200;
        this.y = -75;
        this.speed = 0.5;

        this.motion(this.IMAGES_FLOATING);
    }

    motion(images) {
        setInterval(() => {
            this.animate(images);
        }, 100);

        this.moveLeft();
    }
}