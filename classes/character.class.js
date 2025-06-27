class Character extends MoveableObject {
    width = 175;
    height = 125;
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

    IMAGES_RANGE = [
        '../assets/content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        '../assets/content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        '../assets/content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        '../assets/content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        '../assets/content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        '../assets/content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        '../assets/content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        '../assets/content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ]

    IMAGES_MELEE = [
        'assets/content/1.Sharkie/4.Attack/Fin slap/1.png',
        'assets/content/1.Sharkie/4.Attack/Fin slap/2.png',
        'assets/content/1.Sharkie/4.Attack/Fin slap/3.png',
        'assets/content/1.Sharkie/4.Attack/Fin slap/4.png',
        'assets/content/1.Sharkie/4.Attack/Fin slap/5.png',
        'assets/content/1.Sharkie/4.Attack/Fin slap/6.png',
        'assets/content/1.Sharkie/4.Attack/Fin slap/7.png',
        'assets/content/1.Sharkie/4.Attack/Fin slap/8.png',
    ]

    //poison
    IMAGES_HURT = [
        '../assets/content/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        '../assets/content/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        '../assets/content/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        '../assets/content/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ]

    IMAGES_DEAD = [
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/1.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/2.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/3.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/4.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/5.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/6.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/7.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/8.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/9.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/10.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/11.png',
        '../assets/content/1.Sharkie/6.dead/1.Poisoned/12.png'
    ]

    world;

    constructor() {
        super().loadImage('../assets/content/1.Sharkie/1.IDLE/1.png');
        this.y = 250;

        this.loadImages(this.IMAGES_IDLE);this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_MELEE);this.loadImages(this.IMAGES_RANGE);
        this.loadImages(this.IMAGES_HURT);this.loadImages(this.IMAGES_DEAD);

        this.motion();
    }

    motion() {
        this.motionMovement()
        this.motionAnimation()
    }

    motionMovement() {
        this.movement = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level1_end) { this.moveRight(); this.otherWay = false; sharkieMusic.play() }
            if (this.world.keyboard.LEFT && this.x > 0) { this.moveLeft(); this.otherWay = true; sharkieMusic.play() }
            if (this.world.keyboard.DOWN && this.y < 350) { this.moveDown(); sharkieMusic.play() }
            if (this.world.keyboard.UP && this.y > 5) { this.moveUp(); sharkieMusic.play() }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60 )
    }

    motionAnimation() {
        this.animation = setInterval(() => {
            if (this.world.keyboard.SPACE && this.world.poison !== 0) return this.animate(this.IMAGES_RANGE);
            if (this.world.keyboard.SPACE) return this.animate(this.IMAGES_MELEE);
            if (this.world.isDead()) return this.animate(this.IMAGES_DEAD);
            if (this.world.isHurt()) { sharkieMusic.stop(); return this.animate(this.IMAGES_HURT)}
            if (this.world.keyboard.RIGHT) return this.animate(this.IMAGES_SWIM);
            if (this.world.keyboard.LEFT) return this.animate(this.IMAGES_SWIM);
            if (this.world.keyboard.DOWN) return this.animate(this.IMAGES_SWIM);
            if (this.world.keyboard.UP) return this.animate(this.IMAGES_SWIM);
            this.animate(this.IMAGES_IDLE); sharkieMusic.pause();
        }, 100)
    }
}