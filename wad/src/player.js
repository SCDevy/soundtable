var sound = 0;
window.onload=function() {
	$('.colorBox').width($(document).width()/2-1).height($(document).height()/2);
	var myHeight = $('.centerTxt').height();
	$('.centerTxt').css({'padding-top': (($(document).height()/2-myHeight)/2)+'px'});
}
function playSound(which){
var sound1 = {source: 'sine', volume: 0.5, pitch: 'F4', env: {attack: 0.5, decay: 0.5, sustain: 0.2, hold: 1.5, release: 0.8}, tremolo: {shape: 'sine', magnitude: 1, speed: 4, attack: 0.3}}
var sound2 = {source: 'sine', volume: 0.5, pitch: 'A5', env: {attack: 0.5, decay: 0.5, sustain: 0.3, hold: 1.5, release: 0.8}, tremolo: {shape: 'sine', magnitude: 1, speed: 1, attack: 0.3}}
var sound3 = {source: 'sine', volume: 0.5, pitch: 'B5', env: {attack: 0.5, decay: 0.5, sustain: 0.2, hold: 1.5, release: 0.8}, tremolo: {shape: 'sine', magnitude: 0.3, speed: 4, attack: 0.3}}
var sound4 = {source: 'sine', volume: 0.5, pitch: 'D5', env: {attack: 0.5, decay: 0.5, sustain: 0.1, hold: 1.5, release: 0.8}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}}
sounds = [sound1, sound2, sound3, sound4];
coolSound = new Wad(sounds[which]);
coolSound.play();

// if(coolSound) coolSound.stop();
// var coolSound;
// // var p = document.getElementById('WADsynth');
// var params = [];
// var settings = {};
// for (var i = 0; i < p.length; i++){
// if (p[i].value) params.push(p[i].value);
// }

// console.log(params + " " + params.length);

// settings = {
//     source : params[0],
//     volume : parseFloat(params[1]),
//     pitch : params[2]+params[3],
//     panning : parseFloat(params[4]),
//     env : {
//         attack : parseFloat(params[5]),
//         decay : parseFloat(params[6]),
//         sustain : parseFloat(params[7]),
//         hold : parseFloat(params[8]),
//         release : parseFloat(params[9])
//     },
//     filter : {
//         type : params[10],
//         frequency : parseFloat(params[11]),
//         q : parseFloat(params[12]),
//         env : {
//             frequency : parseFloat(params[13]),
//             attack : parseFloat(params[14])
//         }
//     },
//     /*reverb : {
//      wet : 1, // Volume of the reverberations.
//      impulse : 'http://www.myServer.com/path/to/impulse.wav' // A URL for an impulse response file, if you do not want to use the default impulse response.
//      },*/
//     vibrato : {
//         shape : params[15],
//         magnitude : parseFloat(params[16]),
//         speed : parseFloat(params[17]),
//         attack : parseFloat(params[18])
//     },

//     tremolo : {
//         shape : params[19],
//         magnitude : parseFloat(params[20]),
//         speed : parseFloat(params[21]),
//         attack : parseFloat(params[22])
//     }
// }

// console.log(settings);
// coolSound = new Wad(settings);
// coolSound.play();
}

function soundOff () {sound.stop();}