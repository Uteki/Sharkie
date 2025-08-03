function init() {
    loadGame();
}

document.addEventListener('DOMContentLoaded', checkOrientation);

function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            let newHeight = window.innerHeight;
            document.querySelector('canvas').style.height = `${newHeight}px`;
        }
    }
    else { document.querySelector('canvas').style.height = `100%` }
}