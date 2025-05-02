class Foe extends MoveableObject {
    width = 95;
    height = 90;

    constructor() {
        let fish = Math.floor(Math.random() * 3) + 1;
        super().loadImage(`../assets/content/2.Enemy/1.Puffer fish (3 color options)/1.Swim/${fish}.swim1.png`);

        this.x = 250 + Math.floor(Math.random() * 500);
        this.y = Math.floor(Math.random() * (0 - 400 + 1)) + 400;
    }
}