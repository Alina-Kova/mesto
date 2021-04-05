import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithQuestion from '../components/PopupWithQuestion.js';
import Api from '../components/Api.js';

// объявленные переменные
const editButtonOpened = document.querySelector('.profile__edit-button');
const addButtonOpened = document.querySelector('.profile__add-button');
const avatarButtonOpened = document.querySelector('.profile__avatar');

const popupEdit = document.querySelector('.popup_function_edit');
const popupAdd = document.querySelector('.popup_function_add');
const popupAvatar = document.querySelector('.popup_function_edit-avatar');

const newName = document.querySelector('.popup__text_type_name');
const newOccupation = document.querySelector('.popup__text_type_occupation');
const newAvatar = document.querySelector('.popup__text_type_avatar-link');

const validatorSettings = {
	formSelector: '.popup__input',
	inputSelector: '.popup__text',
	submitButtonSelector: '.popup__submit',
	inactiveButtonClass: 'popup__submit_disabled',
	errorClass: 'popup__error_active'
};

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
	headers: {
		authorization: '06cbf485-9ed1-4992-a1f8-a932823be70b',
		'Content-Type': 'application/json'
	}
})

//создание класса попапа с картинкой
const fullSizeImage = new PopupWithImage('.popup_function_show');

//функция открытия попапа с картинкой
const popupImageClick = (link, name) => {
	fullSizeImage.open(link, name);
}
fullSizeImage.setEventListeners();

//cоздание класса с информацией о пользователе
const userInfo = new UserInfo({
	userName: '.profile__name',
	aboutUser: '.profile__description',
	userAvatar: '.profile__avatar'
});

// функция получения элементов карточки из класса Card
const cardCreation = (data, userData) => {
	const card = new Card({
		data: data,
		userData: userData,
		cardSelector: '.template',
		handleCardClick: (link, name) => {
			popupImageClick(link, name);
		},
		handleLikeClick: (cardId) => {
			if (card.likeCard()) {
				api.unlikeCard(cardId)
					.then((data) => {
						card.setLikesNumber(data)
					})
					.catch((error) => {
						console.log(error)
					})
			} else {
				api.showLikesNumber(cardId)
					.then((data) => {
						card.setLikesNumber(data)
					})
					.catch((error) => {
						console.log(error)
					})
			}
		},
		handleDeleteCardClick: (cardId) => {
			popupDeleteCard.open();
			popupDeleteCard.submitForm(() => {
				api.deleteCard(cardId)
					.then(() => {
						card.deleteCard();
						popupDeleteCard.close();
					})
					.catch((error) => {
						console.log(error)
					})
			})
		}
	});
	const cardElement = card.generateCard();
	return cardElement;
}

//создание класса, который отвечает за отрисовку элементов на странице
const cardList = new Section({
	items: {},
	renderer: (item, userData) => {
		const newElement = cardCreation(item, userData);
		cardList.addItem(newElement);
	},
}, '.elements__list')

//уведомление пользователя о процессе загрузки
const showLoadingStatus = (popup, saving) => {
	const popupSubmit = document.querySelector(popup).querySelector('.popup__submit');
	if (saving) {
		popupSubmit.value = 'Сохранение...';
	} else {
		popupSubmit.value = 'Cохранить';
	}
}

//создаем массив с промисами
const promises = [api.getInitialCards(), api.getPersonalInfo()];

//передаем массив с промисами методу Promise.all
Promise.all(promises)
	.then(([resetCard, resetUser]) => {
		userInfo.setUserInfo(resetUser._id, resetUser.name, resetUser.about, resetUser.avatar);
		cardList.setRenderedItems(resetCard);
		cardList.renderItems(resetUser);

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

		//обработчик события для кнопки сохранения нового аватара
		avatarButtonOpened.addEventListener('click', () => {
			newAvatar.value = userInfo.getUserInfo().avatar;
			changeAvatarFormValidator.toggleButtonState();
			popupChangeAvatar.open();
		});
	})
	.catch((error) => {
		console.log(error)
	})

//создание экземпляра класса для формы добавления карточки
const popupAddCard = new PopupWithForm({
	popupSelector: '.popup_function_add',
	handleFormSubmit: (item) => {
		showLoadingStatus('.popup_function_add', true);
		api.addNewCard({ link: item.url, name: item.placename })
			.then(data => {
				const newCard = cardCreation(data, userInfo.getUserInfo());
				cardList.addItemPrepend(newCard);
				popupAddCard.close();
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				showLoadingStatus('.popup_function_add', false);
			})
	}
})
popupAddCard.setEventListeners();

//создание экземпляра класса для формы редактирования информации о пользователе 
const popupEditCard = new PopupWithForm({
	popupSelector: '.popup_function_edit',
	handleFormSubmit: (data) => {
		showLoadingStatus('.popup_function_edit', true);
		api.showUserInfo({ name: data.fullname, about: data.occupation })
			.then(data => {
				userInfo.setUserInfo(data._id, data.name, data.about, data.avatar);
				popupEditCard.close();
				showLoadingStatus('.popup_function_edit', false);
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				showLoadingStatus('.popup_function_edit', false);
			})
	}
})
popupEditCard.setEventListeners();

//создание экземпляра класса для попапа удаления карточки
const popupDeleteCard = new PopupWithQuestion({
	popupSelector: '.popup_function_delete-card',
	handleFormSubmit: (cardId) => {
		api.deleteCard(cardId)
			.then(() => {
				popupDeleteCard.close();
			})
			.catch((error) => {
				console.log(error)
			})
	}
})
popupDeleteCard.setEventListeners();

//создание экземпляра класса для формы изменения аватара
const popupChangeAvatar = new PopupWithForm({
	popupSelector: '.popup_function_edit-avatar',
	handleFormSubmit: (data) => {
		showLoadingStatus('.popup_function_edit-avatar', true)
		api.editAvatar({ avatar: data.link })
			.then(data => {
				userInfo.setUserInfo(data._id, data.name, data.about, data.avatar);
				popupChangeAvatar.close();
			})
			.catch((error) => {
				console.log(error)
			})
			.finally(() => {
				showLoadingStatus('.popup_function_edit-avatar', false);
			})
	}
})
popupChangeAvatar.setEventListeners();

// создание экземпляра класса валидации для формы редактирования и включение в ней валидации
const editFormValidator = new FormValidator(validatorSettings, popupEdit);
editFormValidator.enableValidation();

// создание экземпляра класса для формы добавления карточки и включение в ней валидации
const addFormValidator = new FormValidator(validatorSettings, popupAdd);
addFormValidator.enableValidation();

// создание экземпляра класса для формы изменения аватара и включение в ней валидации
const changeAvatarFormValidator = new FormValidator(validatorSettings, popupAvatar);
changeAvatarFormValidator.enableValidation();