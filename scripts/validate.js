// показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };

// скрыть ошибку ввода
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// проверить инпуты на валидность
const checkValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// добавить поля ошибок инпутам
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      checkValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}; 

// проверить состояние кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList, settings)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = '';
  }
}; 

// функция,принимающая массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//включение валидации
const enableValidation = (settings) => { 
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: '.popup__input',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorClass: 'popup__error_active'
});