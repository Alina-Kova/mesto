import Popup from './Popup.js';

class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popup = super.getPopup();
        this._popupImage =  this._popup.querySelector('.popup__image');
        this._popupCaption =  this._popup.querySelector('.popup__caption');
    }

//метод, который вставляет ссылку, имя и альт картинки в попап
    open(link, name) {
        this._popupCaption.textContent = name;
        this._popupImage.src = link;
        this._popupImage.setAttribute('alt', name)
        super.open();
    }
};

export default PopupWithImage;
