class MusicController {
    constructor(src, volume = 0.25) {
        this.audio = new Audio(src);
        this.audio.loop = true;
        this.audio.volume = volume;
    }

    play() {
        if (this.audio.paused) {
            this.audio.currentTime = 0;
            this.audio.play().catch(() => {});
        }
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    setVolume(volume) {
        this.audio.volume = volume;
    }

    isPlaying() {
        return !this.audio.paused;
    }
}
