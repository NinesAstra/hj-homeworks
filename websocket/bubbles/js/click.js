'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('open', showBubbles(connection));
document.addEventListener('click', event => {
	const click = {
	x: event.pageX,
	y: event.pageY
	}
	console.log(click)
	connection.send(JSON.stringify(click));
})

