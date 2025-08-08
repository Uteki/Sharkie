class SoundSetter extends DrawableObject {
    NON_MUTE = getAssetPath('global/png/non-mute.png');
    MUTE = getAssetPath('global/png/mute.png');

    volumeButton = {
        x: 590, y: 20, width: 80, height: 80
    }

    constructor() {
        super();
        this.updateState();

        this.x = this.volumeButton.x;
        this.y = this.volumeButton.y;
        this.width = this.volumeButton.width;
        this.height = this.volumeButton.height;

        this.soundSetter = this.soundSetter.bind(this);
    }

    sendState() {
        return MusicController.isMuted ? this.MUTE : this.NON_MUTE;;
    }

    updateState() {
        const path = MusicController.isMuted ? this.MUTE : this.NON_MUTE;
        this.loadImage(path);
    }

    soundSetter(event) {
        let handler = handleClick(event, this.volumeButton);
        if (handler) {
            this.toggle();
        }
    }

    toggle() {
        MusicController.toggleMute();
        this.updateState();
    }
}
