'use strict';
var itemBox = document.querySelectorAll('.product-card__item'); // блок каждого товара
var cartCont = document.getElementById('cart-content'); // блок вывода данных корзины
var popupCart = document.querySelector('.popup-cart'); //попап корзины
var nextPopupCart = popupCart.querySelector('.popup-cart__btn-next'); //кнопка продолжить покупку в попап корзины
var closePopupCart = popupCart.querySelector('.popup-cart__btn-close'); // закрыть попап корзины
var openModalCart = document.querySelector('.popup-cart__btn-form'); //оформить заказ
// var modalCart = document.querySelector('.modal-cart');

// Открываем попап корзины и добавляем товар при клике по кнопке купить
document.onclick = (event) => {
  if (event.target.classList.contains('product-card__buy')) {
    event.preventDefault();
    popupCart.classList.add("popup-cart__show");
  }
}
// закрываем попап корзины при нажатии на кнопку продолжить покупки
nextPopupCart.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupCart.classList.remove("popup-cart__show");
});

// Закрываем попап корзины через крестик
closePopupCart.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupCart.classList.remove("popup-cart__show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popupCart.classList.contains("popup-cart__show")) {
      evt.preventDefault();
      ppopupCart.classList.remove("popup-cart__show");
    }
  }
});
