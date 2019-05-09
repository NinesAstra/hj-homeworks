'use strict';
const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');
window.editor.addEventListener('update', getData);

function getData(event) {
	//console.log(event.canvas);
	const blob = event.canvas.toBlob((blob) => ws.send(blob));
}

