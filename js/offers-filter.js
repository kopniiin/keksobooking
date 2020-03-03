'use strict';

(function () {
  var checkType = function (type, typeFilter) {
    return typeFilter === window.constants.anyFilterValue ||
      type === typeFilter;
  };

  window.offersFilter = function (offers, filters) {
    var filteredOffers = offers.filter(function (offer) {
      return checkType(offer.offer.type, filters.type);
    });

    return filteredOffers.length > window.constants.maxPinsAmount ?
      filteredOffers.slice(0, window.constants.maxPinsAmount) :
      filteredOffers;
  };
})();
