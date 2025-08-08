class World {
    character = new Character();
    soundSetter = new SoundSetter();
    poisonBar = new StatusBar(50, 55, "POISON", 0);
    energyBar = new StatusBar(50, 15, "HEALTH", 100);
    coinBar = new StatusBar(50, 95, "COIN", 0);
    fullscreen = new Fullscreen();
    tryAgain = new TryAgain();
    goHome = new GoHome();
    youLose = new GameOver();
    youWin = new YouWin();
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
        this.run(); this.max()
        this.gameplayBtn();

        this.restart = this.restart.bind(this);
        this.ost(); checkDevice(); this.mobileDev();
    }

    gameplayBtn() {
        this.fullscreen.btnVisibility();
        document.addEventListener("click", this.soundSetter.soundSetter);
    }

    mobileDev() {
        if (isMobileDevice()) {
            document.querySelector("body").style.backgroundImage = "url('')";
            document.querySelector("body").style.backgroundColor = "#121212";
            document.querySelector("h1").style.textShadow = "none";
        }
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

    ost() {
        backgroundMusic.play()
    }

    run() {
        this.gump = setInterval(() => {
            this.checkCollisions();
            this.fullscreen.btnVisibility();
            this.end();
        }, 200)
    }

    end() {
        if (this.character.energy === 0 && !this.isGameOver) {
            this.endOptions();
            gameoverMusic.play();
            this.isGameOver = true;

        } else if (this.level.foes[this.level.foes.length-1].energy === 0 && !this.isGameOn) {
            this.endOptions();
            gameonMusic.play();
            this.isGameOn = true;
        }
    }

    endOptions() {
        this.stopMoment();
        document.querySelector('#controls').classList.add('d-none');

        this.hoverHandler = (event) => {
            const hovering = this.hoverClause(event);
            canvas.style.cursor = hovering ? 'pointer' : 'default';
        };

        canvas.addEventListener("mousemove", this.hoverHandler);
    }

    hoverClause(event) {
        return (
            handleClick(event, this.soundSetter.volumeButton) ||
            handleClick(event, this.tryAgain.againButton) ||
            handleClick(event, this.goHome.homeButton) ||
            handleClick(event, screenButton)
        );
    }

    stopMoment() {
        backgroundMusic.pause(); whaleMusic.pause(); sharkieMusic.stop()

        this.character.pauseMove();
        this.level.foes.forEach((foe) => { foe.pauseMove() })
        setTimeout(() => this.level.foes.forEach((foe) => { foe.pauseMove() }), 700)
        this.level.gatherObjects.forEach((go) => { go.pauseMove() })
        this.throwableObject.forEach((blow) => { blow.pauseMove() })

        document.addEventListener("keydown", this.restart);
        document.addEventListener("click", this.tryAgain.tryAgain);
        document.addEventListener("click", this.goHome.goHome);
    }

    checkCollisions() {
        this.collisionFoes();
        this.collisionGatherObjects();
    }

    collisionFoes() {
        this.level.foes.forEach((foe) => {
            if (this.character.isColliding(foe) && foe.foeDead !== true) {
                this.hit(foe);
                this.energyBar.setPercentage(this.character.energy, "HEALTH");
            }

            this.collisionObject(foe);
        });
    }

    collisionObject(foe) {
        if (this.isDead()) return;
        this.throwableObject.forEach(x => {
            if (foe.energy <= 0) return;
            if (x.isColliding(foe) && x instanceof ThrowableObject) {
                foe.energy -= 25;
                if (typeof foe.animateHurt === 'function') { foe.animateHurt() }
                this.throwableObject = this.throwableObject.filter(obj => obj !== x);
            } else if (x.isColliding(foe) && x instanceof MeleeZone) {
                foe.energy -= 50;
                if (typeof foe.animateHurt === 'function') { foe.animateHurt() }
                this.throwableObject = this.throwableObject.filter(obj => obj !== x);
            }
        })
    }

    collisionGatherObjects() {
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

    hit(foe) {
        this.character.energy -=
            foe instanceof Foe2 ? (foe.chosen.type === "strong" ? 40 : 20) :
                foe instanceof Endboss ? 80 :
                    foe instanceof Foe ? 10 : 0;

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
        this.tryAgain.world = this;
        this.goHome.world = this;

        this.level.foes.forEach(foe => foe.setWorld(this))

        this.level.gatherObjects.forEach(obj => {
            if (obj instanceof Bubble) {
                obj.world = this; obj.applyGravity()
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects); this.addObjectsToMap(this.level.gatherObjects);
        this.addObjectsToMap(this.level.foes); this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        this.drawUi();
        this.frameId = requestAnimationFrame(() => this.draw());
    }

    stop() {
        this.cleanup();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    cleanup() {
        this.cleanupRemovers();
        this.cleanupStoppers();
        clearInterval(this.gump);
        cancelAnimationFrame(this.frameId);
    }

    cleanupRemovers() {
        document.removeEventListener("click", this.soundSetter.soundSetter);
        document.removeEventListener("click", this.tryAgain.tryAgain);
        document.removeEventListener("click", this.goHome.goHome);
        document.removeEventListener("keydown", this.restart);

        if (this.hoverHandler) {
            canvas.removeEventListener("mousemove", this.hoverHandler);
            this.hoverHandler = null;
        }
    }

    cleanupStoppers() {
        backgroundMusic.stop?.();
        gameoverMusic.stop?.();
        gameonMusic.stop?.();
    }

    drawUi() {
        this.addToMap(this.energyBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);

        if (this.isGameOver) { this.gameOverScreen() }
        else if (this.isGameOn) { this.gameOnScreen() }

        this.addToMap(this.soundSetter);
        if (!isMobileDevice()) this.addToMap(this.fullscreen);
    }

    restart(event) {
        if (event.key === "Enter") {
            canvas.removeEventListener("mousemove", this.hoverHandler);
            this.cleanup();
            startGame();
        }
    }

    gameOnScreen() {
        this.screenFill();
        this.addToMap(this.youWin);
        this.tryMore();
    }

    gameOverScreen() {
        this.screenFill();
        this.addToMap(this.youLose);
        this.tryMore();
    }

    screenFill() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    tryMore() {
        this.addToMap(this.tryAgain);
        this.addToMap(this.goHome);
        this.ctx.fillStyle = "#fff";
        this.ctx.font = "24px Lucky";
        this.ctx.textAlign = "center";
        this.ctx.fillText(isMobileDevice() ? "TOUCH to try again" : "Press ENTER to try again",
            this.canvas.width / 2 - 4,
            this.canvas.height / 2 + 100
        );
    }

    grewLevel() {
        let numba = 720;
        for (let i = 0; i < 2; i++) {
            numba += 720;
            this.level.backgroundObjects.push(
                new BackgroundObject(getAssetPath('content/3. Background/Layers/5. Water/D1.png'), numba), new BackgroundObject(getAssetPath('content/3. Background/Layers/4.Fondo 2/D1.png'), numba),
                new BackgroundObject(getAssetPath('content/3. Background/Layers/3.Fondo 1/D1.png'), numba), new BackgroundObject(getAssetPath('content/3. Background/Layers/1. Light/1.png'), numba),
                new BackgroundObject(getAssetPath('content/3. Background/Layers/2. Floor/D1.png'), numba),

                new BackgroundObject(getAssetPath('content/3. Background/Layers/5. Water/D2.png'), numba+720), new BackgroundObject(getAssetPath('content/3. Background/Layers/4.Fondo 2/D2.png'), numba+720),
                new BackgroundObject(getAssetPath('content/3. Background/Layers/3.Fondo 1/D2.png'), numba+720), new BackgroundObject(getAssetPath('content/3. Background/Layers/1. Light/2.png'), numba+720),
                new BackgroundObject(getAssetPath('content/3. Background/Layers/2. Floor/D2.png'), numba+720)
            ); numba += 720;
        }
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.otherWay) {
            this.switchDirection(mo)
        }

        mo.draw(this.ctx);

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