'use strict';
window.addEventListener("load", function()
{
    const canvas = document.querySelector('#draw'); 
    const ctx = canvas.getContext('2d');

    function draw()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, 0); 
        ctx.lineTo(canvas.width, canvas.height); 
        ctx.moveTo(canvas.width, 0); 
        ctx.lineTo(0, canvas.height); 
        ctx.stroke();
    }
    function resize()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }
    window.addEventListener("resize", resize);
    resize();
});

const BRUSH_RADIUS = 6;

const doodle = document.getElementById("doodle");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const clearBtn = document.getElementById("clear");
const ctx = doodle.getContext("2d");

let curves = [];
let undone = [];
let drawing = false;
let weird = false;
let needsRepaint = false;

// curves and figures
function circle(point) {
  console.log(point);
  ctx.beginPath();
  ctx.arc(...point, BRUSH_RADIUS / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function smoothCurveBetween (p1, p2) {
  // Bezier control point
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.quadraticCurveTo(...p1, ...cp);
}

function smoothCurve(points) {
  ctx.beginPath();
  ctx.lineWidth = BRUSH_RADIUS;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.moveTo(...points[0]);

  for(let i = 1; i < points.length - 1; i++) {
    smoothCurveBetween(points[i], points[i + 1]);
  }

  ctx.stroke();
}

// events
function makePoint(x, y, reflect = false) {
  return  reflect ? [y, x] : [x, y];
};


doodle.addEventListener("mousedown", (evt) => {
  drawing = true;
  weird = evt.shiftKey; // press shift to make things weird =)
  undone = []; // reset the undone stack

  const curve = []; // create a new curve

  curve.push(makePoint(evt.offsetX, evt.offsetY, weird)); // add a new point
  curves.push(curve); // add the curve to the array of curves
  needsRepaint = true;
});

doodle.addEventListener("mouseup", (evt) => {
  drawing = false;
});

doodle.addEventListener("mouseleave", (evt) => {
  drawing = false;
});

doodle.addEventListener("mousemove", (evt) => {
  if (drawing) {
    // add a point
    const point = makePoint(evt.offsetX, evt.offsetY, weird)
    curves[curves.length - 1].push(point);
    needsRepaint = true;
  }
});

undoBtn.addEventListener("click", (evt) => {
  if (curves.length > 0) {
    undone.push(curves.pop());
  }

  needsRepaint = true;
});

redoBtn.addEventListener("click", (evt) => {
  if (undone.length > 0) {
    curves.push(undone.pop());
  }

  needsRepaint = true;
});

clearBtn.addEventListener("click", (evt) => {
  curves = [];
  undone = [];

  needsRepaint = true;
});

// rendering
function repaint () {
  // clear before repainting
  ctx.clearRect(0, 0, doodle.width, doodle.height);

  curves
    .forEach((curve) => {
      // first...
      circle(curve[0]);

      // the body is compraised of lines
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