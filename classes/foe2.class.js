class Foe2 extends MoveableObject {
    width = 125;
    height = 220;
    energy;

    IMAGES_SWIM_LILA = [
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png`
    ];

    IMAGES_DEAD_LILA = [
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Lila/L1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Lila/L2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Lila/L3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Lila/L4.png`
    ]

    IMAGES_SWIM_YELLOW = [
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png`
    ];

    IMAGES_DEAD_YELLOW = [
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png`
    ]

    IMAGES_SWIM_GREEN = [
        `../assets/content/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png`,
    ];

    IMAGES_DEAD_GREEN = [
        `../assets/content/2.Enemy/2 Jelly fish/Dead/green/g1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/green/g2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/green/g3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/green/g4.png`
    ];

    IMAGES_SWIM_PINK = [
        `../assets/content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png`,
    ];

    IMAGES_DEAD_PINK = [
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Pink/P1.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Pink/P2.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Pink/P3.png`,
        `../assets/content/2.Enemy/2 Jelly fish/Dead/Pink/P4.png`
    ];

    constructor(version, spawn) {
        super();
        const v = version.toLowerCase();
        const chosen = this.getVersionImages(v);

        this.loadImage(chosen.swim[0]); this.loadImages(chosen.swim); this.loadImages(chosen.dead)
        this.energy = (v === 'green' || v === 'pink') ? 75 : 50;

        this.x = spawn + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (0 - 300 + 1)) + 300;
        this.speed += Math.random();

        this.motion(chosen.swim);
    }

    getVersionImages(v) {
        return {
            lila: { swim: this.IMAGES_SWIM_LILA, dead: this.IMAGES_DEAD_LILA },
            yellow: { swim: this.IMAGES_SWIM_YELLOW, dead: this.IMAGES_DEAD_YELLOW },
            green: { swim: this.IMAGES_SWIM_GREEN, dead: this.IMAGES_DEAD_GREEN },
            pink: { swim: this.IMAGES_SWIM_PINK, dead: this.IMAGES_DEAD_PINK }
        }[v] || { swim: this.IMAGES_SWIM_LILA, dead: this.IMAGES_DEAD_LILA };
    }


    setWorld(world) {
        this.world = world;
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