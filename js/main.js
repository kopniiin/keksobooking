'use strict';

var OFFER_TITLE = 'Объявление о жилье';
var OFFER_DESCRIPTION = 'Хорошее и уютное жилье';
var OFFER_MAX_PRICE = 100000;
var OFFER_MAX_ROOM_AMOUNT = 3;
var OFFER_MAX_GUEST_AMOUNT = 2;
var OFFER_AMOUNT = 8;
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

var MAP_WIDTH = 1200;

var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;

var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var pinContainer = document.querySelector('.map__pins');

var getRandomInt = function (maxInt) {
  return Math.floor(Math.random() * maxInt);
};

var getRandomIntFromRange = function (minInt, maxInt) {
  return getRandomInt(maxInt - minInt) + minInt;
};

var createRandomOffer = function (offerNumber) {
  var avatarSrc = 'img/avatars/user0' + offerNumber + '.png';
  var locationX = getRandomIntFromRange(0, MAP_WIDTH + 1);
  var locationY = getRandomIntFromRange(OFFER_MIN_LOCATION_Y, OFFER_MAX_LOCATION_Y + 1);
  var price = getRandomInt(OFFER_MAX_PRICE + 1);
  var type = OFFER_TYPES[getRandomInt(OFFER_TYPES.length)];
  var roomAmount = getRandomInt(OFFER_MAX_ROOM_AMOUNT + 1);
  var guestAmount = getRandomInt(OFFER_MAX_GUEST_AMOUNT + 1);
  var checkinTime = OFFER_CHECKIN_CHECKOUT_TIMES[getRandomInt(OFFER_CHECKIN_CHECKOUT_TIMES.length)];
  var checkoutTime = OFFER_CHECKIN_CHECKOUT_TIMES[getRandomInt(OFFER_CHECKIN_CHECKOUT_TIMES.length)];

  var featureAmount = getRandomInt(OFFER_FEATURES.length + 1);
  var features = [];

  for (var i = 0; i < featureAmount; i++) {
    features.push(OFFER_FEATURES[i]);
  }

  var photoAmount = getRandomInt(OFFER_PHOTOS.length + 1);
  var photos = [];

  for (i = 0; i < photoAmount; i++) {
    photos.push(OFFER_PHOTOS[i]);
  }

  return {
    author: {
      avatar: avatarSrc
    },
    offer: {
      title: OFFER_TITLE,
      address: locationX + ', ' + locationY,
      price: price,
      type: type,
      rooms: roomAmount,
      guests: guestAmount,
      checkin: checkinTime,
      checkout: checkoutTime,
      features: features,
      description: OFFER_DESCRIPTION,
      photos: photos,
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

var renderPin = function (offer) {
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
    fragment.appendChild(renderPin(offers[i]));
  }

  pinContainer.appendChild(fragment);
};

renderPins(createRandomOffers());
