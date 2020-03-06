'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fields = form.elements;

  var titleField = fields.title;
  var addressField = fields.address;
  var offerTypeField = fields.type;
  var priceField = fields.price;
  var roomAmountField = fields.rooms;
  var guestAmountField = fields.capacity;
  var checkinTimeField = fields.timein;
  var checkoutTimeField = fields.timeout;

  var createPhotoElement = function () {
    return window.image.create({
      width: window.constants.offerPhotoWidth,
      height: window.constants.offerPhotoHeight,
      alt: window.constants.offerPhotoAlt
    });
  };

  var photoContainer = form.querySelector('.ad-form__photo');
  photoContainer.style.display = 'flex';
  photoContainer.style.justifyContent = 'center';
  photoContainer.style.alignItems = 'center';

  var avatar = form.querySelector('.ad-form-header__preview img');
  var avatarField = fields.avatar;

  var photo = createPhotoElement();
  var photoField = fields.images;

  photo.style.display = 'none';
  photoContainer.appendChild(photo);

  var changeAvatar = function () {
    window.image.show(avatar, avatarField.files[0]);
  };

  var hideAvatar = function () {
    avatar.src = window.constants.defaultAvatarSrc;
  };

  var changePhoto = function () {
    if (photo.style.display === 'none') {
      photo.style.display = 'block';
    }

    window.image.show(photo, photoField.files[0]);
  };

  var hidePhoto = function () {
    photo.style.display = 'none';
    photo.src = null;
  };

  var avatarFieldChangeHandler = function () {
    changeAvatar();
  };

  var photoFieldChangeHandler = function () {
    changePhoto();
  };

  var resetButton = form.querySelector('.ad-form__reset');

  var fillAddressField = function (location) {
    addressField.value = location.x + ', ' + location.y;
  };

  var checkTitleFieldValidity = function () {
    var fieldValidity = titleField.validity;

    return !fieldValidity.valueMissing &&
      !fieldValidity.tooShort &&
      !fieldValidity.tooLong;
  };

  var checkPriceFieldValidity = function () {
    var priceFieldMinValidValue = window.constants.offerTypesToMinPrices[offerTypeField.value];
    var priceFieldValue = parseInt(priceField.value, 10);

    return priceFieldValue >= priceFieldMinValidValue &&
      !priceField.validity.rangeOverflow;
  };

  var changePriceFieldPlaceholder = function (placeholder) {
    priceField.placeholder = placeholder;
  };

  var changePriceFieldMinValidValue = function () {
    changePriceFieldPlaceholder(
        window.constants.offerTypesToMinPrices[offerTypeField.value]
    );
  };

  var checkCheckoutTimeFieldValidity = function () {
    return checkoutTimeField.value === checkinTimeField.value;
  };

  var checkGuestAmountFieldValidity = function () {
    var guestAmountFieldMaxValidValue = window.constants.roomAmountsToMaxGuestAmounts[roomAmountField.value];
    var guestAmountFieldValue = parseInt(guestAmountField.value, 10);

    return guestAmountFieldValue <= guestAmountFieldMaxValidValue;
  };

  var checkFieldValidity = function (field) {
    switch (field) {
      case titleField:
        return checkTitleFieldValidity();
      case priceField:
        return checkPriceFieldValidity();
      case checkoutTimeField:
        return checkCheckoutTimeFieldValidity();
      case guestAmountField:
        return checkGuestAmountFieldValidity();
      default:
        return true;
    }
  };

  var toggleFieldHighlighting = function (field, off) {
    field.style.outline = off ?
      null : '4px dashed tomato';
  };

  var validateForm = function () {
    var isFormValid = true;

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var isFieldValid = checkFieldValidity(field);

      if (!isFieldValid) {
        isFormValid = false;
        toggleFieldHighlighting(field);
      }
    }

    return isFormValid;
  };

  var fieldInputHandler = function (evt) {
    if (evt.target === offerTypeField) {
      changePriceFieldMinValidValue();
      return;
    }

    toggleFieldHighlighting(evt.target, true);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();

    if (validateForm()) {
      window.app.notify(form, evt.type);
    }
  };

  var resetButtonClickHandler = function () {
    window.app.notify(form, 'reset');
  };

  var activate = function () {
    form.classList.remove('ad-form--disabled');
    form.setAttribute('novalidate', 'true');
    form.addEventListener('input', fieldInputHandler);
    form.addEventListener('submit', formSubmitHandler);
    avatarField.addEventListener('change', avatarFieldChangeHandler);
    photoField.addEventListener('change', photoFieldChangeHandler);
    resetButton.addEventListener('click', resetButtonClickHandler);
    window.utils.toggleFormFields(form);
  };

  var deactivate = function () {
    form.reset();
    form.classList.add('ad-form--disabled');
    form.setAttribute('novalidate', 'false');
    form.removeEventListener('input', fieldInputHandler);
    form.removeEventListener('submit', formSubmitHandler);
    hideAvatar();
    hidePhoto();
    avatarField.removeEventListener('change', avatarFieldChangeHandler);
    photoField.removeEventListener('change', photoFieldChangeHandler);
    resetButton.removeEventListener('click', resetButtonClickHandler);
    window.utils.toggleFormFields(form, true);
  };

  window.offerForm = {
    activate: activate,
    deactivate: deactivate,
    fillAddressField: fillAddressField
  };
})();
