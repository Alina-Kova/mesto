import Popup from './Popup.js'

class PopupWithQuestion extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popup = super.getPopup();
  }

  // метод, который добавляет обработчик клика иконке закрытия и сабмита формы
  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._deleteElement);
    })
    super.setEventListeners();
  }

  //метод открытия попапа
  open(data) {
    super.open();
    this._deleteElement = data;
  }

  //метод закрытия формы
  close() {
    super.close();
  }

  //метод cабмита формы
  submitForm(submit) {
    this._handleFormSubmit = submit;
  }
}

export default PopupWithQuestion;