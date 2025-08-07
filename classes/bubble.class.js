class Bubble extends MoveableObject {
    width = 70;
    height = 90;

    constructor() {
        super().loadImage(getAssetPath(`content/4. Marcadores/Posión/Dark - Right.png`));

        this.x = 200 + Math.floor(Math.random() * 2000);
        this.y = 350;
    }
}