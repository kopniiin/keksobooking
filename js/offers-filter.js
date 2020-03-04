'use strict';

(function () {
  var checkType = function (type, filter) {
    return filter === window.constants.filterAnyValue ||
      type === filter;
  };

  var checkPrice = function (price, filter) {
    return filter === window.constants.filterAnyValue ||
      window.utils.checkIfNumInRange(
          price,
          window.constants.priceFilterValuesToPriceRanges[filter]
      );
  };

  var checkAmount = function (amount, filter) {
    return filter === window.constants.filterAnyValue ||
      amount === parseInt(filter, 10);
  };

  var checkFeatures = function (features, filter) {
    return filter.every(function (feature) {
      return features.includes(feature);
    });
  };

  window.offersFilter = function (offers, filters) {
    var filteredOffers = offers.filter(function (offer) {
      return checkType(offer.offer.type, filters.type) &&
        checkPrice(offer.offer.price, filters.price) &&
        checkAmount(offer.offer.rooms, filters.roomAmount) &&
        checkAmount(offer.offer.guests, filters.guestAmount) &&
        checkFeatures(offer.offer.features, filters.features);
    });

    return filteredOffers.length > window.constants.maxPinsAmount ?
      filteredOffers.slice(0, window.constants.maxPinsAmount) :
      filteredOffers;
  };
})();
