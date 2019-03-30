const middleArr = ['sounds/middle/first.mp3', 'sounds/middle/second.mp3', 'sounds/middle/third.mp3', 'sounds/middle/fourth.mp3', 'sounds/middle/fifth.mp3'];
const higherArr = ['sounds/higher/first.mp3', 'sounds/higher/second.mp3', 'sounds/higher/third.mp3', 'sounds/higher/fourth.mp3', 'sounds/higher/fifth.mp3'];
const lowerArr = ['sounds/lower/first.mp3', 'sounds/lower/second.mp3', 'sounds/lower/third.mp3', 'sounds/lower/fourth.mp3', 'sounds/lower/fifth.mp3'];
const keysCollection = document.getElementsByTagName('audio');
const liCollection = document.getElementsByTagName('li');
const changeRegister = document.getElementsByTagName('ul')[0]; 


for (let i = 0; i < keysCollection.length; i++) {
   keysCollection[i].src = middleArr[i]; 
}

function makeSound(event) {
	console.log(event);
    event.currentTarget.getElementsByTagName('audio')[0].play();
    //event.currentTarget.getElementsByTagName('audio')[0].currentTime = 0; 
}

function ifKeydown(event) {

	if (event.altKey && event.repeat) {
    	console.log('нажата Alt')
        changeRegister.classList.remove('middle', 'lower');
        changeRegister.classList.add('higher');
        for (let i = 0; i < keysCollection.length; i++) {
    	keysCollection[i].src = higherArr[i];
    	console.log(keysCollection[i].src);
    } 
    
    } else if (event.shiftKey && event.repeat) {
        changeRegister.classList.remove('middle', 'higher');
        changeRegister.classList.add('lower');
        for (let i = 0; i < keysCollection.length; i++) {
        	keysCollection[i].src = lowerArr[i];
        	console.log(keysCollection[i].src);
        }
    }
}

function def() {
	changeRegister.classList.remove('lower', 'higher');
	changeRegister.classList.add('middle');
	for (let i = 0; i < keysCollection.length; i++) {
   		keysCollection[i].src = middleArr[i];
   		console.log(keysCollection[i].src); 
	}
}

document.addEventListener('keydown', ifKeydown);
// document.removeEventListener('keyup', ifKeydown);
document.addEventListener('keyup', def);
for (const key of liCollection) {
	key.addEventListener('click', makeSound);
}
