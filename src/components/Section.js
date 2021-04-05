class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //метод, который отвечает за отрисовку данных на странице
    renderItems(userData) {
        this._renderedItems.forEach(item => {
            this._renderer(item, userData);
        })
    }

    //методы, которые принимают DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.append(element);
    }
    addItemPrepend(element) {
        this._container.prepend(element);
    }

    //метод, который устанавливает отрисованные элементы
    setRenderedItems(item) {
        this._renderedItems = item;
    }
};

export default Section;