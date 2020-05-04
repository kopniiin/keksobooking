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

  var CARD_PHOTO_WIDTH = 45;
  var CARD_PHOTO_HEIGHT = 40;

  var OFFER_PHOTO_WIDTH = 40;
  var OFFER_PHOTO_HEIGHT = 44;
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

  var MainPinCoordsLimits = {
    MIN_X: mainPinOffsetX,
    MAX_X: MAP_WIDTH + mainPinOffsetX,
    MIN_Y: OFFER_MIN_LOCATION_Y + mainPinWithPointerOffsetY,
    MAX_Y: OFFER_MAX_LOCATION_Y + mainPinWithPointerOffsetY
  };

  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;

  var MAX_PINS_AMOUNT = 5;

  var FILTER_ANY_VALUE = 'any';

  var priceFilterValuesToPriceRanges = {
    'low': {
      min: 0,
      max: 9999
    },
    'middle': {
      min: 10000,
      max: 49999
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  var ServerUrl = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var SERVER_RESPONSE_TIMEOUT = 10000;

  var ServerResponseStatusCode = {
    OK: 200
  };

  var DEBOUNCE_DELAY = 500;

  var ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var DEFAULT_AVATAR_SRC = 'img/muffin-red.svg';

  window.constants = {
    enterKey: ENTER_KEY,
    escKey: ESC_KEY,

    leftMouseButtonNumber: LEFT_MOUSE_BUTTON_NUMBER,

    OfferInitialLocation: OfferInitialLocation,

    cardPhotoWidth: CARD_PHOTO_WIDTH,
    cardPhotoHeight: CARD_PHOTO_HEIGHT,

    offerPhotoWidth: OFFER_PHOTO_WIDTH,
    offerPhotoHeight: OFFER_PHOTO_HEIGHT,
    offerPhotoAlt: OFFER_PHOTO_ALT,

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

    filterAnyValue: FILTER_ANY_VALUE,

    priceFilterValuesToPriceRanges: priceFilterValuesToPriceRanges,

    ServerUrl: ServerUrl,

    serverResponseTimeout: SERVER_RESPONSE_TIMEOUT,
    ServerResponseStatusCode: ServerResponseStatusCode,

    debounceDelay: DEBOUNCE_DELAY,

    allowedFileTypes: ALLOWED_FILE_TYPES,

    defaultAvatarSrc: DEFAULT_AVATAR_SRC
  };
})();
