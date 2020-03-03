'use strict';

(function () {
  var checkType = function (type, typeFilter) {
    return typeFilter === window.constants.anyFilterValue ||
      type === typeFilter;
  };

  window.offersFilter = function (offers, filters) {
    return offers.filter(function (offer) {
      return checkType(offer.offer.type, filters.type);
    });
  };
})();
