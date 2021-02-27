// import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import initialCards from '../scripts/cards.js';

// объявленные переменные
const editButtonOpened = document.querySelector('.profile__edit-button');
const addButtonOpened = document.querySelector('.profile__add-button');

const elementsTemplate = document.querySelector('.template');
// возможно удалить template
const cardsList = document.querySelector('.elements__list');

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_function_edit');
const popupAdd = document.querySelector('.popup_function_add');
const popupImage = document.querySelector('.popup_function_show');
const popupCardImage = popupImage.querySelector('.popup__image');

const submitEditForm = popupEdit.querySelector('.popup__input_function_edit');
const submitAddForm = popupAdd.querySelector('.popup__input_function_add');

// const submitButtonEdit = popupEdit.querySelector('.popup__submit_function_save');
// const submitButtonAdd = popupAdd.querySelector('.popup__submit_function_create');

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

//редактирование профиля, функция обработки формы редактирования
editButtonOpened.addEventListener('click', () => {
  if (popupEdit != null) {
    newName.value = nameInput.textContent;
    newOccupation.value = descriptionInput.textContent;
  }
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = newName.value;
  descriptionInput.textContent = newOccupation.value;
  closePopup(evt.target.closest('.popup'));
}

submitEditForm.addEventListener('submit', handleEditFormSubmit);

// кнопка удаления карточки
const deleteButton = (evt) => {
  evt.target.closest('.elements__card').remove();
}

// кнопка лайк карточки
const likeButton = (evt) => {
  evt.target.classList.toggle('elements__like_active');
}

// функция обработки события клика по картинке = открытие картинки 
const showImage = (newImage, newCaption) => {
  openPopup(popupImage);
  popupCardImage.src = newImage;
  popupImage.querySelector('.popup__caption').textContent = newCaption;
  popupCardImage.setAttribute('alt', newCaption);
}

// функция получения элементов карточки
const getCardElement = (newImage, newCaption) => {
  const newElement = elementsTemplate.content.cloneNode(true);
  const elementImage = newElement.querySelector('.elements__photo');
  const elementCardName = newElement.querySelector('.elements__card-name');
  const elementLike = newElement.querySelector('.elements__like');
  const elementDelete = newElement.querySelector('.elements__delete');
  elementImage.src = newImage;
  elementCardName.textContent = newCaption;
  elementImage.setAttribute('alt', newCaption);

  elementLike.addEventListener('click', likeButton);
  elementDelete.addEventListener('click', deleteButton);
  elementImage.addEventListener('click', () => {
    showImage(newImage, newCaption)
  });

  return newElement;
}

// использует функцию возвращения разметки карточки добавляя ее на страницу в определенную область разметки
const renderCards = (newImage, newCaption) => {
  const newElement = getCardElement(newImage, newCaption);
  cardsList.prepend(newElement);
}

// обработка элеменов массива
const addCard = (Array) => {
  Array.forEach((item) => {
    renderCards(item.link, item.name);
  })
}
addCard(initialCards);

// функция обработки формы добавления новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  renderCards(newLink.value, newPlace.value);
  closePopup(evt.target.closest('.popup'));
  submitAddForm.reset();
};
submitAddForm.addEventListener('submit', handleAddFormSubmit);

const editFormValidator = new FormValidator(validatorSettings, popupEdit);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validatorSettings, popupAdd);
addFormValidator.enableValidation();
