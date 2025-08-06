class Character extends MoveableObject {
    height = 125;
    width = 175;
    speed = 5;

    lastAttack = 0;
    currentImgEnd = 0;

    spacePressed = false;

    IMAGES_IDLE = [
        getAssetPath('content/1.Sharkie/1.IDLE/1.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/2.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/3.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/4.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/5.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/6.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/7.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/8.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/9.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/10.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/11.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/12.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/13.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/14.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/15.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/16.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/17.png'),
        getAssetPath('content/1.Sharkie/1.IDLE/18.png')
    ];

    IMAGES_SWIM = [
        getAssetPath('content/1.Sharkie/3.Swim/1.png'),
        getAssetPath('content/1.Sharkie/3.Swim/2.png'),
        getAssetPath('content/1.Sharkie/3.Swim/3.png'),
        getAssetPath('content/1.Sharkie/3.Swim/4.png'),
        getAssetPath('content/1.Sharkie/3.Swim/5.png'),
        getAssetPath('content/1.Sharkie/3.Swim/6.png')
    ];

    IMAGES_RANGE = [
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png')
    ];

    IMAGES_MELEE = [
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/1.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/2.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/3.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/4.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/5.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/6.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/7.png'),
        getAssetPath('content/1.Sharkie/4.Attack/Fin slap/8.png')
    ];

    IMAGES_HURT = [
        getAssetPath('content/1.Sharkie/5.Hurt/1.Poisoned/2.png'),
        getAssetPath('content/1.Sharkie/5.Hurt/1.Poisoned/3.png'),
        getAssetPath('content/1.Sharkie/5.Hurt/1.Poisoned/4.png'),
        getAssetPath('content/1.Sharkie/5.Hurt/1.Poisoned/5.png')
    ];

    IMAGES_DEAD = [
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/1.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/2.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/3.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/4.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/5.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/6.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/7.png'),
        getAssetPath('content/1.Sharkie/6.dead/1.Poisoned/8.png')
    ];

    world;

    constructor() {
        super().loadImage('./assets/content/1.Sharkie/1.IDLE/1.png');
        this.currentFrame = "idle";
        this.y = 250;

        this.loadImages(this.IMAGES_IDLE);this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_MELEE);this.loadImages(this.IMAGES_RANGE);
        this.loadImages(this.IMAGES_HURT);this.loadImages(this.IMAGES_DEAD);

        this.frameLoader();
        this.motion();
    }

    frameLoader() {
        this.frameData = {
            'melee': { sx: 90, sy: 420, sw: 655, sh: 420 },
            'range': { sx: 90, sy: 355, sw: 655, sh: 500 },
            'idle': { sx: 90, sy: 420, sw: 590, sh: 420 },
        };
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
            const key = this.world.keyboard;
            if (key.SPACE && !this.spacePressed && !this.lastAttacked()) { this.tetet(); return }
            if (!key.SPACE) this.spacePressed = false;
            if (this.world.isDead()) return this.animateEnd(this.IMAGES_DEAD);
            if (this.world.isHurt()) { sharkieMusic.stop(); return this.animate(this.IMAGES_HURT) }
            if (key.RIGHT || key.LEFT || key.DOWN || key.UP) return this.animate(this.IMAGES_SWIM);
            this.animate(this.IMAGES_IDLE); sharkieMusic.pause();
        }, 100);
    }

    tetet() {
        this.otherWay = false; this.spacePressed = true
        if (this.world.poison !== 0) {
            this.animateMelee(this.IMAGES_MELEE); slapAtkMusic.play();
        } else {
            this.animateRange(this.IMAGES_RANGE); bubbleAtkMusic.play();
        }
    }

    lastAttacked() {
        return (new Date().getTime() - this.lastAttack) / 1000 < 0.85;
    }

    throwBubble() {
        let bubble = new ThrowableObject(this.world.character.x, this.world.character.y);
        bubble.world = this.world;
        this.world.throwableObject.push(bubble);
    }

    poisonBuff() {
        this.world.poison--;
        this.world.poisonBar.setPercentage((this.world.poison/this.world.maxPoison) * 100, "POISON");

        setTimeout(() => {
        this.world.throwableObject.push(new MeleeZone(this.world.character.x, this.world.character.y));

        }, 150)
    }

    resetAttack() {
        this.currentImage = 0;
        this.world.keyboard.SPACE = false;
        this.lastAttack = new Date().getTime();
    }

    animateRange(bundle) {
        if (this.lastAttacked()) return this.world.keyboard.SPACE = false;

        this.resetAttack();
        this.adjustFrame("range",true);
        this.throwBubble();

        this.currentFrame = "range"
        this.frameInt = setInterval(() => { this.animate(bundle) },100)
        setTimeout(() => { clearInterval(this.frameInt); this.adjustFrame("range", false); this.currentFrame = "idle" }, 450)
    }

    animateMelee(bundle) {
        if (this.lastAttacked()) return this.world.keyboard.SPACE = false;

        this.resetAttack();
        this.adjustFrame("melee",true);
        this.poisonBuff();

        this.currentFrame = "melee"
        this.frameInt = setInterval(() => { this.animate(bundle) },100)
        setTimeout(() => { clearInterval(this.frameInt); this.adjustFrame("melee",false); this.currentFrame = "idle" }, 450)
    }

    adjustFrame(type = 'range', enlarge = true) {
        const amount = 20;

        if (type === 'range') {
            this.height += enlarge ? amount : -amount;
            this.width  += enlarge ? amount : -amount;
            this.y      += enlarge ? -amount : amount;
        } else if (type === 'melee') {
            this.width += enlarge ? amount : -amount;
        }
    }

    animateEnd(bundle) {
        let i = this.currentImgEnd % bundle.length;
        let path = bundle[i];
        this.img = this.imageCache[path];
        this.currentImgEnd++;
    }
}