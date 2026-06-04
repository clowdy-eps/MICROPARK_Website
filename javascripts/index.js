initAboutTrail()
initAccordion()
initFooterForm()

function initAboutTrail() {
  let field = document.querySelector('.aboutImageField')
  if (!field) return

  let images = field.dataset.trailImages.split(',')
  let imageIndex = 0
  let lastStamp = 0

  field.addEventListener('mousemove', (event) => {
    let now = Date.now()
    if (now - lastStamp < 130) return

    lastStamp = now
    let rect = field.getBoundingClientRect()
    let image = document.createElement('img')

    image.className = 'trailImage'
    image.src = images[imageIndex]
    image.alt = ''
    image.style.left = `${event.clientX - rect.left}px`
    image.style.top = `${event.clientY - rect.top}px`

    field.appendChild(image)
    imageIndex = (imageIndex + 1) % images.length

    image.addEventListener('animationend', () => {
      image.remove()
    })
  })
}

function initAccordion() {
  let buttons = document.querySelectorAll('.accordionItem')

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      let panel = button.nextElementSibling

      button.classList.toggle('active')
      if (panel) {
        panel.classList.toggle('open')
      }
    })
  })
}

function initFooterForm() {
  let footerForm = document.querySelector('.footerSubscribe form')

  if (footerForm) {
    footerForm.addEventListener('submit', (event) => {
      event.preventDefault()
    })
  }
}
