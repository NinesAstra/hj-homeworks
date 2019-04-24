'use strict';
const chat = document.querySelector('.chat');

const chatStatus = chat.querySelector('.chat-status');
const messages = chat.querySelector('.messages');
const messagesTemplates = chat.querySelector('.messages-templates');
const messagesContent = chat.querySelector('.messages-content');
const messageStatus = chat.querySelector('.message-status');
const message = chat.querySelectorAll('.message');
const messagePersonal = chat.querySelector('.message-personal');
const messageInput = chat.querySelector('.message-input');
const messageSubmit = chat.querySelector('.message-submit');
const messageStatus1 = messageStatus.cloneNode(true);


//открываю соединение	
const connect = new WebSocket('wss://neto-api.herokuapp.com/chat');
connect.addEventListener('open', chatOpen);
console.log (connect.readyState);
function chatOpen() {
	messages.style.overflow = 'auto';
	if (connect.readyState == 1) {
		//если соединение открыто меняем статусы и активируем кнопку
		chatStatus.textContent = chatStatus.dataset.online;
		messageStatus1.innerHTML = '<span class="message-text">Пользователь появился в сети</span>';
		messageSubmit.removeAttribute("disabled");
	} else {
		chatStatus.textContent = chatStatus.dataset.offline;
		messageStatus1.innerHTML = '<span class="message-text">Пользователь не в сети</span>';
		messageSubmit.setAttribute("disabled", "true");
	}
	//добавляем статус в .messages-content
	messagesContent.appendChild(messageStatus1);
	console.log(connect.readyState);
}

connect.addEventListener('message', event => {
    getMessage(event.data);
  });

function getMessage(data) {
	if (data == '...') {
		//если пришедшее сообщение равно ..., добавляем .messages-content соответствующий шаблон сообщения
		console.log(data);
		const messageLoading = message[0].cloneNode(true);
		messagesContent.appendChild(messageLoading);
	} else {
		//Когда приходит сообщение не ..., клонируем соответствующий шаблон.Добавляем в него пришедшую инфу и добавляем время. 
		//Если есть сообщение с шаблона ..., удаляем его. Далее добавляем в .messages-content
	  	const message1 = message[1].cloneNode(true);
	  	const messageText = message1.querySelector('.message-text');
	  	const timestamp = message1.querySelector('.timestamp');
	  	const now = new Date();

	  	messageText.textContent = data;
	  	timestamp.textContent = `${now.getHours()} : ${now.getMinutes()}`;
	  	if (messagesContent.querySelector('.loading')) {
	  		messagesContent.removeChild(messagesContent.querySelector('.loading'));
	  	};
	  	messagesContent.appendChild(message1);
  	}
  }  

  messageSubmit.addEventListener('click', sendMessege);

  function sendMessege() {
  	//при клике на кнопку проверяем не пустое ли сообщение
  	//делаем клон шаблона сообщения, отправляемого нами
  	//добавляем в клон инфо из input и время
  	//добавляем клон в .messages-content и очищаем содержимое input
  	event.preventDefault();
  	if (messageInput.value.leght == 0) {
  		return false;
  	}
  	connect.send(messageInput.value);
  	const messagePersonal1 = messagePersonal.cloneNode(true);
  	const messageText = messagePersonal1.querySelector('.message-text');
  	const timestamp = messagePersonal1.querySelector('.timestamp');
  	const now = new Date();
  	messageText.textContent = messageInput.value;
  	timestamp.textContent = `${now.getHours()} : ${now.getMinutes()}`;
  	messagesContent.appendChild(messagePersonal1);
  	messageInput.value = '';
  }

connect.addEventListener('error', error => {
	//подписываемся на ошибки и при наличии выводим их в .message-status
	console.log(`Произошла ошибка: ${error.data}`);
	messageStatus1.innerHTML = `<span class="message-text">Произошла ошибка: ${error.data}</span>`;
	messagesContent.appendChild(messageStatus1);
});

connect.addEventListener('close', event => {
	//при закрытии соединения меняем статусы и деактивируем кнопку
	chatStatus.textContent = chatStatus.dataset.offline;
	messageStatus1.innerHTML = '<span class="message-text">Пользователь не в сети</span>';
	messageSubmit.setAttribute("disabled", "true");
	console.log('Вебсокет-соединение закрыто');
});

window.addEventListener('beforeunload', (event) => {
	//закрываем соединение при закрытии страницы
 	connect.close(1000, 'Работа закончена')
});


// проверка работоспособности закрытия соединения
// setTimeout(() => {
//   connect.close();  
// }, 5000);