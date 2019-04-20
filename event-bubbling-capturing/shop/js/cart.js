'use strict';
const showMoreBtn = document.querySelector('.show-more');

function addToCartClick(event) {
	event.preventDefault();
	event.target.title = event.target.dataset.title;
	event.target.price = event.target.dataset.price;
	addToCart(event.target);
}

showMoreBtn.addEventListener('click', getNewList);

 function getNewList(itemsList) {
 	const addToCartBtnCollection = document.querySelectorAll('.add-to-cart');
 	for (let btn of addToCartBtnCollection) {
		btn.addEventListener('click', addToCartClick);
	}	
}

getNewList();