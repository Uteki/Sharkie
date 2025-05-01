let canvas;
let world;

function loadGame() {
    canvas = document.querySelector('canvas');
    world = new World(canvas);
}