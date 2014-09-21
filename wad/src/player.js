var volume = 0.25;
var sound1 = {source: 'sine', volume: volume, pitch: 'C4', env: {attack: 2, decay: 2, sustain: 0.2, hold: 2, release: 2}, tremolo: {shape: 'sine', magnitude: 2, speed: 1.5, attack: 0.3}};
var sound2 = {source: 'sine', volume: volume, pitch: 'F4', env: {attack: 0.5, decay: 1, sustain: 0.2, hold: 0.5, release: 0.5}, tremolo: {shape: 'sine', magnitude: 1, speed: 1, attack: 0.3}};
var sound3 = {source: 'sine', volume: volume, pitch: 'Bb4', env: {attack: 0.5, decay: 1, sustain: 0.1, hold: 0.5, release: 0.5}, tremolo: {shape: 'sine', magnitude: 0.3, speed: 4, attack: 0.3}};
var sound4 = {source: 'sine', volume: volume, pitch: 'C5', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 2, speed: 2, attack: 0.3}};
var sound5 = {source: 'sine', volume: volume, pitch: 'E5', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}};
var sound6 = {source: 'sine', volume: volume, pitch: 'F5', env: {attack: 1, decay: 1, sustain: 0.2, hold: 2, release: 2}, vibrato: {shape: 'sine', magnitude: 4, speed: 1, attack: 3}};
var sound7 = {source: 'sine', volume: volume, pitch: 'G5', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}};
var sound8 = {source: 'sine', volume: volume, pitch: 'C6', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}};
var sound9 = {source: 'sine', volume: volume, pitch: 'E6', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}};
var sound10 = {source: 'sine', volume: volume, pitch: 'F6', env: {attack: 0.35, decay: 0.7, sustain: 0.2, hold: 0.35, release: 0.35}, vibrato: {shape: 'square', magnitude: 1, speed: 2, attack: 0.3}};
var sounds = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10];
var lastPlay1 = 0;
var lastPlay2 = 0;

var soundsPlaying = [];
var soundsToPlay = [];
function playSound(which, speed) {
	var myTime = (new Date()).getTime();
	newSound =  new Wad(sounds[which]);
	var now = new Date().getTime();
	soundsToPlay.push({
		sound: newSound,
		time: now,
		skipAfter: now + 32,
		id: which,
	});
}

function playSounds(time) {
	for (var i = 0; i < soundsPlaying.length; i++) {
		if (time > soundsPlaying[i].stopTime) {
			//console.log('played sound for', time - soundsPlaying[i].startTime,soundsPlaying[i].sound);
			soundsPlaying[i].sound.stop();
			soundsPlaying.splice(i, 1);
			i--;
		}
	}
	while (soundsPlaying.length < 3 && soundsToPlay.length) {
		var nextSound = soundsToPlay.shift();
		if (time > nextSound.skipAfter) {
			console.log('Skipped sound!')
			continue;
		}

		var alreadyPlaying = false;
		for (var i = 0; i < soundsPlaying.length; i++) {
			if (soundsPlaying[i].id === nextSound.id) {
				alreadyPlaying = true;
				if (soundsPlaying[i].startTime - time < 800) {
					soundsPlaying[i].stopTime = soundsPlaying[i].startTime + 800;
				}
				break;
			}
		}
		
		if (alreadyPlaying) {
			continue;
		}

		nextSound.sound.play();
		soundsPlaying.push({
			stopTime: 200 + time,
			startTime: time,
			sound: nextSound.sound,
			id: nextSound.id,
		});
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
