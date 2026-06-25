// скрипты для всех страниц на сайте

{
  const burgerButton = document.querySelector('#burger')

  burgerButton?.addEventListener('click', () => {
    burgerButton.classList.toggle('active')
  })
}
