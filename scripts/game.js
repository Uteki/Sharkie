const startButton = {
    x: 440, y: 370, width: 130, height: 40
};
const screenButton = {
    x: 480, y: 400, width: 180, height: 40
}

let canvas;
let world;

let keyboard = new Keyboard();

function loadGame() {
    canvas = document.querySelector('canvas');
    showStartScreen(canvas.getContext("2d"), canvas);
}

function showStartScreen(ctx, canvas) {
    const img = new Image(), btnImg = new Image();

    btnImg.onload = () => drawStartScreen(ctx, canvas, img, btnImg);
    img.onload = () => btnImg.src = "../assets/content/6.Botones/Start/2.png";
    img.src = "../assets/content/6.Botones/Instructions 2.png";

    canvas.addEventListener("click", handleStart); canvas.addEventListener("touchstart", handleStart)
}

function handleStart(event) {
   let handler = handleClick(event, startButton);
    if (handler) {
        canvas.removeEventListener("click", handleStart);
        document.removeEventListener("keydown", startEnter);
        startGame();
    }
}

function handleClick(event, button) {
    const { clientX, clientY } = event;
    const { left, top } = canvas.getBoundingClientRect();
    const [x, y] = [clientX - left, clientY - top];

    if (x >= button.x && x <= button.x + button.width &&
        y >= button.y && y <= button.y + button.height) {
        return true;
    }
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

function showLoader(ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "28px Lucky";
    ctx.textAlign = "center";
    ctx.fillText("Loading world...", canvas.width / 2, canvas.height / 2);
}

function startGame() {
    const ctx = canvas.getContext("2d");
    showLoader(ctx);
    initLevel();

    setTimeout(() => {
        world = new World(canvas, keyboard);
        world.character.x += 0.01;
        bindControls();
    }, 600);
    canvas.addEventListener("click", startScreenBtn);
}

function startScreenBtn(event) {
    let test = handleClick(event, screenButton);
    if (test) {
        canvas.requestFullscreen().then();
        world.fullscreen.btnVisibility();
    }
}

function startEnter(e) {
    if (e.key === "Enter") {
        canvas.removeEventListener("click", handleStart);
        document.removeEventListener("keydown", startEnter);
        startGame();
    }
}

document.addEventListener("keydown", startEnter);

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

function bindControls() {
    const btnMap = {
        btnLeft: 'LEFT', btnRight: 'RIGHT',
        btnUp: 'UP', btnDown: 'DOWN',
        btnAtk: 'SPACE',
    };
    Object.keys(btnMap).forEach(id => {
        const key = btnMap[id];
        const btn = document.getElementById(id);
        onTouch(btn, key); onMouse(btn, key)
    });
}

function onTouch(btn, key) {
    btn.addEventListener('touchstart', e => {
        e.preventDefault(); keyboard[key] = true
    });
    btn.addEventListener('touchend', e => {
        e.preventDefault(); keyboard[key] = false
    });
}

function onMouse(btn, key) {
    btn.addEventListener('mousedown', e => {
        e.preventDefault(); keyboard[key] = true
    });
    btn.addEventListener('mouseup', e => {
        e.preventDefault(); keyboard[key] = false
    });
    btn.addEventListener('mouseleave', e => {
        e.preventDefault(); keyboard[key] = false
    });
}