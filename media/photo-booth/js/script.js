'use strict';
const app = document.querySelector('.app'),
      controls = document.querySelector('.controls'),
      list = document.querySelector('.list'),
      buttonTakePhoto = document.getElementById('take-photo'),
      errorMessage = document.getElementById('error-message');
// создаем аудиотег и устанавливаем у него src, нужен будет для звука при нажатии на кнопку сделать фото
const photoSound = document.createElement('audio');
photoSound.src = 'https://raw.githubusercontent.com/netology-code/hj-homeworks/master/media/photo-booth/audio/click.mp3';
// создаем видеотег и вставляем его перед controls
const video = document.createElement('video');
app.insertBefore(video, controls);
// создаем холст и получаем его контекст
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// получаем доступ к видеокамере
navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then((stream) => { 
    // если все гуд - воспроизводим видео в видеотеге
    video.srcObject=stream;
    video.play();
    controls.style.display = 'flex';    
  })
  // если все плохо - выводим ошибку
  .catch(err => {
    console.warn(err);
    errorMessage.classList.add('visible');
    errorMessage.innerText = 'Нет доступа к видеокамере!';
  });

function takeFoto() {
  // проверяем размеры холста
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  // копируем текущий кадр видеотега в canvas
  ctx.drawImage(video, 0, 0);
  // обновляем src
  const src = canvas.toDataURL();  
  // создаем карточку фото  
  photoSound.pause();
  photoSound.currentTime = 0;
  photoSound.play(); 
  createPhotoCard(src, 'snapshot.png');  
}

// функция создания элемента
function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
  }
  if (typeof children === 'string') {
    element.innerText = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

// создание карточки фотографии
function createPhotoCard(src, download) {
  const photoCard =  el('figure', {class: ''}, [
            el('img', {src: src}, ''),
            el('figcaption', {class: ''}, [
              el('a', {href: src, download: download}, [
                el('i', {class: 'material-icons file_download'}, 'file_download') 
              ]),
              el('a', {class: ''}, [
                el('i', {class: 'material-icons file_upload'}, 'file_upload') 
              ]),
              el('a', {class: ''}, [
                el('i', {class: 'material-icons delete'}, 'delete') 
              ])
            ])
         ]);
  // добавляем фото 
  list.appendChild(photoCard);  
  // навешиваем обработчики на кнопки
  photoCardAddEventListener(photoCard, src);  
}
// обработчик на кнопку сделать фото
buttonTakePhoto.addEventListener('click', takeFoto);

// функция навешивания обработчиков на кнопки новой карточки фото
function photoCardAddEventListener(photoCard, url) {
  // удалить фото
  const btnDelete = photoCard.querySelector('a i.delete'); 
  btnDelete.addEventListener('click', () => {    
    photoCard.remove();
  });
  // скачать фото
  const btnDownload = photoCard.querySelector('a i.file_download');
  btnDownload.addEventListener('click', () => {
    btnDownload.remove();
  });
  // загрузить фото на сервер
  const btnUpload = photoCard.querySelector('a i.file_upload');
  
  btnUpload.addEventListener('click', (event) => { 
    event.preventDefault();
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const dataForServer = new FormData();
        dataForServer.append('image', blob); 
        // Загружаем данные на сервер
        fetch('https://neto-api.herokuapp.com/photo-booth', {method: 'POST', body: dataForServer})
          .then(res => {
            console.log(res);
            btnUpload.remove();          
          });
      });      
  });  
}
