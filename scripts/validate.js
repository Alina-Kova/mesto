// показать ошибку ввода
const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('popup__error_active');
    console.log(errorElement);
  };

// скрыть ошибку ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
};

// проверить инпуты на валидность
const checkValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// добавить поля ошибок инпутам
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

// проверить состояние кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_disabled');
    buttonElement.disabled = 'disabled';
  } else {
    buttonElement.classList.remove('popup__submit_disabled');
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
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__input'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };

  enableValidation();

enableValidation({
  formSelector: '.popup__input',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: '.popup__submit_disabled',
  errorClass: '.popup__error_active',
}); 