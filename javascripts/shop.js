<<<<<<< Updated upstream
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
=======
const categoryLinks = [...document.querySelectorAll('[data-category-link]')]
const productRows = [...document.querySelectorAll('[data-category]')]
const cartCount = document.querySelector('#cartCount')
const mainMenu = document.querySelector('.mainMenu')
const burger = document.querySelector('#burger')

let totalItems = 1
>>>>>>> Stashed changes

function updateHeaderHeight() {
  const headerHeight =
    window.innerWidth <= 600 ? 64 : mainMenu?.getBoundingClientRect().height

<<<<<<< Updated upstream
  if (!productList) return
=======
  if (headerHeight) {
    document.body.style.setProperty('--shop-header-height', `${headerHeight}px`)
  }
}
>>>>>>> Stashed changes

updateHeaderHeight()
window.addEventListener('resize', updateHeaderHeight)

<<<<<<< Updated upstream
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
=======
function setActiveCategory(category) {
  categoryLinks.forEach((link) => {
    const isActive = link.dataset.categoryLink === category
    link.classList.toggle('active', isActive)

    if (isActive) {
      link.setAttribute('aria-current', 'true')
    } else {
      link.removeAttribute('aria-current')
>>>>>>> Stashed changes
    }
  })
}

<<<<<<< Updated upstream
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
=======
function updateCategoryFromScroll() {
  const activationLine = Math.min(window.innerHeight * 0.38, 300)
  let currentCategory = productRows[0]?.dataset.category

  productRows.forEach((row) => {
    if (row.getBoundingClientRect().top <= activationLine) {
      currentCategory = row.dataset.category
    }
  })

  if (currentCategory) setActiveCategory(currentCategory)
}

let scrollFrame

window.addEventListener(
  'scroll',
  () => {
    cancelAnimationFrame(scrollFrame)
    scrollFrame = requestAnimationFrame(updateCategoryFromScroll)
  },
  { passive: true },
)

window.addEventListener('resize', updateCategoryFromScroll)
updateCategoryFromScroll()

categoryLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const row = document.querySelector(link.getAttribute('href'))
    if (!row) return

    event.preventDefault()
    row.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveCategory(link.dataset.categoryLink)
  })
})

function renderQuantity(product, quantity) {
  const currentControl = product.querySelector('.quantityControl')
  const addButton = product.querySelector('[data-add]')

  if (quantity <= 0) {
    currentControl?.remove()
    const button = document.createElement('button')
    button.className = 'addButton'
    button.type = 'button'
    button.dataset.add = ''
    button.textContent = 'В корзину'
    product.querySelector('.productInfo').append(button)
    return
  }

  if (addButton) {
    const control = document.createElement('div')
    control.className = 'quantityControl'
    control.dataset.quantity = String(quantity)
    control.innerHTML = `
      <button type="button" data-action="minus" aria-label="Уменьшить количество">−</button>
      <span>${quantity}</span>
      <button type="button" data-action="plus" aria-label="Увеличить количество">+</button>
    `
    addButton.replaceWith(control)
  } else if (currentControl) {
    currentControl.dataset.quantity = String(quantity)
    currentControl.querySelector('span').textContent = String(quantity)
  }
}

document.querySelector('.productRows').addEventListener('click', (event) => {
  const product = event.target.closest('[data-product]')
  if (!product) return

  if (event.target.closest('[data-add]')) {
    totalItems += 1
    renderQuantity(product, 1)
  }

  const actionButton = event.target.closest('[data-action]')
  if (actionButton) {
    const control = actionButton.closest('.quantityControl')
    const currentQuantity = Number(control.dataset.quantity)
    const nextQuantity =
      actionButton.dataset.action === 'plus'
        ? currentQuantity + 1
        : Math.max(0, currentQuantity - 1)

    totalItems += nextQuantity - currentQuantity
    renderQuantity(product, nextQuantity)
  }

  cartCount.textContent = String(totalItems)
})

burger?.addEventListener('click', () => {
  burger.classList.toggle('active')
})

mainMenu?.addEventListener('click', (event) => {
  if (!event.target.closest('a') || window.innerWidth > 600) return
  burger?.classList.remove('active')
})
>>>>>>> Stashed changes
