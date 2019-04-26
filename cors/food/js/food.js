'use strict';
'use strict';
const urlRecipe = 'https://neto-api.herokuapp.com/food/42';
const urlRating = 'https://neto-api.herokuapp.com/food/42/rating';
const urlConsumers = 'https://neto-api.herokuapp.com/food/42/consumers';
const pic = document.querySelector('[data-pic]');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');
const consumers = document.querySelector('[data-consumers]');

function insertDataRecipe(data) {  
  title.innerText = data.title;
  pic.style.background = `url(${data.pic})`;
  ingredients.innerText = data.ingredients.join(', ');  
  return urlRating;  
}

function insertDataRating(data) {
  rating.innerText = Math.round(data.rating*100)/100;
  votes.innerText = `(${data.votes} оценок)`;
  star.style.width = Math.round(data.rating*100)/10  + '%';  
  return urlConsumers;  
}

function insertDataConsumers(data) {  
  for (const consumer of data.consumers) {
    consumers.innerHTML += `<img src=${consumer.pic} title=${consumer.name}>`;  
  }
  const rest = data.total - data.consumers.length;
  consumers.innerHTML += `<span>(+${rest})</span>`;  
}

function loadData(url) {
  const functionName = 'callback';
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?callback=${functionName}`;
    document.body.appendChild(script);    
  });
}

loadData(urlRecipe)
  .then(insertDataRecipe)
  .then(loadData)
  .then(insertDataRating)
  .then(loadData)
  .then(insertDataConsumers);