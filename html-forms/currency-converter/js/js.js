'use strict';
let arrOfCurrencies = [];
let options = '';
const preloader = document.querySelector('#loader');
const content = document.querySelector('#content');
const from = content.querySelector('#from');
const to = content.querySelector('#to');
const result = content.querySelector('#result');
const sum = content.querySelector('#source');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
xhr.send();


xhr.addEventListener("loadend", onLoadEnd);
xhr.addEventListener("load", onLoad);
preloader.classList.remove('hidden');

function onLoadEnd() {
	preloader.classList.add('hidden');
	content.classList.remove('hidden');
}
function onLoad() {
	arrOfCurrencies = JSON.parse(xhr.responseText);
	for (let item of arrOfCurrencies) {
		options = options + '<option name="'+item.title+'" value="'+item.value+'">'+item.code+'</option>';
	}
	from.innerHTML = options;
	to.innerHTML = options;
	calculation();
}

function calculation() {
	result.value = (parseInt(from.value) / parseInt(to.value) * sum.value).toFixed(2);
}

from.addEventListener('input', calculation);
to.addEventListener('input', calculation);
sum.addEventListener('input', calculation);
