class World {
    character = new Character();
    foes = [
        new Foe(),
        new Foe(),
        new Foe()
    ];
    backgroundObjects = [
        new BackgroundObject("../assets/content/3. Background/Layers/5. Water/D1.png", 0),
        new BackgroundObject("../assets/content/3. Background/Layers/4.Fondo 2/D1.png", 0),
        new BackgroundObject("../assets/content/3. Background/Layers/3.Fondo 1/D1.png", 0),
        new BackgroundObject("../assets/content/3. Background/Layers/1. Light/1.png", 0),
        new BackgroundObject("../assets/content/3. Background/Layers/2. Floor/D1.png", 0)
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.foes);
        this.addToMap(this.character);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {this.addToMap(o)})
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
}