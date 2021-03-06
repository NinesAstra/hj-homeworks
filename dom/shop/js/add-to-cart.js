const btnsAdd = document.querySelectorAll('button.add'),
count = document.querySelector('span#cart-count'),
totalPrice = document.querySelector('span#cart-total-price');


for(let btnAdd of btnsAdd){
	btnAdd.addEventListener('click', addInformationToCart);
}


function addInformationToCart(event) {
	count.innerHTML = Number(count.innerHTML)+1;
	let valueTotalPrice = Number(totalPrice.innerHTML.replace(/\s/g, "")) + Number(event.currentTarget.dataset.price);
	totalPrice.innerHTML = getPriceFormatted(valueTotalPrice);
}
