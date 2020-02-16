'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  var activate = function () {
    window.map.activate();
    window.pins.render(window.offersData.get());
    window.filterForm.activate();
    window.offerForm.activate();

    window.offerForm.fillAddressField(window.mainPin.getCoords(true));

    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  };

  var deactivate = function () {
    window.map.deactivate();
    window.filterForm.deactivate();
    window.offerForm.deactivate();

    window.offerForm.fillAddressField(window.mainPin.getCoords());

    mainPin.addEventListener('mousedown', mainPinMousedownHandler);
    mainPin.addEventListener('keydown', mainPinKeydownHandler);
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
})();

