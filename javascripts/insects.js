const residentEntries = [...document.querySelectorAll('[data-resident-entry]')]
const residentOptions = [...document.querySelectorAll('.residentOption')]
const residentPhoto = document.querySelector('.residentPhoto')
const residentModal = document.querySelector('.residentModal')
const residentModalImage = document.querySelector('.residentModalImage')
const residentModalTitle = document.querySelector('#residentModalTitle')
const residentModalDescription = document.querySelector('.residentModalDescription')
const residentModalDetail = document.querySelector('.residentModalDetail')
const residentModalClose = document.querySelector('.residentModalClose')
const residentCloseControls = [...document.querySelectorAll('[data-resident-close]')]
const residentMoreButton = document.querySelector('.residentMoreButton')

let activeOption = residentOptions.find(
  (option) => option.getAttribute('aria-pressed') === 'true',
)
let lastFocusedControl = activeOption

const getResidentData = (option) => ({
  title: option.dataset.title || option.textContent.trim(),
  image: option.dataset.image || '',
  description: option.dataset.description || '',
  detail: option.dataset.detail || option.dataset.description || '',
})

const updateResidentPhoto = (option) => {
  if (!residentPhoto || !option) return

  const { title, image } = getResidentData(option)
  if (!image) return

  residentPhoto.src = image
  residentPhoto.alt = `${title}: фотография обитателя`
}

const setActiveResident = (option) => {
  if (!option) return

  residentEntries.forEach((entry) => entry.classList.remove('active'))
  residentOptions.forEach((residentOption) =>
    residentOption.setAttribute('aria-pressed', 'false'),
  )

  option.closest('[data-resident-entry]')?.classList.add('active')
  option.setAttribute('aria-pressed', 'true')
  activeOption = option
  updateResidentPhoto(option)
}

const openResidentModal = (option, trigger = option) => {
  if (!residentModal || !option) return

  const { title, image, description, detail } = getResidentData(option)

  setActiveResident(option)
  lastFocusedControl = trigger

  if (residentModalImage) {
    residentModalImage.src = image
    residentModalImage.alt = `${title}: фотография обитателя`
  }

  if (residentModalTitle) residentModalTitle.textContent = title
  if (residentModalDescription) residentModalDescription.textContent = description
  if (residentModalDetail) residentModalDetail.textContent = detail

  residentModal.hidden = false
  residentModal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('residentModalOpen')
  residentModalClose?.focus()
}

const closeResidentModal = () => {
  if (!residentModal || residentModal.hidden) return

  residentModal.hidden = true
  residentModal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('residentModalOpen')
  lastFocusedControl?.focus()
}

residentOptions.forEach((option) => {
  option.addEventListener('click', () => setActiveResident(option))
})

residentMoreButton?.addEventListener('click', () => {
  openResidentModal(activeOption, residentMoreButton)
})

residentCloseControls.forEach((control) => {
  control.addEventListener('click', closeResidentModal)
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeResidentModal()
})

if (activeOption) updateResidentPhoto(activeOption)
