'use strict'
const view = document.getElementsByClassName('gallery-view')[0],
nav = document.getElementsByClassName('gallery-nav')[0],
previewCollection = nav.getElementsByTagName('a');

for(const a of previewCollection) {
	a.addEventListener('click', choice);
}

function choice(event) {
	event.preventDefault();
	for (const a of previewCollection) {
		a.classList.remove('gallery-current');
	}
	event.currentTarget.classList.add('gallery-current');
	view.src = event.currentTarget.href;
}