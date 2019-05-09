'use strict';

// Получение сообщений, COMET

 function selectNumberPoolLong(n){
	const longPoolingDivCollection = document.querySelectorAll('.long-pooling div');
	for (let item of longPoolingDivCollection) {
		item.classList.remove('flip-it');
		if(item.innerText == n) {
			item.classList.add('flip-it');
		}
	}
}

function subscribeLong() {
	var xhrLongPool = new XMLHttpRequest();
	xhrLongPool.onreadystatechange = function() {
		// если текущее состояние объекта xhrLongPool не "Операция полностью завершена", то ретёрним
	    if (this.readyState != 4) return;

		if (400 > this.status && this.status >= 200) {
		    selectNumberPoolLong(parseInt(this.responseText));
		    subscribeLong();
		    return;
		}

		if (this.status >= 400) {
		  	// если ошибки клиента, либо сервера
		  	console.log(`Соединение через long-pooling свалилось с ошибкой ${xhr.status} : ${xhr.statusText}`);
		}

		  setTimeout(subscribeLong, 500); // попробовать ещё раз через 0.5 сек
	}
	xhrLongPool.open("GET", 'https://neto-api.herokuapp.com/comet/long-pooling', true);
	xhrLongPool.send();
}

subscribeLong();
