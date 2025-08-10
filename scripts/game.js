/**
 * Button coordinates and dimensions for the start button.
 * @type {{x:number, y:number, width:number, height:number}}
 */
const startButton = { x: 440, y: 370, width: 130, height: 40 };

/**
 * Button coordinates and dimensions for fullscreen toggle on the start screen.
 * @type {{x:number, y:number, width:number, height:number}}
 */
const screenButton = { x: 480, y: 400, width: 180, height: 40 };

/**
 * Hover handler for the start screen — checks start button and volume button.
 * @param {MouseEvent|TouchEvent} e - The hover event.
 * @private
 */
const startHoverHandler = (e) => handleHoverMultiple(e, startButton, soundSet.volumeButton);

/**
 * Hover handler for the game screen — checks fullscreen button and volume button.
 * @param {MouseEvent|TouchEvent} e - The hover event.
 */
const gameHoverHandler = (e) => handleHoverMultiple(e, screenButton, soundSet.volumeButton);

let world;
let loaded;
let canvas;

let img;
let bgImg;
let btnImg;
let muteImg;

let keyboard = new Keyboard();
let soundSet = new SoundSetter();

/**
 * Loads the game by initializing the canvas and showing the start screen.
 */
function loadGame() {
    canvas = document.querySelector('canvas');
    showStartScreen(canvas.getContext("2d"), canvas);
}

/**
 * Displays the start screen with buttons and background images.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {HTMLCanvasElement} canvas - The game canvas element.
 */
function showStartScreen(ctx, canvas) {
    document.addEventListener('click', handleVolumeClick);

    createImg();
    muteImg.src = soundSet.sendState();
    img.src = isMobileDevice() ? getAssetPath('content/6.Botones/Instructions 1.png') : getAssetPath('content/6.Botones/Instructions 2.png');
    bgImg.src = getAssetPath('content/3. Background/Legacy/Dark/2.png');
    btnImg.src = getAssetPath('content/6.Botones/Start/2.png');
    loadHelper(ctx, canvas);
    startEvents();
}

/**
 * Helps the start screen to load with buttons and background images.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {HTMLCanvasElement} canvas - The game canvas element.
 */
function loadHelper(ctx, canvas) {
    let loadedCount = 0;
    const onLoad = () => {
        if (++loadedCount === 3) {
            drawStartScreen(ctx, canvas, img, bgImg, btnImg, muteImg);
        }
    };

    img.onload = onLoad; bgImg.onload = onLoad; btnImg.onload = onLoad
}

/**
 * Creates and initializes Image objects for the start screen.
 * @private
 */
function createImg() {
    img = new Image();
    bgImg = new Image();
    btnImg = new Image();
    muteImg = new Image();
}

/**
 * Registers event listeners for starting the game.
 * @private
 */
function startEvents() {
    canvas.addEventListener("click", handleStart);
    canvas.addEventListener("mousemove", startHoverHandler);
    canvas.addEventListener("touchstart", handleStart);
}

/**
 * Converts raw mouse/touch coordinates to scaled canvas coordinates.
 * @param {MouseEvent|TouchEvent} event - The mouse or touch event.
 * @returns {{x:number, y:number}} Scaled coordinates.
 * @private
 */
function getScaledPos(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

/**
 * Handles click/tap events on the start button and transitions into the game.
 * Removes start screen listeners and sets up in-game listeners.
 * @param {MouseEvent|TouchEvent} event - The click or touch event.
 * @private
 */
function handleStart(event) {
    if (handleClick(event, startButton)) {
        canvas.removeEventListener("click", handleStart);
        canvas.removeEventListener("mousemove", startHoverHandler);
        canvas.addEventListener("mousemove", isMobileDevice()
            ? e => handleHover(e, soundSet.volumeButton)
            : gameHoverHandler
        );
        canvas.removeEventListener("touchstart", handleStart);
        document.removeEventListener("keydown", startEnter);
        startGame();
    }
}

/**
 * Checks if a click/touch is inside a given button rectangle.
 * @param {MouseEvent|TouchEvent} event - The click or touch event.
 * @param {{x:number, y:number, width:number, height:number}} button - The button rectangle.
 * @returns {boolean} True if click is inside button bounds.
 */
function handleClick(event, button) {
    const { x, y } = getScaledPos(event);
    return (
        x >= button.x && x <= button.x + button.width &&
        y >= button.y && y <= button.y + button.height
    );
}

/**
 * Changes the cursor style based on hover over a single button.
 * @param {MouseEvent|TouchEvent} event - The hover event.
 * @param {{x:number, y:number, width:number, height:number}} button - The button to check.
 * @private
 */
function handleHover(event, button) {
    const { x, y } = getScaledPos(event);
    canvas.style.cursor = onTop({ x, y }, button) ? 'pointer' : 'default';
}

/**
 * Changes the cursor style based on hover over multiple buttons.
 * @param {MouseEvent|TouchEvent} event - The hover event.
 * @param {...{x:number, y:number, width:number, height:number}} buttons - The buttons to check.
 * @private
 */
function handleHoverMultiple(event, ...buttons) {
    const { x, y } = getScaledPos(event);
    canvas.style.cursor = buttons.some(btn => onTop({ x, y }, btn))
        ? 'pointer' : 'default';
}

/**
 * Checks whether a coordinate is on top of a button rectangle.
 * @param {{x:number, y:number}} coords - The coordinate to check.
 * @param {{x:number, y:number, width:number, height:number}} button - The button rectangle.
 * @returns {boolean} True if inside bounds.
 * @private
 */
function onTop({ x, y }, button) {
    return (
        x >= button.x && x <= button.x + button.width &&
        y >= button.y && y <= button.y + button.height
    );
}

/**
 * Renders the start screen, including instructions, start button, and mute button.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {HTMLCanvasElement} canvas - The game canvas element.
 * @param {HTMLImageElement} img - The instructions image.
 * @param {HTMLImageElement} bgImg - The start background image.
 * @param {HTMLImageElement} btnImg - The start button image.
 * @param {HTMLImageElement} muteImg - The mute button image.
 * @private
 */
function drawStartScreen(ctx, canvas, img, bgImg, btnImg, muteImg) {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "#000";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, (canvas.width - 500) / 2, 40, 500, 300);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "24px Lucky";
    ctx.fillText(
        isMobileDevice() ? "Touch to start game" : "Press ENTER to Start OR",
        canvas.width / 2.5,
        canvas.height - 80
    );
    ctx.drawImage(btnImg, startButton.x, startButton.y, startButton.width, startButton.height);
    ctx.drawImage(muteImg, soundSet.volumeButton.x, soundSet.volumeButton.y, soundSet.volumeButton.width, soundSet.volumeButton.height);
}

