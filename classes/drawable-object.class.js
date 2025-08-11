/**
 * Base class for drawable objects on the canvas.
 */
class DrawableObject {
    /** @type {number} */
    x = 50;

    /** @type {number} */
    y = 150;

    /** @type {number|undefined} - Width of the drawable object */
    width;

    /** @type {number|undefined} - Height of the drawable object */
    height;

    /** @type {HTMLImageElement|undefined} - Current image to draw */
    img;

    /** @type {number} - Current image index for animations */
    currentImage = 0;

    /**
     * @type {Object.<string, HTMLImageElement>}
     * Cache of loaded images keyed by their path
     */
    imageCache = {};

    /** @type {number} - Opacity for drawing (0 to 1) */
    opacity = 1;

    /**
     * Loads a single image and sets it as the current image.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of image paths into the image cache.
     * @param {string[]} arr - Array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a rectangle around the object if it is an Endboss or Foe for collision debugging.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
     */
    showCollision(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof Foe || this instanceof Foe2) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws the object on the canvas.
     * Calls drawShark if the object is a Character, otherwise draws normally with opacity.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
     */
    draw(ctx) {
        if (this instanceof Character) {
            return this.drawShark(ctx);
        } else {
            if (this.opacity <= 0) return;
            this.drawZone(ctx);
        }
    }

    /**
     * Draws the character using sprite frame data.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
     */
    drawShark(ctx) {
        const frame = this.frameData?.[this.currentFrame];
        if (!frame) return;

        ctx.drawImage(
            this.img,
            frame.sx, frame.sy, frame.sw, frame.sh,
            this.x, this.y, this.width, this.height
        );
    }

    /**
     * Draws the image on canvas applying opacity.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
     */
    drawZone(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}