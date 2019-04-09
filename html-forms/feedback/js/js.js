'use strict'

const contentform = document.querySelector('.contentform');
const outputForm = document.querySelector('#output');
const outputCollection = outputForm.querySelectorAll('output');
const buttonsContact = document.querySelectorAll('.button-contact');
buttonsContact[0].value = 'send-button';
const btnSend = buttonsContact[0];
buttonsContact[1].value = 'change-button';
const btnChange = buttonsContact[1];
const inputCollection = document.querySelectorAll('input, textarea');

for(let input of inputCollection) {
	input.addEventListener('change', formСheck)
}

contentform.addEventListener('change', formСheck)
function formСheck(event) {
	if(inputCollection[0].value !== '' && 
		inputCollection[1].value !== '' &&
		inputCollection[2].value !== '' &&
		inputCollection[3].value !== '' &&
		inputCollection[4].value !== '' &&
		inputCollection[5].value !== '' &&
		inputCollection[6].value !== '' &&
		inputCollection[7].value !== '' &&
		inputCollection[8].value !== '' &&
		inputCollection[9].value !== '' &&
		inputCollection[10].value !== '') {
		btnSend.removeAttribute('disabled');
	};
	if(inputCollection[0].value == '' || 
		inputCollection[1].value == '' ||
		inputCollection[2].value == '' ||
		inputCollection[3].value == '' ||
		inputCollection[4].value == '' ||
		inputCollection[5].value == '' ||
		inputCollection[6].value == '' ||
		inputCollection[7].value == '' ||
		inputCollection[8].value == '' ||
		inputCollection[9].value == '' ||
		inputCollection[10].value == '') {
		btnSend.setAttribute('disabled', true);
	};
}


document.getElementsByName('zip')[0].addEventListener('keypress', inputNumder);
function inputNumder(event) {
	if (event.charCode && (event.charCode < 48 || event.charCode > 57)){// проверка на event.charCode - чтобы пользователь мог нажать backspace, enter, стрелочку назад...
	  alert('введите цифры');
	  event.preventDefault();
	}
};

btnSend.addEventListener('click', showMessege);
function showMessege() {
	event.preventDefault();
	contentform.classList.add('hidden');
	outputForm.classList.remove('hidden');
	valueSubstitution();
}

function valueSubstitution() {

	for(let output of outputCollection){
		const field = document.getElementsByName(output.id)[0];
		console.log(field);
		output.value = field.value
	}
}


btnChange.addEventListener('click', showForm);
function showForm() {
	contentform.classList.remove('hidden');
	outputForm.classList.add('hidden');
}