'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var LEFT_MOUSE_BUTTON_NUMBER = 0;

  var MAP_WIDTH = 1200;

  var OFFER_MIN_LOCATION_Y = 130;
  var OFFER_MAX_LOCATION_Y = 630;

  var OfferInitialLocation = {
    X: 603,
    Y: 408
  };

  var OFFER_PHOTO_WIDTH = 45;
  var OFFER_PHOTO_HEIGHT = 40;
  var OFFER_PHOTO_ALT = 'Фотография жилья';

  var ANY_FILTER_VALUE = 'any';

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

  var MainPinCoordsLimits = {
    MIN_X: mainPinOffsetX,
    MAX_X: MAP_WIDTH + mainPinOffsetX,
    MIN_Y: OFFER_MIN_LOCATION_Y + mainPinWithPointerOffsetY,
    MAX_Y: OFFER_MAX_LOCATION_Y + mainPinWithPointerOffsetY
  };

  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;

  var MAX_PINS_AMOUNT = 5;

  var ServerUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var SERVER_RESPONSE_TIMEOUT = 10000;

  var ServerResponseStatusCode = {
    OK: 200
  };

  window.constants = {
    enterKey: ENTER_KEY,
    escKey: ESC_KEY,

    leftMouseButtonNumber: LEFT_MOUSE_BUTTON_NUMBER,

    OfferInitialLocation: OfferInitialLocation,

    offerPhotoWidth: OFFER_PHOTO_WIDTH,
    offerPhotoHeight: OFFER_PHOTO_HEIGHT,
    offerPhotoAlt: OFFER_PHOTO_ALT,

    anyFilterValue: ANY_FILTER_VALUE,

    offerTypesToMinPrices: offerTypesToMinPrices,
    offerTypesToRussianTranslations: offerTypesToRussianTranslations,
    roomAmountsToMaxGuestAmounts: roomAmountsToMaxGuestAmounts,

    mainPinOffsetX: mainPinOffsetX,
    mainPinWithoutPointerOffsetY: mainPinWithoutPointerOffsetY,
    mainPinWithPointerOffsetY: mainPinWithPointerOffsetY,

    MainPinCoordsLimits: MainPinCoordsLimits,

    pinOffsetX: PIN_OFFSET_X,
    pinOffsetY: PIN_OFFSET_Y,

    maxPinsAmount: MAX_PINS_AMOUNT,

    ServerUrl: ServerUrl,

    serverResponseTimeout: SERVER_RESPONSE_TIMEOUT,
    ServerResponseStatusCode: ServerResponseStatusCode
  };
})();
