class MusicController {
    static allControllers = [];
    static isMuted = JSON.parse(localStorage.getItem('muted')) || false;

    constructor(src, loop, volume = 0.25) {
        this.audio = new Audio(src);
        this.audio.loop = loop;
        this.audio.volume = volume;
        this.defaultVolume = volume;
        MusicController.allControllers.push(this);
    }

    static muteAll() {
        MusicController.isMuted = true;
        localStorage.setItem('muted', 'true');
        MusicController.allControllers.forEach(sound => {
            sound.audio.volume = 0;
        });
    }

    static unmuteAll() {
        MusicController.isMuted = false;
        localStorage.setItem('muted', 'false');
        MusicController.allControllers.forEach(sound => {
            sound.audio.volume = sound.defaultVolume;
        });
    }

    static toggleMute() {
        if (MusicController.isMuted) {
            MusicController.unmuteAll();
        } else {
            MusicController.muteAll();
        }
    }

    play() {
        this.audio.volume = MusicController.isMuted ? 0 : this.defaultVolume;
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
        this.defaultVolume = volume;
        this.audio.volume = MusicController.isMuted ? 0 : volume;
    }

    isPlaying() {
        return !this.audio.paused;
    }
}
