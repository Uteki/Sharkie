/**
 * Game audio controllers for music and sound effects.
 *
 * Background and event-specific music controllers.
 * @constant {MusicController} backgroundMusic - Main background music loop.
 * @constant {MusicController} gameoverMusic - Music played on game over screen.
 * @constant {MusicController} gameonMusic - Music played when winning the game.
 * @constant {MusicController} whaleMusic - Endboss whale theme music.
 *
 * Sound effect controllers.
 * @constant {MusicController} sharkieMusic - Swimming sound for Sharkie.
 * @constant {MusicController} slapAtkMusic - Slap attack sound effect.
 * @constant {MusicController} biteAtkMusic - Whale bite sound effect.
 * @constant {MusicController} bubbleAtkMusic - Bubble attack sound effect.
 */

const backgroundMusic = new MusicController(getAssetPath('global/audio/background-ost.mp3'), true);
const gameoverMusic = new MusicController(getAssetPath('global/audio/gameover-ost.mp3'), true);
const sharkieMusic = new MusicController(getAssetPath('global/audio/sharkie-ost.mp3'), true);
const gameonMusic = new MusicController(getAssetPath('global/audio/gameon-ost.mp3'), true);
const whaleMusic = new MusicController(getAssetPath('global/audio/endboss-ost.mp3'), true);

const bubbleAtkMusic = new MusicController(getAssetPath('global/audio/bubble-attack.wav'), false);
const biteAtkMusic = new MusicController(getAssetPath('global/audio/whale-bite.wav'), false, 1);
const slapAtkMusic = new MusicController(getAssetPath('global/audio/slap-attack.wav'), false, 0.75);