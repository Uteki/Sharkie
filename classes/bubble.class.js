class Bubble extends MoveableObject {
    width = 70;
    height = 90;

    constructor() {
        super().loadImage(`../assets/content/4. Marcadores/Posión/Dark - Right.png`);

        this.applyGravity();
        this.x = 200 + Math.floor(Math.random() * 2000);
        this.y = 350;
    }

    applyGravity() {
        setInterval(() => {
            if (typeof world !== 'undefined' && world.character) {
                let incoming = this.x - world.character.x;

                if (this.floatsUp() && incoming <= 660) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }
        }, 1000/ 25)
    }

    floatsUp() {
        return this.y;
    }
}