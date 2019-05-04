'use strict';
// сам холст, его размеры и необходимые массивы
const canvas = document.getElementById('wall'),
      ctx = canvas.getContext('2d'),
      crosses = [],
      circles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// вспомогательная функция получения случайного целого числа
function getRandomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);    
    rand = Math.round(rand);    
    return rand;
}
// вспомогательная функция получения случайного числа
function getRandomFloat(min, max) {    
    const rand =  Math.random() * (max - min) + min;    
    return rand;
}
// вспомогательная функция получения случайной функции
function getRandomTimeFunction(arr) {    
    const rand = Math.floor(Math.random() * arr.length);   
    return arr[rand];
}
// массив случайных заданных функций
const timeFunctions = [
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  },
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }    
];
// функция конструктор для окружностей
function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.size = getRandomFloat(0.1, 0.6);
  this.timeFunction = getRandomTimeFunction(timeFunctions);  
}
// функция конструктор для крестиков
function Сross(x, y) {
  this.x = x;
  this.y = y;
  this.size = getRandomFloat(0.1, 0.6);
  this.timeFunction = getRandomTimeFunction(timeFunctions); 
  this.angle = getRandomInteger(0, 360) * Math.PI / 180;
  this.speed = getRandomFloat(-0.2, 0.2);
}
// общее число объектов должно быть от 50 до 200, при этом между крестиками и кружочками это число делится пополам
const countObjectsOneType = getRandomInteger(25, 100);
// через цикл пушим нужное количество объектов в массивы
for (let i = 0; i < countObjectsOneType; i++) {  
  const arcX = getRandomInteger(0, window.innerWidth);
  const arcY = getRandomInteger(0, window.innerHeight);
  // создаем кружочки и пушим их в массив
  const circle = new Circle(arcX, arcY);
  circles.push(circle);
  
  const crossX = getRandomInteger(0, window.innerWidth);
  const crossY = getRandomInteger(0, window.innerHeight);
  // создаем крестики и пушим их в массив
  const cross = new Сross(crossX, crossY);
  crosses.push(cross);
}

const start = Date.now(); // сохраняем время начала

const timer = setInterval(function() {
  // вычисляем сколько времени прошло с начала анимации
  const timePassed = Date.now() - start;  
  // рисуем состояние анимации, соответствующее времени timePassed
  draw(timePassed);
}, 50);

function draw(timePassed) {
  // очищаем холст
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < countObjectsOneType; i++) {
    // текущие координаты, заданные функцией времени
    const coordСircle = circles[i].timeFunction(circles[i].x, circles[i].y, timePassed);     
    // рисуем кружочки
    ctx.beginPath();
    ctx.arc(coordСircle.x, coordСircle.y, 12*circles[i].size, 0, Math.PI*2, false);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5 * circles[i].size;
    ctx.stroke();
    ctx.closePath();     
    // рисуем крестики 
    // текущие координаты, заданные функцией времени
    const coordСross = crosses[i].timeFunction(crosses[i].x, crosses[i].y, timePassed);
    ctx.beginPath();
    // перемещаем холст в текущие координаты и поворачиваем на заданный угол
    ctx.translate(coordСross.x, coordСross.y);
    ctx.rotate(crosses[i].angle);
    // рисуем крестик
    ctx.moveTo(0 - 10 * crosses[i].size, 0);
    ctx.lineTo(0 + 10 * crosses[i].size, 0); 
    ctx.moveTo(0, 0 - 10 * crosses[i].size);
    ctx.lineTo(0, 0 + 10 * crosses[i].size); 
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5 * crosses[i].size;
    ctx.stroke();
    // поворачиваем и возвращаем все обратно
    ctx.rotate(-crosses[i].angle);
    ctx.translate(-coordСross.x, -coordСross.y);
    // изменяем угол поворота в массиве
    crosses[i].angle += crosses[i].speed;
    ctx.closePath();  
  }
}

