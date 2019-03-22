const image = document.getElementById("slider");
const srcArray = [
  "i/airmax-jump.png", 
  "i/airmax-on-foot.png", 
  "i/airmax-playground.png", 
  "i/airmax-top-view.png", 
  "i/airmax.png"
];

console.log(image);

let i = 0; 
image.src = srcArray[i];

setInterval(() => {  
  if (i < srcArray.length) {
    image.src = srcArray[i];
    i = i + 1;
  } else {
    i = 0;
  };
}, 5000);

