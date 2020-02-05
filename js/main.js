'use strict';

var OFFER_TITLE = 'Объявление о жилье';
var OFFER_DESCRIPTION = 'Хорошее и уютное жилье';
var OFFER_MAX_PRICE = 1000000;
var OFFER_MAX_ROOM_AMOUNT = 3;
var OFFER_MAX_GUEST_AMOUNT = 2;

var ROOM_AMOUNTS_TO_MAX_GUEST_AMOUNTS_MAP = {
  1: 1,
  2: 2,
  3: 3,
  100: 0
};

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

var OFFER_PHOTO_WIDTH = 45;
var OFFER_PHOTO_HEIGHT = 40;
var OFFER_PHOTO_ALT = 'Фотография жилья';

var OFFER_AMOUNT = 8;

var MAP_WIDTH = 1200;

var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;

var offerMinLocationX = 0 - PIN_OFFSET_X;
var offerMaxLocationX = MAP_WIDTH + PIN_OFFSET_X;
var OFFER_MIN_LOCATION_Y = 130;
var OFFER_MAX_LOCATION_Y = 630;

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_POINTER_HEIGHT = 22;

var mainPinOffsetX = (MAIN_PIN_WIDTH / 2) * -1;
var mainPinOffsetY = (MAIN_PIN_HEIGHT / 2) * -1;
var mainPinWithPointerOffsetY = (MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT) * -1;

var LEFT_MOUSE_BUTTON_NUMBER = 0;

var ENTER_KEY = 'Enter';

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

var extractRandomElement = function (array) {
  var randomElementIndex = getRandomIntFromRange(0, array.length);
  var randomElement = array[randomElementIndex];
  array.splice(randomElementIndex, 1);

  return randomElement;
};

var getRandomElements = function (array) {
  var arrayCopy = array.slice();

  var elementAmount = getRandomIntFromRangeIncludingMax(0, arrayCopy.length);

  var randomElements = [];

  for (var i = 0; i < elementAmount; i++) {
    randomElements.push(extractRandomElement(arrayCopy));
  }

  return randomElements;
};

// Объявления
var createRandomOffer = function (avatar) {
  var locationX = getRandomIntFromRangeIncludingMax(offerMinLocationX, offerMaxLocationX);
  var locationY = getRandomIntFromRangeIncludingMax(OFFER_MIN_LOCATION_Y, OFFER_MAX_LOCATION_Y);

  return {
    author: {
      avatar: avatar
    },
    offer: {
      title: OFFER_TITLE,
      address: locationX + ', ' + locationY,
      price: getRandomIntFromRangeIncludingMax(0, OFFER_MAX_PRICE),
      type: getRandomElement(OFFER_TYPES),
      rooms: getRandomIntFromRangeIncludingMax(1, OFFER_MAX_ROOM_AMOUNT),
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
  var avatars = [];

  for (var i = 1; i <= OFFER_AMOUNT; i++) {
    avatars.push('img/avatars/user0' + i + '.png');
  }

  for (i = 0; i < OFFER_AMOUNT; i++) {
    var randomAvatar = extractRandomElement(avatars);
    offers.push(createRandomOffer(randomAvatar));
  }

  return offers;
};

var randomOffers = createRandomOffers();

// Пины
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

// Карточка объявления
/* var translationMap = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var createFeatureElement = function (featureName) {
  var featureElement = document.createElement('li');
  featureElement.classList.add('popup__feature', 'popup__feature--' + featureName);

  return featureElement;
};

var createPhotoElement = function (photoSrc) {
  var photoElement = document.createElement('img');
  photoElement.src = photoSrc;
  photoElement.width = OFFER_PHOTO_WIDTH;
  photoElement.height = OFFER_PHOTO_HEIGHT;
  photoElement.alt = OFFER_PHOTO_ALT;

  return photoElement;
};

var offerCardTemplate = document.querySelector('#card')
  .content.querySelector('.map__card');

offerCardTemplate.removeChild(offerCardTemplate.querySelector('.popup__features'));
offerCardTemplate.removeChild(offerCardTemplate.querySelector('.popup__photos'));

var createOfferCard = function (offer) {
  var offerCard = offerCardTemplate.cloneNode(true);

  offerCard.querySelector('.popup__avatar')
    .src = offer.author.avatar;
  offerCard.querySelector('.popup__title')
    .textContent = offer.offer.title;
  offerCard.querySelector('.popup__text--address')
    .textContent = offer.offer.address;
  offerCard.querySelector('.popup__text--price')
    .textContent = offer.offer.price + '₽/ночь';
  offerCard.querySelector('.popup__type')
    .textContent = translationMap[offer.offer.type];
  offerCard.querySelector('.popup__text--capacity')
    .textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  offerCard.querySelector('.popup__text--time')
    .textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;

  var descriptionContainer = offerCard.querySelector('.popup__description');
  descriptionContainer.textContent = offer.offer.description;

  var offerFeatures = offer.offer.features;

  if (offerFeatures.length) {
    var featureContainer = document.createElement('ul');
    featureContainer.classList.add('popup__features');

    for (var i = 0; i < offerFeatures.length; i++) {
      featureContainer.appendChild(createFeatureElement(offerFeatures[i]));
    }

    offerCard.insertBefore(featureContainer, descriptionContainer);
  }

  var offerPhotos = offer.offer.photos;

  if (offerPhotos.length) {
    var photoContainer = document.createElement('div');
    photoContainer.classList.add('popup__photos');

    for (i = 0; i < offerPhotos.length; i++) {
      photoContainer.appendChild(createPhotoElement(offerPhotos[i]));
    }

    offerCard.appendChild(photoContainer);
  }

  return offerCard;
};

var renderOfferCard = function (offerCard) {
  document.querySelector('.map').insertBefore(
      offerCard,
      document.querySelector('.map__filters-container')
  );
};

var offerCard = createOfferCard(offers[0]);

renderOfferCard(offerCard); */

// Служебные функции
var enableFormElements = function (form) {
  for (var i = 0; i < form.elements.length; i++) {
    form.elements[i].disabled = false;
  }
};

var disableFormElements = function (form) {
  for (var i = 0; i < form.elements.length; i++) {
    form.elements[i].disabled = true;
  }
};

// Карта
var map = document.querySelector('.map');

var activateMap = function () {
  map.classList.remove('map--faded');
};

var deactivateMap = function () {
  map.classList.add('map--faded');
};

// Главный пин
var mainPin = map.querySelector('.map__pin--main');

var getMainPinCoords = function () {
  var mainPinXWithoutOffset = parseInt(mainPin.style.left, 10);
  var mainPinYWithoutOffset = parseInt(mainPin.style.top, 10);

  return {
    x: Math.round(
        mainPinXWithoutOffset - mainPinOffsetX
    ),
    y: Math.round(
        map.classList.contains('map--faded') ?
          mainPinYWithoutOffset - mainPinOffsetY :
          mainPinYWithoutOffset - mainPinWithPointerOffsetY
    )
  };
};

var mainPinMousedownHandler = function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON_NUMBER) {
    activateApplication();
  }
};

var mainPinKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateApplication();
  }
};

// Форма фильтрации объявлений
var offerFilteringForm = document.querySelector('.map__filters');

var activateOfferFilteringForm = function () {
  enableFormElements(offerFilteringForm);
};

var deactivateOfferFilteringForm = function () {
  disableFormElements(offerFilteringForm);
};

// Форма создания объявления
var offerCreationForm = document.querySelector('.ad-form');

var addressFiled = offerCreationForm.elements.address;
var roomAmountFiled = offerCreationForm.elements.rooms;
var guestAmountFiled = offerCreationForm.elements.capacity;

var fillAddressField = function () {
  var mainPinCoords = getMainPinCoords();
  addressFiled.value = mainPinCoords.x + ', ' + mainPinCoords.y;
};

var validateGuestAmountFiled = function () {
  var guestAmountFieldMaxValidValue = ROOM_AMOUNTS_TO_MAX_GUEST_AMOUNTS_MAP[roomAmountFiled.value];
  var guestAmountFieldValue = parseInt(guestAmountFiled.value, 10);

  var validityMessage = guestAmountFieldValue > guestAmountFieldMaxValidValue ?
    'Максимальное допустимое количество гостей ' + guestAmountFieldMaxValidValue : '';

  guestAmountFiled.setCustomValidity(validityMessage);
};

var offerCreationFormChangeHandler = function (evt) {
  if (evt.target === roomAmountFiled || evt.target === guestAmountFiled) {
    validateGuestAmountFiled();
  }
};

var activateOfferCreationForm = function () {
  offerCreationForm.classList.remove('ad-form--disabled');
  offerCreationForm.addEventListener('change', offerCreationFormChangeHandler);
  enableFormElements(offerCreationForm);
  validateGuestAmountFiled();
};

var deactivateOfferCreationForm = function () {
  offerCreationForm.classList.add('ad-form--disabled');
  offerCreationForm.removeEventListener('change', offerCreationFormChangeHandler);
  disableFormElements(offerCreationForm);
};

// Приложение
var activateApplication = function () {
  activateMap();
  renderPins(randomOffers);
  activateOfferFilteringForm();
  activateOfferCreationForm();
  fillAddressField();

  mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
  mainPin.removeEventListener('keydown', mainPinKeydownHandler);
};

var deactivateApplication = function () {
  deactivateMap();
  deactivateOfferCreationForm();
  deactivateOfferFilteringForm();
  fillAddressField();

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownHandler);
};

deactivateApplication();

mainPin.addEventListener('mousedown', mainPinMousedownHandler);
mainPin.addEventListener('keydown', mainPinKeydownHandler);
