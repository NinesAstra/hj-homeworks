'use strict';
const counter = document.querySelector('.counter'),
errors = document.querySelector('.errors');

function innerInfo(info) {
	console.log(info);
	counter.textContent = info.connections;
	errors.value = info.errors;
}

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
	connection.addEventListener('open', event => {
});

connection.addEventListener('message', event => {
	const info = JSON.parse(event.data);
	innerInfo(info);
});

connection.addEventListener('error', error => {
	console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('beforeunload', () => {
	connection.close(1000, 'Работа закончена');
});


