let openButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton =  popup.querySelector('.popup__close-button');

let submitForm = popup.querySelector('.popup__input');
let nameInput = document.querySelector('.profile__name');
let descriptionInput = document.querySelector('.profile__description');

let newName = submitForm.querySelector('.popup__text_type_name');
let newOccupation = submitForm.querySelector('.popup__text_type_occupation');

let togglePopup = () => {
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