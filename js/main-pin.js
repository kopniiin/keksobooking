'use strict';

(function () {
  var offsetX = window.constants.mainPinWidth / -2;
  var pinWithoutPointerOffsetY = window.constants.mainPinHeight / -2;
  var pinWithPointerOffsetY =
    (window.constants.mainPinHeight + window.constants.mainPinPointerHeight) * -1;

  var mainPin = document.querySelector('.map__pin--main');

  var getCoords = function (havePointer) {
    var coordX = Math.round(
        parseInt(mainPin.style.left, 10) - offsetX
    );

    var leftTopCornerCoordY = parseInt(mainPin.style.top, 10);

    var offsetY = havePointer ?
      pinWithPointerOffsetY : pinWithoutPointerOffsetY;

    return {
      x: coordX,
      y: Math.round(leftTopCornerCoordY - offsetY)
    };
  };

  window.mainPin = {
    getCoords: getCoords
  };
})();
