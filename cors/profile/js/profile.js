'use strict';

let id = null;
let urlTechnologies = null;
const content = document.querySelector('.content');
const urlProfile = 'https://neto-api.herokuapp.com/profile/me';
const name = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologies = document.querySelector('[data-technologies]');

function getUrlTechnologies(id) {
  return `https://neto-api.herokuapp.com/profile/${id}/technologies`;  
}

function insertDataUser(data) {
  id = data.id;
  urlTechnologies = getUrlTechnologies(id);
  name.innerText = data.name;
  description.innerText = data.description;
  position.innerText = data.position;  
  pic.src = data.pic;
  return urlTechnologies;  
}

function insertDataTechnologies(technologiesData) {
  for (const technology of technologiesData) {
    technologies.innerHTML += `<span class="devicons devicons-${technology}"></span>`;  
  }
  content.style.display = 'initial';  
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

loadData(urlProfile)
  .then(insertDataUser)
  .then(loadData)
  .then(insertDataTechnologies);



