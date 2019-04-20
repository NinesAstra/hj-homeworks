'use strict';

// регистрация
const formRegistration = document.querySelector('.sign-up-htm');
formRegistration.addEventListener('submit', send);

//вход
const form = document.querySelector('.sign-in-htm');
form.addEventListener('submit', send);



//отправка

function send(e) {
e.preventDefault();
const output = e.target.querySelector('.error-message');
var sendForm = new Promise(function(resolve, reject) {

  const targets = e.target;
  let user = {};
  for (let field of targets) {
    user[field.name] = field.value;
  }
  console.log(user);
  user = JSON.stringify(user);
  console.log(user);
	

  // let formData = new FormData(e.target);

 //    //Собираем данные формы в объект
 //    let obj = {};
 //    formData.forEach((value, key) => obj[key] = value);
 //    console.log(obj);
 //    const obj1 = JSON.stringify(obj);
	// console.log(obj1);
	

	// const targets = e.target;
	// const arrData = new Array;
	// for (let input of targets) {
	// 	if (input.name) {
	// 		arrData.push(`${input.name}: ${input.value}`);
	// 	}
	// }
	// console.log(arrData);
	// const testString = arrData.join(', ');


  	//const formData = JSON.stringify(testString);
  	//console.log(formData);

    // Открываем новый XHR
    var request = new XMLHttpRequest();
    request.open('POST','https://neto-api.herokuapp.com/signin');
    // После загрузки запроса
    // проверяем, был ли он успешным
    request.onload = function() {
      if (request.status === 200) {
        // Если успешный, то резолвим промис
        resolve(request.response);
      } else {
        // Если нет, то реджектим промис
        reject(Error(
          'Произошла ошибка. Код ошибки:' + request.statusText
        ));
      }
    };
    request.send(user);

});

    sendForm.then(function(result) {
      result = JSON.parse(result);
	  console.log("Ответ 200 ", result, result.error);
	  if (result.error) {
	  	console.log(output);
	  	output.value = result.message;
	  } else if (output.parentNode.classList.contains('sign-in-htm')){
	  	output.value = `Пользователь ${result.name} успешно авторизован`;
	  } else {
	  	output.value = `Пользователь ${result.name} успешно зарегистрирован`;
	  }
	});
	sendForm.catch(function(result) {
	  output.value = `Что-то пошло не так ${result}`;
	});
}


/* отправка в виде формы
function send(e) {
e.preventDefault();

var sendForm = new Promise(function(resolve, reject) {

  	function Form (form) {
  	const formData = new FormData(form);
  	};
    // Открываем новый XHR
    var request = new XMLHttpRequest();
    request.open('POST','https://neto-api.herokuapp.com/signin');
    // После загрузки запроса
    // проверяем, был ли он успешным
    request.onload = function() {
      if (request.status === 200) {
        // Если успешный, то резолвим промис
        resolve(request.response);
      } else {
        // Если нет, то реджектим промис
        reject(Error(
          'Произошла ошибка. Код ошибки:' + request.statusText
        ));
      }
    };
    request.send();

});

    sendForm.then(function(result) {
	  console.log("Hurray I got this phone as a gift ", result);
	});
	sendForm.catch(function(result) {
	  console.log("Mom coudn't buy me the phone because ", result);
	});
}
*/







