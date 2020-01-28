'use strict';

var OFFER_TITLE = 'Объявление о жилье';
var OFFER_DESCRIPTION = 'Хорошее и уютное жилье';
var OFFER_MAX_PRICE = 1000000;
var OFFER_MAX_ROOM_AMOUNT = 3;
var OFFER_MAX_GUEST_AMOUNT = 2;
var OFFER_MIN_LOCATION_Y = 130;
var OFFER_MAX_LOCATION_Y = 630;

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

var MAP_WIDTH = 1200;

var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;

var getRandomInt = function (maxInt) {
  return Math.floor(Math.random() * maxInt);
};

var getRandomIntFromRange = function (minInt, maxInt) {
  return getRandomInt(maxInt - minInt) + minInt;
};

var getRandomIntFromRangeIncludingMax = function (minInt, maxInt) {
  return getRandomIntFromRange(minInt, maxInt + 1);
};

var getRandomElement = function (array) {
  return array[getRandomIntFromRange(0, array.length)];
};

var getRandomElements = function (array) {
  var arrayCopy = array.slice();
  var elementAmount = getRandomIntFromRangeIncludingMax(0, arrayCopy.length);
  var randomElements = [];

  for (var i = 0; i < elementAmount; i++) {
    var randomElementIndex = getRandomIntFromRange(0, arrayCopy.length);
    randomElements.push(arrayCopy[randomElementIndex]);
    arrayCopy.splice(randomElementIndex, 1);
  }

  return randomElements;
};

var createRandomOffer = function (offerNumber) {
  var locationX = getRandomIntFromRangeIncludingMax(0, MAP_WIDTH);
  var locationY = getRandomIntFromRangeIncludingMax(OFFER_MIN_LOCATION_Y, OFFER_MAX_LOCATION_Y);

  return {
    author: {
      avatar: 'img/avatars/user0' + offerNumber + '.png'
    },
    offer: {
      title: OFFER_TITLE,
      address: locationX + ', ' + locationY,
      price: getRandomIntFromRangeIncludingMax(0, OFFER_MAX_PRICE),
      type: getRandomElement(OFFER_TYPES),
      rooms: getRandomIntFromRangeIncludingMax(0, OFFER_MAX_ROOM_AMOUNT),
      guests: getRandomIntFromRangeIncludingMax(0, OFFER_MAX_GUEST_AMOUNT),
      checkin: getRandomElement(OFFER_CHECKIN_CHECKOUT_TIMES),
      checkout: getRandomElement(OFFER_CHECKIN_CHECKOUT_TIMES),
      features: getRandomElements(OFFER_FEATURES),
      description: OFFER_DESCRIPTION,
      photos: getRandomElements(OFFER_PHOTOS),
      location: {
        x: locationX,
        y: locationY
      }
    }
  };
};

var createRandomOffers = function () {
  var offers = [];

  for (var i = 1; i <= OFFER_AMOUNT; i++) {
    offers.push(createRandomOffer(i));
  }

  return offers;
};

var activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var createPinElement = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = offer.offer.location.x + PIN_OFFSET_X;
  var pinY = offer.offer.location.y + PIN_OFFSET_Y;
  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

  var pinAvatar = pinElement.querySelector('img');
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.offer.title;

  return pinElement;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createPinElement(offers[i]));
  }

  document.querySelector('.map__pins').appendChild(fragment);
};

var offers = createRandomOffers();

activateMap();

renderPins(offers);
