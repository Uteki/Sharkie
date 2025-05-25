const startButton = {
    x: 440,
    y: 370,
    width: 130,
    height: 40
};

let canvas;
let world;

let keyboard = new Keyboard();

function loadGame() {
    canvas = document.querySelector('canvas');
    showStartScreen(canvas.getContext("2d"), canvas);
}

function showStartScreen(ctx, canvas) {
    const [img, btnImg] = [new Image(), new Image()];
    img.src = "../assets/content/6.Botones/Instructions 2.png";
    btnImg.src = "../assets/content/6.Botones/Start/2.png";

    btnImg.onload = () => drawStartScreen(ctx, canvas, img, btnImg);

    canvas.addEventListener("click", handleClick);
}

function drawStartScreen(ctx, canvas, img, btnImg) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, (canvas.width - 500) / 2, 40, 500, 300);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "24px Lucky";
    ctx.fillText("Press ENTER to Start OR", canvas.width / 2.5, canvas.height - 80);
    ctx.drawImage(btnImg, startButton.x, startButton.y, startButton.width, startButton.height);
}

function handleClick(event) {
    const { clientX, clientY } = event;
    const { left, top } = canvas.getBoundingClientRect();
    const [x, y] = [clientX - left, clientY - top];

    if (x >= startButton.x && x <= startButton.x + startButton.width &&
        y >= startButton.y && y <= startButton.y + startButton.height) {
        canvas.removeEventListener("click", handleClick);
        startGame();
    }
}

function startGame() {
    initLevel();
    setTimeout(() => {
        world = new World(canvas, keyboard);
    }, 200);
}

document.addEventListener("keydown", function startEnter(e) {
    if (e.key === "Enter") {
        document.removeEventListener("keydown", startEnter);
        startGame();
    }
});

document.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            return keyboard.UP = true;
        case 'ArrowDown':
            return keyboard.DOWN = true;
        case 'ArrowLeft':
            return keyboard.LEFT = true;
        case 'ArrowRight':
            return keyboard.RIGHT = true;
        case ' ':
            return keyboard.SPACE = true;
    }
})

document.addEventListener('keyup', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            return keyboard.UP = false;
        case 'ArrowDown':
            return keyboard.DOWN = false;
        case 'ArrowLeft':
            return keyboard.LEFT = false;
        case 'ArrowRight':
            return keyboard.RIGHT = false;
        case ' ':
            return keyboard.SPACE = false;
    }
})