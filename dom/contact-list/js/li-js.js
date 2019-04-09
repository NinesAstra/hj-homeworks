const listStr = loadContacts();
const lists = JSON.parse(listStr);
const ul = document.querySelector('.contacts-list');

const arrLi = [];
let li = 0;
for (const list of lists) {
	li = `<li data-email=" ${list.email} " data-phone=" ${list.phone} "><strong> "${list.name}" </strong></li>`;
	// li = '<li data-email="'+list.email+'" data-phone="'+list.phone+'"><strong>'+list.name+'</strong></li>';
	arrLi.push(li);
}

ul.innerHTML = arrLi.join('');