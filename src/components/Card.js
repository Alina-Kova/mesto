class Card {
	constructor({ data, userData, cardSelector, handleCardClick, handleLikeClick, handleDeleteCardClick }) {
		this._data = data;
		this._link = data.link;
		this._name = data.name;
		this._userData = userData;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._handleLikeClick = handleLikeClick;
		this._handleDeleteCardClick = handleDeleteCardClick;
		this._ownerId = data.owner;
		this._id = data._id;
	}

	// метод получения шаблона разметки
	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content
			.querySelector('.elements__card')
			.cloneNode(true)

		return cardElement;
	}

	// метод добавление данных в разметку
	generateCard() {
		this._element = this._getTemplate();

		this._elementPhoto = this._element.querySelector('.elements__photo');
		this._elementPhoto.src = this._link;
		this._elementPhoto.alt = this._name;
		this._element.querySelector('.elements__card-name').textContent = this._name;

		this._setDeleteButton(this._ownerId);
		this.setLikesNumber(this._data);
		this._setEventListeners();
		return this._element;
	}

	//метод, определяющий наличие лайка у карточки, поставленного текущим пользователем
	likeCard() {
		if (this._data.likes.some((like) => like._id === this._userData._id))
			return true
		else return false
	}

	//метод постановки и снятия лайков с изменением их кол-ва
	setLikesNumber(data) {
		this._data = data;
		this._likeElement = this._element.querySelector('.elements__like');
		this._element.querySelector('.elements__like-count').textContent = this._data.likes.length;
		if (this.likeCard()) {
			this._likeElement.classList.add('elements__like_active');
		} else {
			this._likeElement.classList.remove('elements__like_active');
		}
	}

	//метод установки иконки удаления только на свои карточки
	_setDeleteButton() {
		this._deleteIcon = this._element.querySelector('.elements__delete');
		if (this._ownerId._id === this._userData._id) {
			this._deleteIcon.classList.add('elements__delete_visible');
		} else {
			this._deleteIcon.classList.remove('elements__delete_visible');
		}
	}

	//метод удаления карточки
	deleteCard() {
		this._element.remove();
		this._element = null;
	}

	// метод добавления слушателя событий
	_setEventListeners() {

		this._elementPhoto.addEventListener('click', () => {
			this._handleCardClick(this._link, this._name)
		});

		this._likeElement.addEventListener('click', () => {
			this._handleLikeClick(this._data._id)
		});

		this._deleteIcon.addEventListener('click', () => {
			this._handleDeleteCardClick(this._data._id)
		});

	}
}

export default Card;