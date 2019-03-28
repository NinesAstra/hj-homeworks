'use srict'
const mediaplayer = document.getElementsByClassName('mediaplayer')[0],
player = mediaplayer.getElementsByTagName('audio')[0],
btnPlayPause = mediaplayer.getElementsByClassName('playstate')[0],
statePlay = btnPlayPause.getElementsByClassName('fa-play')[0],
statePause = btnPlayPause.getElementsByClassName('fa-pause')[0],
btnStop = mediaplayer.getElementsByClassName('stop')[0],
btnNext = mediaplayer.getElementsByClassName('next')[0],
btnBack = mediaplayer.getElementsByClassName('back')[0],
title = mediaplayer.getElementsByClassName('title')[0],
arrTitles = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'],
arrSrc = ['mp3/LA Chill Tour.mp3', 'mp3/LA Fusion Jam.mp3', 'mp3/This is it band.mp3'];

player.src = arrSrc[0];

function playPause() {
	mediaplayer.classList.toggle('play');
	if(mediaplayer.classList.contains('play')) {
		player.play();
	} else {
		player.pause();
	}
}
function stop() {
	player.pause();
	player.currentTime = 0;
	mediaplayer.classList.remove('play');
}
let i = 0;
function next() {
	i++;
	if (i < arrSrc.length){
		player.src = arrSrc[i];
		title.title = arrTitles[i];
		if(mediaplayer.classList.contains('play')) {
			player.play();
		}
	} else {
		i = 0;
		player.src = arrSrc[i];
		title.title = arrTitles[i];
		if(mediaplayer.classList.contains('play')) {
			player.play();
		}
	}
}
function back() {
	i--;
	if (i < 0) {
		i = arrSrc.length - 1;
		player.src = arrSrc[i];
		title.title = arrTitles[i];
		if(mediaplayer.classList.contains('play')) {
			player.play();
		}
	} else {
		player.src = arrSrc[i];
		title.title = arrTitles[i];
		if(mediaplayer.classList.contains('play')) {
			player.play();
		}
	}
}

btnPlayPause.onclick = playPause;
btnStop.onclick = stop;
btnNext.onclick = next;
btnBack.onclick = back;