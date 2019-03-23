const prev = document.getElementById('prevPhoto'), 
next = document.getElementById('nextPhoto'),
img = document.getElementById('currentPhoto'),
arraySrc = ['i/breuer-building.jpg',
			'i/guggenheim-museum.jpg',
			'i/headquarters.jpg',
			'i/IAC.jpg',
			'i/new-museum.jpg'];

let step = -1;
function nextStep () {
	if (step < arraySrc.length - 1){
		step += 1;
	} else {
		step = 0;
	}
	img.src = arraySrc[step];
	return step;
}

function prevStep() {
	if (step <= 0) {
		step = arraySrc.length - 1;
	} else {
		step -= 1;
	}
	img.src = arraySrc[step];
	return step;
}

next.onclick = nextStep;
prev.onclick = prevStep;

