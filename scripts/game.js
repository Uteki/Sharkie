const startButton = {
    x: 440, y: 370, width: 130, height: 40
};
const screenButton = {
    x: 480, y: 400, width: 180, height: 40
}

let world;
let loaded;
let canvas;

let img;
let btnImg;
let muteImg;

let hoverStartBtn = null;
let keyboard = new Keyboard();
let soundSet = new SoundSetter();

function loadGame() {
    canvas = document.querySelector('canvas');
    showStartScreen(canvas.getContext("2d"), canvas);
}

function showStartScreen(ctx, canvas) {
    document.addEventListener('click', handleVolumeClick);

    createImg();
    hoverStartBtn = (e) => handleHover(e, startButton);
    muteImg.src = soundSet.sendState();
    img.src = isMobileDevice() ? getAssetPath('content/6.Botones/Instructions 1.png') : getAssetPath('content/6.Botones/Instructions 2.png');
    img.onload = () => btnImg.src = getAssetPath('content/6.Botones/Start/2.png');
    btnImg.onload = () => drawStartScreen(ctx, canvas, img, btnImg, muteImg);
    startEvents();
}

function createImg() {
    img = new Image();
    btnImg = new Image();
    muteImg = new Image();
}

function startEvents() {
    canvas.addEventListener("click", handleStart);
    canvas.addEventListener("mousemove", hoverStartBtn);
    canvas.addEventListener("touchstart", handleStart);
}

function getScaledPos(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function handleStart(event) {
    let handler = handleClick(event, startButton);
    if (handler) {
        canvas.removeEventListener("click", handleStart);
        canvas.removeEventListener("mousemove", hoverStartBtn);
        if (!isMobileDevice()) canvas.addEventListener("mousemove", (e) => handleHover(e, screenButton));
        canvas.removeEventListener("touchstart", handleStart);
        document.removeEventListener("keydown", startEnter);
        startGame();
    }
}

function handleClick(event, button) {
    const { x, y } = getScaledPos(event);
    return (
        x >= button.x && x <= button.x + button.width &&
        y >= button.y && y <= button.y + button.height
    );
}

function handleHover(event, button) {
    const { x, y } = getScaledPos(event);
    canvas.style.cursor = onTop({ x, y }, button) ? 'pointer' : 'default';
}

function onTop({ x, y }, button) {
    return (
        x >= button.x && x <= button.x + button.width &&
        y >= button.y && y <= button.y + button.height
    );
}

function drawStartScreen(ctx, canvas, img, btnImg, muteImg) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, (canvas.width - 500) / 2, 40, 500, 300);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "24px Lucky";
    ctx.fillText(isMobileDevice() ? "Touch to start game" : "Press ENTER to Start OR", canvas.width / 2.5, canvas.height - 80);
    ctx.drawImage(btnImg, startButton.x, startButton.y, startButton.width, startButton.height);
    ctx.drawImage(muteImg, soundSet.volumeButton.x, soundSet.volumeButton.y, soundSet.volumeButton.width, soundSet.volumeButton.height);
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
    document.removeEventListener('click', handleVolumeClick);
    const ctx = canvas.getContext("2d");
    if (!loaded) showLoader(ctx);

    initLevel();
    setTimeout(() => {
        world = new World(canvas, keyboard);
        world.character.x += 0.01;
        bindControls();
    }, delayStart());

    loaded = true;
    if (!isMobileDevice()) canvas.addEventListener("click", startScreenBtn);
}

function delayStart() {
    if (loaded) return;
    return IS_SERVER ? 1200 : 600
}

function isMobileDevice() {
    const ua = navigator.userAgent;
    const isTouchMac = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    return isMobile || isTouchMac;
}

function checkDevice() {
    if (isMobileDevice()) {
        document.querySelector('#controls').classList.remove('d-none');
    }
}

function startScreenBtn(event) {
    let btn = handleClick(event, screenButton);
    if (btn) {
        canvas.requestFullscreen().then();
    }
}

function startEnter(e) {
    if (e.key === "Enter") {
        canvas.removeEventListener("click", handleStart);
        document.removeEventListener("keydown", startEnter);
        startGame();
    }
}

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
        if (e.cancelable) e.preventDefault();
        keyboard[key] = true;
    });

    btn.addEventListener('touchend', e => {
        if (e.cancelable) e.preventDefault();
        keyboard[key] = false;
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

function goToHomeScreen() {
    if (world) {
        world.stop();
        world = null;
    }
    const ctx = canvas.getContext('2d');
    canvas.style.cursor = 'default';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showStartScreen(ctx, canvas);
    document.addEventListener("keydown", startEnter);
    canvas.addEventListener("click", handleStart);
}

function handleVolumeClick(event) {
    if (handleClick(event, soundSet.volumeButton)) {
        soundSet.toggle();
        muteImg.onload = () => drawStartScreen(canvas.getContext("2d"), canvas, img, btnImg, muteImg);
        muteImg.src = soundSet.sendState();
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