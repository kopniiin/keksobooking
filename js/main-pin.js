'use strict';

(function () {
  var map = document.querySelector('.map');
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

  var setLocation = function (location, havePointer) {
    mainPin.style.left = location.x + window.constants.mainPinOffsetX + 'px';

    var offsetY = havePointer ?
      window.constants.mainPinWithPointerOffsetY :
      window.constants.mainPinWithoutPointerOffsetY;

    mainPin.style.top = location.y + offsetY + 'px';
  };

  var setCoords = function (coords) {
    mainPin.style.left = coords.x + 'px';
    mainPin.style.top = coords.y + 'px';
  };

  var correctOutOfLimitsCoords = function (coords) {
    var x = coords.x;
    var y = coords.y;

    var minX = window.constants.MainPinCoordsLimits.MIN_X;
    var maxX = window.constants.MainPinCoordsLimits.MAX_X;
    var minY = window.constants.MainPinCoordsLimits.MIN_Y;
    var maxY = window.constants.MainPinCoordsLimits.MAX_Y;

    if (x < minX) {
      x = minX;
    } else if (x > maxX) {
      x = maxX;
    }

    if (y < minY) {
      y = minY;
    } else if (y > maxY) {
      y = maxY;
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
      map.removeEventListener('mousemove', mainPinMousemoveHandler);
      window.removeEventListener('mouseup', mainPinMouseupHandler);
    };

    map.addEventListener('mousemove', mainPinMousemoveHandler);
    window.addEventListener('mouseup', mainPinMouseupHandler);
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);

  window.mainPin = {
    getLocation: getLocation,
    setLocation: setLocation
  };
})();
