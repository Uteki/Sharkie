class MusicController {
    /**
     * Array holding all instances of MusicController.
     * @type {MusicController[]}
     */
    static allControllers = [];

    /**
     * Indicates whether all sounds are muted.
     * @type {boolean}
     */
    static isMuted = JSON.parse(localStorage.getItem('muted')) || false;

    /**
     * Creates a MusicController instance.
     * @param {string} src - The audio source file URL.
     * @param {boolean} loop - Whether the audio should loop.
     * @param {number} [volume=0.25] - Initial volume (0 to 1).
     */
    constructor(src, loop, volume = 0.25) {
        this.audio = new Audio(src);
        this.audio.loop = loop;
        this.audio.volume = volume;
        this.defaultVolume = volume;
        MusicController.allControllers.push(this);
    }

    /**
     * Mutes all audio controllers and updates localStorage.
     */
    static muteAll() {
        MusicController.isMuted = true;
        localStorage.setItem('muted', 'true');
        MusicController.allControllers.forEach(sound => {
            sound.audio.volume = 0;
        });
    }

    /**
     * Unmutes all audio controllers and updates localStorage.
     */
    static unmuteAll() {
        MusicController.isMuted = false;
        localStorage.setItem('muted', 'false');
        MusicController.allControllers.forEach(sound => {
            sound.audio.volume = sound.defaultVolume;
        });
    }

    /**
     * Toggles the mute state of all audio controllers.
     */
    static toggleMute() {
        if (MusicController.isMuted) {
            MusicController.unmuteAll();
        } else {
            MusicController.muteAll();
        }
    }

    /**
     * Plays the audio, resetting time if paused.
     */
    play() {
        this.audio.volume = MusicController.isMuted ? 0 : this.defaultVolume;
        if (this.audio.paused) {
            this.audio.currentTime = 0;
            this.audio.play().catch(() => {});
        }
    }

    /**
     * Pauses the audio playback.
     */
    pause() {
        this.audio.pause();
    }

    /**
     * Stops the audio and resets playback time.
     */
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    /**
     * Sets the default volume and updates current volume based on mute state.
     * @param {number} volume - Volume level (0 to 1).
     */
    setVolume(volume) {
        this.defaultVolume = volume;
        this.audio.volume = MusicController.isMuted ? 0 : volume;
    }

    /**
     * Checks if the audio is currently playing.
     * @returns {boolean} True if playing, false if paused.
     */
    isPlaying() {
        return !this.audio.paused;
    }
}