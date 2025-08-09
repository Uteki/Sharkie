class Level {
    /**
     * @type {Array<MoveableObject>}
     */
    foes;

    /**
     * @type {Array<DrawableObject>}
     */
    backgroundObjects;

    /**
     * @type {Array<DrawableObject>}
     */
    gatherObjects;

    /**
     * Level end position on x-axis
     * @type {number}
     */
    level1_end = 3000;

    /**
     * Creates a Level instance.
     * @param {Array<MoveableObject>} foes - Array of foe objects.
     * @param {Array<DrawableObject>} backgroundObjects - Array of background objects.
     * @param {Array<DrawableObject>} gatherObjects - Array of collectible objects.
     */
    constructor(foes, backgroundObjects, gatherObjects) {
        this.foes = foes;
        this.backgroundObjects = backgroundObjects;
        this.gatherObjects = gatherObjects;
    }
}