let canvas;
let world;

let keyboard = new Keyboard();

function loadGame() {
    canvas = document.querySelector('canvas');
    world = new World(canvas, keyboard);
}

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