import '../pages/index.css';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import initialCards from '../scripts/cards.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';

// объявленные переменные
const editButtonOpened = document.querySelector('.profile__edit-button');
const addButtonOpened = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_function_edit');
const popupAdd = document.querySelector('.popup_function_add');

const newName = document.querySelector('.popup__text_type_name');
const newOccupation = document.querySelector('.popup__text_type_occupation');
const newLink = document.querySelector('.popup__text_type_link');
const newPlace = document.querySelector('.popup__text_type_place');

const validatorSettings = {
  formSelector: '.popup__input',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorClass: 'popup__error_active'
};

//создание класса попапа с картинкой
const fullSizeImage = new PopupWithImage('.popup_function_show');

//функция открытия попапа с картинкой
const popupImageClick = (link, name) => {
  fullSizeImage.open(link, name);
}
fullSizeImage.setEventListeners();

//cоздание класса с информацией о пользователе
const userInfo = new UserInfo('.profile__name', '.profile__description');

// функция получения элементов карточки из класса Card
const cardCreation = (item) => {
        const card = new Card(item, '.template', popupImageClick);
    const cardElement = card.generateCard();
    return cardElement;
  }

//создание класса, который отвечает за отрисовку элементов на странице
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newElement = cardCreation(item);
    cardList.addItem(newElement);
  },
}, '.elements__list')

cardList.renderItems();

//создание экземпляра класса для формы добавления карточки
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_function_add',
  handleFormSubmit: () => {
    const newItem = {
    link: newLink.value,
    name: newPlace.value
    }
    const newCard = cardCreation(newItem);
    cardList.addItem(newCard);
    popupAddCard.close();
    }
})
popupAddCard.setEventListeners();

//создание экземпляра класса для формы редактирования информации о пользователе
const popupEditCard = new PopupWithForm({
  popupSelector: '.popup_function_edit', 
  handleFormSubmit: () => {
    userInfo.setUserInfo(newName.value, newOccupation.value);
    popupEditCard.close();
  }
})
console.log(userInfo);
popupEditCard.setEventListeners();

// создание экземпляра класса валидации для формы редактирования и включение в ней валидации
const editFormValidator = new FormValidator(validatorSettings, popupEdit);
editFormValidator.enableValidation();

// создание экземпляра класса для формы добавления карточки и включение в ней валидации
const addFormValidator = new FormValidator(validatorSettings, popupAdd);
addFormValidator.enableValidation();


//Обработчик события для кнопки добавления карточки
addButtonOpened.addEventListener('click', () => {
  addFormValidator.toggleButtonState();
  popupAddCard.open();
});

//обработчик события для кнопки сабмита формы с информацией о пользователе
editButtonOpened.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  newName.value = userData.name;
  newOccupation.value = userData.about;

  editFormValidator.toggleButtonState();
  popupEditCard.open();
});