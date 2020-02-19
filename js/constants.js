'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var LEFT_MOUSE_BUTTON_NUMBER = 0;

  var MAP_WIDTH = 1200;

  var OFFER_TITLE = 'Объявление о жилье';
  var OFFER_DESCRIPTION = 'Хорошее и уютное жилье';
  var OFFER_MAX_PRICE = 1000000;
  var OFFER_MAX_ROOM_AMOUNT = 3;
  var OFFER_MAX_GUEST_AMOUNT = 2;

  var offerMinLocationX = 0;
  var offerMaxLocationX = MAP_WIDTH;
  var OFFER_MIN_LOCATION_Y = 130;
  var OFFER_MAX_LOCATION_Y = 630;

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

  var OFFER_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var OFFER_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var OFFER_CHECKIN_CHECKOUT_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var OFFER_AMOUNT = 8;

  var OFFER_PHOTO_WIDTH = 45;
  var OFFER_PHOTO_HEIGHT = 40;
  var OFFER_PHOTO_ALT = 'Фотография жилья';

  window.constants = {
    enterKey: ENTER_KEY,
    escKey: ESC_KEY,

    leftMouseButtonNumber: LEFT_MOUSE_BUTTON_NUMBER,

    mapWidth: MAP_WIDTH,

    offerTitle: OFFER_TITLE,
    offerDescription: OFFER_DESCRIPTION,
    offerMaxPrice: OFFER_MAX_PRICE,
    offerMaxRoomAmount: OFFER_MAX_ROOM_AMOUNT,
    offerMaxGuestAmount: OFFER_MAX_GUEST_AMOUNT,
    offerTypes: OFFER_TYPES,
    offerFeatures: OFFER_FEATURES,
    offerCheckinCheckoutTimes: OFFER_CHECKIN_CHECKOUT_TIMES,
    offerPhotos: OFFER_PHOTOS,
    offerAmount: OFFER_AMOUNT,

    offerPhotoWidth: OFFER_PHOTO_WIDTH,
    offerPhotoHeight: OFFER_PHOTO_HEIGHT,
    offerPhotoAlt: OFFER_PHOTO_ALT,

    offerLocationLimits: {
      minX: offerMinLocationX,
      maxX: offerMaxLocationX,
      minY: OFFER_MIN_LOCATION_Y,
      maxY: OFFER_MAX_LOCATION_Y
    },

    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    mainPinPointerHeight: MAIN_PIN_POINTER_HEIGHT,
    mainPinOffsetX: mainPinOffsetX,
    mainPinWithoutPointerOffsetY: mainPinWithoutPointerOffsetY,
    mainPinWithPointerOffsetY: mainPinWithPointerOffsetY,

    mainPinCoordsLimits: {
      minX: mainPinMinX,
      maxX: mainPinMaxX,
      minY: mainPinMinY,
      maxY: mainPinMaxY
    },

    pinOffsetX: PIN_OFFSET_X,
    pinOffsetY: PIN_OFFSET_Y
  };
})();
