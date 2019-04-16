var xhr = new XMLHttpRequest();
xhr.open("GET", "https://neto-api.herokuapp.com/book/");
xhr.send();
xhr.addEventListener('load', load);
const content = document.querySelector('#content'),
li = content.querySelector('#content > li'),
img = content.querySelector('#content > li >img');
let lis = null;

// function load() {
// 	lis = JSON.parse(xhr.responseText);
// 	let bookInfo = '';
// 	for(let li of lis){
// 		bookInfo = bookInfo + `<li><img src="${li.cover.small}"></li>`;
// 	}
// 	content.innerHTML = bookInfo;
// 	return lis;
// }
 


// function outInfo(event) {
// 	if (xhr.status != 200) {
// 	  console.log('подождите немного')
// 	} else {
// 		  let target = null;
// 	    if (event.target.tagName === 'LI') {
// 	        target = event.target;
// 	    }
// 	    if (event.target.parentNode.tagName === 'LI') {
// 	        target = event.target.parentNode;
// 	    }

	    
// 	    if (target) {
// 	    	const i = lis.findIndex(findI);
// 	    	function findI(li) {
// 	    		return li.cover.small === target.childNodes[0].src;
// 	    	}
// 	      target.dataset.title = lis[i].title;
// 	      target.dataset.author = lis[i].author.name;
// 	      target.dataset.info = lis[i].info;
// 	      target.dataset.price = lis[i].price;
// 	    }
// 	}	
// }

// content.addEventListener('click', outInfo);


//------Вариант 2 Простой
// function load() {
// 	lis = JSON.parse(xhr.responseText);
// 	let string = '';
// 	for(let li of lis){
// 		string = string + '<li data-title="'+li.title+'" data-author="'+li.author.name+'" data-info="'+li.info+'" data-price="'+li.price+'"><img src="'+li.cover.small+'"></li>';
// 	}
// 	content.innerHTML = string;
// }

function load() {
	lis = JSON.parse(xhr.responseText);
	let bookInfo = '';
	for(let li of lis){
		bookInfo += `<li data-title="${li.title}" data-author="${li.author.name}" data-info="${li.info}" data-price="${li.price}"><img src="${li.cover.small}"></li>`;
	}
	content.innerHTML = bookInfo;
}