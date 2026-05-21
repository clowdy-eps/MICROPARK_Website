// скрипты для всех страниц на сайте

burger()

function burger() {
  let burger = document.querySelector('#burger')

  burger.addEventListener('click', () => {
    burger.classList.toggle('active')
  })
}
