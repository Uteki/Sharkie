class StatusBar extends DrawableObject {
    POISON = [
        '../assets/content/4. Marcadores/Purple/100_.png',
        '../assets/content/4. Marcadores/Purple/80_.png',
        '../assets/content/4. Marcadores/Purple/60_.png',
        '../assets/content/4. Marcadores/Purple/40_.png',
        '../assets/content/4. Marcadores/Purple/20_.png',
        '../assets/content/4. Marcadores/Purple/0_.png',
    ]

    HEALTH = [
        '../assets/content/4. Marcadores/green/Life/0.png',
        '../assets/content/4. Marcadores/green/Life/20.png',
        '../assets/content/4. Marcadores/green/Life/40.png',
        '../assets/content/4. Marcadores/green/Life/60.png',
        '../assets/content/4. Marcadores/green/Life/80.png',
        '../assets/content/4. Marcadores/green/Life/100.png'
    ]

    COIN = [
        '../assets/content/4. Marcadores/orange/0.png',
        '../assets/content/4. Marcadores/orange/20.png',
        '../assets/content/4. Marcadores/orange/40.png',
        '../assets/content/4. Marcadores/orange/60.png',
        '../assets/content/4. Marcadores/orange/80.png',
        '../assets/content/4. Marcadores/orange/100.png',
    ]

    percentage = 100;

    constructor(x, y, type) {
        super().loadImage(this[type][5]);
        this.loadImages(this[type]);
        this.setPercentage(100, type);

        this.width = 200;
        this.height = 55;
        this.x = x;
        this.y = y;
    }

    setPercentage(percentage, type) {
        this.percentage = percentage;
        this.img = this.imageCache[this[type][this.percentageNumber()]];
    }

    percentageNumber() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80 || this.percentage > 60) {
            return 4;
        } else if (this.percentage > 60 || this.percentage > 40) {
            return 3;
        } else if (this.percentage > 40 || this.percentage > 20) {
            return 2;
        } else if (this.percentage > 20 || this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}