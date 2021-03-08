class Card {
	constructor(data, cardSelector, handleCardClick) {
		this._link = data.link;
		this._name = data.name;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
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

		this._element.querySelector('.elements__photo').src = this._link;
		this._element.querySelector('.elements__card-name').textContent = this._name;
		this._element.querySelector('.elements__photo').alt = this._name;

		this._setEventListeners();
		return this._element;
	}

	// метод лайка карточки
	_likeButton() {
		this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
	}

	// метод удаления карточки
	_deleteButton() {
		this._element.querySelector('.elements__delete').closest('.elements__card').remove();
	}

	// метод добавления слушателя событий
	_setEventListeners() {
		this._element.querySelector('.elements__photo').addEventListener('click', () => { 
			this._handleCardClick(this._link, this._name)
		});

		this._element.querySelector('.elements__like').addEventListener('click', () => {
			this._likeButton()
		});

		this._element.querySelector('.elements__delete').addEventListener('click', () => {
			this._deleteButton()
		})
	}
}

export default Card;