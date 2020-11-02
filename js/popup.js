'use strict';

// Форма связи
var openPopupContact = document.querySelector('.about__open-btn');
var popupContact = document.querySelector('.popup-contact');
var closePopupContact = popupContact.querySelector('.popup-contact__btn-close');

var openMap = document.querySelector('.about__map-img');
var popupMap = document.querySelector('.popup-map');
var closePopupMap = popupMap.querySelector('.popup-map__btn-close');

openPopupContact.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupContact.classList.add("popup-contact__show");
});

closePopupContact.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupContact.classList.remove("popup-contact__show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupContact.classList.contains("popup-contact__show")) {
      evt.preventDefault();
      popupContact.classList.remove("popup-contact__show");
    }
  }
});

// Открыть карту
openMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMap.classList.add("popup-map__show");
});

// Закрыть карту
closePopupMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupMap.classList.remove("popup-map__show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupMap.classList.contains("popup-map__show")) {
      evt.preventDefault();
      popupMap.classList.remove("popup-map__show");
    }
  }
});
