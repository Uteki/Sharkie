class Character extends MoveableObject {
    width = 205;
    height = 245.5;
    speed = 5;

    IMAGES_IDLE = [
        '../assets/content/1.Sharkie/1.IDLE/1.png',
        '../assets/content/1.Sharkie/1.IDLE/2.png',
        '../assets/content/1.Sharkie/1.IDLE/3.png',
        '../assets/content/1.Sharkie/1.IDLE/4.png',
        '../assets/content/1.Sharkie/1.IDLE/5.png',
        '../assets/content/1.Sharkie/1.IDLE/6.png',
        '../assets/content/1.Sharkie/1.IDLE/7.png',
        '../assets/content/1.Sharkie/1.IDLE/8.png',
        '../assets/content/1.Sharkie/1.IDLE/9.png',
        '../assets/content/1.Sharkie/1.IDLE/10.png',
        '../assets/content/1.Sharkie/1.IDLE/11.png',
        '../assets/content/1.Sharkie/1.IDLE/12.png',
        '../assets/content/1.Sharkie/1.IDLE/13.png',
        '../assets/content/1.Sharkie/1.IDLE/14.png',
        '../assets/content/1.Sharkie/1.IDLE/15.png',
        '../assets/content/1.Sharkie/1.IDLE/16.png',
        '../assets/content/1.Sharkie/1.IDLE/17.png',
        '../assets/content/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_SWIM = [
        '../assets/content/1.Sharkie/3.Swim/1.png',
        '../assets/content/1.Sharkie/3.Swim/2.png',
        '../assets/content/1.Sharkie/3.Swim/3.png',
        '../assets/content/1.Sharkie/3.Swim/4.png',
        '../assets/content/1.Sharkie/3.Swim/5.png',
        '../assets/content/1.Sharkie/3.Swim/6.png'
    ]

    world;

    constructor() {
        super().loadImage('../assets/content/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIM);

        this.motion();
    }

    motion() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherWay = false;
            }
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherWay = true;
            }
            if (this.world.keyboard.UP) {
                this.y -= this.speed;
            }
            if (this.world.keyboard.DOWN) {
                this.y += this.speed;
            }
        }, 1000 / 60 )

        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                return this.animate(this.IMAGES_SWIM);
            }
            if (this.world.keyboard.LEFT) {
                return this.animate(this.IMAGES_SWIM);
            }
            if (this.world.keyboard.UP) {
                return this.animate(this.IMAGES_SWIM);
            }
            if (this.world.keyboard.DOWN) {
                return this.animate(this.IMAGES_SWIM);
            }

            this.animate(this.IMAGES_IDLE);
        }, 100)
    }

    animate(it) {
        let i = this.currentImage % it.length;
        let path = it[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
    }

    moveUp() {
    }
}