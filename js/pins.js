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

  var render = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(createElement(offers[i], i));
    }

    pinsContainer.appendChild(fragment);
  };

  window.pins = {
    render: render
  };
})();
