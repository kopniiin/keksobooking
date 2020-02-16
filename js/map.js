'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapClickHandler = function (evt) {
    if (evt.target.classList.contains('map__pin')) {
      window.offerCard.closeCurrent();
      window.offerCard.show(evt.target);
    }
  };

  var activate = function () {
    map.classList.remove('map--faded');
    map.addEventListener('click', mapClickHandler);
  };

  var deactivate = function () {
    map.classList.add('map--faded');
    map.removeEventListener('click', mapClickHandler);
  };

  window.map = {
    activate: activate,
    deactivate: deactivate,
  };
})();
