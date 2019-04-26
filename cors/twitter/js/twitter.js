'use strict';
const url = 'https://neto-api.herokuapp.com/twitter/jsonp';
const wallpaper = document.querySelector('[data-wallpaper]');
const username = document.querySelector('[data-username]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const tweets = document.querySelector('[data-tweets]');
const followers = document.querySelector('[data-followers]');
const following = document.querySelector('[data-following]');
function insertData(data) {
  username.innerText = data.username;
  description.innerText = data.description;
  tweets.innerText = data.tweets;
  followers.innerText = data.followers;
  following.innerText = data.following;
  wallpaper.src = data.wallpaper;
  pic.src = data.pic;
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

loadData(url)
  .then(insertData);

