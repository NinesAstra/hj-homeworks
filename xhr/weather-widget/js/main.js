const request = new XMLHttpRequest();
request.open('GET', 'https://neto-api.herokuapp.com/weather');
request.send();

request.addEventListener('load',onLoad);

function onLoad() {
if (request.status === 200) {
  const response = JSON.parse(request.responseText);
  setData(response);
  }
};


