'use strict';

(function () {
  var pinsContainer = document.querySelector('.map__pins');

  var template = document.querySelector('#pin')
    .content.querySelector('.map__pin');

  var createElement = function (offer, offerIndex) {
    var element = template.cloneNode(true);
    var pinX = offer.location.x + window.constants.pinOffsetX;
    var pinY = offer.location.y + window.constants.pinOffsetY;
    element.style.left = pinX + 'px';
    element.style.top = pinY + 'px';
    element.dataset.offerIndex = offerIndex;

    var avatar = element.querySelector('img');
    avatar.src = offer.author.avatar;
    avatar.alt = offer.offer.title;
    avatar.style.pointerEvents = 'none';

    return element;
  };

  var pins = [];

  var createPins = function (offers) {
    pins = offers.map(function (offer, index) {
      return createElement(offer, index);
    });
  };

  var render = function () {
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      fragment.appendChild(pin);
    });

    pinsContainer.appendChild(fragment);
  };

  var hide = function () {
    pins.forEach(function (pin) {
      pinsContainer.removeChild(pin);
    });

    pins = [];
  };

  var update = function (offers) {
    hide();

    createPins(offers);

    render();
  };

  window.pins = {
    update: update,
    hide: hide
  };
})();
