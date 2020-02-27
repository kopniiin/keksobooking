'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  var offers = [];

  var saveOffers = function (newOffers) {
    offers = newOffers;
  };

  var loadSuccessHandler = function (newOffers) {
    saveOffers(newOffers);
    window.pins.render(offers);
  };

  var loadErrorHandler = function (errorMessage) {
    window.message.show(errorMessage, true);
  };

  var activate = function () {
    window.map.activate();
    window.backend.load(loadSuccessHandler, loadErrorHandler);
    window.filterForm.activate();
    window.offerForm.activate();

    window.offerForm.fillAddressField(window.mainPin.getLocation(true));

    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  };

  var deactivate = function () {
    window.map.deactivate();
    window.filterForm.deactivate();
    window.offerForm.deactivate();

    window.offerForm.fillAddressField(window.mainPin.getLocation());

    mainPin.addEventListener('mousedown', mainPinMousedownHandler);
    mainPin.addEventListener('keydown', mainPinKeydownHandler);
  };

  var handleClickNotification = function (target) {
    var offerIndex = target.dataset.offerIndex;

    if (offerIndex) {
      window.offerCard.closeCurrent();
      window.offerCard.show(offers[offerIndex]);
    }
  };

  var handleMousemoveNotification = function (target) {
    if (target === mainPin) {
      window.offerForm.fillAddressField(window.mainPin.getLocation(true));
    }
  };

  var notify = function (target, event) {
    if (event === 'click') {
      handleClickNotification(target);
    }

    if (event === 'mousemove') {
      handleMousemoveNotification(target);
    }
  };

  var mainPinMousedownHandler = function (evt) {
    if (window.utils.checkLeftMouseButton(evt.button)) {
      activate();
    }
  };

  var mainPinKeydownHandler = function (evt) {
    if (window.utils.checkEnterKey(evt.key)) {
      activate();
    }
  };

  deactivate();

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownHandler);

  window.app = {
    notify: notify
  };
})();

