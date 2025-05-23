class MoveableObject extends DrawableObject {
    speed = 0.15;
    speedY = -1;
    acceleration = -0.05;
    otherWay = false;
    energy = 100;

    isColliding(mo) {
        return this.x + this.width > mo.x && this.y + this.height
        > mo.y && this.x < mo.x && this.y < mo.y + mo.height
    }

    animate(bundle) {
        let i = this.currentImage % bundle.length;
        let path = bundle[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveUp() {
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
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