'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success')
    .content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error')
    .content.querySelector('.error');

  var successMessage = successMessageTemplate.cloneNode(true);
  var errorMessage = errorMessageTemplate.cloneNode(true);

  var successMessageText = successMessage.querySelector('.success__message');
  var errorMessageText = errorMessage.querySelector('.error__message');

  var closeButton = errorMessage.querySelector('.error__button');

  var hide = function () {
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    document.removeEventListener('keydown', messageKeydownHandler);
  };

  var successMessageClickHandler = function (evt) {
    if (evt.target === successMessage) {
      hide();
    }
  };

  var errorMessageClickHandler = function (evt) {
    if (evt.target === errorMessage) {
      hide();
    }
  };

  successMessage.addEventListener('click', successMessageClickHandler);
  errorMessage.addEventListener('click', errorMessageClickHandler);

  var closeButtonClickHandler = function () {
    hide();
  };

  closeButton.addEventListener('click', closeButtonClickHandler);

  var messageKeydownHandler = function (evt) {
    if (window.utils.checkEscKey(evt.key)) {
      evt.preventDefault();
      hide();
    }
  };

  var showSuccessMessage = function (text) {
    successMessage.style.display = 'block';
    successMessageText.textContent = text;
  };

  var showErrorMessage = function (text) {
    errorMessage.style.display = 'block';
    errorMessageText.textContent = text;
  };

  var show = function (text, isError) {
    if (isError) {
      showErrorMessage(text);
    } else {
      showSuccessMessage(text);
    }

    document.addEventListener('keydown', messageKeydownHandler);
  };

  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  document.querySelector('main').append(successMessage, errorMessage);

  window.message = {
    show: show
  };
})();
