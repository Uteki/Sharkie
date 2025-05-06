class MoveableObject {
    x = 50;
    y = 150;
    img;
    currentImage = 0;
    imageCache = {};
    speed = 0.15;
    speedY = 1;
    acceleration = 0;
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

    animate(bundle) {
        let i = this.currentImage % bundle.length;
        let path = bundle[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.floatsUp()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/ 25)
    }

    floatsUp() {
        return this.y;
    }

    moveRight() {
        console.log("sad");
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}