'use strict'

const sectionsCollection = document.querySelector('.todo-list');
const doneList = sectionsCollection.querySelector('.done');
const undoneList = sectionsCollection.querySelector('.undone');

const LabelsCollection = sectionsCollection.querySelectorAll('label');

for (let item of LabelsCollection) {
	const itemInput = item.querySelector('input');
	itemInput.addEventListener('click', moveToList);
}

function moveToList(event) {
	event.currentTarget.parentNode.parentNode.classList.contains('done') ?
		undoneList.appendChild(event.currentTarget.parentNode) :
		doneList.appendChild(event.currentTarget.parentNode);
}



/* вариант 1
for (let item of LabelsCollection) {
	const itemInput = item.querySelector('input');
	itemInput.addEventListener('click', moveToList);
}

function moveToList(event) {
	console.log(event.currentTarget.checked);
	event.currentTarget.checked ? undoneList.appendChild(event.currentTarget.parentNode) : doneList.appendChild(event.currentTarget.parentNode);
	event.currentTarget.checked ? event.currentTarget.removeAttribute('checked') : event.currentTarget.setAttribute('checked', true);
}*/


