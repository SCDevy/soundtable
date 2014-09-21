var volume = 0.25;
var sound1 = {source: 'sine', volume: 0.15, pitch: 'C4', env: {attack: 2, decay: 2, sustain: 0.2, hold: 2, release: 2}, tremolo: {shape: 'sine', magnitude: 2, speed: 1.5, attack: 0.3}}
var sound2 = {source: 'sine', volume: volume, pitch: 'F4', env: {attack: 0.5, decay: 1, sustain: 0.2, hold: 0.5, release: 0.5}, tremolo: {shape: 'sine', magnitude: 1, speed: 1, attack: 0.3}}
var sound3 = {source: 'sine', volume: volume, pitch: 'Bb4', env: {attack: 0.5, decay: 1, sustain: 0.1, hold: 0.5, release: 0.5}, tremolo: {shape: 'sine', magnitude: 0.3, speed: 4, attack: 0.3}}
var sound4 = {source: 'sine', volume: volume, pitch: 'C5', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 2, speed: 2, attack: 0.3}}
var sound5 = {source: 'sine', volume: volume, pitch: 'E5', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}}
var sound6 = {source: 'sine', volume: volume, pitch: 'F5', env: {attack: 1, decay: 1, sustain: 0.2, hold: 2, release: 2}, vibrato: {shape: 'sine', magnitude: 4, speed: 1, attack: 3}}
var sound7 = {source: 'sine', volume: volume, pitch: 'G5', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}}
var sound8 = {source: 'sine', volume: volume, pitch: 'C6', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}}
var sound9 = {source: 'sine', volume: volume, pitch: 'E6', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}}
var sound10 = {source: 'sine', volume: volume, pitch: 'F6', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'square', magnitude: 1, speed: 2, attack: 0.3}}
sounds = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10];
var lastPlay1 = 0;
var lastPlay2 = 0;

var sound = [];
function playSound(which, speed) {
	if (which < 4) {
		which = Math.floor(Math.random()*4);
	}
	else {
		which = Math.floor(Math.random()*4) + 4;
	}
	var myTime = (new Date()).getTime();
	if((myTime-lastPlay1) > 200 && (myTime-lastPlay2) > 1000) {
		newSound =  new Wad(sounds[which]);
		sound.push(which);
		newSound.play();
		lastPlay2 = lastPlay1; lastPlay1 = myTime;
	}
}
function playChord(hi) {
	newSound1 = new Wad(sounds[hi[0]]);
	newSound2 = new Wad(sounds[hi[1]]);
	newSound3 = new Wad(sounds[hi[2]]);
	newSound1.play();
	newSound2.play();
	newSound3.play();
}
