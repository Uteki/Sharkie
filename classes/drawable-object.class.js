class DrawableObject {
    x = 50;
    y = 150;
    width;
    height;
    img;
    currentImage = 0;
    imageCache = {};

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

    showCollision(ctx) {
        if (this instanceof Character || this instanceof Foe || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    draw(ctx) {
        if (this instanceof Character) {
            return this.drawShark(ctx);
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    drawShark(ctx) {
        const innerX = 110;
        const innerY = 420;
        const innerWidth = 590;
        const innerHeight = 420;

        ctx.drawImage(
            this.img,
            innerX, innerY, innerWidth, innerHeight,
            this.x, this.y, this.width, this.height
        );
    }
}