
const checkElementValidity = (popupElement, inputElement) => {
  const errorList = Array.from(document.querySelectorAll('.popup__error'));
  const curentError = errorList.find(error => error.dataset.forElement === inputElement.name);
  const buttonSubmit = document.querySelector('.popup__button');


  if (!inputElement.validity.valid) {
    curentError.classList.remove('visually-hidden');
    buttonSubmit.setAttribute('disabled', true);
  } else {
    curentError.classList.add('visually-hidden');
    buttonSubmit.removeAttribute('disabled');
  }
};

const setEventListener = (popupElement) => {
  const inputList = Array.from(document.querySelectorAll('.js-popup-input'));
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkElementValidity(popupElement, input);
    })
  })

}

setEventListener(document.querySelector('.form'));