'use strict'
const listBlock = document.querySelector('.list-block'),
lies = document.querySelectorAll('.list-block li'),
checkboxes = document.querySelectorAll('.list-block input[type="checkbox"]'),
output = document.querySelector('.list-block output'),
checksAll = checkboxes.length;
let i = 0;


for (let checkbox of checkboxes){
	checkbox.addEventListener('input', change);
}
/* код срабатывания при загрузке */
document.addEventListener("DOMContentLoaded", count);
function count() {
	for(let checkbox of checkboxes){
		if (checkbox.checked === true){
			i++;
		}
	}
	output.value = i +' из '+ checksAll;
	done();
}

function change (event){
    console.log(event.currentTarget);

	 if (event.currentTarget.checked) {
		event.currentTarget.checked = false;
	 	i--;
	 } else {
		event.currentTarget.checked = true;
	 	i++;
	 }
   output.value = i +' из '+ checksAll;
   done(); 
}

function done() {
	if (i === checksAll) {
		listBlock.classList.add('complete');
	} else {
		listBlock.classList.remove('complete');
	}
}


/* -----------вариант 1 ----------

for (let li of lies){
	li.addEventListener('click', change);
}

document.addEventListener("DOMContentLoaded", count);
function count() {
	for(let checkbox of checkboxes){
		if (checkbox.checked === true){
			i++;
		}
	}
	output.value = i +' из '+ checksAll;
	done();
}

function change (event){

	let target = null;
    if (event.target.tagName === 'INPUT') {
    	event.stopPropagation();
        //target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
    	
        target = event.currentTarget.childNodes[1];
    }

   console.log(target);

	 if (target.checked === true) {
		target.checked = false;
	 	i--;
	 	console.log(i);
	 } else {
		target.checked = true;
	 	i++;
	 }
   output.value = i +' из '+ checksAll;
   done(); 
}

function done() {
	if (i === checksAll) {
		listBlock.classList.add('complete');
	} else {
		listBlock.classList.remove('complete');
	}
}*/

