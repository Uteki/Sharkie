class World {
    character = new Character();
    sound = new Audio("../assets/global/audio/swim-307502.mp3");
    worldSound = new Audio("../assets/global/audio/shark-is-near-65407.mp3");
    poisonBar = new StatusBar(50, 55, "POISON", 0);
    energyBar = new StatusBar(50, 15, "HEALTH", 100);
    coinBar = new StatusBar(50, 95, "COIN", 0);
    throwableObject = [];
    level = level1;
    lastHit = 0;

    maxCoin = 0;
    coin = 0;

    maxPoison = 0;
    poison = 0;

    keyboard;
    camera_x;
    canvas;
    ctx;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.grewLevel();
        this.draw();
        this.setWorld();
        this.run();
        this.max();
    }

    max() {
        this.level.gatherObjects.forEach((g) => {
            if (g instanceof Coin) {
                this.maxCoin++;
            } else if (g instanceof Bubble) {
                this.maxPoison++;
            }
        })
    }

    bgMus() {
        this.worldSound.play();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200)
    }

    checkThrowObjects() {
        if(this.keyboard.SPACE) {
            this.throwableObject.push(new ThrowableObject(this.character.x, this.character.y));
        }
    }

    checkCollisions() {
        this.level.foes.forEach((foe) => {
            if (this.character.isColliding(foe)) {
                this.hit();
                this.energyBar.setPercentage(this.character.energy, "HEALTH");
            }
        });

        this.level.gatherObjects.forEach((gather) => {
            if (this.character.isColliding(gather)) {
                if (gather instanceof Coin) {
                    this.coin++;
                    this.coinBar.setPercentage((this.coin/this.maxCoin) * 100, "COIN");
                } else if (gather instanceof Bubble) {
                    this.poison++;
                    this.poisonBar.setPercentage((this.poison/this.maxPoison) * 100, "POISON");
                }
                this.level.gatherObjects = this.level.gatherObjects.filter(obj => obj !== gather);
            }
        })
    }

    hit() {
        this.character.energy -= 5;
        if (this.character.energy <= 0) {
            this.character.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.character.energy === 0;
    }

    isHurt() {
        let timestamped = new Date().getTime() - this.lastHit;
        return timestamped / 1000 < 1;
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.gatherObjects)
        this.addObjectsToMap(this.level.foes);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.energyBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
        let self = this;
        requestAnimationFrame(() => { self.draw() });
    }

    grewLevel() {
        let numba = 720;
        for (let i = 0; i < 2; i++) {
            numba += 720;
            this.level.backgroundObjects.push(
                new BackgroundObject("../assets/content/3. Background/Layers/5. Water/D1.png", numba), new BackgroundObject("../assets/content/3. Background/Layers/4.Fondo 2/D1.png", numba),
                new BackgroundObject("../assets/content/3. Background/Layers/3.Fondo 1/D1.png", numba), new BackgroundObject("../assets/content/3. Background/Layers/1. Light/1.png", numba),
                new BackgroundObject("../assets/content/3. Background/Layers/2. Floor/D1.png", numba),

                new BackgroundObject("../assets/content/3. Background/Layers/5. Water/D2.png", numba+720), new BackgroundObject("../assets/content/3. Background/Layers/4.Fondo 2/D2.png", numba+720),
                new BackgroundObject("../assets/content/3. Background/Layers/3.Fondo 1/D2.png", numba+720), new BackgroundObject("../assets/content/3. Background/Layers/1. Light/2.png", numba+720),
                new BackgroundObject("../assets/content/3. Background/Layers/2. Floor/D2.png", numba+720)
            ); numba += 720;
        }
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {this.addToMap(o)})
    }

    addToMap(mo) {
        if (mo.otherWay) {
            this.switchDirection(mo)
        }

        mo.draw(this.ctx);
        mo.showCollision(this.ctx);

        if (mo.otherWay) {
            this.restoreDirection(mo)
        }
    }

    switchDirection(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    restoreDirection(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}