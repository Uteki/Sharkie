class MoveableObject {
    x = 50;
    y = 150;
    width;
    height;
    img;
    currentImage = 0;
    imageCache = {};
    speed = 0.15;
    speedY = -1;
    acceleration = -0.05;
    otherWay = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads images that are in a bundle into imageCache
     *
     * @param arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    showCollision(ctx) {
        if (this instanceof Character || this instanceof Foe || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

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
}