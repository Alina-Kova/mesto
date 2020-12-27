let openButton = document.querySelector('.popup_open')
let overlay = document.querySelector('.overlay')
let closeButton =  document.querySelector('.close-button')

openButton.addEventListener('click', () => {
    overlay.classList.add('overlay_active')
})

closeButton.addEventListener('click', () => {
    console.log("clicked")
    overlay.classList.remove('overlay_active')
    })