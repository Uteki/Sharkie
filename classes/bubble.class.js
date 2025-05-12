class Bubble extends MoveableObject {
    width = 70;
    height = 90;

    constructor() {
        super().loadImage(`../assets/content/4. Marcadores/Posión/Dark - Right.png`);

        this.applyGravity();
        this.x = 200 + Math.floor(Math.random() * 2000);
        this.y = 350;
    }
}