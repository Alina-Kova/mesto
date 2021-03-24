class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
    }
    
    addItem(element) {
        this._container.prepend(element);
    }
};

export default Section;

///////////////
// export default class Section {
//     constructor({ data, renderer }, containerSelector) {
//       this._renderedItems = data;
//       this._renderer = renderer;

//       this._container = document.querySelector(containerSelector);
//     }

//     addItem(userData) {
//       this._renderedItems.forEach(item => 
//         this._renderer(item, userData));
//     }

//     setItem(element) {
//       this._container.append(element);
//     }

//     setMyItem(element) {
//       this._container.prepend(element);
//     }

//     setRenderedItems(data) {
//       this._renderedItems = data;
//     }
//   };