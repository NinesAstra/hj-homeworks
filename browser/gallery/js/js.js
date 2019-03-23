const prev = document.getElementById('prevPhoto'), 
next = document.getElementById('nextPhoto'),
img = document.getElementById('currentPhoto'),
arraySrc = ['i/breuer-building.jpg',
			'i/guggenheim-museum.jpg',
			'i/headquarters.jpg',
			'i/IAC.jpg',
			'i/new-museum.jpg'];

let step = 0;
function nextStep () {
	console.log('next');
}
function prevStep() {
	console.log('prev');
}
next.onclick = nextStep;
prev.onclick = prevStep;

