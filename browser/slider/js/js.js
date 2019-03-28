const image = document.getElementById("slider");
const srcArray = [
  "i/airmax-jump.png", 
  "i/airmax-on-foot.png", 
  "i/airmax-playground.png", 
  "i/airmax-top-view.png", 
  "i/airmax.png"
];

let i = 0; 
image.src = srcArray[i];

setInterval(() => {  
  i = i + 1;
  if (i < srcArray.length) {
    image.src = srcArray[i];
  } else {
    i = 0;
    image.src = srcArray[i];
  };
  console.log(image);
}, 5000);

