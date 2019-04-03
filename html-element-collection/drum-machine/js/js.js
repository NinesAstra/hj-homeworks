'use strict'

const liCollection = document.getElementsByClassName('drum-kit__drum');
let prev = 0;
console.log(prev);
function music() {
	if(prev !== 0){prev.pause(); prev.currentTime = 0;}
	const next = this.getElementsByTagName('audio')[0];
	next.play();
	prev = next;
};

for (const li of liCollection) {
	li.onclick = music;
};