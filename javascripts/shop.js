let products = [
  {
    id: 1,
    title: 'КЕПКА',
    price: 1200,
    isNew: true,
    image: './images/cap.png',
    layout: 'standard',
  },
  {
    id: 2,
    title: 'КРУЖКА',
    price: 200,
    isNew: false,
    image: './images/cup.png',
    layout: 'feature',
  },
  {
    id: 3,
    title: 'ШАПКА',
    price: 1200,
    isNew: false,
    image: './images/hat.png',
    layout: 'standard product--right',
  },
  {
    id: 4,
    title: 'ПРОРОЩЕННАЯ ЗЕЛЕНЬ',
    price: 300,
    isNew: false,
    image: './images/greens.png',
    layout: 'standard',
  },
  {
    id: 5,
    title: 'СТИКЕРЫ',
    price: 567,
    isNew: false,
    image: './images/stickers.png',
    layout: 'standard',
  },
  {
    id: 6,
    title: 'СЕМЕНА МИКРОЗЕЛЕНИ',
    price: 800,
    isNew: false,
    image: './images/seeds.png',
    layout: 'standard',
  },
  {
    id: 7,
    title: 'ШОППЕР',
    price: 1200,
    isNew: false,
    image: './images/toteBag.png',
    layout: 'bottom-left',
  },
  {
    id: 8,
    title: 'ПОДАРОЧНЫЙ БОКС',
    price: 2400,
    isNew: false,
    image: './images/box.png',
    layout: 'bottom-wide',
  },
]

renderProducts()
updateCartCount()
bindShopEvents()

function renderProducts() {
  let productList = document.querySelector('.productList')

  if (!productList) return

  productList.innerHTML = ''

  products.forEach((product, index) => {
    let productCard = document.createElement('article')
    productCard.className = `product product--${product.layout}`

    let count = getProductCount(product.id)
    let newBadge = product.isNew ? '<div class="badge-new">НОВИНКА</div>' : ''
    let controls = count
      ? `
        <div class="productButtons" aria-label="Количество товара ${product.title}">
          <button type="button" data-cart-action="remove" data-product-id="${product.id}">-</button>
          <span>${count}</span>
          <button type="button" data-cart-action="add" data-product-id="${product.id}">+</button>
        </div>
      `
      : `
        <button class="productAdd" type="button" data-cart-action="add" data-product-id="${product.id}">
          В корзину
        </button>
      `

    productCard.innerHTML = `
      ${newBadge}
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="productInfo">
        <div>
          <h3>${product.title}</h3>
          <p>${formatPrice(product.price)}</p>
        </div>
        ${controls}
      </div>
    `
    productList.appendChild(productCard)

    if (index === 2) {
      let promoBar = document.createElement('div')
      promoBar.className = 'promo-bar'
      promoBar.innerText = 'Скидка 10% по промокоду МИКРОМИР'
      productList.appendChild(promoBar)
    }
  })
}

function bindShopEvents() {
  let productList = document.querySelector('.productList')
  let footerForm = document.querySelector('.footerSubscribe form')

  if (productList) {
    productList.addEventListener('click', (event) => {
      let button = event.target.closest('[data-cart-action]')
      if (!button) return

      let productId = Number(button.dataset.productId)

      if (button.dataset.cartAction === 'add') {
        addToCart(productId)
      }

      if (button.dataset.cartAction === 'remove') {
        removeFromCart(productId)
      }
    })
  }

  if (footerForm) {
    footerForm.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }
}

function setCart(cart) {
  let cleanCart = cart.filter((item) => item.quantity > 0)
  localStorage.setItem('cart', JSON.stringify(cleanCart))
  updateCartCount()
  renderProducts()
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || []
}

function getProductCount(productId) {
  let cart = getCart()
  let item = cart.find((p) => p.id === productId)
  return item ? item.quantity : 0
}

function removeFromCart(productId) {
  let cart = getCart()
  let index = cart.findIndex((p) => p.id === productId)

  if (index !== -1) {
    cart[index].quantity -= 1
  }

  setCart(cart)
}

function addToCart(productId) {
  let cart = getCart()
  let index = cart.findIndex((p) => p.id === productId)

  if (index !== -1) {
    cart[index].quantity += 1
  } else {
    let item = products.find((p) => p.id === productId)

    if (item) {
      cart.push({ ...item, quantity: 1 })
    }
  }

  setCart(cart)
}

function updateCartCount() {
  let cart = getCart()
  let cnt = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)
  let productCntNode = document.querySelector('.productCnt')

  if (productCntNode) {
    productCntNode.innerHTML = cnt
  }
}

function formatPrice(price) {
  return `${price} ₽`
}
