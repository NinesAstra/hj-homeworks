'use strict'
const slidersCollection = document.querySelectorAll('.slider');
Array.from(slidersCollection).forEach(slide => Slider(slide));


function Slider(container) {
  container.querySelector('.slides > .slide').classList.add('slide-current');
  const next = container.querySelector('[data-action = next]');
  const prev = container.querySelector('[data-action = prev]');
  const first = container.querySelector('[data-action = first]');
  const last = container.querySelector('[data-action = last]');
  prev.classList.add('disabled');
  first.classList.add('disabled');
  next.addEventListener('click', event => moveSlide(true));
  prev.addEventListener('click', event => moveSlide(false));
  first.addEventListener('click', event => moveLastSlide(true));
  last.addEventListener('click', event => moveLastSlide(false));

  function moveSlide(isForward) {
    const currentSlide = container.querySelector('.slide-current');
    console.log(isForward);
    if (!currentSlide.nextElementSibling && isForward === true) {
      next.classList.add('disabled');
      last.classList.add('disabled');
      return;
    } else if (!currentSlide.previousElementSibling && isForward === false) {
      prev.classList.add('disabled');
      first.classList.add('disabled');
      return;
    }
    const activatedSlide = isForward ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
    currentSlide.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');
    prev.classList.remove('disabled');
    next.classList.remove('disabled');
    first.classList.remove('disabled');
    last.classList.remove('disabled');
  }
  function moveLastSlide(isForward) {
    const currentSlide = container.querySelector('.slide-current');
    const activatedSlide = isForward ? currentSlide.parentElement.firstElementChild : currentSlide.parentElement.lastElementChild;
    currentSlide.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');

    isForward ? prev.classList.add('disabled') : next.classList.add('disabled');
    isForward ? next.classList.remove('disabled') : prev.classList.remove('disabled');
    isForward ? first.classList.add('disabled') : last.classList.add('disabled');
    isForward ? last.classList.remove('disabled') : first.classList.remove('disabled');
  }
}

