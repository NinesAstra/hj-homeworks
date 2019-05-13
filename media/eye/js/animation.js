const bigBookPupil = document.querySelector('.big-book__pupil'),
      bigBookEye = document.querySelector('.big-book__eye'),
      body = document.querySelector('body');
// текущая позиция центра глаза на странице
let currentPositionEye = {x: 0, y: 0};

// перемещение зрачка
function moveEye(event) {
  // координаты курсора
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  /* определяем базовое расстояние, при удалении на которое 
  размер зрачка будет равен 1, а смещение от центра глаза - 30px.
  Можно рассчитать это расстояние и до каждой границы экрана, по заданию размер зрачка
  должен быть минимальным, когда курсор мыши находится близко к краю окна браузера. 
  А смещение выбирается пропорционально тому, насколько курсор мыши далеко от центра глаза. 
  Но ведь может возникнуть ситуация, когда граница экрана, например нижняя очень близко
  к центру глаза, в таком случае  придется изменять размеры зрачка и смещение от 
  минимальных значений до максимальных на очень ограниченном расстоянии... Для получения
  максимального сходства с движением глаза, чтобы на одинаковом расстоянии от центра
  в любом направлении сохранялся одинаковый размер зрачка, а также отклонение и применяется 
  это базовое   расстояние. Т.е. в   большинстве случаев ширина экрана больше высоты, то в 
  качестве этого параметра выбрана  половина ширины экрана.
  */
  let baseDistance = body.clientWidth/2;
  // определяем координаты body
  const positionAndSizeBody = body.getBoundingClientRect();   
  // определяем центр глазного яблока
  const positionAndSizeBookEye = bigBookEye.getBoundingClientRect();
  currentPositionEye.x = positionAndSizeBookEye.left + (positionAndSizeBookEye.width)/2;
  currentPositionEye.y = positionAndSizeBookEye.top + (positionAndSizeBookEye.height)/2;
  // смещение мыши относительно центра глаза
  const differenceX = mouseX - currentPositionEye.x,
        differenceY = mouseY - currentPositionEye.y,
        // расстояние от курсора до центра глаза
        distance = Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2));  
  // кооэффициент для вычисления смещения  
  let ratioEyeSize = distance/baseDistance > 1 ? 1 : distance/baseDistance; 
  // если расстояние от курсора до края глазного яблока больше базового смещения
  // - принимаем равным 1, если курсор зашел на глазное яблоко - 0
  let ratioEyeball = (distance - positionAndSizeBookEye.width/2)/baseDistance > 1 ? 1 : (distance - positionAndSizeBookEye.width/2)/baseDistance;
  // вычисляем размер и смещения зрачка
  const sizePupil = 1 + 2*(1 - ratioEyeball),
        posXEye = 30*ratioEyeSize*differenceX/distance,
        posYEye = 30*ratioEyeSize*differenceY/distance;
  
  // устанавливае вычесленные свойства
  bigBookPupil.style.setProperty('--pupil-x', posXEye + 'px');
  bigBookPupil.style.setProperty('--pupil-y', posYEye + 'px');
  bigBookPupil.style.setProperty('--pupil-size', sizePupil);
}
// обработчик при перемещении мыши
document.addEventListener('mousemove', moveEye);