var xhr = new XMLHttpRequest();
xhr.open("GET", "https://neto-api.herokuapp.com/book/");
xhr.send();
console.log(xhr.responseText);
