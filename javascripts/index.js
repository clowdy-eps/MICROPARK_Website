<<<<<<< Updated upstream
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
=======
const faqQuestions = document.querySelectorAll('.faqQuestion')

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faqItem')
    const isOpen = !item.classList.contains('open')

    faqQuestions.forEach((otherQuestion) => {
      const otherItem = otherQuestion.closest('.faqItem')

      otherItem.classList.remove('open')
      otherQuestion.setAttribute('aria-expanded', 'false')
    })

    if (isOpen) {
      item.classList.add('open')
      question.setAttribute('aria-expanded', 'true')
    }
  })
})

const ticketModal = document.querySelector('#ticketModal')
const ticketModalOpen = document.querySelector('#ticketModalOpen')
const ticketModalClose = ticketModal?.querySelector('.ticketModalClose')
const ticketForm = ticketModal?.querySelector('.ticketForm')
const ticketFormStatus = ticketModal?.querySelector('.ticketFormStatus')
const visitDateInput = ticketForm?.querySelector('input[type="date"]')

if (
  ticketModal &&
  ticketModalOpen &&
  ticketModalClose &&
  ticketForm &&
  ticketFormStatus
) {
  if (visitDateInput) {
    const today = new Date()
    const timezoneOffset = today.getTimezoneOffset() * 60000

    visitDateInput.min = new Date(today - timezoneOffset)
      .toISOString()
      .split('T')[0]
  }

  const closeTicketModal = () => {
    ticketModal.close()
    document.body.classList.remove('modalOpen')
    ticketFormStatus.textContent = ''
  }

  ticketModalOpen.addEventListener('click', () => {
    ticketFormStatus.textContent = ''
    ticketModal.showModal()
    document.body.classList.add('modalOpen')
  })

  ticketModalClose.addEventListener('click', closeTicketModal)

  ticketModal.addEventListener('click', (event) => {
    if (event.target === ticketModal) closeTicketModal()
  })

  ticketModal.addEventListener('close', () => {
    document.body.classList.remove('modalOpen')
  })

  ticketForm.addEventListener('submit', (event) => {
    event.preventDefault()
    ticketFormStatus.textContent = 'Данные заполнены — билет готов к оформлению'
  })
>>>>>>> Stashed changes
}
