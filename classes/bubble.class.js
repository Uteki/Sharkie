class Bubble extends MoveableObject {
    width = 70;
    height = 90;

    constructor() {
        let rng = Math.floor(Math.random() * 3) + 1;
        // let IMAGES_SWIM = [
        // ];

        super().loadImage(`../assets/content/4. Marcadores/Posión/Dark - Right.png`);
        // this.loadImages(IMAGES_SWIM);

        // this.acceleration = Math.floor(-Math.random()*0.05);
        this.applyGravity();
        this.x = Math.floor(Math.random() * 2000);
        this.y = 350;
        this.speed += Math.random();
        // this.motion(IMAGES_SWIM);
    }

    motion(images) {
        setInterval(() => {
            this.animate(images);
        }, 100);

        this.moveLeft();
    }
}