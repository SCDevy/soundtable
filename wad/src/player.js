var volume = 0.25;
var sound1 = {source: 'sine', volume: volume, pitch: 'F4', env: {attack: 0.5, decay: 0.5, sustain: 0.2, hold: 0.5, release: 0.5}, tremolo: {shape: 'sine', magnitude: 1, speed: 4, attack: 0.3}}
var sound2 = {source: 'sine', volume: volume, pitch: 'A4', env: {attack: 0.5, decay: 0.5, sustain: 0.2, hold: 0.5, release: 0.5}, tremolo: {shape: 'sine', magnitude: 1, speed: 1, attack: 0.3}}
var sound3 = {source: 'sine', volume: volume, pitch: 'B4', env: {attack: 0.5, decay: 0.5, sustain: 0.1, hold: 0.5, release: 0.5}, tremolo: {shape: 'sine', magnitude: 0.3, speed: 4, attack: 0.3}}
var sound4 = {source: 'sine', volume: volume, pitch: 'D4', env: {attack: 0.5, decay: 0.5, sustain: 0.2, hold: 0.5, release: 0.5}, vibrato: {shape: 'sine', magnitude: 1, speed: 2, attack: 0.3}}
sounds = [sound1, sound2, sound3, sound4];

var playing = true;
var clock = 60;
var sound = []; var time = 0;
var inter;
window.onload=function() {
	$('.colorBox').width($(document).width()/4-1).height($(document).height()*0.7);
	var myHeight = $('.centerTxt').height();
	$('.centerTxt').css({'padding-top': (($(document).height()*0.7-myHeight)/2)+'px'});
	$('#exportTable').css({'top': $(document).height()*0.7}).width($(document).width()/3).height($(document).height()*0.3);
	$('#startBtn, #stopBtn, #timer').width($(document).width()/9-1.1);
	$('#extractor').width($(document).width()/3-5).height($('#exportTable').height()-$('#startBtn').height()-17);
}
function playSound(which, speed) {
if(playing) {
	newSound =  new Wad(sounds[which]);
	sound.push([time, which]);
	newSound.play();
	reloadExtract();
}
}
function restart() {
	playing = true;
	inter = setInterval(function() {addTimer();}, clock);
	time = 0; sound = []; reloadExtract();
}
function onstop() {
	playing = false;
	clearInterval(inter);
}
function reloadExtract() {
	$('#extractor').val(parseSound());
}
function parseSound() {
	var txt = '';
	for (var i = 0; i < sound.length; i++) {
		txt += sound[i][0]+','+sound[i][1];
		if(i < sound.length-1) {txt += '\n';}
	};
	return txt;
}
function addTimer() {time += clock; $('#timer').html('Time: '+Math.floor(time/10)/100);}
// function soundOff() {sound.stop();}