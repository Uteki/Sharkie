class MoveableObject {
    x = 50;
    y = 150;
    img;
    currentImage = 0;
    imageCache = {};
    speed = 0.15;
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

    animate(it) {
        let i = this.currentImage % it.length;
        let path = it[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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