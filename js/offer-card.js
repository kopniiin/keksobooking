'use strict';

(function () {
  var createFeatureElement = function (featureName) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + featureName);

    return featureElement;
  };

  var createPhotoElement = function (photoSrc) {
    return window.image.create({
      width: window.constants.cardPhotoWidth,
      height: window.constants.cardPhotoHeight,
      alt: window.constants.offerPhotoAlt,
      src: photoSrc
    });
  };

  var template = document.querySelector('#card')
    .content.querySelector('.map__card');

  template.removeChild(template.querySelector('.popup__features'));
  template.removeChild(template.querySelector('.popup__photos'));

  var map = document.querySelector('.map');

  var create = function (offer) {
    var card = template.cloneNode(true);

    card.querySelector('.popup__avatar')
      .src = offer.author.avatar;
    card.querySelector('.popup__title')
      .textContent = offer.offer.title;
    card.querySelector('.popup__text--address')
      .textContent = offer.offer.address;
    card.querySelector('.popup__text--price')
      .textContent = offer.offer.price + '₽/ночь';
    card.querySelector('.popup__type')
      .textContent = window.constants.offerTypesToRussianTranslations[offer.offer.type];
    card.querySelector('.popup__text--capacity')
      .textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    card.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;

    var descriptionContainer = card.querySelector('.popup__description');
    descriptionContainer.textContent = offer.offer.description;

    var offerFeatures = offer.offer.features;

    if (offerFeatures.length) {
      var featureContainer = document.createElement('ul');
      featureContainer.classList.add('popup__features');

      for (var i = 0; i < offerFeatures.length; i++) {
        featureContainer.appendChild(createFeatureElement(offerFeatures[i]));
      }

      card.insertBefore(featureContainer, descriptionContainer);
    }

    var offerPhotos = offer.offer.photos;

    if (offerPhotos.length) {
      var photoContainer = document.createElement('div');
      photoContainer.classList.add('popup__photos');

      for (i = 0; i < offerPhotos.length; i++) {
        photoContainer.appendChild(createPhotoElement(offerPhotos[i]));
      }

      card.appendChild(photoContainer);
    }

    return card;
  };

  var render = function (card) {
    map.insertBefore(
        card,
        document.querySelector('.map__filters-container')
    );
  };

  var show = function (offer) {
    var card = create(offer);

    card.querySelector('.popup__close')
      .addEventListener('click', closeButtonClickHandler);

    render(card);

    document.addEventListener('keydown', cardKeydownHandler);
  };

  var closeCurrent = function () {
    var currentCard = map.querySelector('.map__card');

    if (currentCard) {
      map.removeChild(currentCard);

      document.removeEventListener('keydown', cardKeydownHandler);
    }
  };

  var cardKeydownHandler = function (evt) {
    if (window.utils.checkEscKey(evt.key)) {
      evt.preventDefault();
      closeCurrent();
    }
  };

  var closeButtonClickHandler = function () {
    closeCurrent();
  };

  window.offerCard = {
    show: show,
    closeCurrent: closeCurrent
  };
})();
