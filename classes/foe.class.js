class Foe extends MoveableObject {
    width = 95;
    height = 90;
    energy = 25;

    IMAGES_SWIM;
    IMAGES_DEAD;

    IMAGES_FORM;
    IMAGES_ANGY;

    constructor(spawn) {
        let rng = Math.floor(Math.random() * 3) + 1;
        super().randomFish(rng);

        this.loadImage(`../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png`);
        this.loadCombination();

        this.x = spawn + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (0 - 400 + 1)) + 400;
        this.speed += Math.random();
        this.motion(this.IMAGES_SWIM);

        this.transformed = false;
    }

    setWorld(world) {
        this.world = world;
    }

    clearInters() {
        clearInterval(this.animation);
        clearInterval(this.movement);
    }

    loadCombination() {
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_FORM);
        this.loadImages(this.IMAGES_ANGY);
    }

    randomFish(rng) {
        this.IMAGES_SWIM = [
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim1.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim2.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim3.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim4.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${rng}.swim5.png`
        ];

        this.IMAGES_DEAD = [
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/4.DIE/${rng}.dead1.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/4.DIE/${rng}.dead2.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/4.DIE/${rng}.dead3.png`
        ];

        this.contImages(rng);
    }

    contImages(rng) {
        this.IMAGES_FORM = [
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition1.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition2.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition3.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition4.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/2.transition/${rng}.transition5.png`
        ];

        this.IMAGES_ANGY = [
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim1.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim2.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim3.png`, `../assets/content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim4.png`,
            `../assets/content/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/${rng}.bubbleswim5.png`
        ];
    }

    checkVicinity() {
        if (this.world && this.world.character && !this.transformed) {
            let incoming = this.x - this.world.character.x;
            if (incoming <= 440) {
                this.transformed = true;
                this.clearInters();
                this.animateTransition();
            }
        }
    }

    motion(images) {
        this.animation = setInterval(() => {
            this.animate(images);
            this.checkVicinity();
        }, 100);

        this.movement = setInterval(() => {
            this.moveLeft();
        },1000 / 60);
    }

    animateHurt() {
        if (this.energy <= 0) {
            this.clearInters();
            this.animateDeath();
        }
    }

    animateDeath() {
        this.currentImage = 0;
        this.deathAnimation = setInterval(() => {
            if (this.currentImage <= this.IMAGES_DEAD.length - 1) {
                this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
                this.currentImage++;
            } else {
                clearInterval(this.deathAnimation);
                if (this.world) {
                    this.startFading();
                }
            }
        }, 100);
    }

    animateTransition() {
        this.currentImage = 0;
        this.formAnimation = setInterval(() => {
            if (this.currentImage <= this.IMAGES_FORM.length - 1) {
                this.img = this.imageCache[this.IMAGES_FORM[this.currentImage]];
                this.currentImage++;
            } else {
                clearInterval(this.formAnimation);
                this.motion(this.IMAGES_ANGY);
            }
        }, 75);
    }

    startFading() {
        this.fadeInterval = setInterval(() => {
            if (this.opacity > 0) {
                this.opacity -= 0.05;
            } else {
                this.opacity = 0;
                clearInterval(this.fadeInterval);
                this.world.level.foes = this.world.level.foes.filter(f => f !== this);
            }
        }, 50);
    }
}