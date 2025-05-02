class MoveableObject {
    x = 90.5;
    y = 150;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log("sad");
    }

    moveLeft() {
        console.log("sad");
    }
}