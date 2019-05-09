'use strict';
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', selectNumber);

ws.addEventListener('close', event => {  
  console.log('Соединение через вебсокет закрыто');   
});

ws.addEventListener('error', event => {  
  console.log(`Соединение через websocket свалилось с ошибкой ${error}`);   
});

function selectNumber(event){
	const n = event.data,
	websocketDivCollection = document.querySelectorAll('.websocket div');
	for (let item of websocketDivCollection){
		item.classList.remove('flip-it');
		if(item.innerText == n) {
			item.classList.add('flip-it');
		}
	}
}
