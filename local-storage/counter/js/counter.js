'use strict';

const wrapBtns = document.querySelector('.wrap-btns');

var localValue = localStorage.getItem('myKey');
let count = localValue;


counter.textContent = count;

wrapBtns.addEventListener('click', changeStage);
console.log(wrapBtns);
function changeStage(event) {
	console.log(event.target);
	if (event.target.id === 'increment') {
		count ++;
		console.log(count);
	 } else if (event.target.id === 'decrement') {
	 	count --;
	 } else if (event.target.id === 'reset') {
	 	count = 0;
	 }
counter.textContent = count;
localStorage.setItem('myKey', `${count}`);
}
