const editButtonOpened = document.querySelector('.profile__edit-button');
const addButtonOpened = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_function_edit');
const popupAdd = document.querySelector('.popup_function_add');

const closeButtonAdd = popupAdd.querySelector('.popup__close-button_form_add');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button_form_edit');

// const submitForm = document.querySelector('.popup__input');
const submitEditForm = document.querySelector('.popup__input_function_edit');
const submitAddForm = document.querySelector('.popup__input_function_add');

const nameInput = document.querySelector('.profile__name');
const descriptionInput = document.querySelector('.profile__description');
const newName = popup.querySelector('.popup__text_type_name');
const newOccupation = popup.querySelector('.popup__text_type_occupation');

const images = document.querySelector('.elements__photo');
const placeName = document.querySelector('.elements__card-name');

// открытие/закрытие формы редактирования профиля
const togglePopupEdit = () => {
    popupEdit.classList.toggle('popup_opened')
};

editButtonOpened.addEventListener('click', togglePopupEdit);
closeButtonEdit.addEventListener('click', togglePopupEdit);

// function closeEditForm() {
//   closeButtonEdit.addEventListener('click', togglePopupEdit);
//   // popupEdit.remove();
// }

// closeEditForm();

// возможность закрытия попапа кликом по overlay
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

// возможность закрытия попапа кликом по overlay    
popupAdd.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        togglePopupAdd();
    }
});

//редактирование профиля, функция обработки формы редактирования
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

// функция обработки формы добакления карточек
// function handleAddFormSubmit(evt) {
//   evt.preventDefault();

//   const placeInput = newPlace.value;
//   const linkInput = newLink.value;
//   let data = {
//     name: placeInput,
//     link: linkInput
//   };
//   const newCard = createCard(data);
//   list.prepend(newCard);
//   submitAddForm.reset();
//   togglePopupAdd();
// };


//кнопка лайк
// like.forEach(function (el) {
//     el.addEventListener('click', function (evt) {
//         evt.target.classList.toggle('elements__like_active');
//     });
// });

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

const deleteButton = (evt) => {
  evt.target.closest('.elements__card').remove();
}

const likeButton = (evt) => {
  evt.target.classList.toggle('elements__like_active');
}

// функция обработки формы добакления карточек
const renderCard = (newImage, newCaption) => {
  const elementsTemplate = document.querySelector('.template').content;
  const newElement = elementsTemplate.cloneNode(true);
  newElement.querySelector('.elements__photo').src = newImage;
  newElement.querySelector('.elements__card-name').textContent = newCaption;
  newElement.querySelector('.elements__photo').setAttribute('alt', newCaption)
  const cardsList = document.querySelector('.elements__list');
  cardsList.prepend(newElement);

  document.querySelector('.elements__like').addEventListener('click', likeButton);
  document.querySelector('.elements__delete').addEventListener('click', deleteButton);
}

const addCard = (Array) => {
  Array.forEach((item) => {
    renderCard(item.link, item.name);
  })
}

addCard(initialCards);

// const handleAddFormSubmit = (evt) => {
//   const newPlace = document.querySelector('.popup__text_type_place');
//   const newLink = document.querySelector('.popup__text_type_link');
//   renderCard(newPlace, newLink);
//   togglePopupAdd();
// }
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const newLink = document.querySelector('.popup__text_type_link').value;
  const newPlace = document.querySelector('.popup__text_type_place').value;
  renderCard(newLink, newPlace);
  togglePopupAdd();
};

submitAddForm.addEventListener('submit', handleAddFormSubmit);