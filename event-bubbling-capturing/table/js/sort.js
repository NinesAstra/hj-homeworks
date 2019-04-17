'use strict';

let count = 0;

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
}
