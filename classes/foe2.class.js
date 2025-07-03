class Foe2 extends MoveableObject {
    width = 125;
    height = 220;

    IMAGES_SWIM_LILA = [
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png`
    ];

    IMAGES_SWIM_YELLOW = [
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png`
    ];

    constructor(version) {
        super();
        const cap = version.charAt(0).toUpperCase() + version.slice(1).toLowerCase();
        const imagePath = `../assets/content/2.Enemy/2 Jelly fish/Regular damage/${cap} 1.png`;
        const imageSet = version.toLowerCase() === 'lila' ? this.IMAGES_SWIM_LILA : this.IMAGES_SWIM_YELLOW;

        this.loadImage(imagePath); this.loadImages(imageSet)

        this.x = 850 + Math.floor(Math.random() * 500);
        this.y = - 75 + Math.floor(Math.random() * (0 - 400 + 1)) + 400;
        this.speed += Math.random();
        this.motion(imageSet);
    }


    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
        }, 100);

        this.movement = setInterval(() => {
            this.moveLeft()
        },1000 / 60);
    }
}