'use strict';

var openBtn = document.querySelector('.about__open-btn');
var aboutForm = document.querySelector('.about__form');
var closeBtn = aboutForm.querySelector('.popup__btn-close');

openBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  aboutForm.classList.add("popup-show");
});

closeBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  aboutForm.classList.remove("popup-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (aboutForm.classList.contains("popup-show")) {
      evt.preventDefault();
      aboutForm.classList.remove("popup-show");
    }
  }
});



