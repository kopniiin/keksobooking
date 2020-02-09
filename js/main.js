'use strict';

var OFFER_TITLE = 'Объявление о жилье';
var OFFER_DESCRIPTION = 'Хорошее и уютное жилье';
var OFFER_MAX_PRICE = 1000000;
var OFFER_MAX_ROOM_AMOUNT = 3;
var OFFER_MAX_GUEST_AMOUNT = 2;

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

var mainPinOffsetX = MAIN_PIN_WIDTH / -2;
var mainPinOffsetY = MAIN_PIN_HEIGHT / -2;
var mainPinWithPointerOffsetY = (MAIN_PIN_HEIGHT + MAIN_PIN_POINTER_HEIGHT) * -1;

var LEFT_MOUSE_BUTTON_NUMBER = 0;

var ENTER_KEY = 'Enter';

// Рандом
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

var createPinElement = function (offer, offerIndex) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinX = offer.offer.location.x + PIN_OFFSET_X;
  var pinY = offer.offer.location.y + PIN_OFFSET_Y;
  pinElement.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';
  pinElement.dataset.offerIndex = offerIndex;

  var pinAvatar = pinElement.querySelector('img');
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.offer.title;
  pinAvatar.style.pointerEvents = 'none';

  return pinElement;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createPinElement(offers[i], i));
  }

  document.querySelector('.map__pins').appendChild(fragment);
};

// Карточка объявления
var translationMap = {
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
  map.insertBefore(
      offerCard,
      document.querySelector('.map__filters-container')
  );
};

var showCorrespondingOfferCard = function (pin) {
  if (pin.classList.contains('map__pin--main')) {
    return;
  }

  var offerCard = createOfferCard(randomOffers[pin.dataset.offerIndex]);
  renderOfferCard(offerCard);
};

var hideCurrentOfferCard = function () {
  var currentOfferCard = map.querySelector('.map__card');

  if (currentOfferCard) {
    map.removeChild(currentOfferCard);
  }
};

// Служебные функции
var toggleFormElements = function (form, disable) {
  for (var i = 0; i < form.elements.length; i++) {
    form.elements[i].disabled = Boolean(disable);
  }
};

var clearCustomValidity = function (field) {
  field.setCustomValidity(' ');
};

// Карта
var map = document.querySelector('.map');

var mapClickHandler = function (evt) {
  if (evt.target.classList.contains('map__pin')) {
    hideCurrentOfferCard();
    showCorrespondingOfferCard(evt.target);
  }
};

var activateMap = function () {
  map.classList.remove('map--faded');
  map.addEventListener('click', mapClickHandler);
};

var deactivateMap = function () {
  map.classList.add('map--faded');
  map.removeEventListener('click', mapClickHandler);
};

// Главный пин
var mainPin = map.querySelector('.map__pin--main');

var getMainPinCoords = function (havePointer) {
  var coordX = Math.round(
      parseInt(mainPin.style.left, 10) - mainPinOffsetX
  );

  var leftTopCornerCoordY = parseInt(mainPin.style.top, 10);

  var offsetY = havePointer ?
    mainPinWithPointerOffsetY : mainPinOffsetY;

  return {
    x: coordX,
    y: Math.round(leftTopCornerCoordY - offsetY)
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
  toggleFormElements(offerFilteringForm);
};

var deactivateOfferFilteringForm = function () {
  toggleFormElements(offerFilteringForm, true);
};

// Форма создания объявления
var offerCreationForm = document.querySelector('.ad-form');

var titleField = offerCreationForm.elements.title;
var addressField = offerCreationForm.elements.address;
var roomAmountField = offerCreationForm.elements.rooms;
var guestAmountField = offerCreationForm.elements.capacity;
var offerTypeField = offerCreationForm.elements.type;
var priceField = offerCreationForm.elements.price;
var checkinTimeField = offerCreationForm.elements.timein;
var checkoutTimeField = offerCreationForm.elements.timeout;

var fillAddressField = function (coords) {
  addressField.value = coords.x + ', ' + coords.y;
};

var roomAmountsToMaxGuestAmountsMap = {
  1: 1,
  2: 2,
  3: 3,
  100: 0
};

var validateGuestAmountField = function () {
  var guestAmountFieldMaxValidValue = roomAmountsToMaxGuestAmountsMap[roomAmountField.value];
  var guestAmountFieldValue = parseInt(guestAmountField.value, 10);

  var validityMessage = guestAmountFieldValue > guestAmountFieldMaxValidValue ?
    'Максимальное допустимое количество гостей ' + guestAmountFieldMaxValidValue : '';

  guestAmountField.setCustomValidity(validityMessage);
};

var offerTypesToMinPriceMap = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0
};

