'use strict'
const nav = document.getElementsByTagName('nav')[0];

function toggleVisibleNav(event) {
	if (event.altKey == false && event.ctrlKey == false) {
		return;
	}
	if(event.code == 'KeyT' && event.altKey == true && event.ctrlKey == true) {
		nav.classList.toggle('visible');
	}
};

const secret = document.getElementsByClassName('secret')[0];
const password = [];
function secretCode(event) {
	password.push(event.key);
	const enterPassword = password.slice(-9).join('').toLowerCase();
		if (enterPassword === 'ytnjkjubz' || enterPassword === 'нетология') {
			secret.classList.add('visible');
		}
}

document.addEventListener('keydown', toggleVisibleNav);
document.addEventListener('keydown', secretCode);
