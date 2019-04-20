'use strict';

function handleTableClick(event) {

   if (!event.target.classList.contains('prop__name')) {
	   return false;
	}
	console.log(event.target)
    event.target.dataset.dir == 1 ?
  	event.target.dataset.dir = -1 :
  	event.target.dataset.dir = 1;
sortTable(event.target.dataset.propName, event.target.dataset.dir);
}

/* 1 вариант
function handleTableClick(event) {
   if (event.target.classList.contains('prop__name')) {
  if (count % 2 === 0) { 
  	event.target.dataset.dir = 1;
  } else {
  	event.target.dataset.dir = -1;
  }
count++;
sortTable(event.target.dataset.propName, event.target.dataset.dir);
  }
}*/
