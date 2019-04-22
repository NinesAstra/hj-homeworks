// необходимые блоки и кнопки
const sizeSwatch = document.getElementById('sizeSwatch'),
      colorSwatch = document.getElementById('colorSwatch'),
      cart = document.getElementById('quick-cart'),
      addToCartForm = document.getElementById('AddToCartForm'),
      addToCartBtn = document.getElementById('AddToCart');

// цвета
fetch('https://neto-api.herokuapp.com/cart/colors')
  .then(function(response) {
      return response.json();
  })
  .then(colors => {
    for (const color of colors) {
      const availability = (color.isAvailable) ? 'available': 'soldout';
      const disabled = (!color.isAvailable) ? 'disabled' : '';
      const colorChecked = (localStorage.colorChecked === color.code) ? 'checked' : ''; 
      colorSwatch.innerHTML += `<div data-value="${color.type}" class="swatch-element color ${color.type} ${availability}">
                                  <div class="tooltip">${color.title}</div>
                                  <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${colorChecked} ${disabled}>  
                                  <label for="swatch-1-${color.type}" style="border-color: ${color.code};">
                                  <span style="background-color: ${color.code};"></span>
                                  <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                                  </label>
                                </div>` 
    }
    const inputs = colorSwatch.querySelectorAll('input');
    for (const input of inputs) {
       input.addEventListener('click', setCheckedColorStorage); 
    }
    // запоминаем цвет на стороне клиента
    function setCheckedColorStorage(event) {      
      localStorage.colorChecked = event.target.value;      
    }    
  });

// размеры
fetch('https://neto-api.herokuapp.com/cart/sizes')
  .then(function(response) {
      return response.json();
  })
  .then(sizes => {
    for (const size of sizes) {
      const availability = (size.isAvailable) ? 'available': 'soldout';
      const disabled = (!size.isAvailable) ? 'disabled' : '';
      const sizeChecked = (localStorage.sizeChecked === size.type) ? 'checked' : ''; 
      sizeSwatch.innerHTML += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${availability}">
                                  <input id="swatch-0-${size.type}"type="radio" name="size" value="${size.type}" ${disabled} ${sizeChecked}>
                                  <label for="swatch-0-${size.type}">${size.title}
                                    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                                  </label>
                                </div>` 
    }
    const inputs = sizeSwatch.querySelectorAll('input');
    for (const input of inputs) {
       input.addEventListener('click', setCheckedSizeStorage); 
    }
    // запоминаем размер на стороне клиента
    function setCheckedSizeStorage(event) {      
      localStorage.sizeChecked = event.target.value;      
    }    
  });

// функция обновления корзины на странице
function updateCart(products) {
  cart.innerHTML = '';
  let totalPrise = 0;
  for (const product of products) { 
     cart.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${product.id}" style="opacity: 1;">
                          <div class="quick-cart-product-wrap">
                            <img src="${product.pic}" title="${product.title}">
                            <span class="s1" style="background-color: #000; opacity: .5">${product.price}</span>
                            <span class="s2"></span>
                          </div>
                          <span class="count hide fadeUp" id="quick-cart-product-count-${product.id}">${product.quantity}</span>
                          <span class="quick-cart-product-remove remove" data-id="${product.id}"></span>
                        </div>`; 
      totalPrise += product.price*product.quantity;      
    }  
    
    cart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
                          <span><strong class="quick-cart-text">Оформить заказ<br></strong>
                            <span id="quick-cart-price">${totalPrise}</span>
                          </span>
                       </a>`; 
    const quickCartPay = cart.querySelector('#quick-cart-pay');
    products.length ? quickCartPay.classList.add('open') : quickCartPay.classList.remove('open');
    
    const btnsRemove = cart.getElementsByClassName('remove');
    for (const btnRemove of btnsRemove) {      
      btnRemove.addEventListener('click', removeFromCart);  
    }   
}

// корзина
fetch('https://neto-api.herokuapp.com/cart')
  .then(function(response) {
      return response.json();
  })
  .then(products => {
    updateCart(products);  
  });

// функция отправки товара в корзину
function sendAddToCartForm(event) {
  event.preventDefault();
  // получаем данные формы
  const formData = new FormData(addToCartForm);

  // добавляем к ней id товара
  formData.append("productId", addToCartForm.dataset.productId);
  
  const sendOptions = {
    method: 'POST',
    body: formData
  }  
  
  fetch('https://neto-api.herokuapp.com/cart', sendOptions)
  .then(function(response) {
      return response.json();
  })
  .then(products => {
    updateCart(products);    
  })
  .catch(function(error) {
    console.log('Что-то пошло не так');
  });  
}

addToCartBtn.addEventListener('click', sendAddToCartForm);

// удаление из корзины
function removeFromCart() {
  // добавляем для отправки id товара
  const formData = new FormData();  
  formData.append("productId", this.dataset.id);
  
  const sendOptions = {
    method: 'POST',
    body: formData
  }  
  
  fetch('https://neto-api.herokuapp.com/cart/remove', sendOptions)
  .then(function(response) {
      return response.json();
  })
  .then(products => {
    if (products.hasOwnProperty('error')) {
      alert('Произошла ошибка: ' + products.message);    
    }
    updateCart(products);    
  })
  .catch(function(error) {
    alert('Что-то пошло не так');
  });       
}