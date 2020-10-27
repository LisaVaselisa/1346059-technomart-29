'use strict';
var itemBox = document.querySelectorAll('.product-card__item'); // блок каждого товара
var cartCont = document.getElementById('cart-content'); // блок вывода данных корзины
var popupCart = document.querySelector('.popup-cart'); //попап корзины
var nextPopupCart = popupCart.querySelector('.popup-cart__btn-next'); //кнопка продолжить покупку в попап корзины
var closePopupCart = popupCart.querySelector('.popup-cart__btn-close'); // закрыть попап корзины
var openModalCart = document.querySelector('.popup-cart__btn-form'); //оформить заказ
var modalCart = document.querySelector('.modal-cart');
var closeModalCart = modalCart.querySelector('.modal-cart__btn-close');

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

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    if (popupCart.classList.contains("popup-cart__show")) {
      evt.preventDefault();
      ppopupCart.classList.remove("popup-cart__show");
    }
  }
})

//Открываем модельное окно корзины
openModalCart.addEventListener("click", function (event) {
  event.preventDefault();
  modalCart.classList.add("modal-cart__show");
  popupCart.classList.remove("popup-cart__show");
});

// Функция обработчик всегда будет вызываться как метод целевого объекта.
function addEvent(element, type, handler) {
  if (element.addEventListener)
    element.addEventListener(type, handler, false);
  else
    element.attachEvent('on' + type, function () {
     return handler.call(element);
    });
}

// Получаем данные из LocalStorage
function getCartData() {
  return JSON.parse(localStorage.getItem('products'));
}

// Записываем данные в LocalStorage
function setCartData(arrey) {
  localStorage.setItem('products', JSON.stringify(arrey));
  return false;
}

function addToCart() {
  this.disabled = true; // блокируем кнопку на время операции с корзиной
  var cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
  var parentBox = this.parentNode.parentNode.parentNode;// родительский элемент кнопки
  var productId = this.getAttribute('data-id'); // ID товара
  var productTitle = parentBox.querySelector('.product-card__title').innerHTML;
  var productPrice = parentBox.querySelector('.product-card__cost').innerHTML;

  if (cartData.hasOwnProperty(productId)) { // если такой товар в корзине, добавляем +1
    cartData[productId][2] += 1;
  } else { // если товара в корзине еще нет, то добавляем в объект
    cartData[productId] = [productTitle, productPrice, 1];
  }

  // Обновляем данные в LocalStorage
  if (!setCartData(cartData)) {
  this.disabled = false;
    setTimeout(function () {
      cartCont.innerHTML = '';
    }, 100);
  }
  return false;
}

// Добавляем товар в корзину
for(var i = 0; i < itemBox.length; i++){
  addEvent(itemBox[i].querySelector('.product-card__buy'), 'click', addToCart);
}

// Открываем корзину со списком добавленных товаров
function openCart() {
  var cartData = getCartData(); // вытаскиваем все данные корзины
  var totalItems = '';
  var totalCount = 0;
  var totalSum = 0;
  // если что-то в корзине уже есть, начинаем формировать данные для вывода
  if (cartData !== null) {
    totalItems = '<table class="modal-cart__title"><tr><th>Наименование товара</th> <th>Цена</th> <th>Кол-во</th> <th>Изменить кол-во</th></tr>';
    for (var items in cartData) {
      totalItems += '<tr>';
      for (var i = 0; i < cartData[items].length; i++) {
        totalItems += '<td>' + cartData[items][i] + '</td>';
      }
      totalSum += cartData[items][1] * cartData[items][2];
      totalCount += cartData[items][2];
      totalItems += '<td><button class="modal-cart__btn-plus" type="text" aria-label="Увеличить количество" data-id="' + items + '">+</button><button class="modal-cart__btn-minus" type="button" aria-label="Увеличить количество" data-id="' + items + '">-</button><th></th></td>';
      totalItems += '<td><button class="modal-cart__btn-close" type="button" data-id="'+ items +'"></button></td';
      totalItems += '</tr>';
    }
    totalItems += '<tr><td><strong>Итого</strong></td><td><span>'+ totalSum +'</span> Р.</td><td><span>'+ totalCount +'</span> шт.</td><td></td></tr>';
    totalItems += '<table>';
    cartCont.innerHTML = totalItems;
  }
  else {
    cartCont.innerHTML = 'В корзине пусто!';  //если в корзине пусто, то сигнализируем об этом
  }
  return false;
}

// Открыть корзину
addEvent(document.getElementById('form'), 'click', openCart);

addEvent(document.body, 'click', function (element) {
  var productId = element.target.getAttribute('data-id');
  var cartData = getCartData();
  // Плюсуем товар
  if (element.target.className === 'modal-cart__btn-plus') {
    if (cartData.hasOwnProperty(productId)) {
      cartData[productId][2] += 1; // добавляем +1 к количеству
    }
    if (!setCartData(cartData)) {// Обновляем данные в LocalStorage
      document.getElementById('form').click();
    }
  }
  // Минусуем товар
  if (element.target.className === 'modal-cart__btn-minus') {
    if (cartData.hasOwnProperty(productId)) {
      if (cartData[productId][2] > 1) { // если товар в количестве больше 1, то вычитаем
        cartData[productId][2] -= 1;
      } else {
        cartData[productId] - 1 == 0;
        delete cartData[productId];
      }
    }
    if (!setCartData(cartData)) {// Обновляем данные в LocalStorage
      document.getElementById('form').click();
    }
  }
  // Удаляем товар
  if (element.target.className === 'modal-cart__btn-close') {
    if (cartData.hasOwnProperty(productId)) {
      delete cartData[productId];
    }
    if (!setCartData(cartData)) {// Обновляем данные в LocalStorage
      document.getElementById('form').click();
    }
  }
}, false);

// // ('button.modal-cart__btn-close').on('click', closeToCart);

// // };


// // closeModalCart.addEventListener("click", function (evt) {
// //   evt.preventDefault();
// //   modalCart.classList.remove("modal-cart__show");
// // });

//   out += '</div>';
//   out += '<button class="modal-cart__btn-close btn-close"></button>';
