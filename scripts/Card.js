class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
		this._data = data;
		this._name = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._handleLikeClick = handleLikeClick;
	}
	
		// constructor({ data, userData, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
		// 	this._cardSelector = cardSelector;
		// 	this._name = data.name;
		// 	this._handleCardClick = handleCardClick;
		// 	this._link = data.link;
		// 	this._data = data;
		// 	this._handleLikeClick = handleLikeClick;
		// 	this._handleDeleteIconClick = handleDeleteIconClick;
		// 	this._userData = userData
		// }

	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content
			.querySelector('.elements__card')
			.cloneNode(true);

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();
		// this._setDeleteIcon();

		this._elementImage.src = this._link;
		this._elementImage.alt = this._name;
		this._element.querySelector('.element__title').textContent = this._name;

		return this._element;
	}

	_likeButton() {
		this._element.target.classList.toggle('elements__like_active');
	}

	_deleteButton() {
		this._element.target.closest('.elements__card').remove();
	}

  
// // кнопка удаления карточки
//     const deleteButton = (evt) => {
//         evt.target.closest('.elements__card').remove();
//       }
      
//       // кнопка лайк карточки
//       const likeButton = (evt) => {
//         evt.target.classList.toggle('elements__like_active');
//       }

      // функция получения элементов карточки
// const getCardElement = (newImage, newCaption) => {
//     const newElement = elementsTemplate.content.cloneNode(true);
//     const elementImage = newElement.querySelector('.elements__photo');
//     const elementCardName = newElement.querySelector('.elements__card-name');
//     const elementLike = newElement.querySelector('.elements__like');
//     const elementDelete = newElement.querySelector('.elements__delete');
//     elementImage.src = newImage;
//     elementCardName.textContent = newCaption;
//     elementImage.setAttribute('alt', newCaption);
  
//     elementLike.addEventListener('click', likeButton);
//     elementDelete.addEventListener('click', deleteButton);
//     elementImage.addEventListener('click', () => {
//       showImage(newImage, newCaption)
//     });

//     return newElement;
// }

// // использует функцию возвращения разметки карточки добавляя ее на страницу в определенную область разметки
// const renderCards = (newImage, newCaption) => {
//     const newElement = getCardElement(newImage, newCaption);
//     cardsList.prepend(newElement);
//   }
  
//   // обработка элеменов массива
//   const addCard = (Array) => {
//     Array.forEach((item) => {
//       renderCards(item.link, item.name);
//     })
//   }
//   addCard(initialCards);

_setEventListeners() {
	this._elementImage = this._element.querySelector('.elements__photo');
	this._elementLike = this._element.querySelector('.elements__like');
	this._elementDelete = this._element.querySelector('.elements__delete');

	this._elementImage.addEventListener('click', this._name, this._link);
	this._elementLike.addEventListener('click', this._likeButton);
	this._elementDelete.addEventListener('click', this._deleteButton);
}
}

export default Card;

///////////////
// class Card {
// 	constructor({ data, userData, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
// 		this._cardSelector = cardSelector;
// 		this._name = data.name;
// 		this._handleCardClick = handleCardClick;
// 		this._link = data.link;
// 		this._data = data;
// 		this._handleLikeClick = handleLikeClick;
// 		this._handleDeleteIconClick = handleDeleteIconClick;
// 		this._userData = userData
// 	}

// 	_getTemplate() {
// 		const cardElement = document
// 			.querySelector(this._cardSelector)
// 			.content
// 			.querySelector('.element')
// 			.cloneNode(true);

// 		return cardElement;
// 	}

// 	generateCard() {
// 		this._element = this._getTemplate();
// 		this._setEventListeners();
// 		this._setDeleteIcon();
// 		this.updateLikesNumber(this._data);

// 		this._elementImage.src = this._link;
// 		this._elementImage.alt = this._name;
// 		this._element.querySelector('.element__title').textContent = this._name;

// 		return this._element;
// 	}

// 	isLiked() {
// 		if (this._data.likes.some((like) => like._id === this._userData._id))
// 			return true
// 		else return false
// 	}

// 	updateLikesNumber(data) {
// 		this._data = data;
// 		this._likeCounter.textContent = this._data.likes.length;
// 		if (this.isLiked()) {
// 			this._cardLikeButton.classList.add('button-like_active')
// 		} else {
// 			this._cardLikeButton.classList.remove('button-like_active')
// 		}
// 	}

// 	_setDeleteIcon() {
// 		if (this._userData._id !== this._data.owner._id)
// 			this._element.querySelector('.element__remove_image').remove()
// 	}

// 	_setEventListeners() {
// 		this._cardDeleteButton = this._element.querySelector('.element__remove_image');
// 		this._cardLikeButton = this._element.querySelector('.element__button-like');
// 		this._elementImage = this._element.querySelector('.element__image');
// 		this._likeCounter = this._element.querySelector('.element__like-count');

// 		this._cardLikeButton.addEventListener('click', () => {
// 			this._handleLikeClick(this._data._id)
// 		});

// 		this._cardDeleteButton.addEventListener('click', () => {
// 			this._handleDeleteIconClick(this._element, this._data._id)
// 		});

// 		this._elementImage.addEventListener('click', () => {
// 			this._handleCardClick(this._name, this._link)
// 		});
// 	}
// }

// export default Card;
