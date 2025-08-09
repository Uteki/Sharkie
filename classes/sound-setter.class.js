class SoundSetter extends DrawableObject {
    /**
     * Path for non-muted icon image.
     * @type {string}
     */
    NON_MUTE = getAssetPath('global/png/non-mute.png');

    /**
     * Path for muted icon image.
     * @type {string}
     */
    MUTE = getAssetPath('global/png/mute.png');

    /**
     * Volume button position and size.
     * @type {{x: number, y: number, width: number, height: number}}
     */
    volumeButton = {
        x: 590, y: 20, width: 80, height: 80
    };

    /**
     * Initializes the sound setter button.
     */
    constructor() {
        super();
        this.updateState();

        this.x = this.volumeButton.x;
        this.y = this.volumeButton.y;
        this.width = this.volumeButton.width;
        this.height = this.volumeButton.height;

        this.soundSetter = this.soundSetter.bind(this);
    }

    /**
     * Returns the current icon path depending on mute state.
     * @returns {string} Image path for current mute state.
     */
    sendState() {
        return MusicController.isMuted ? this.MUTE : this.NON_MUTE;
    }

    /**
     * Loads the icon image based on current mute state.
     */
    updateState() {
        const path = MusicController.isMuted ? this.MUTE : this.NON_MUTE;
        this.loadImage(path);
    }

    /**
     * Handles click event on the volume button to toggle mute.
     * @param {Event} event - The click event.
     */
    soundSetter(event) {
        let handler = handleClick(event, this.volumeButton);
        if (handler) {
            this.toggle();
        }
    }

    /**
     * Toggles the mute state and updates the icon.
     */
    toggle() {
        MusicController.toggleMute();
        this.updateState();
    }
}