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
const ticketModalOpenCards = [...document.querySelectorAll('.eventCard')]
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
  const ticketModalOpenControls = [
    ticketModalOpen,
    ...ticketModalOpenCards,
  ].filter(Boolean)

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

  const openTicketModal = () => {
    if (ticketModal.open) return

    ticketFormStatus.textContent = ''
    ticketModal.showModal()
    document.body.classList.add('modalOpen')
  }

  ticketModalOpenControls.forEach((control) => {
    control.setAttribute('aria-haspopup', 'dialog')
    control.setAttribute('aria-controls', 'ticketModal')

    if (control.classList.contains('eventCard')) {
      control.setAttribute('role', 'button')
      control.setAttribute('tabindex', '0')
    }

    control.addEventListener('click', openTicketModal)

    control.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return

      event.preventDefault()
      openTicketModal()
    })
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
}
