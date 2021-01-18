const editButtonOpened = document.querySelector('.profile__edit-button');
const addButtonOpened = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_function_edit');
const popupAdd = document.querySelector('.popup_function_add');

const closeButtonAdd = popupAdd.querySelector('.popup__close-button_form_add');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button_form_edit');

const submitForm = document.querySelector('.popup__input');

const nameInput = document.querySelector('.profile__name');
const descriptionInput = document.querySelector('.profile__description');
const newName = popup.querySelector('.popup__text_type_name');
const newOccupation = popup.querySelector('.popup__text_type_occupation');

const newPlace = document.querySelector('.popup__text_type_place');
const newLink = document.querySelector('.popup__text_type_link');

const card = document.querySelector('.elements__card');
const images = document.querySelector('.elements__photo');
const placeName = document.querySelector('.elements__card-name');
const like = document.querySelectorAll('.elements__like');

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

// открытие/закрытие формы редактирования профиля
const togglePopupEdit = () => {
    popupEdit.classList.toggle('popup_opened')
};

editButtonOpened.addEventListener('click', togglePopupEdit);
closeButtonEdit.addEventListener('click', togglePopupEdit);

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

//редактирование формы редактирования профиля
editButtonOpened.addEventListener('click', (event) => {
    newName.value = nameInput.innerHTML;
    newOccupation.value = descriptionInput.innerHTML;
});

// addButtonOpened.addEventListener('click', (event) => {
//     newPlace.value = placeName.innerHTML;
//     newLink.value = image.insertAdjustmentHTML;
// });

function handleFormSubmit(evt) {
    evt.preventDefault();

    nameInput.textContent = newName.value;
    descriptionInput.textContent = newOccupation.value;
    togglePopupEdit();
};

submitForm.addEventListener('submit', handleFormSubmit);


//кнопка лайк
like.forEach(function (el) {
    el.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
    });
});

//кнопка удалить
// delete.forEach(function (el) {
//     el.addEventListener('click', function (evt) {
//         evt.target.closest('elements__delete').remove();
//     });
// });



//рендер карточек
// function render() {
//     // card.forEach(() => {
//     card.insertAdjustmentHTML('beforeend',
//         `<li class="elements__card">
//             <img src="./Images/karachaevo.jpg" alt="Карачаево-Черкессия" class="elements__photo">
//             <div class="elements__caption">
//                 <h2 class="elements__card-name">Карачаево-Черкессия</h2>
//                 <button class="elements__like" type="button"></button>
//             </div>
//         </li>`
//     );
//     // })
// }

// render();