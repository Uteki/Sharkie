class World {
    character = new Character();
    sound = new Audio("../assets/global/audio/swim-307502.mp3");
    worldSound = new Audio("../assets/global/audio/shark-is-near-65407.mp3");
    statusBar2 = new StatusBar(50, 55, "POISON");
    statusBar = new StatusBar(50, 15, "HEALTH");
    statusBar3 = new StatusBar(50, 95, "COIN");
    level = level1;
    lastHit = 0;
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
        this.checkCollisions();
    }

    bgMus() {
        this.worldSound.play();
    }

    checkCollisions() {
        setInterval(() => {
            this.level.foes.forEach((foe) => {
                if (this.character.isColliding(foe)) {
                    this.hit();
                    // console.log(this.character.energy, foe);
                    this.statusBar.setPercentage(this.character.energy, "HEALTH");
                }
            })
        }, 200)
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
        this.addObjectsToMap(this.level.foes);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.statusBar2);
        this.addToMap(this.statusBar3);
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