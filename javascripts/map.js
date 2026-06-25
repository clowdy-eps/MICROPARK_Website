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
