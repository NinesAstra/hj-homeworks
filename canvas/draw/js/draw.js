'use strict';
const canvas = document.getElementById('draw'),
      ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// отслеживаем изменение размера окна
window.addEventListener('resize', updateAfterResizing);

// очищение и обновление холста после изменения размера
function updateAfterResizing() {  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  curves = [];
}

// массив для точек
let curves = [];
// переменная, отображающая рисование в данный момент
let drawing = false;
// фиксация нажатой клавиши shift
let shiftKey = false;
// нужно ли увеличивать толщину линии
let lineWidthInc = true;
// необходима ли перерисовка кривой
let needsRepaint = false;
// толщина линии и тон
let lineWidth = 5;
let hue = 0;

// конструктор для точки
function Point(x, y, lineWidth, hue) {
  this.x = x;
  this.y = y;
  this.lineWidth = lineWidth;
  this.hue = hue;
}

// создание окружности в начальной точке
function circle(point) {
  ctx.beginPath();
  ctx.arc(point.x, point.y,  point.lineWidth/2, 0, 2 * Math.PI);
  ctx.fillStyle = `hsl(${point.hue}, 100%, 50%)`;
  ctx.fill();
}
// изменение тона
function setHue(shiftKey) {
  shiftKey ? hue-- : hue++;
  if (hue > 359) {
    hue = 0;
  } else if (hue < 0) {
    hue = 359;
  }
}
// изменение толщины линии
function setLineWidth() {
  lineWidthInc ? lineWidth++ : lineWidth--;
    if (lineWidth >= 100) {
      lineWidthInc = false;    
    } else if (lineWidth <= 5) {
      lineWidthInc = true;
    }
}

// отрисовка кривой
function smoothCurve(points) {  
  for(let i = 0; i < points.length - 1; i++) {
    
    const poinFrom = points[i];
    const pointTo = points[i + 1];
    
    // рисуем линию к предыдущей точке
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = poinFrom.lineWidth;
    ctx.strokeStyle = `hsl(${poinFrom.hue}, 100%, 50%)`;
    ctx.lineTo(poinFrom.x, poinFrom.y);
    ctx.stroke();
    
    // рисуем линию к следующей точке от предыдущей   
    ctx.lineWidth = pointTo.lineWidth;
    ctx.lineTo(pointTo.x, pointTo.y);
    ctx.stroke();
    ctx.closePath();    
  }
}

canvas.addEventListener("mousedown", (event) => {  
  drawing = true;
  shiftKey = event.shiftKey; // определяем нужно увеличивать или уменьшать оттенок 
  const curve = []; // создаем новую кривую  
  curve.push(new Point(event.offsetX, event.offsetY, lineWidth, hue)); // добавляем координаты точки и ее параметры
  curves.push(curve); // добавляем ее в массив кривых
  needsRepaint = true; // устанавливаем необходимость перерисовки холста
  // изменяем толщину и тон линии
  setHue(shiftKey);
  setLineWidth();
});

canvas.addEventListener("mouseup", (event) => {
  drawing = false;
});

canvas.addEventListener("mouseleave", (event) => {
  drawing = false;
});

canvas.addEventListener('dblclick', updateAfterResizing);

canvas.addEventListener("mousemove", (event) => {
  if (drawing) {    
    curves[curves.length - 1].push(new Point(event.offsetX, event.offsetY, lineWidth, hue));
    needsRepaint = true;   
    shiftKey = event.shiftKey; // определяем нужно увеличивать или уменьшать оттенок  
    setHue(shiftKey);
    setLineWidth();
  }
});

// рендеринг
function repaint () {
  // очищаем холст, перед отрисовкой
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  curves
    .forEach((curve) => {
      
      circle(curve[0]);
      
      smoothCurve(curve);
    });
}

function tick () {
  if(needsRepaint) {
    repaint();
    needsRepaint = false;   
  }

  window.requestAnimationFrame(tick);
}

tick();
