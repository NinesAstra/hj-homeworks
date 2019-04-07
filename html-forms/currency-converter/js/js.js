'use strict';
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
xhr.send();
//console.log(xhr);
document.addEventListener('DOMContentLoaded', onLoad)

function onLoad(event) {
	const dataFromJsonArr = xhr.response;
	console.log(xhr.typeOf);
}