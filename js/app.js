'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var filterForm = document.querySelector('.map__filters');
  var offerForm = document.querySelector('.ad-form');

  var offers = [];
  var areOffersLoaded = false;

  var saveOffers = function (newOffers) {
    offers = newOffers;
  };

  var loadSuccessHandler = function (newOffers) {
    saveOffers(newOffers);

    window.pins.update(offers);
    window.filterForm.activate();
  };

  var loadErrorHandler = function () {
    saveOffers([]);
  };

  var saveSuccessHandler = function () {
    window.message.show('Объявление успешно размещено');
    deactivate();
  };

  var saveErrorHandler = function (errorMessage) {
    window.message.show(errorMessage, true);
  };

  var resetOfferLocation = function () {
    var offerInitialLocation = {
      x: window.constants.OfferInitialLocation.X,
      y: window.constants.OfferInitialLocation.Y
    };

    window.mainPin.setLocation(offerInitialLocation);
    window.offerForm.fillAddressField(offerInitialLocation);
  };

  var activate = function () {
    window.map.activate();

    if (!areOffersLoaded) {
      window.backend.load(loadSuccessHandler, loadErrorHandler);
      areOffersLoaded = true;
    } else if (offers.length) {
      window.pins.update(offers);
      window.filterForm.activate();
    }

    window.offerForm.activate();
    window.offerForm.fillAddressField(window.mainPin.getLocation(true));

    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  };

  var deactivate = function () {
    window.map.deactivate();
    window.filterForm.deactivate();
    window.offerForm.deactivate();

    window.pins.hide();
    window.offerCard.closeCurrent();

    resetOfferLocation();

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

  var handleChangeNotification = function (target) {
    if (target === filterForm) {
      window.offerCard.closeCurrent();

      window.pins.update(window.offersFilter(
          offers,
          window.filterForm.getFilters()
      ));
    }
  };

  var handleSubmitNotification = function (target) {
    if (target === offerForm) {
      window.backend.save(
          new FormData(offerForm),
          saveSuccessHandler,
          saveErrorHandler
      );
    }
  };

  var handleResetNotification = function (target) {
    if (target === offerForm) {
      deactivate();
    }
  };

  var notify = function (target, event) {
    switch (event) {
      case 'click':
        handleClickNotification(target);
        break;
      case 'mousemove':
        handleMousemoveNotification(target);
        break;
      case 'change':
        handleChangeNotification(target);
        break;
      case 'submit':
        handleSubmitNotification(target);
        break;
      case 'reset':
        handleResetNotification(target);
        break;
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

