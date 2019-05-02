'use strict';
function createElement(content) {
  if (typeof content === 'string') {
    return document.createTextNode(content);   
  }
  const element = document.createElement(content.name);
  if (content.props && typeof content.props === 'object') {
    Object.keys(content.props).forEach(i => element.setAttribute(i, content.props[i]));
  }
  if (typeof content.childs === 'string') {
    element.innerText = content.childs;
  } else if (content.childs instanceof Array) {
    content.childs.forEach(child => element.appendChild(createElement(child)));
  }
  return element;
}
