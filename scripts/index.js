const editButtonOpened = document.querySelector('.profile__edit-button');
const addButtonOpened = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_function_edit');
const popupAdd = document.querySelector('.popup_function_add');
const popupImage = document.querySelector('.popup_function_show');

const closeButtonAdd = popupAdd.querySelector('.popup__close-button_form_add');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button_form_edit');
const closeButtonShow = popupImage.querySelector('.popup__close-image');

const submitEditForm = document.querySelector('.popup__input_function_edit');
const submitAddForm = document.querySelector('.popup__input_function_add');

const nameInput = document.querySelector('.profile__name');
const descriptionInput = document.querySelector('.profile__description');
const newName = popup.querySelector('.popup__text_type_name');
const newOccupation = popup.querySelector('.popup__text_type_occupation');

// открытие/закрытие формы редактирования профиля
const togglePopupEdit = () => {
    popupEdit.classList.toggle('popup_opened')
};

editButtonOpened.addEventListener('click', togglePopupEdit);
closeButtonEdit.addEventListener('click', togglePopupEdit);

// возможность закрытия окна редактирования профиля кликом по overlay
popupEdit.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        togglePopupEdit();
    }
});

// открытие/закрытие формы добавления карточек
const togglePopupAdd = () => {
    popupAdd.classList.toggle('popup_opened')
};
    
addButtonOpened.addEventListener('click', togglePopupAdd);
closeButtonAdd.addEventListener('click', togglePopupAdd);

// возможность закрытия окна добавления карточек кликом по overlay    
popupAdd.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        togglePopupAdd();
    }
});

//редактирование профиля, функция обработки формы редактирования изначальная версия
editButtonOpened.addEventListener('click', (event) => {

    newName.value = nameInput.innerHTML;
    newOccupation.value = descriptionInput.innerHTML;
});

function handleEditFormSubmit(evt) {
    evt.preventDefault();

    nameInput.textContent = newName.value;
    descriptionInput.textContent = newOccupation.value;

    togglePopupEdit();
};

submitEditForm.addEventListener('submit', handleEditFormSubmit);

// массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// кнопка удаления карточки
const deleteButton = (evt) => {
  evt.target.closest('.elements__card').remove();
}

// кнопка лайк карточки
const likeButton = (evt) => {
  evt.target.classList.toggle('elements__like_active');
}

// открытие/закрытие формы с картинками коиком по крестику
const togglePopupImage = () => {
  popupImage.classList.toggle('popup_opened')
};

closeButtonShow.addEventListener('click', togglePopupImage);

// открытие/закрытие формы с картинками кликом по overlay
popupImage.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    togglePopupImage();
  }
});

// функция обработки события клика по картинке = открытие картинки 
const showImage = (evt) => {
  togglePopupImage();
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__caption').textContent = evt.target.nextElementSibling.querySelector('.elements__card-name').textContent;
}

// функция обработки формы добакления карточек
const renderCard = (newImage, newCaption) => {
  const elementsTemplate = document.querySelector('.template').content;
  const newElement = elementsTemplate.cloneNode(true);
  newElement.querySelector('.elements__photo').src = newImage;
  newElement.querySelector('.elements__card-name').textContent = newCaption;
  newElement.querySelector('.elements__photo').setAttribute('alt', newCaption);
  const cardsList = document.querySelector('.elements__list');
  cardsList.prepend(newElement);

  cardsList.querySelector('.elements__like').addEventListener('click', likeButton);
  cardsList.querySelector('.elements__delete').addEventListener('click', deleteButton);
  cardsList.querySelector('.elements__photo').addEventListener('click', showImage);
}

// обработка элеменов массива
const addCard = (Array) => {
  Array.forEach((item) => {
    renderCard(item.link, item.name);
  })
}

addCard(initialCards);

// функция обработки формы добавления новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const newLink = document.querySelector('.popup__text_type_link').value;
  const newPlace = document.querySelector('.popup__text_type_place').value;

  renderCard(newLink, newPlace);
  togglePopupAdd();
};

submitAddForm.addEventListener('submit', handleAddFormSubmit);