'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var LEFT_MOUSE_BUTTON_NUMBER = 0;

  var MAP_WIDTH = 1200;

  var OFFER_MIN_LOCATION_Y = 130;
  var OFFER_MAX_LOCATION_Y = 630;

  var OFFER_PHOTO_WIDTH = 45;
  var OFFER_PHOTO_HEIGHT = 40;
  var OFFER_PHOTO_ALT = 'Фотография жилья';

  var offerTypesToMinPrices = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var offerTypesToRussianTranslations = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var roomAmountsToMaxGuestAmounts = {
    1: 1,
    2: 2,
    3: 3,
    100: 0
  };

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_POINTER_HEIGHT = 22;

  var mainPinOffsetX = MAIN_PIN_WIDTH / -2;
  var mainPinWithoutPointerOffsetY = MAIN_PIN_HEIGHT / -2;
  var mainPinWithPointerOffsetY =
    (MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT) * -1;

  var mainPinMinX = mainPinOffsetX;
  var mainPinMaxX = MAP_WIDTH + mainPinOffsetX;
  var mainPinMinY = OFFER_MIN_LOCATION_Y + mainPinWithPointerOffsetY;
  var mainPinMaxY = OFFER_MAX_LOCATION_Y + mainPinWithPointerOffsetY;

  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;

  var MAX_PINS_AMOUNT = 5;

  var SERVER_RESPONSE_TIMEOUT = 10000;

  var ServerResponseStatusCode = {
    OK: 200
  };

  var ServerUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var TIME_TO_HIDE_MESSAGE = 10000;

  window.constants = {
    enterKey: ENTER_KEY,
    escKey: ESC_KEY,

    leftMouseButtonNumber: LEFT_MOUSE_BUTTON_NUMBER,

    offerPhotoWidth: OFFER_PHOTO_WIDTH,
    offerPhotoHeight: OFFER_PHOTO_HEIGHT,
    offerPhotoAlt: OFFER_PHOTO_ALT,

    offerTypesToMinPrices: offerTypesToMinPrices,
    offerTypesToRussianTranslations: offerTypesToRussianTranslations,
    roomAmountsToMaxGuestAmounts: roomAmountsToMaxGuestAmounts,

    mainPinOffsetX: mainPinOffsetX,
    mainPinWithoutPointerOffsetY: mainPinWithoutPointerOffsetY,
    mainPinWithPointerOffsetY: mainPinWithPointerOffsetY,

    MainPinCoordsLimits: {
      MIN_X: mainPinMinX,
      MAX_X: mainPinMaxX,
      MIN_Y: mainPinMinY,
      MAX_Y: mainPinMaxY
    },

    pinOffsetX: PIN_OFFSET_X,
    pinOffsetY: PIN_OFFSET_Y,

    maxPinsAmount: MAX_PINS_AMOUNT,

    serverResponseTimeout: SERVER_RESPONSE_TIMEOUT,
    serverResponseStatusCode: ServerResponseStatusCode,

    serverUrl: ServerUrl,

    timeToHideMessage: TIME_TO_HIDE_MESSAGE
  };
})();
