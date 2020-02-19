'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  var getLocation = function (havePointer) {
    var locationX = Math.round(
        parseInt(mainPin.style.left, 10) - window.constants.mainPinOffsetX
    );

    var leftTopCornerCoordY = parseInt(mainPin.style.top, 10);

    var offsetY = havePointer ?
      window.constants.mainPinWithPointerOffsetY : window.constants.mainPinWithoutPointerOffsetY;

    return {
      x: locationX,
      y: Math.round(leftTopCornerCoordY - offsetY)
    };
  };

  var setCoords = function (coords) {
    mainPin.style.left = coords.x + 'px';
    mainPin.style.top = coords.y + 'px';
  };

  var correctOutOfLimitsCoords = function (coords) {
    var x = coords.x;
    var y = coords.y;

    if (x < window.constants.mainPinCoordsLimits.minX) {
      x = window.constants.mainPinCoordsLimits.minX;
    } else if (x > window.constants.mainPinCoordsLimits.maxX) {
      x = window.constants.mainPinCoordsLimits.maxX;
    }

    if (y < window.constants.mainPinCoordsLimits.minY) {
      y = window.constants.mainPinCoordsLimits.minY;
    } else if (y > window.constants.mainPinCoordsLimits.maxY) {
      y = window.constants.mainPinCoordsLimits.maxY;
    }

    return {
      x: x,
      y: y
    };
  };

  var mainPinMousedownHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMousemoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setCoords(correctOutOfLimitsCoords({
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      }));

      window.app.notify(mainPin, moveEvt.type);
    };

    var mainPinMouseupHandler = function () {
      document.removeEventListener('mousemove', mainPinMousemoveHandler);
      window.removeEventListener('mouseup', mainPinMouseupHandler);
    };

    document.addEventListener('mousemove', mainPinMousemoveHandler);
    window.addEventListener('mouseup', mainPinMouseupHandler);
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);

  window.mainPin = {
    getLocation: getLocation
  };
})();
