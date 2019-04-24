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


	
const connect = new WebSocket('wss://neto-api.herokuapp.com/chat');
connect.addEventListener('open', chatOpen);
console.log (connect.readyState);
function chatOpen() {
	messagesContent.appendChild(messageStatus1);
	messages.style.overflow = 'auto';
	if (connect.readyState == 1) {
		chatStatus.textContent = chatStatus.dataset.online;
		messageStatus1.innerHTML = '<span class="message-text">Пользователь появился в сети</span>';
		messageSubmit.removeAttribute("disabled");
	} else {
		chatStatus.textContent = chatStatus.dataset.offline;
		messageStatus1.innerHTML = '<span class="message-text">Пользователь не в сети</span>';
		messageSubmit.setAttribute("disabled", "true");
	}
	console.log(connect.readyState);
}

connect.addEventListener('message', event => {
    getMessage(event.data);
  });

function getMessage(data) {
	const messageLoading = message[0].cloneNode(true);
	if (data == '...') {
		console.log(data);
		messagesContent.appendChild(messageLoading);

	} else {
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
	console.log(`Произошла ошибка: ${error.data}`);
	messageStatus1.innerHTML = `<span class="message-text">Произошла ошибка: ${error.data}</span>`;
	messagesContent.appendChild(messageStatus1);
});

connect.addEventListener('close', event => {
	chatStatus.textContent = chatStatus.dataset.offline;
	messageStatus1.innerHTML = '<span class="message-text">Пользователь не в сети</span>';
	messageSubmit.setAttribute("disabled", "true");
	console.log('Вебсокет-соединение закрыто');
});

window.addEventListener('beforeunload', (event) => {
 	connect.close(1000, 'Работа закончена')
});
