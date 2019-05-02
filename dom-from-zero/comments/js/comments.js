'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector(".comments");
  const commentNodes = list.map(createComment);
  const fragment = commentNodes.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());

  commentsContainer.appendChild(fragment);
}

function createComment(comment) {
  const photo = document.createElement("div");
  photo.className = "photo";
  photo.setAttribute("title", comment.author.name);
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.style.backgroundImage = `url(${comment.author.pic})`;
  photo.appendChild(avatar);
  const commentText = document.createElement("p");
  commentText.className = "comment-text";
  console.log(comment.text);
  commentText.innerText = `${comment.text}`;
  const commentDate = document.createElement("div");
  commentDate.className = "comment-date";
  commentDate.innerText = new Date(comment.date).toLocaleString('ru-Ru');
  const complainLi = document.createElement("li");
  complainLi.className = "complain";
  complainLi.innerText = "Пожаловаться";
  const replyLi = document.createElement("li");
  replyLi.className = "reply";
  replyLi.innerText = "Ответить";
  const commentActions = document.createElement("ul");
  commentActions.className = "comment-actions";
  commentActions.appendChild(complainLi);
  commentActions.appendChild(replyLi);
  const bottomComment = document.createElement("div");
  bottomComment.className = "bottom-comment";
  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions);
  const commentBlock = document.createElement("div");
  commentBlock.className = "comment-block";
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);
  const commentWrap = document.createElement("div");
  commentWrap.className = "comment-wrap";
  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);
  return commentWrap;
  /*return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`*/
}






// function showComments(list) {
//   const commentsContainer = document.querySelector('.comments');
//   const comments = list.map(createComment).join('');
//   commentsContainer.innerHTML += comments;
// }

// function createComment(comment) {
//   const photo = document.createElement("div");
//   photo.className = "photo";
//   photo.setAttribute("title", comment.author.name);
//   const avatar = document.createElement("div");
//   avatar.className = "avatar";
//   avatar.style.backgroundImage = comment.author.pic;
//   photo.appendChild(avatar);
//   const commentWrap = document.createElement("div");
//   commentWrap.className = "comment-wrap";
//   commentWrap.appendChild(photo);
//   return commentWrap;

//   return `<div class="comment-wrap">
//     <div class="photo" title="${comment.author.name}">
//       <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
//     </div>
//     <div class="comment-block">
//       <p class="comment-text">
//         ${comment.text.split('\n').join('<br>')}
//       </p>
//       <div class="bottom-comment">
//         <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
//         <ul class="comment-actions">
//           <li class="complain">Пожаловаться</li>
//           <li class="reply">Ответить</li>
//         </ul>
//       </div>
//     </div>
//   </div>`
// }

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
