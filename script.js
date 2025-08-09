/**
 * True if running on a server (non-localhost), used for loading assets from the correct base path.
 * @type {boolean}
 */
const IS_SERVER = location.hostname !== 'localhost' && location.hostname !== '127.0.0.1';

/**
 * Entry point for initializing the game.
 * @returns {void}
 */
function init() {
    loadGame();
}

/**
 * Called after the DOM is fully loaded. Sets up UI context buttons (mobile) and checks device orientation.
 * @returns {void}
 */
function onDom() {
    contextButtons();
    checkOrientation();
}

/**
 * Prevents default right-click and scroll behaviors on mobile control buttons.
 * @returns {void}
 */
function contextButtons() {
    ['btnUp', 'btnLeft', 'btnDown', 'btnRight', 'btnAtk'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('contextmenu', e => e.preventDefault());
            btn.addEventListener('touchstart', e => {
                if (e.cancelable) e.preventDefault();
            }, { passive: false });
        }
    });
}

/**
 * Adjusts the canvas height based on device orientation and window size.
 * @returns {void}
 */
function checkOrientation() {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    if (window.matchMedia('(orientation: landscape)').matches) {
        if (window.innerHeight < 480) {
            const newHeight = window.innerHeight;
            canvas.style.height = `${newHeight}px`;
        }
    } else {
        canvas.style.height = '100%';
    }
}

/**
 * Returns the full URL to an asset based on whether the app is running locally or on a server.
 * @param {string} relativePath - Path to the asset relative to the assets folder.
 * @returns {string} Full asset URL.
 */
function getAssetPath(relativePath) {
    const basePath = IS_SERVER
        ? 'https://daniel-tran.developerakademie.net/Sharkie/assets/'
        : './assets/';
    return basePath + relativePath;
}

document.addEventListener('DOMContentLoaded', onDom);