import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popup = super.getPopup();
    this._form = this._popup.querySelector('.popup__input');
    this._inputs = this._popup.querySelectorAll('.popup__text');
    this._popupSubmitButton = this._popup.querySelector('.popup__submit');
  }

  //метод, который собирает данные полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList = Array.from(this._inputs);
    this._inputList.forEach(inputField => {
      this._formValues[inputField.name] = inputField.value
    });
    return this._formValues;
  }

  // метод, который добавляет обработчик клика иконке закрытия и сабмита формы
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  //метод закрытия формы и сброса данных в полях
  close() {
    this._form.reset();
    this._popupSubmitButton.classList.add('popup__submit_disabled');
    this._popupSubmitButton.setAttribute('disabled', '');
    super.close();
  }
};

export default PopupWithForm;

