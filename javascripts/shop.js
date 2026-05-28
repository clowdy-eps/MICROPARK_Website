let products = [
  {
    id: 1,
    title: 'КЕПКА',
    price: '1200',
    isNew: true,
    image: './images/cap.png',
  },
  {
    id: 2,
    title: 'КРУЖКА',
    price: '200',
    isNew: false,
    image: './images/cup.png',
  },
  {
    id: 3,
    title: 'ШАПКА',
    price: '1200',
    isNew: false,
    image: './images/hat.png',
  },
  {
    id: 4,
    title: 'ПРОРОЩЕННАЯ ЗЕЛЕНЬ',
    price: '300',
    isNew: false,
    image: './images/greens.png',
  },
  {
    id: 5,
    title: 'СТИКЕРЫ',
    price: '567',
    isNew: false,
    image: './images/stickers.png',
  },
  {
    id: 6,
    title: 'СЕМЕНА МИКРОЗЕЛЕНИ',
    price: '800',
    isNew: false,
    image: './images/seeds.png',
  },
  {
    id: 7,
    title: 'ШОППЕР',
    price: '1200',
    isNew: false,
    image: './images/toteBag.png',
    large: true,
  },
  {
    id: 8,
    title: 'ПОДАРОЧНЫЙ БОКС',
    price: '2400',
    isNew: false,
    image: './images/box.png',
    large: true,
  },
]

renderProducts()
updateCartCount()

function renderProducts() {
  let productList = document.querySelector('.productList')

  // Защита от ошибок, если элемент не найден в HTML
  if (!productList) return

  productList.innerHTML = ''

  products.forEach((product, index) => {
    let productCard = document.createElement('div')
    productCard.classList.add('product')

    if (product.large) {
      productCard.classList.add('large')
    }

    let newBadge = product.isNew ? `<div class="badge-new">НОВИНКА</div>` : ''
    let priceText = product.price ? `<p>${product.price}</p>` : ''

    productCard.innerHTML = `
      ${newBadge}
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="productInfo">
        <h3>${product.title}</h3>
        ${priceText}
      </div>
    `
    productList.appendChild(productCard)

    // Вставляем зеленую плашку скидки после 3-го товара (индекс 2)
    if (index === 2) {
      let promoBar = document.createElement('div')
      promoBar.className = 'promo-bar'
      promoBar.innerText = 'Скидка 10% по промокоду МИКРОМИР'
      productList.appendChild(promoBar)
    }

    // Вставляем блок АКЦИЯ после 6-го товара (индекс 5)
    if (index === 5) {
      let promoBlock = document.createElement('div')
      promoBlock.className = 'promo-block'
      promoBlock.innerHTML = `
        <div class="promo-top">АКЦИЯ</div>
        <div class="promo-bottom">
          <div class="promo-title">1+1=3</div>
          <div class="promo-desc">3 товара<br>по цене одного</div>
        </div>
      `
      productList.appendChild(promoBlock)
    }
  })
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
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
  if (index != -1) {
    if (cart[index].quantity > 0) {
      cart[index].quantity -= 1
    }
  }
  setCart(cart)
}

function addToCart(productId) {
  let cart = getCart()
  let index = cart.findIndex((p) => p.id === productId)
  if (index != -1) {
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

//СТАРЫЙ ВАРИАНТ

// let products = [
//   {
//     id: 1,
//     title: 'КЕПКА',
//     price: 3500,
//     image: 'images/cap.jpg',
//   },
//   {
//     id: 2,
//     title: 'КРУЖКА',
//     price: 3500,
//     image: 'images/cup.jpg',
//   },
//   {
//     id: 3,
//     title: 'ШАПКА',
//     price: 1200,
//     image: 'images/hat.jpg',
//   },
//   {
//     id: 4,
//     title: 'СТИКЕРЫ',
//     price: 1500,
//     image: 'images/stickers.jpg',
//   },
//   {
//     id: 5,
//     title: 'СЕМЕНА МИКРОЗЕЛЕНИ',
//     price: 1500,
//     image: 'images/seeds.jpg',
//   },
//   {
//     id: 6,
//     title: 'ШОППЕР',
//     price: 1500,
//     image: 'images/toteBag.jpg',
//   },
//   {
//     id: 7,
//     title: 'ПОДАРОЧНЫЙ БОКС',
//     price: 1500,
//     image: 'images/box.jpg',
//   },
//   {
//     id: 8,
//     title: 'ПРОРОЩЕННАЯ ЗЕЛЕНЬ',
//     price: 1500,
//     image: 'images/greens.jpg',
//   },
// ]

// renderProducts()
// updateCartCount()

// function renderProducts() {
//   let productList = document.querySelector('.productList')
//   productList.innerHTML = ''

//   products.forEach((product) => {
//     let productCard = document.createElement('div')
//     productCard.classList.add('product')

//     productCard.innerHTML = `
//       <img src="${product.image}" alt="${product.title}" class="productImg" />
//       <div class="productInfo">
//         <h3>${product.title}</h3>
//         <p>${product.price} ₽</p>
//         <div class="productButtons">
//           <button onclick="removeFromCart(${product.id})">-</button>
//           <p>${getProductCount(product.id)}</p>
//           <button onclick="addToCart(${product.id})">+</button>
//         </div>
//       </div>
//     `

//     productList.appendChild(productCard)
//   })
// }
// function renderProducts() {
//   let productList = document.querySelector('.productList')
//   productList.innerHTML = ''

//   products.forEach((product) => {
//     let productCard = document.createElement('div')
//     productCard.classList.add('product')
//     // <img src="${product.image}" alt="${product.title}" />
//     productCard.innerHTML = `

//       <div class="productInfo">
//        <h3>${product.title}</h3>
//         <p>${product.price} ₽</p>
//         <div class="productButtons">
//           <button onclick="removeFromCart(${product.id})">-</button>
//           <p>${getProductCount(product.id)}</p>
//           <button onclick="addToCart(${product.id})">+</button>
//         </div>
//       </div>
//     `

//     productList.appendChild(productCard)
//   })
// }

// function setCart(cart) {
//   localStorage.setItem('cart', JSON.stringify(cart))

//   updateCartCount()
//   renderProducts()
// }

// function getCart() {
//   return JSON.parse(localStorage.getItem('cart')) || []
// }

// function getProductCount(productId) {
//   let cart = getCart()
//   let item = cart.find((p) => p.id === productId)

//   return item ? item.quantity : 0
// }

// function removeFromCart(productId) {
//   let cart = getCart()

//   let index = cart.findIndex((p) => p.id === productId)

//   if (index != -1) {
//     if (cart[index].quantity > 0) {
//       cart[index].quantity -= 1
//     }
//   } else {
//     cart.splice(index, 0)
//   }

//   setCart(cart)
// }

// function addToCart(productId) {
//   let cart = getCart()

//   let index = cart.findIndex((p) => p.id === productId)

//   if (index != -1) {
//     cart[index].quantity += 1
//   } else {
//     let item = products.find((p) => p.id === productId)

//     if (item) {
//       cart.push({ ...item, quantity: 1 })
//     }
//   }

//   setCart(cart)
// }

// function updateCartCount() {
//   let cart = getCart()
//   let cnt = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

//   document.querySelector('.productCnt').innerHTML = cnt
// }
