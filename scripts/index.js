// объявленные переменные
const editButtonOpened = document.querySelector('.profile__edit-button');
const addButtonOpened = document.querySelector('.profile__add-button');

const elementsTemplate = document.querySelector('.template');
const cardsList = document.querySelector('.elements__list');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_function_edit');
const popupAdd = document.querySelector('.popup_function_add');
const popupImage = document.querySelector('.popup_function_show');

const closeButtonAdd = popupAdd.querySelector('.popup__close-button_form_add');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button_form_edit');
const closeButtonShow = popupImage.querySelector('.popup__close-image');

const submitEditForm = popupEdit.querySelector('.popup__input_function_edit');
const submitAddForm = popupAdd.querySelector('.popup__input_function_add');

const submitButtonEdit = popupEdit.querySelector('.popup__submit_function_save');
const submitButtonAdd = popupAdd.querySelector('.popup__submit_function_create');

const nameInput = document.querySelector('.profile__name');
const descriptionInput = document.querySelector('.profile__description');
const newName = popup.querySelector('.popup__text_type_name');
const newOccupation = popup.querySelector('.popup__text_type_occupation');

//функция открытия попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

editButtonOpened.addEventListener('click', () => openPopup(popupEdit));
addButtonOpened.addEventListener('click', () => openPopup(popupAdd));

//функция закрытия попапов кликом по кнопе закрытия
const closePopup = (evt) => {
  evt.target.closest('.popup').classList.remove('popup_opened')
};

closeButtonEdit.addEventListener('click', closePopup);
closeButtonAdd.addEventListener('click', closePopup);
closeButtonShow.addEventListener('click', closePopup);

submitButtonAdd.addEventListener('click', closePopup);
submitButtonEdit.addEventListener('click', closePopup);

//функция закрытия попапов кликом по overlay
function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    evt.target.closest('.popup').classList.remove('popup_opened')
  }
}

popupEdit.addEventListener('click', closeOverlay);
popupAdd.addEventListener('click', closeOverlay);
popupImage.addEventListener('click', closeOverlay);

//редактирование профиля, функция обработки формы редактирования
editButtonOpened.addEventListener('click', () => {

  newName.value = nameInput.textContent;
  newOccupation.value = descriptionInput.textContent;
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  nameInput.textContent = newName.value;
  descriptionInput.textContent = newOccupation.value;

  submitButtonEdit.addEventListener('click', closePopup);
};

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
const showImage = (evt) => {
  openPopup(popupImage);
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__caption').textContent = evt.target.nextElementSibling.querySelector('.elements__card-name').textContent;
  popupImage.querySelector('.popup__image').setAttribute('alt', document.querySelector('.elements__card-name').textContent);
}

// функция получения элементов карточки
const getCardElement = (newImage, newCaption) => {
  const newElement = elementsTemplate.content.cloneNode(true);

  newElement.querySelector('.elements__photo').src = newImage;
  newElement.querySelector('.elements__card-name').textContent = newCaption;
  newElement.querySelector('.elements__photo').setAttribute('alt', newCaption);

  newElement.querySelector('.elements__like').addEventListener('click', likeButton);
  newElement.querySelector('.elements__delete').addEventListener('click', deleteButton);
  newElement.querySelector('.elements__photo').addEventListener('click', showImage);

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

  const newLink = submitAddForm.querySelector('.popup__text_type_link').value;
  const newPlace = submitAddForm.querySelector('.popup__text_type_place').value;

  renderCards(newLink, newPlace);

  submitButtonAdd.addEventListener('click', closePopup);
  submitAddForm.reset();
};
submitAddForm.addEventListener('submit', handleAddFormSubmit);