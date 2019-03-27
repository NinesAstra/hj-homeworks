'use strict'
const btnMenu = document.getElementsByClassName('wrapper-dropdown')[0],
dropdown = document.getElementsByClassName('dropdown')[0],
lis = dropdown.getElementsByTagName('li');

btnMenu.onclick = toggle;
 for (const li of lis) {
 	li.onclick = removeClass;
 }

function toggle () {
	console.log(this);
	btnMenu.classList.toggle('active');}
function removeClass () {
	console.log(lis);
	btnMenu.classList.remove();};
