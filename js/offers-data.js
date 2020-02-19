'use strict';

(function () {
  var createOffer = function (avatar) {
    var locationX = window.utils.getRandomIntFromRangeIncludingMax(
        window.constants.offerLocationLimits.minX,
        window.constants.offerLocationLimits.maxX
    );
    var locationY = window.utils.getRandomIntFromRangeIncludingMax(
        window.constants.offerLocationLimits.minY,
        window.constants.offerLocationLimits.maxY
    );

    return {
      author: {
        avatar: avatar
      },
      offer: {
        title: window.constants.offerTitle,
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomIntFromRangeIncludingMax(0, window.constants.offerMaxPrice),
        type: window.utils.getRandomElement(window.constants.offerTypes),
        rooms: window.utils.getRandomIntFromRangeIncludingMax(1, window.constants.offerMaxRoomAmount),
        guests: window.utils.getRandomIntFromRangeIncludingMax(0, window.constants.offerMaxGuestAmount),
        checkin: window.utils.getRandomElement(window.constants.offerCheckinCheckoutTimes),
        checkout: window.utils.getRandomElement(window.constants.offerCheckinCheckoutTimes),
        features: window.utils.getRandomElements(window.constants.offerFeatures),
        description: window.constants.offerDescription,
        photos: window.utils.getRandomElements(window.constants.offerPhotos),
        location: {
          x: locationX,
          y: locationY
        }
      }
    };
  };

  var createOffers = function () {
    var avatars = [];
    var offers = [];

    for (var i = 1; i <= window.constants.offerAmount; i++) {
      avatars.push('img/avatars/user0' + i + '.png');
    }

    for (i = 0; i < window.constants.offerAmount; i++) {
      var randomAvatar = window.utils.extractRandomElement(avatars);
      offers.push(createOffer(randomAvatar));
    }

    return offers;
  };

  var offers = createOffers();

  var get = function () {
    return offers;
  };

  window.offersData = {
    get: get
  };
})();
