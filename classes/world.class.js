class World {
    /** @type {Character} The main character of the game */
    character = new Character();

    /** @type {SoundSetter} Handles sound controls */
    soundSetter = new SoundSetter();

    /** @type {StatusBar} Displays poison level */
    poisonBar = new StatusBar(50, 55, "POISON", 0);

    /** @type {StatusBar} Displays player health */
    energyBar = new StatusBar(50, 15, "HEALTH", 100);

    /** @type {StatusBar} Displays coin count */
    coinBar = new StatusBar(50, 95, "COIN", 0);

    /** @type {Fullscreen} Fullscreen control UI */
    fullscreen = new Fullscreen();

    /** @type {TryAgain} UI element for retrying the game */
    tryAgain = new TryAgain();

    /** @type {GoHome} UI element for going back home */
    goHome = new GoHome();

    /** @type {GameOver} UI element shown when player loses */
    youLose = new GameOver();

    /** @type {YouWin} UI element shown when player wins */
    youWin = new YouWin();

    /** @type {Array<ThrowableObject>} List of throwable objects */
    throwableObject = [];

    /** @type {Level} Current game level */
    level = level1;

    /** @type {number} Timestamp of last hit received */
    lastHit = 0;

    /** @type {number} Maximum number of coins in the level */
    maxCoin = 0;

    /** @type {number} Current number of coins collected */
    coin = 0;

    /** @type {number} Maximum poison bubbles in the level */
    maxPoison = 0;

    /** @type {number} Current poison collected */
    poison = 0;

    keyboard;
    camera_x;
    canvas;
    ctx;

    /**
     * Initializes the game world with canvas and keyboard input.
     * @param {HTMLCanvasElement} canvas - The canvas element to render on.
     * @param {Object} keyboard - Keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.collisionManager = new CollisionManager(this);
        this.renderManager = new RenderManager(this, this.ctx, this.canvas);
        this.renderManager.draw();

        this.setWorld();
        this.run();

        this.buildLevel();
        this.restart = this.restart.bind(this);
    }

    /** Checks device and applies mobile styles if needed */
    deviceViewer() {
        checkDevice();
        this.mobileDev();
    }

    /** Builds the level and initializes settings */
    buildLevel() {
        this.grewLevel();
        this.max();

        this.ost();

        this.volumeButton();
        this.deviceViewer();
    }

    /** Sets up volume button visibility and event */
    volumeButton() {
        this.fullscreen.btnVisibility();
        document.addEventListener("click", this.soundSetter.soundSetter);
    }

    /** Applies mobile device specific UI changes */
    mobileDev() {
        if (isMobileDevice()) {
            document.querySelector("body").style.backgroundImage = "url('')";
            document.querySelector("body").style.backgroundColor = "#121212";
            document.querySelector("h1").style.textShadow = "none";
        }
    }

    /** Counts max coins and poison bubbles in the level */
    max() {
        this.level.gatherObjects.forEach((g) => {
            if (g instanceof Coin) {
                this.maxCoin++;
            } else if (g instanceof Bubble) {
                this.maxPoison++;
            }
        })
    }

    /** Starts background music */
    ost() {
        backgroundMusic.play()
    }

    /** Starts the main game loop */
    run() {
        this.gump = setInterval(() => {
            this.collisionManager.checkCollisions();
            this.fullscreen.btnVisibility();
            this.end();
        }, 200)
    }

    /** Checks end game conditions */
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

    /**
     * Clears all intervalls
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /** Sets up end game UI and event handlers */
    endOptions() {
        this.stopMoment();
        document.querySelector('#controls').classList.add('d-none');
        document.removeEventListener('mousemove', gameHoverHandler);

        this.hoverHandler = (event) => {
            const hovering = this.hoverClause(event);
            canvas.style.cursor = hovering ? 'pointer' : 'default';
        };

        canvas.addEventListener("mousemove", this.hoverHandler);
    }

    /**
     * Checks if the mouse is over interactive buttons.
     * @param {MouseEvent} event - Mouse event.
     * @returns {boolean} True if hovering over a clickable element.
     */
    hoverClause(event) {
        return (
            handleClick(event, this.soundSetter.volumeButton) ||
            handleClick(event, this.tryAgain.againButton) ||
            handleClick(event, this.goHome.homeButton) ||
            handleClick(event, screenButton)
        );
    }

    /** Pauses game movements and sets up restart listeners */
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

    /**
     * Applies damage to character when hit by foe.
     * @param {Foe|Foe2|Endboss} foe - The foe hitting the character.
     */
    hit(foe) {
        this.character.energy -=
            foe instanceof Foe2 ? (foe.chosen.type === "strong" ? 15 : 10) :
                foe instanceof Endboss ? 20 :
                    foe instanceof Foe ? 5 : 0;

        if (this.character.energy <= 0) {
            this.character.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** Checks if the character is dead */
    isDead() {
        return this.character.energy === 0;
    }

    /** Checks if the character was hurt recently (within 1 second) */
    isHurt() {
        let timestamped = new Date().getTime() - this.lastHit;
        return timestamped / 1000 < 1;
    }

    /** Sets references of world for game objects */
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

    /** Stops the game and clears the canvas */
    stop() {
        this.cleanup();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** Removes event listeners and stops game loops */
    cleanup() {
        this.cleanupRemovers();
        this.cleanupStoppers();
        clearInterval(this.gump);
        this.renderManager.cancelFrame();
    }

    /** Removes UI and input event listeners */
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

    /** Stops background and game sounds */
    cleanupStoppers() {
        backgroundMusic.stop?.();
        gameoverMusic.stop?.();
        gameonMusic.stop?.();
    }

    /**
     * Restarts the game when Enter is pressed.
     * @param {KeyboardEvent} event - Keydown event.
     */
    restart(event) {
        if (event.key === "Enter") {
            canvas.removeEventListener("mousemove", this.hoverHandler);
            document.removeEventListener('mousemove', gameHoverHandler);
            this.cleanup();
            startGame();
        }
    }

    /** Adds additional background objects to extend the level */
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
}