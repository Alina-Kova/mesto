const openButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton =  popup.querySelector('.popup__close-button');

const submitForm = popup.querySelector('.popup__input');
const nameInput = document.querySelector('.profile__name');
const descriptionInput = document.querySelector('.profile__description');

const newName = submitForm.querySelector('.popup__text_type_name');
const newOccupation = submitForm.querySelector('.popup__text_type_occupation');

const like = document.querySelectorAll('.elements__like')

const togglePopup = () => {
    popup.classList.toggle('popup_opened')
};

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        togglePopup();
    }
});

openButton.addEventListener('click', (event) => {
    newName.value = nameInput.innerHTML;
    newOccupation.value = descriptionInput.innerHTML;
});

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameInput.textContent = newName.value;
    descriptionInput.textContent = newOccupation.value;
    togglePopup();
};

submitForm.addEventListener('submit', handleFormSubmit);

like.forEach(function(el) {
    el.addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like_active');
    });
});