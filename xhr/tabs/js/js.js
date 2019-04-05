const tabs = document.querySelectorAll('.tabs>nav>a');
const content = document.querySelector('#content');
const preloader = document.querySelector('#preloader');
const xhr = new XMLHttpRequest();


function getFirstView() {
	let href = tabs[0].href;
	xhr.open("GET", href);
	xhr.send();
}

function toggle(event) {
	event.preventDefault();
	for(let tab of tabs) {
		tab.classList.remove('active');
	}
	event.currentTarget.classList.add('active');
	preloader.classList.remove('hidden'); 
	href = event.currentTarget.href;
	xhr.open("GET", href);
	xhr.send();
}
xhr.addEventListener("load", onLoad);
function onLoad() {
	content.innerHTML = xhr.response;
	preloader.classList.add('hidden');
  }

for(let tab of tabs) {
tab.addEventListener('click', toggle);
}

document.addEventListener('DOMContentLoaded', getFirstView);