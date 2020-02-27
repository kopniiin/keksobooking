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

  var fillAddressField = function (coords) {
    addressField.value = coords.x + ', ' + coords.y;
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

  var formInputHandler = function (evt) {
    if (evt.target === offerTypeField) {
      changePriceFieldMinValidValue();
      return;
    }

    toggleFieldHighlighting(evt.target, true);
  };

  var formSubmitHandler = function (evt) {
    if (!validateForm()) {
      evt.preventDefault();
    }
  };

  var activate = function () {
    form.classList.remove('ad-form--disabled');
    form.setAttribute('novalidate', true);
    form.addEventListener('input', formInputHandler);
    form.addEventListener('submit', formSubmitHandler);
    window.utils.toggleFormFields(form);
  };

  var deactivate = function () {
    form.classList.add('ad-form--disabled');
    form.setAttribute('novalidate', false);
    form.removeEventListener('input', formInputHandler);
    form.removeEventListener('submit', formSubmitHandler);
    window.utils.toggleFormFields(form, true);
  };

  window.offerForm = {
    activate: activate,
    deactivate: deactivate,
    fillAddressField: fillAddressField
  };
})();
