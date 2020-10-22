'use strict';

var itemBox = document.querySelectorAll('.product-card__item'); // блок каждого товара
var cartCont = document.getElementById('cart-content'); // блок вывода данных корзины

// Функция кроссбраузерная установка обработчика событий
function addEvent(element, type, handler){
  if(element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent('on' + type, function () {
      handler.call(element);
    });
  }
  return false;
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


// Добавляем товар в корзину
function addToCart(event){
	this.disabled = true; // блокируем кнопку на время операции с корзиной
  var cartData = getCartData() || {}; // получаем данные корзины или создаём новый объект, если данных еще нет
  var parentBox = this.parentNode.parentNode.parentNode;// родительский элемент кнопки
  var productId = this.getAttribute('data-id'); // ID товара
  var productTitle = parentBox.querySelector('.product-card__title').innerHTML; // название товара
  var productPrice = parentBox.querySelector('.product-card__cost').innerHTML; // стоимость товара
      // itemImg = parentBox.querySelector('.product-card__img').innerHTML;

	if(cartData.hasOwnProperty(productId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
		cartData[productId][2] += 1;
	} else { // если товара в корзине еще нет, то добавляем в объект
		cartData[productId] = [productTitle, productPrice, 1];
  }

	// Обновляем данные в LocalStorage
	if(!setCartData(cartData)){
		this.disabled = false; // разблокируем кнопку после обновления LS
		cartCont.innerHTML = 'Товар добавлен в корзину.';
		setTimeout(function(){
			cartCont.innerHTML = 'Продолжить покупки...';
		}, 500);
	}
	return false;
}

// Добавляем товар в корзину
for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.product-card__buy'), 'click', addToCart);
}


// var out = '';
// // var result = 0;
// for (var key in products) {
//   out += '<div class="modal-cart__wrap">';
//   out += '<img class="modal-cart__img" src="' + products[key].img + '">';
//   out += '<h4 class="modal-cart__title">' + products[key].name + '</h4>';
//   out += 'Цена: ' + products[key].cost + ' Р.' + '<p>';
//   out += '</div>';
//   out += '<div class="modal-cart__btn">';
//   out += '<button class="modal-cart__btn-plus button">Плюс</button>'; //data-id="'+key+'"
//   out += '<button class="modal-cart__btn-minus button">Минус</button>';
//   out += '<button class="modal-cart__btn-pay button">Оплатить</button>';
//   out += '</div>';
//   out += '<button class="modal-cart__btn-close btn-close"></button>';
// }
//   document.getElementById('out').innerHTML = out;

// Открываем корзину со списком добавленных товаров
function openCart(event) {
  var cartData = getCartData(); // вытаскиваем все данные корзины
  var totalItems = '';
  var totalCount = 0;
  var totalSum = 0;


	// если что-то в корзине уже есть, начинаем формировать данные для вывода
	if(cartData !== null) {
    totalItems = '<table class="modal-cart"><tr><th>Наименование товара</th> <th>Цена</th> <th>Кол-во</th> <th>Изменить кол-во</th></tr>';

		for(var items in cartData) {
      totalItems += '<tr>';

			for(var i = 0; i < cartData[items].length; i++) {
				totalItems += '<td>' + cartData[items][i] + '</td>';
      }

			totalSum += cartData[items][1] * cartData[items][2];
			totalCount += cartData[items][2];
      totalItems += '<td><button class="modal-cart__btn-plus" type="text" aria-label="Увеличить количество" data-id="' + items + '">+</button><button class="modal-cart__btn-minus" type="button" aria-label="Увеличить количество" data-id="' + items + '">-</button></td>';
      totalItems += '</tr>';
    }

		totalItems += '<tr><td><strong>Итого</strong></td><td><span id="total_sum">'+ totalSum +'</span> Р.</td><td><span id="total-count">'+ totalCount +'</span> шт.</td><td></td></tr>';
    totalItems += '<table>';

    // totalItems += '<div class="modal-cart__btn"><button type="button" class="modal-cart__btn-close" id="clear-cart">Очистить корзину</button><button type="button" class="modal-cart__btn-clear">Закрыть</button></div>';
    cartCont.innerHTML = totalItems;

	} else {
		// если в корзине пусто, то сигнализируем об этом
    cartCont.innerHTML = 'В корзине пусто!';

  }

	return false;
}

/* Открыть корзину */
addEvent(document.getElementById('checkout'), 'click', openCart);


/* Плюсуем товар */
addEvent(document.body, 'click', function (element) {
  if(element.target.className === 'modal-cart__btn-plus') {
    var productId = element.target.getAttribute('data-id');
    var cartData = getCartData();

    if (cartData.hasOwnProperty(productId)) {
      cartData[productId][2] += 1; // добавляем +1 к количеству

      if(!setCartData(cartData)) {// Обновляем данные в LocalStorage
        document.getElementById('checkout').click();
      }
    }
  }
  /* Минусуем */
  if(element.target.className === 'modal-cart__btn-minus') {
    var productId = element.target.getAttribute('data-id');
    var cartData = getCartData();

    if (cartData.hasOwnProperty(productId)) {

      if (cartData[productId][2] > 1) { // если товар в количестве больше 1, то вычитаем
        cartData[productId][2] -= 1;

      } else {
        cartData[productId] - 1 == 0;
        delete cartData[productId];
      }

      if(!setCartData(cartData)) {// Обновляем данные в LocalStorage
        document.getElementById('checkout').click(); // у меня корзина всегда открыта
      }
    }
  }
}, false
);


// if (element.target.className === 'modal-cart__btn-clear') {
//   var productId = element.target.getAttribute('data-id');
//   var cartData = getCartData();
//   remove.cartData[productId];
//   cartCont.innerHTML = 'Корзина очишена.';
// }


/* Очистить корзину */
addEvent(document.getElementById('clear-cart'), 'click', function(element){
	localStorage.removeItem('products');
	cartCont.innerHTML = 'Корзина очишена.';
});




// var itemBox = document.querySelectorAll('product-card__item');
// // var addProduct = document.querySelector('.product-card__buy');
// var popupCart = document.querySelector('.popup-cart');
// var nextPopupCart = popupCart.querySelector('.popup-cart__btn-next');
// var closePopupCart = popupCart.querySelector('.popup-cart__btn-close');
// var openModalCart = document.querySelector('.popup-cart__btn-get'); //оформить заказ
// var modalCart = document.querySelector('.modal-cart');
// // var modalCart = document.getElementById('.modal-cart');
// // var closeModalCart = modalCart.querySelector('.modal-cart__btn-close');


// // Массив
// var products = {
//   'card1' : {
//     'img' : "img/object-1.jpg",
//     'name' : "Перфоратор BOSCH BFG 9000",
//     'cost' : 25500
//   },
//   'card2' : {
//     'img' : "img/object-2.jpg",
//     'name' : "Перфоратор BOSCH BFG 3000",
//     'cost' : 15000
//   },
//   'card3' : {
//     "img" : "img/object-3.jpg",
//     "name": "Перфоратор BOSCH BFG 6000",
//     "cost": "25500"
//   },
//   'card4': {
//     'img': "img/object-4.jpg",
//     'name': "Перфоратор BOSCH BFG 2000",
//     'cost': 12500
//   }
// };

// // Отрисовываем корзину

// var out = '';
// // var result = 0;
// for (var key in products) {
//   out += '<div class="modal-cart__wrap">';
//   out += '<img class="modal-cart__img" src="' + products[key].img + '">';
//   out += '<h4 class="modal-cart__title">' + products[key].name + '</h4>';
//   out += 'Цена: ' + products[key].cost + ' Р.' + '<p>';
//   out += '</div>';
//   out += '<div class="modal-cart__btn">';
//   out += '<button class="modal-cart__btn-plus button">Плюс</button>'; //data-id="'+key+'"
//   out += '<button class="modal-cart__btn-minus button">Минус</button>';
//   out += '<button class="modal-cart__btn-pay button">Оплатить</button>';
//   out += '</div>';
//   out += '<button class="modal-cart__btn-close btn-close"></button>';
// }
//   document.getElementById('out').innerHTML = out;

// // добавляем товар при клике по кнопке купить
// document.onclick = (event) => {
//   if (event.target.classList.contains('product-card__buy')) {
//     plusFunction(event.target.dataset.id);
//     popupCart.classList.add("popup-cart__show");
//   }
// };


// nextPopupCart.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   popupCart.classList.remove("popup-cart__show");
// });

// closePopupCart.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   popupCart.classList.remove("popup-cart__show");
// });

// // Открываем корзину
// openModalCart.addEventListener("click", function (evt) {
//   evt.preventDefault();
//   modalCart.classList.add("modal-cart__show");
// });



// // ('button.modal-cart__btn-close').on('click', closeToCart);

// // };

// var showCart = () => {
//   console.log(products);
// }
// showCart();




// window.addEventListener("keydown", function (evt) {
//   if (evt.keyCode === 27) {
//     if (popupCart.classList.contains("popup-cart__show")) {
//       evt.preventDefault();
//       ppopupCart.classList.remove("popup-cart__show");
//     }
//   }
// })

// var plusFunction = id => {
//   products[id]++;
//   showCart();
// }

// // уменьшить количество товара
// var minusFunction = id => {
//   if (products[id] - 1 == 0) {
//     deleteFunction(id);
//     return true;
//   }
//   products[id]--;
//   showCart();
// }

// // удалить товар
// var deleteFunction = id => {
//   delete products[id];
//   showCart();
// }



// function addToCart() {
//   var articul = this.attr('data-id');
//   cart[articul] = 1;
//   console.log(products);
// }

// window.addEventListener("keydown", function (evt) {
//   if (evt.keyCode === 27) {
//     if (modalCart.classList.contains("modal-cart__show")) {
//       evt.preventDefault();
//       modalCart.classList.remove("modal-cart__show");
//     }
//   }
// });

// // var cartCont = document.getElementById('cart_content');
// // var itemBox = document.querySelector('.product-card__item');
// // var getPopupCart = popupCart.querySelector('.popup-cart__btn-get');

// // closeModalCart.addEventListener("click", function (evt) {
// //   evt.preventDefault();
// //   modalCart.classList.remove("modal-cart__show");
// // });

  // // Отрисовываем корзину

// var out = '';
// // var result = 0;
// for (var key in products) {
//   out += '<div class="modal-cart__wrap">';
//   out += '<img class="modal-cart__img" src="' + products[key].img + '">';
//   out += '<h4 class="modal-cart__title">' + products[key].name + '</h4>';
//   out += 'Цена: ' + products[key].cost + ' Р.' + '<p>';
//   out += '</div>';
//   out += '<div class="modal-cart__btn">';
//   out += '<button class="modal-cart__btn-plus button">Плюс</button>'; //data-id="'+key+'"
//   out += '<button class="modal-cart__btn-minus button">Минус</button>';
//   out += '<button class="modal-cart__btn-pay button">Оплатить</button>';
//   out += '</div>';
//   out += '<button class="modal-cart__btn-close btn-close"></button>';
// }
//   document.getElementById('out').innerHTML = out;

// // добавляем товар при клике по кнопке купить
// document.onclick = (event) => {
//   if (event.target.classList.contains('product-card__buy')) {
//     plusFunction(event.target.dataset.id);
//     popupCart.classList.add("popup-cart__show");
//   }
// };

// var images = document.querySelectorAll('.product-card__img');
//   // // Генерировать фото
//   var getImageCart = function (container, photos) {
//     container.innerHTML = '';

//     if (images.length) {
//       photos.forEach(function (photo) {
//         var imgElement = document.createElement('img');
//         imgElement.classList.add('popup__photo');
//         imgElement.src = photo;
//         imgElement.width = photo.width;
//         imgElement.height = photo.height;
//         container.appendChild( imgElement);
//       });
//     } else {
//       hideElement(container);
//     }
//   };