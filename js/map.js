'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapClickHandler = function (evt) {
    if (evt.target.dataset.offerIndex) {
      window.app.notify(evt.target, evt.type);
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
