const backgroundMusic = new MusicController(getAssetPath('global/audio/background-ost.mp3'), true);
const gameoverMusic = new MusicController(getAssetPath('global/audio/gameover-ost.mp3'), true);
const sharkieMusic = new MusicController(getAssetPath('global/audio/sharkie-ost.mp3'), true);
const gameonMusic = new MusicController(getAssetPath('global/audio/gameon-ost.mp3'), true);
const whaleMusic = new MusicController(getAssetPath('global/audio/endboss-ost.mp3'), true);

const bubbleAtkMusic = new MusicController(getAssetPath('global/audio/bubble-attack.wav'), false);
const biteAtkMusic = new MusicController(getAssetPath('global/audio/whale-bite.wav'), false, 1);
const slapAtkMusic = new MusicController(getAssetPath('global/audio/slap-attack.wav'), false, 0.75);
