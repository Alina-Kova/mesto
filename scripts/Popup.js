class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    //метод открытия попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleKeyEsc.bind(this));
        document.addEventListener('mousedown', this._closeByClicking.bind(this));
    }

    //метод закрытия попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleKeyEsc.bind(this));
        document.removeEventListener('mousedown', this._closeByClicking.bind(this));
    }

    //метод закрытия попапа нажатием клавишы esc
    _handleKeyEsc(evt) {
        if (evt.keyCode == 27) {
            this.close();
        }
    }

    //метод закрытия попапа кликом по overlay
    _closeByClicking(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
        if (evt.target.classList.contains('popup__close')) {
            this.close();
        }
    }

    //метод добавления слушателя клика иконке закрытия попапа.
    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => {
            this.close();
        })
    }

    //метод, возвращающий эелемент popup для переиспользования
    getPopup() {
        return this._popup;
    }
};

export default Popup;