'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

// Minicart (homework)
class Product {
  constructor(id, name, price, quantity = 1) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  /**
   * @returns {string}
   */
  getProductMarkup() {
    return `
        <div class="product">
            <div class="name">${this.name}</div>
            <div class="price">$${this.price}</div>
            <div class="quantity">${this.quantity}</div>
            <div class="sum">$${this.price * this.quantity}</div>
        </div>
      `;
  }
}

class Minicart {
  constructor(products = []) {
    this.products = products;
    this.total = 0;
    this.quantity = 0;
    this.calcTotal();
    this.calcQuantity();
  }

  calcTotal() {
    this.products.forEach((product) => {
      this.total += product.price * product.quantity
    });
    this.total = this.total.toFixed(2);
  }

  calcQuantity() {
    this.products.forEach((product) => {
      this.quantity += product.quantity;
    });
  }

  /**
   * @returns {string}
   */
  getMinicartMarkup() {
    return `
        <div class="minicart_header product">
            <div class="name">Product</div>
            <div class="price">Price</div>
            <div class="quantity">Quantity</div>
            <div class="sum">Sum</div>
        </div>
        ${this.products.map(product => product.getProductMarkup()).join('')}
        <div class="total">Total amount: $${this.total}</div>
      `;
  }
}

const minicartEl = document.querySelector('#minicart');
let products = [];

document.querySelector('.cartIconWrap').addEventListener('click', ()=> {
  if (products.length > 0) {
    minicart.classList.toggle('visible');
  }
});

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (event.target.nodeName == 'BUTTON') {
    const currentEl = event.target.closest('.featuredItem');

    let existingProduct = products.find(product => product.id == currentEl.id);

    if (existingProduct === undefined) {
      const addedProduct = new Product(
        currentEl.id,
        currentEl.querySelector('.featuredName').textContent.trim(),
        +currentEl.querySelector('.featuredPrice').textContent.replace('$', '')
      );
      products.push(addedProduct);
    } else {
      ++existingProduct.quantity;
    }

    const miniCart = new Minicart(products);
    minicartEl.innerHTML = miniCart.getMinicartMarkup();

    document.querySelector('.cartIconWrap span').innerHTML = miniCart.quantity;
  }
});
