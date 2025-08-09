class CollisionManager {
    /**
     * Manages all collision detection within the world.
     * @param {World} world - The game world instance.
     */
    constructor(world) {
        this.world = world;
    }

    /** Runs all collision checks for foes and gatherable objects */
    checkCollisions() {
        this.collisionFoes();
        this.collisionGatherObjects();
    }

    /** Checks collisions between the character and foes, and handles damage */
    collisionFoes() {
        this.world.level.foes.forEach((foe) => {
            if (this.world.character.isColliding(foe) && !foe.foeDead) {
                this.world.hit(foe);
                this.world.energyBar.setPercentage(this.world.character.energy, "HEALTH");
            }
            this.collisionObject(foe);
        });
    }

    /**
     * Checks collisions between throwable objects and a foe.
     * @param {Foe} foe - The foe to check collisions against.
     */
    collisionObject(foe) {
        if (this.world.isDead()) return;
        this.world.throwableObject.forEach(x => {
            if (foe.energy <= 0) return;
            if (x.isColliding(foe)) {
                foe.energy -= (x instanceof MeleeZone) ? 50 : 25;
                if (typeof foe.animateHurt === 'function') { foe.animateHurt(); }
                this.world.throwableObject = this.world.throwableObject.filter(obj => obj !== x);
            }
        });
    }

    /** Checks collisions between the character and gatherable objects (coins, bubbles) */
    collisionGatherObjects() {
        this.world.level.gatherObjects.forEach((gather) => {
            if (this.world.character.isColliding(gather)) {
                if (gather instanceof Coin) {
                    this.world.coin++;
                    this.world.coinBar.setPercentage((this.world.coin / this.world.maxCoin) * 100, "COIN");
                } else if (gather instanceof Bubble) {
                    this.world.poison++;
                    this.world.poisonBar.setPercentage((this.world.poison / this.world.maxPoison) * 100, "POISON");
                }
                this.world.level.gatherObjects = this.world.level.gatherObjects.filter(obj => obj !== gather);
            }
        });
    }
}