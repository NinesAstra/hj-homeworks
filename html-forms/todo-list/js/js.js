'use strict'
const listBlock = document.querySelector('.list-block'),
lies = document.querySelectorAll('.list-block li'),
checkboxes = document.querySelectorAll('.list-block input[type="checkbox"]'),
output = document.querySelector('.list-block output'),
checksAll = checkboxes.length;
let i = 0;


for (let li of lies){
	li.addEventListener('click', change);
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

	let target = null;
    if (event.target.tagName === 'INPUT') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.currentTarget.childNodes[1];
    }

   console.log(target);

	 if (target.checked === true) {
	 	// console.log(target);
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
}
