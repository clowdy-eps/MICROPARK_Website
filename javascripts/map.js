const mapArtwork = document.querySelector('.mapArtwork')
const mapPopup = document.querySelector('.mapPopup')
const mapPoints = [...document.querySelectorAll('.mapPoint')]
const mapPlaces = [...document.querySelectorAll('.mapPlace')]

if (mapArtwork && mapPopup && mapPoints.length > 0) {
  const popupClose = mapPopup.querySelector('.mapPopupClose')
  const popupLabel = mapPopup.querySelector('.mapPopupLabel')
  const popupTitle = mapPopup.querySelector('.mapPopupTitle')
  const popupText = mapPopup.querySelector('.mapPopupText')
  let activePoint = null

  function closeMapPopup() {
    mapPopup.classList.remove('open', 'below')
    mapPopup.setAttribute('aria-hidden', 'true')
    mapPoints.forEach((point) => point.setAttribute('aria-expanded', 'false'))
    mapPlaces.forEach((place) => place.classList.remove('active'))
    activePoint = null
  }

  function openMapPopup(point) {
    const artworkRect = mapArtwork.getBoundingClientRect()
    const pointRect = point.getBoundingClientRect()
    const pointCenterX = pointRect.left - artworkRect.left + pointRect.width / 2
    const pointCenterY = pointRect.top - artworkRect.top + pointRect.height / 2
    const safeX = Math.max(16, Math.min(pointCenterX, artworkRect.width - 16))
    const placeBelow = pointCenterY < 190

    popupLabel.textContent = point.dataset.placeKind || ''
    popupTitle.textContent = point.dataset.placeTitle || ''
    popupText.textContent = point.dataset.placeDescription || ''
    mapPopup.style.left = `${safeX}px`
    mapPopup.style.top = `${Math.max(16, pointCenterY)}px`
    mapPopup.classList.toggle('below', placeBelow)
    mapPopup.classList.add('open')
    mapPopup.setAttribute('aria-hidden', 'false')
    mapPoints.forEach((mapPoint) => {
      mapPoint.setAttribute('aria-expanded', String(mapPoint === point))
    })
    mapPlaces.forEach((place) => {
      place.classList.toggle('active', place.dataset.placeTarget === point.dataset.placeId)
    })
    activePoint = point
  }

  mapPoints.forEach((point) => {
    point.addEventListener('click', () => {
      if (point === activePoint && mapPopup.classList.contains('open')) {
        closeMapPopup()
        return
      }

      openMapPopup(point)
    })
  })

  mapPlaces.forEach((place) => {
    place.addEventListener('click', () => {
      const point = mapPoints.find(
        (mapPoint) => mapPoint.dataset.placeId === place.dataset.placeTarget,
      )

      if (!point) return

      openMapPopup(point)
    })
  })

  popupClose.addEventListener('click', closeMapPopup)

  document.addEventListener('click', (event) => {
    if (!mapPopup.classList.contains('open')) return
    if (mapArtwork.contains(event.target)) return
    if (event.target.closest('.mapPlace')) return

    closeMapPopup()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMapPopup()
  })

  window.addEventListener('resize', () => {
    if (!activePoint) return

    openMapPopup(activePoint)
  })
}

const guide = document.querySelector('.guideViewer')

if (guide) {
  const pageFiles = [
    'cover.png',
    'contents.png',
    ...Array.from(
      { length: 25 },
      (_, index) => `page${String(index + 1).padStart(2, '0')}.png`,
    ),
  ]
  const slidesContainer = guide.querySelector('.guideSlides')
  const previousButton = guide.querySelector('.guidePrev')
  const nextButton = guide.querySelector('.guideNext')
  const currentLabel = guide.querySelector('.guideCurrent')
  const totalLabel = guide.querySelector('.guideTotal')
  let currentSlide = 0
  let touchStartX = 0

  pageFiles.forEach((fileName, index) => {
    const slide = document.createElement('figure')
    const image = document.createElement('img')

    slide.className = 'guideSpread'
    slide.setAttribute('aria-hidden', String(index !== 0))
    image.src = `images/pages/${fileName}`
    image.alt =
      index === 0
        ? 'Обложка путеводителя по Микропарку'
        : index === 1
          ? 'Содержание путеводителя'
          : `Разворот ${index + 1} путеводителя по Микропарку`
    image.loading = index < 2 ? 'eager' : 'lazy'
    image.decoding = 'async'

    slide.append(image)
    slidesContainer.append(slide)
  })

  const slides = [...guide.querySelectorAll('.guideSpread')]

  totalLabel.textContent = String(slides.length).padStart(2, '0')

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentSlide
      slide.classList.toggle('active', isActive)
      slide.setAttribute('aria-hidden', String(!isActive))
    })

    currentLabel.textContent = String(currentSlide + 1).padStart(2, '0')
  }

  previousButton.addEventListener('click', () => {
    showSlide(currentSlide - 1)
  })

  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1)
  })

  guide.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showSlide(currentSlide - 1)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showSlide(currentSlide + 1)
    }
  })

  slidesContainer.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.changedTouches[0].clientX
    },
    { passive: true },
  )

  slidesContainer.addEventListener(
    'touchend',
    (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX

      if (Math.abs(distance) < 50) return

      showSlide(currentSlide + (distance < 0 ? 1 : -1))
    },
    { passive: true },
  )

  showSlide(0)
}
