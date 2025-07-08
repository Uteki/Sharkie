class MoveableObject extends DrawableObject {
    speed = 0.15;
    speedY = -1;
    acceleration = -0.05;
    otherWay = false;
    energy = 100;

    lastAttack = 0;
    testos = false;

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

    //TODO
    aniwate(bundle) {
        if (this.testos && this.lastAttacked()) return;

        this.world.keyboard.SPACE = false;
        this.currentImage = 0;
        this.lastAttack = new Date().getTime();

        setInterval(() => {
            let i = this.currentImage % bundle.length;
            let path = bundle[i];
            this.img = this.imageCache[path];
            this.currentImage++;

        },100)
        setTimeout(() => {

        clearInterval(this.aniwate);
        }, 2000)

    }

    lastAttacked() {
        return (new Date().getTime() - this.lastAttack) / 1000 < 5;
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
        this.movement = setInterval(() => {
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

    pauseMove() {
        clearInterval(this.movement);
        setTimeout(() => clearInterval(this.animation), 700)
    }
}