var validatePriceField = function () {
  var offerTypeFieldValue = offerTypeField.value;
  var priceFieldMinValidValue = offerTypesToMinPriceMap[offerTypeFieldValue];
  var priceFieldValue = parseInt(priceField.value, 10);

  priceField.placeholder = priceFieldMinValidValue;

  var validityMessage = priceFieldValue < priceFieldMinValidValue ?
    'Минимальная цена для типа жилья "' + translationMap[offerTypeFieldValue] +
    '" ' + priceFieldMinValidValue + ' ₽/ночь' :
    '';

  priceField.setCustomValidity(validityMessage);
};

var validateTimeFields = function () {
  var validityMessage = checkinTimeField.value !== checkoutTimeField.value ?
    'Время выезда должно быть равным времени заезда' : '';

  checkoutTimeField.setCustomValidity(validityMessage);
};

var validateTitleField = function () {
  var validityMessage = '';

  if (titleField.validity.valueMissing) {
    validityMessage = 'Это поле обязательное';
  }

  if (titleField.validity.tooShort) {
    validityMessage = 'Минимальная длина заголовка ' + titleField.getAttribute('minlength');
  }

  titleField.setCustomValidity(validityMessage);
};

var offerCreationFormChangeHandler = function (evt) {
  if (evt.target === roomAmountField || evt.target === guestAmountField) {
    validateGuestAmountField();
  }

  if (evt.target === offerTypeField || evt.target === priceField) {
    validatePriceField();
  }

  if (evt.target === checkinTimeField || evt.target === checkoutTimeField) {
    validateTimeFields();
  }

  if (evt.target === titleField) {
    validateTitleField();
  }
};

var activateOfferCreationForm = function () {
  offerCreationForm.classList.remove('ad-form--disabled');
  offerCreationForm.addEventListener('change', offerCreationFormChangeHandler);
  titleField.addEventListener('input', () => { clearCustomValidity(titleField); });
  toggleFormElements(offerCreationForm);
  validateGuestAmountField();
  validateTitleField();
};

var deactivateOfferCreationForm = function () {
  offerCreationForm.classList.add('ad-form--disabled');
  offerCreationForm.removeEventListener('change', offerCreationFormChangeHandler);
  toggleFormElements(offerCreationForm, true);
};

// Приложение
var activateApplication = function () {
  activateMap();
  renderPins(randomOffers);
  activateOfferFilteringForm();
  activateOfferCreationForm();

  var mainPinCoords = getMainPinCoords(true);
  fillAddressField(mainPinCoords);

  mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
  mainPin.removeEventListener('keydown', mainPinKeydownHandler);
};

var deactivateApplication = function () {
  deactivateMap();
  deactivateOfferCreationForm();
  deactivateOfferFilteringForm();

  var mainPinCoords = getMainPinCoords();
  fillAddressField(mainPinCoords);

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownHandler);
};

deactivateApplication();

mainPin.addEventListener('mousedown', mainPinMousedownHandler);
mainPin.addEventListener('keydown', mainPinKeydownHandler);
