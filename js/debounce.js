'use strict';

(function () {
  window.debounce = function (callback) {
    var lastTimeout;

    return function () {
      var args = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        callback.apply(null, args);
      }, window.constants.debounceDelay);
    };
  };
})();
