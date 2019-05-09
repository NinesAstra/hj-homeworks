'use strict';

// Получение сообщений, COMET

function selectNumberPool(n){
	const poolingDivCollection = document.querySelectorAll('.pooling div');
	for (let item of poolingDivCollection){
		item.classList.remove('flip-it');
		if(item.innerText == n) {
			item.classList.add('flip-it');
		}
	}
}

function subscribe() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	  // если текущее состояние объекта xhr не "Операция полностью завершена", то ретёрним
	  if (this.readyState != 4) return;

	  if (400 > this.status && this.status >= 200) {
	  	//если ответ норм
	    selectNumberPool(parseInt(this.responseText));
	  }

	  if (this.status >= 400) {
	  	// если ошибки клиента, либо сервера
	  	console.log(`Соединение через pooling свалилось с ошибкой ${xhr.status} : ${xhr.statusText}`);
	  }
	}
	xhr.open("GET", 'https://neto-api.herokuapp.com/comet/pooling', true);
	xhr.send();
}

subscribe();
setInterval(subscribe, 5000); // попробовать ещё раз через 5 сек
