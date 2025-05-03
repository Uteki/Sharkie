class Foe extends MoveableObject {
    width = 95;
    height = 90;

    constructor() {
        let rng = Math.floor(Math.random() * 3) + 1;
        let IMAGES_SWIM = [
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim1.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim2.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim3.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim4.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim5.png`,
        ];

        super().loadImage(`../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png`);
        this.loadImages(IMAGES_SWIM);

        this.x = 250 + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (0 - 400 + 1)) + 400;
        this.speed += Math.random();
        this.motion(IMAGES_SWIM);
    }

    motion(images) {
        setInterval(() => {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);

        this.moveLeft();
    }
}