const categoryLinks = [...document.querySelectorAll('[data-category-link]')]
const productRows = [...document.querySelectorAll('[data-category]')]
const cartCount = document.querySelector('#cartCount')
const mainMenu = document.querySelector('.mainMenu')
const burger = document.querySelector('#burger')

let totalItems = 1

function updateHeaderHeight() {
  const headerHeight =
    window.innerWidth <= 600 ? 64 : mainMenu?.getBoundingClientRect().height

  if (headerHeight) {
    document.body.style.setProperty('--shop-header-height', `${headerHeight}px`)
  }
}

updateHeaderHeight()
window.addEventListener('resize', updateHeaderHeight)

function setActiveCategory(category) {
  categoryLinks.forEach((link) => {
    const isActive = link.dataset.categoryLink === category
    link.classList.toggle('active', isActive)

    if (isActive) {
      link.setAttribute('aria-current', 'true')
    } else {
      link.removeAttribute('aria-current')
    }
  })
}

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