/**
 * Shows the loading screen before starting the game world.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @private
 */
function showLoader(ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "28px Lucky";
    ctx.textAlign = "center";
    ctx.fillText("Loading world...", canvas.width / 2, canvas.height / 2);
}

/**
 * Initializes and starts the game world.
 * Sets up controls and begins rendering.
 */
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

/**
 * Returns game start delay (shorter after first load).
 * @returns {number|undefined} Delay in milliseconds.
 * @private
 */
function delayStart() {
    if (loaded) return;
    return IS_SERVER ? 2000 : 500;
}

/**
 * Returns true if the device is mobile or a touch-enabled Mac.
 * @returns {boolean} Whether the device is mobile or touch-capable.
 */
function isMobileDevice() {
    const ua = navigator.userAgent;
    const isTouchMac = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    return isMobile || isTouchMac;
}

/**
 * Shows on-screen controls for mobile devices.
 */
function checkDevice() {
    if (isMobileDevice()) {
        document.querySelector('#controls').classList.remove('d-none');
    }
}

/**
 * Handles clicks on the fullscreen button on the start screen.
 * @param {MouseEvent|TouchEvent} event - The click event.
 * @private
 */
function startScreenBtn(event) {
    let btn = handleClick(event, screenButton);
    if (btn) {
        canvas.requestFullscreen().then();
    }
}

/**
 * Starts the game when Enter is pressed on the start screen.
 * @param {KeyboardEvent} e - The keydown event.
 * @private
 */
function startEnter(e) {
    if (e.key === "Enter") {
        canvas.removeEventListener("click", handleStart);
        canvas.removeEventListener("mousemove", startHoverHandler);
        document.removeEventListener("keydown", startEnter);
        startGame();
    }
}

/**
 * Binds touch and mouse controls for in-game buttons.
 */
function bindControls() {
    const btnMap = {
        btnLeft: 'LEFT', btnRight: 'RIGHT',
        btnUp: 'UP', btnDown: 'DOWN',
        btnAtk: 'SPACE',
    };
    Object.keys(btnMap).forEach(id => {
        const key = btnMap[id];
        const btn = document.getElementById(id);
        onTouch(btn, key);
        onMouse(btn, key);
    });
}

/**
 * Adds touch event handlers for a control button.
 * @param {HTMLElement} btn - The control button element.
 * @param {string} key - The corresponding keyboard key property.
 * @private
 */
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

/**
 * Adds mouse event handlers for a control button.
 * @param {HTMLElement} btn - The control button element.
 * @param {string} key - The corresponding keyboard key property.
 * @private
 */
function onMouse(btn, key) {
    btn.addEventListener('mousedown', e => {
        e.preventDefault();
        keyboard[key] = true;
    });
    btn.addEventListener('mouseup', e => {
        e.preventDefault();
        keyboard[key] = false;
    });
    btn.addEventListener('mouseleave', e => {
        e.preventDefault();
        keyboard[key] = false;
    });
}

/**
 * Resets to the home/start screen.
 */
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

/**
 * Handles clicks on the mute/volume button.
 * @param {MouseEvent|TouchEvent} event - The click or touch event.
 * @private
 */
function handleVolumeClick(event) {
    if (handleClick(event, soundSet.volumeButton)) {
        soundSet.toggle();
        muteImg.onload = () => drawStartScreen(canvas.getContext("2d"), canvas, img, bgImg, btnImg, muteImg);
        muteImg.src = soundSet.sendState();
    }
}

document.addEventListener("keydown", startEnter);

document.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp': return keyboard.UP = true;
        case 'ArrowDown': return keyboard.DOWN = true;
        case 'ArrowLeft': return keyboard.LEFT = true;
        case 'ArrowRight': return keyboard.RIGHT = true;
        case ' ': return keyboard.SPACE = true;
    }
});

document.addEventListener('keyup', function(e) {
    switch (e.key) {
        case 'ArrowUp': return keyboard.UP = false;
        case 'ArrowDown': return keyboard.DOWN = false;
        case 'ArrowLeft': return keyboard.LEFT = false;
        case 'ArrowRight': return keyboard.RIGHT = false;
        case ' ': return keyboard.SPACE = false;
    }
});