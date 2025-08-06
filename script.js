const IS_SERVER = location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';

function init() {
    loadGame();
}

function onDom() {
    contextButtons();
    checkOrientation();
}

function contextButtons() {
    ['btnUp', 'btnLeft', 'btnDown', 'btnRight', 'btnAtk'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('contextmenu', e => e.preventDefault());
            btn.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
        }
    });
}

function checkOrientation() {
    if (window.matchMedia('(orientation: landscape)').matches) {
        if (window.innerHeight < 480) {
            let newHeight = window.innerHeight;
            document.querySelector('canvas').style.height = `${newHeight}px`;
        }
    } else { document.querySelector('canvas').style.height = `100%` }
}

function getAssetPath(relativePath) {
    const basePath = IS_SERVER ? 'https://daniel-tran.developerakademie.net/Sharkie/assets/' : './assets/';
    return basePath + relativePath;
}

document.addEventListener('DOMContentLoaded', onDom);