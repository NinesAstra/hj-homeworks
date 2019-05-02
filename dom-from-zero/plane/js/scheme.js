'use strict';
// переменные
const btnSeatMap = document.getElementById('btnSeatMap'),
      acSelect = document.getElementById('acSelect'),
      seatMapTitle = document.getElementById('seatMapTitle'),
      seatMapDiv = document.getElementById('seatMapDiv'),
      btnSetFull = document.getElementById('btnSetFull'),
      btnSetEmpty = document.getElementById('btnSetEmpty'),
      totalPax = document.getElementById('totalPax'),
      totalAdult = document.getElementById('totalAdult'),
      totalHalf = document.getElementById('totalHalf');

// деактивируем кнопки заполнить и очистить
btnSetFull.disabled = btnSetEmpty.disabled = true;

// очистка блока со схемой для вставки новой схемы
function cleaningSeatMapDiv(seatMapDiv) {
  while(seatMapDiv.firstChild) {
    seatMapDiv.firstChild.remove();      
  }  
}

// запрос данных схемы на основе определенного id
function showMap(event) {
  event.preventDefault();
  getDataAircraft(acSelect.value);  
}

// получение данных с сервера
function getDataAircraft(id) {
  fetch(`https://neto-api.herokuapp.com/plane/${id}`)
  .then((response) => {
    return response.json();
  })
  .then(aircraft => {
  // очищаем блок перед отрисовкой
  cleaningSeatMapDiv(seatMapDiv);
  // отрисовываем схему
  showMapScreen(aircraft);
  // активируем кнопки и обнуляем счетчики
  btnSetFull.disabled = btnSetEmpty.disabled = false;
  totalAdult.innerText = 0;  
  totalHalf.innerText = 0;
  totalPax.innerText = 0; 
  });  
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

// создание ряда с 6 местами
function createRowOfSix(number, index, letters6) {
  return el('div', {class: 'row seating-row text-center'}, [
          el('div', {class: 'col-xs-1 row-number'}, [
            el('h2', {class: ''}, index + 1 + '')
          ]),
          el('div', {class: 'col-xs-5'}, [
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters6[0])
            ]),
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters6[1])
            ]),
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters6[2])
            ]),
          ]),
          el('div', {class: 'col-xs-5'}, [
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters6[3])
            ]),
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters6[4])
            ]),
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters6[5])
            ]),
          ])
        ]);
}

// создание ряда с 4 местами
function createRowOfFour(number, index, letters4) {
  return el('div', {class: 'row seating-row text-center'}, [
          el('div', {class: 'col-xs-1 row-number'}, [
            el('h2', {class: ''}, index + 1 + '')
          ]),
          el('div', {class: 'col-xs-5'}, [
            el('div', {class: 'col-xs-4 no-seat'}, ''),
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters4[0])
            ]),
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters4[1])
            ]),
          ]),
          el('div', {class: 'col-xs-5'}, [
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters4[2])
            ]),
            el('div', {class: 'col-xs-4 seat'}, [
              el('span', {class: 'seat-label'}, letters4[3])
            ]),
            el('div', {class: 'col-xs-4 no-seat'}, ''),
          ])
        ]);
}

// создание ряда без мест
function createRowOfZero(number, index) {
  return el('div', {class: 'row seating-row text-center'}, [
          el('div', {class: 'col-xs-1 row-number'}, [
            el('h2', {class: ''}, index + 1 + '')
          ]),
          el('div', {class: 'col-xs-5'}, [
            el('div', {class: 'col-xs-4 no-seat'}, ''),
            el('div', {class: 'col-xs-4 no-seat'}, ''),
            el('div', {class: 'col-xs-4 no-seat'}, '')
          ]),
          el('div', {class: 'col-xs-5'}, [
            el('div', {class: 'col-xs-4 no-seat'}, ''),
            el('div', {class: 'col-xs-4 no-seat'}, ''),
            el('div', {class: 'col-xs-4 no-seat'}, '')
          ])
        ]);
}

// создание ряда мест
function createRow(countSeats, index, letters6, letters4) {
  if (countSeats === 6) {
    return createRowOfSix(countSeats, index, letters6);    
  } else if (countSeats === 4) {
    return createRowOfFour(countSeats, index, letters4);           
  } else {
    return createRowOfZero(countSeats, index);
  }  
}

// формирование всей схемы
function showMapScreen(aircraft) { 
  // отображаем данные в заголовке
  seatMapTitle.textContent = aircraft.title + ` (${aircraft.passengers} пассажиров)`;
  // узлы схемы
  const mapNodes = aircraft.scheme.map((countSeats, index) => {return createRow(countSeats, index, aircraft.letters6, aircraft.letters4)});
  // весь фрагмент схемы
  const fragment = mapNodes.reduce((fragment, currentValue) => {    
      fragment.appendChild(currentValue);
      return fragment;
  }, document.createDocumentFragment());

  seatMapDiv.appendChild(fragment);
}
// навешиваем соответствующий обработчик
btnSeatMap.addEventListener('click', showMap);

// бронирование мест по клику
function seatReservation(event) {
  if (event.target.classList.contains('seat')) {
    if (event.target.classList.contains('adult') || event.target.classList.contains('half')) {
      event.target.classList.remove('adult');
      event.target.classList.remove('half');
    } else {
      if (event.altKey) {
        event.target.classList.add('half');    
      } else {
        event.target.classList.add('adult');  
      }
    }        
  } else if (event.target.parentNode.classList.contains('seat')) {
    if (event.target.parentNode.classList.contains('adult') || event.target.parentNode.classList.contains('half')) {
      event.target.parentNode.classList.remove('adult');
      event.target.parentNode.classList.remove('half');
    } else {
      if (event.altKey) {
        event.target.parentNode.classList.add('half');    
      } else {
        event.target.parentNode.classList.add('adult');  
      }
    }      
  }
}

// подсчет занятых мест
function countSeats() {
  totalAdult.innerText = seatMapDiv.querySelectorAll('div.seat.adult').length;  
  totalHalf.innerText = seatMapDiv.querySelectorAll('div.seat.half').length;
  totalPax.innerText = seatMapDiv.querySelectorAll('div.seat.adult').length + seatMapDiv.querySelectorAll('div.seat.half').length; 
}

// навешиваем соответствующие обработчики
seatMapDiv.addEventListener('click', seatReservation);
seatMapDiv.addEventListener('click', countSeats);

// фукция заполнения всех мест
function setFull(event) {
  event.preventDefault();
  const seats = seatMapDiv.querySelectorAll('div.seat'); 
  for (let seat of seats) {
    seat.classList.remove('half'); 
    seat.classList.add('adult'); 
  }
  countSeats();
}

// очистка всех мест
function setEmpty(event) {
  event.preventDefault();
  const occupiedSeats = seatMapDiv.querySelectorAll('div.seat.adult,  div.seat.half'); 
  for (let seat of occupiedSeats) {
    seat.classList.remove('half'); 
    seat.classList.remove('adult'); 
  }
  countSeats();
}

// навешиваем соответствующие обработчики
btnSetFull.addEventListener('click', setFull);
btnSetEmpty.addEventListener('click', setEmpty);