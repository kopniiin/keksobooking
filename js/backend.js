'use strict';

(function () {
  var load = function (successHandler, errorHandler) {
    window.serverRequest.send({
      url: window.constants.serverUrl.LOAD,
      successHandler: successHandler,
      errorHandler: errorHandler
    });
  };

  var save = function (data, successHandler, errorHandler) {
    window.serverRequest.send({
      url: window.constants.serverUrl.SAVE,
      data: data,
      successHandler: successHandler,
      errorHandler: errorHandler
    });
  };

  window.backend = {
    load: load,
    save: save
  };
})();
