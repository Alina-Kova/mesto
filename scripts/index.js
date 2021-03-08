import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import initialCards from '../scripts/cards.js';

// объявленные переменные
const editButtonOpened = document.querySelector('.profile__edit-button');
const addButtonOpened = document.querySelector('.profile__add-button');

const cardsList = document.querySelector('.elements__list');

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_function_edit');
const popupAdd = document.querySelector('.popup_function_add');
const popupImage = document.querySelector('.popup_function_show');
const popupCardImage = popupImage.querySelector('.popup__image');

const submitEditForm = popupEdit.querySelector('.popup__input_function_edit');
const submitAddForm = popupAdd.querySelector('.popup__input_function_add');

const nameInput = document.querySelector('.profile__name');
const descriptionInput = document.querySelector('.profile__description');
const newName = submitEditForm.querySelector('.popup__text_type_name');
const newOccupation = submitEditForm.querySelector('.popup__text_type_occupation');
const newLink = submitAddForm.querySelector('.popup__text_type_link');
const newPlace = submitAddForm.querySelector('.popup__text_type_place');

const validatorSettings = {
  formSelector: '.popup__input',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorClass: 'popup__error_active'
};

//функция открытия попапов
const openPopup = (popups) => {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', keyEscHandler);
}

editButtonOpened.addEventListener('click', () => openPopup(popupEdit));
addButtonOpened.addEventListener('click', () => openPopup(popupAdd));

//функция закрытия
const closePopup = (evt) => {
  evt.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', keyEscHandler);
}

// функция обработки попапов кликом по крестику или по overlay
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  });
});

//функция закрытия нажатием клавиши esc
const keyEscHandler = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.keyCode == 27) {
    closePopup(popupOpened)
  }
}

//редактирование профиля
editButtonOpened.addEventListener('click', () => {
  if (popupEdit != null) {
    newName.value = nameInput.textContent;
    newOccupation.value = descriptionInput.textContent;
  }
});

// функция обработки формы редактирования
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = newName.value;
  descriptionInput.textContent = newOccupation.value;
  closePopup(evt.target.closest('.popup'));
}

submitEditForm.addEventListener('submit', handleEditFormSubmit);

// функция обработки события клика по картинке = открытие картинки 
const showImage = (link, name) => {
  popupCardImage.src = link;
  popupImage.querySelector('.popup__caption').textContent = name;
  popupCardImage.setAttribute('alt', name);
  openPopup(popupImage);
}

// функция получения элементов карточки из класса Card
const createCard = (data) => {
  const card = new Card(data, '.template', showImage);
  const cardElement = card.generateCard();
  
  return cardElement;
}

// использует функцию возвращения разметки карточки добавляя ее на страницу в определенную область разметки
const renderCards = (item) => {
  const newElement = createCard(item);
  cardsList.prepend(newElement);
};

// обработка элеменов массива
const addCard = (Array) => {
  Array.forEach((item) => {
    renderCards(item);
  })
}
addCard(initialCards);

// функция обработки формы добавления новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const newItem = {
    link: newLink.value,
    name: newPlace.value
  };

  renderCards(newItem);
  closePopup(evt.target.closest('.popup'));
  submitAddForm.reset();
};
submitAddForm.addEventListener('submit', handleAddFormSubmit);

// создание экземпляра класса валидации для формы редактирования и включение в ней валидации
const editFormValidator = new FormValidator(validatorSettings, popupEdit);
editFormValidator.enableValidation();

// создание экземпляра класса для формы добавления карточки и включение в ней валидации
const addFormValidator = new FormValidator(validatorSettings, popupAdd);
addFormValidator.enableValidation();